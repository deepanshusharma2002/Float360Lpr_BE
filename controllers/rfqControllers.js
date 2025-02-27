const { where, Op } = require("sequelize");
const db = require("../models");
const {
  rfq: RfqMaster,
  RfqItemDetail,
  OprItems,
  VendorsMaster,
  sequelize,
  reqdocMaster,
} = db;

const getPenaltyTermsNameById = require("../middleware/databyid/penaltyTermsName");
const { generateSeries } = require("./seriesGenerate");
const { Where } = require("sequelize/lib/utils");
const {
  GetRemarksByIdAndTableName,
} = require("../utilites/GetDocByIdAndTableName");

// fucntion for count item
const countItem = async (rfq_id) => {
  let query = `
                SELECT COUNT(*) AS item_count
                FROM rfq_items
                WHERE rfq_id  = ${rfq_id}`;
  let [result, data] = await db.sequelize.query(query);
  const count = result[0].item_count;
  return count;
};

const countItem2 = async (rfq_id) => {
  let { sequelize } = db;
  let count = await RfqItemDetail.findAll({
    attributes: [[sequelize.fn("COUNT", sequelize.col("item_id")), "coutn"]],
    Where: { rfq_id: rfq_id },
  });
};

const getDocsRfqIds = async (docIdsString) => {
  try {
    // Split the book_ids string into an array
    const docIds = docIdsString ? docIdsString.split(",").map(Number) : [];
    // Fetch books based on the extracted IDs
    const books = await reqdocMaster.findAll({
      where: {
        req_doc_id: docIds,
      },
    });

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Error fetching books");
  }
};

const getVendorsByRfqId = async (req, res, next) => {
  const rfqid = req.query.rfqid;

  try {
    const result1 = await RfqMaster.findAll({
      where: {
        rfq_id: rfqid,
      },
    });
    let vendors = result1[0].vendor_list;
    const vendor = vendors.split(",").map(Number);

    const result = await VendorsMaster.findAll({
      where: {
        vendor_id: vendor,
      },
      attributes: [
        "vendor_id",
        "vendor_series",
        "vendor_name",
        "phone_number",
        "email",
        "contact_person",
        "contact_person_phone",
        "contact_person_email",
      ],
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getAllRfq = async (req, res, next) => {
  try {
    const rfqs = await RfqMaster.findAll({
      attributes: {
        include: [
          "*",
          [
            sequelize.literal(
              "dbo.fn_GetPortDestinationName(port_of_destination)"
            ),
            "port_of_destination_name",
          ],
          [
            sequelize.literal(
              "dbo.fn_CountQuotationAgainstRFQ(RfqMaster.rfq_id)"
            ),
            "Quotation_find",
          ],
          [sequelize.literal("dbo.GetNamesFromIds(vendor_list)"), "vendors"],
          [
            sequelize.literal(
              `(SELECT STRING_AGG(opr_id, ',') FROM opr_items WHERE opr_items.rfq_id = RfqMaster.rfq_id)`
            ),
            "opr_ids",
          ],
          [
            sequelize.literal(
              `(SELECT STRING_AGG(opr_master.opr_num, ',') 
                FROM opr_items 
                INNER JOIN opr_master ON opr_items.opr_id = opr_master.opr_id
                WHERE opr_items.rfq_id = RfqMaster.rfq_id)`
            ),
            "opr_nums",
          ],
        ],
      },
      include: [
        { model: db.CompanyMaster, attributes: ["company_name"] },
        {
          model: db.rfq_req_doc_master,
          attributes: ["rfq_req_doc_master_name", "description"],
        },
      ],
      order: [
        ["rfq_id", "DESC"], // Adjust ASC or DESC based on your sorting requirement
      ],
    });

    //this funcation will add no of item included in a rfq
    const trnsFormData = await Promise.all(
      rfqs.map(async (rfqs) => {
        countItem2();
        let count2 = await countItem(rfqs.dataValues.rfq_id);
        let doc_list = await getDocsRfqIds(rfqs.dataValues.penalty_terms_id);
        let RemarksLists = await GetRemarksByIdAndTableName(
          rfqs.dataValues.rfq_id,
          "rfq_master"
        );
        rfqs.dataValues.items_count = count2;
        rfqs.dataValues.req_doc_list = doc_list;
        rfqs.dataValues.AdditionalRemarks = RemarksLists;
        return rfqs;
      })
    );
    res.status(200).json(trnsFormData);
  } catch (err) {
    next(err);
  }
};

// Controller method to fetch item by rfq_id
const getRfqById = async (req, res, next) => {
  try {
    const rfq_id = req.params.id;
    let items = await RfqItemDetail.findAll({
      where: {
        rfq_id,
      },
    });
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

// this is create rfq
// on rfq creation
// opr items stuatus will change to 3 and update rfq id

const createRfq = async (req, res, next) => {
  try {
    const {
      // selectedDoc,
      // opr_item_ids,
      // vendor_ids,
      // remarks,
      // port_of_destination,
      // delivery_timeline,
      // item_list,
      // shipment_type,
      // shipment_mode,
      // created_by,
      // updated_by,
      // bh_id,
      // respond_time,
      // selectedDoc,
      // item_list,
      // deliveryType,
      // delivery_timeline,
      // respond_time,
      // deliveryAddress,
      // remarks
      vendor_ids,
      opr_item_ids,
      opr_ids,
      respond_time,
      selectedDoc,
      item_list,
      deliveryType,
      delivery_timeline,
      deliveryAddress,
      remarks,
    } = req.body;

    console.log("item_list", req.body);
    console.log("req.body", req.body);

    const rfq_series = await generateSeries("RFQ");

    // Check if all necessary data is provided
    if (!opr_item_ids || !vendor_ids || !item_list) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Start a transaction
    const transaction = await db.sequelize.transaction();

    try {
      // Create RFQ master record
      const rfqres = await RfqMaster.create(
        {
          rfq_num: rfq_series,
          vendor_list: vendor_ids.join(","),
          // remarks,
          // shipment_type: shipment_type,
          // shipment_mode,
          // port_of_destination,
          company_id: item_list[0]?.company_id,
          // buying_house_id: bh_id,
          respond_time,
          delivery_type: deliveryType,
          delivery_address: deliveryAddress,
          delivery_timeline_in_weeks: delivery_timeline,
          status: 1,
        },
        { transaction } // Pass the transaction to ensure it's part of the transaction
      );

      const { rfq_id } = rfqres;

      if (remarks && remarks.length > 0) {
        await Promise.all(
          remarks.map(async (data) => {
            await db.additional_remark.create(
              {
                reference_id: rfq_id,
                reference_table_name: "rfq_master",
                reference_num: rfq_series,
                remarks: data.remark,
                status: 1,
              },
              { transaction } // Pass the transaction here as well
            );
          })
        );
      }

      const RequireRFQDocs = selectedDoc.map((data, index) => ({
        rfq_id: rfq_id,
        rfq_req_doc_master_name: data.req_doc_name,
        status: 1,
      }));

      await db.rfq_req_doc_master.bulkCreate(RequireRFQDocs, { transaction });

      if (item_list && item_list.length > 0) {
        await Promise.all(
          item_list.map(async (data) => {
            await RfqItemDetail.create(
              {
                rfq_id: rfq_id,
                item_id: data.item_id,
                opr_item_remark: data.item_description,
                uom_name: data.uom_name,
                tolerance: Math.floor(Number(data.tolerance)),
                address_id: data.address_id,
                status: 1,
                opr_item_id: data.opr_item_id,
                quantity: data.quantity,
              },
              { transaction } // Pass the transaction here as well
            );

            await OprItems.update(
              { status: 3, rfq_id: rfq_id },
              {
                where: {
                  opr_item_id: data.opr_item_id,
                },
                transaction, // Ensure this is also part of the transaction
              }
            );
          })
        );
      }

      // If all operations succeed, commit the transaction
      await transaction.commit();

      res.status(201).json({ message: "RFQ Generated Successfully" });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// Controller method to delete RFQ by id
const deleteRfqById = async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const item = await RfqMaster.findByPk(itemid);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await item.destroy(); // This will delete the item from the database

    res.status(200).json({ message: "Item successfully deleted" });
  } catch (err) {
    next(err);
  }
};

//get vendor detail by rfq id
const vendorListbyrfqid = async (req, res, next) => {
  try {
    let rfq_id = req.query.rfq_id;

    let rfqMasterRecord = await RfqMaster.findByPk(rfq_id, {
      attributes: ["vendor_list"],
    });

    if (!rfqMasterRecord) {
      return res.status(404).json({ message: "RFQ not found" });
    }

    // Extract the 'vendor_list' value and convert it to an array of numbers
    const vendorListString = rfqMasterRecord.dataValues.vendor_list;
    const vendorIds = vendorListString
      ? vendorListString.split(",").map(Number)
      : [];

    if (vendorIds.length === 0) {
      return res.status(200).json([]); // Return an empty array if no vendors are found
    }

    // Fetch vendors whose IDs are in the vendorIds array
    let vendors = await VendorsMaster.findAll({
      where: {
        vendor_id: {
          [Op.in]: vendorIds,
        },
      },
      attributes: [
        "vendor_id",
        "vendor_series",
        "vendor_name",
        "phone_number",
        "email",
        "contact_person",
        "contact_person_phone",
        "contact_person_email",
      ],
    });

    res.status(200).json(vendors);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRfq,
  getRfqById,
  deleteRfqById,
  createRfq,
  getVendorsByRfqId,
  vendorListbyrfqid,
};
