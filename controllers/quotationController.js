// Controller responsible for comparision approving and rejecting quotations *Rakesh*.
// const { quotation_master } = ('../models');
const db = require("../models");
const {
  quotation_master,
  OprItems,
  po_master,
  quotation_items,
  QuoDoc,
  delivery_terms_quo,
  payment_terms_quo,
  lead_time_quo,
  additional_cost,
} = db;
const getApprovalData = require("./GlobalFunction/GetApprovalData.js");

const formattedDateTime = require("../middleware/time");
const { generateSeries } = require("./seriesGenerate");
const { sequelize, po_items } = require("../models/index");
const { Op, where, col } = require("sequelize");

const getQuotation = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  const company_id = req.query.company_id;
  const opr_id = req.query.opr_id;
  const rfq_id = req.query.rfq_id;
  console.log(company_id, opr_id);
  try {
    if (quo_id) {
      let quo_details = await quotation_master.findAll({
        order: [["quo_id", "DESC"]],
        where: {
          quo_id: quo_id,
        },
        attributes: [
          "quo_id",
          "quo_num",
          "rfq_id",
          "vendor_id",
          "reference_no",
          "reference_date",
          "quo_date",
          "currency",
          "delivery_terms",
          "vendor_reference_no",
          "country_origin",
          "country_supply",
          "port_loading",
          "lead_time",
          "payment_terms",
          "remarks",
          "approval_status",
          "total_cost",
          "po_status",
          "opo_status",
          "quote_doc",
          "quote_doc_name",
          "opr_lead_time",
          "port_of_loading",
          "procurement_by",
          "procurement_justification",
          "quo_valid_till",
          "lead_initiation_point",
          [
            sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
            "delivery_terms_name",
          ],
        ],
        include: [
          { model: db.payment_milestone },
          {
            model: db.rfq,
            include: [
              { model: db.CompanyMaster, attributes: ["company_name"] },
            ],
          },
          { model: db.additional_cost_breakup_freigth },
          { model: db.additional_cost_freigth },
          { model: db.quo_require_docs },
          {
            model: db.additional_cost,
            // attributes: [
            //   "charge_name",
            //   "charge_amount",
            //   "heading",
            //   "for_delivery_term",
            // ],
          },
          {
            model: db.QuoDoc,
            attributes: [
              "q_doc_id",
              "quotation_id",
              "q_doc_name",
              "q_doc_remarks",
              "q_doc_filename",
              // "q_doc_file",
            ],
          },
          {
            model: db.vendor,
            attributes: ["vendor_name", "vendor_series"],
          },
          {
            model: db.quotation_items,
            include: [{ model: db.RfqItemDetail, include: [db.OprItems] }],
            attributes: [
              "quo_item_id",
              "quo_id",
              "item_id",
              "item_type",
              "line_total",
              "opr_qty",
              "quote_qtd",
              "rate",
              "remarks",
              "item_name",
              "no_packs",
              "pack_size",
              "pack_type",
              "quo_num",
              "item_code",
              "rfq_item_id",
              "item_name_vendor",
              "item_name_label",
              "uom_name",
              "cria_required",
              [
                sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                "pack_type_name",
              ],
            ],
          },
        ],
      });
      res.status(200).json(quo_details);
    } else if (company_id && opr_id) {
      console.log("sghg");
      const oprItems = await OprItems.findAll({
        where: {
          company_id: company_id,
          opr_id: opr_id,
        },
        attributes: ["item_id"],
      });
      console.log("sghg", oprItems);

      // Extract item_ids from the retrieved OprItems
      const item_ids = oprItems.map((item) => item.item_id);

      let opr_details = await OprItems.findAll({
        where: {
          company_id: company_id,
          opr_id: opr_id,
        },
        include: [
          {
            model: db.rfq,
            include: [
              { model: db.CompanyMaster, attributes: ["company_name"] },
              {
                model: db.quotation_master,
                attributes: [
                  "quo_id",
                  "quo_num",
                  "rfq_id",
                  "vendor_id",
                  "reference_no",
                  "reference_date",
                  "vendor_reference_no",
                  "quo_date",
                  "currency",
                  "delivery_terms",
                  "country_origin",
                  "country_supply",
                  "port_loading",
                  "lead_time",
                  "payment_terms",
                  "remarks",
                  "approval_status",
                  "total_cost",
                  "po_status",
                  "opo_status",
                  "quote_doc",
                  "quote_doc_name",
                  "opr_lead_time",
                  "port_of_loading",
                  "status",
                  "procurement_by",
                  "procurement_justification",
                  "quo_valid_till",
                  "lead_initiation_point",
                  [
                    sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
                    "delivery_terms_name",
                  ],
                ],
                include: [
                  { model: db.additional_cost_breakup_freigth },
                  { model: db.additional_cost_freigth },
                  {
                    model: db.additional_cost,
                    // attributes: [
                    //   "charge_name",
                    //   "charge_amount",
                    //   "heading",
                    //   "charges_by",
                    //   "for_delivery_term",
                    // ],
                  },
                  {
                    model: db.vendor,
                    attributes: ["vendor_name", "vendor_series"],
                  },
                  {
                    model: db.quotation_items,
                    include: [
                      { model: db.RfqItemDetail, include: [db.OprItems] },
                    ],
                    attributes: [
                      "quo_item_id",
                      "quo_id",
                      "item_id",
                      "item_type",
                      "line_total",
                      "opr_qty",
                      "quote_qtd",
                      "rate",
                      "remarks",
                      "item_name",
                      "no_packs",
                      "pack_size",
                      "pack_type",
                      "quo_num",
                      "item_code",
                      "rfq_item_id",
                      "item_name_vendor",
                      "item_name_label",
                      "uom_name",
                      "cria_required",
                      [
                        sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                        "pack_type_name",
                      ],
                    ],
                    where: {
                      item_id: item_ids, // Filter using the item_id directly
                    },
                  },
                  {
                    model: db.QuoDoc,
                    attributes: [
                      "q_doc_id",
                      "quotation_id",
                      "q_doc_name",
                      "q_doc_remarks",
                      "q_doc_filename",
                      "q_doc_file",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      res.status(200).json(opr_details);
    } else if (rfq_id) {
      let quo_details = await quotation_master.findAll({
        where: {
          rfq_id: rfq_id,
        },
        attributes: [
          "quo_id",
          "quo_num",
          "rfq_id",
          "vendor_id",
          "reference_no",
          "vendor_reference_no",
          "reference_date",
          "quo_date",
          "currency",
          "delivery_terms",
          "country_origin",
          "country_supply",
          "port_loading",
          "lead_time",
          "payment_terms",
          "remarks",
          "approval_status",
          "total_cost",
          "po_status",
          "opo_status",
          "quote_doc",
          "quote_doc_name",
          "opr_lead_time",
          "port_of_loading",
          "procurement_by",
          "procurement_justification",
          "unit_justification",
          "quo_valid_till",
          "lead_initiation_point",
          "status",
          [
            sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
            "delivery_terms_name",
          ],
        ],
        include: [
          {
            model: db.rfq,
            include: [
              { model: db.CompanyMaster, attributes: ["company_name"] },
            ],
            attributes: {
              include: [
                [
                  sequelize.literal(
                    "dbo.fn_GetPortDestinationName(port_of_destination)"
                  ),
                  "port_of_destination_name",
                ],
                [
                  sequelize.literal("dbo.GetNamesFromIds(vendor_list)"),
                  "vendors",
                ],
              ],
            },
          },
          { model: db.additional_cost_breakup_freigth },
          { model: db.additional_cost_freigth },
          {
            model: db.payment_milestone,
            attributes: ["quo_id", "milestone", "percentage", "status"],
          },
          {
            model: db.additional_cost,
            // attributes: [
            //   "charge_name",
            //   "charge_amount",
            //   "heading",
            //   "for_delivery_term",
            // ],
          },
          {
            model: db.vendor,
            attributes: ["vendor_name", "vendor_series"],
          },
          {
            model: db.quotation_items,
            include: [
              { model: db.RfqItemDetail, include: [db.OprItems] },
              {
                model: db.ItemsMaster,
                attributes: { exclude: ["item_img", "item_img_name"] },
              },
            ],
            attributes: [
              "quo_item_id",
              "quo_id",
              "item_id",
              "item_type",
              "line_total",
              "opr_qty",
              "quote_qtd",
              "rate",
              "remarks",
              "item_name",
              "no_packs",
              "pack_size",
              "pack_type",
              "quo_num",
              "item_code",
              "rfq_item_id",
              "item_name_vendor",
              "item_name_label",
              "uom_name",
              "cria_required",
              [
                sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                "pack_type_name",
              ],
            ],
          },
          {
            model: db.QuoDoc,
            attributes: [
              "q_doc_id",
              "quotation_id",
              "q_doc_name",
              "q_doc_remarks",
              "q_doc_filename",
              // "q_doc_file",
            ],
          },
        ],
      });
      res.status(200).json(quo_details);
    } else {
      console.log("check");
      let quo_details = await quotation_master.findAll({
        order: [["quo_id", "DESC"]],
        attributes: [
          "quo_id",
          "quo_num",
          "rfq_id",
          "vendor_id",
          "reference_no",
          "reference_date",
          "vendor_reference_no",
          "quo_date",
          "currency",
          "delivery_terms",
          "country_origin",
          "country_supply",
          "port_loading",
          "lead_time",
          "payment_terms",
          "remarks",
          "approval_status",
          "total_cost",
          "po_status",
          "opo_status",
          "quote_doc",
          "quote_doc_name",
          "opr_lead_time",
          "port_of_loading",
          "procurement_by",
          "procurement_justification",
          "quo_valid_till",
          "lead_initiation_point",
          [
            sequelize.literal("dbo.fn_GetDeliveryTerm(delivery_terms)"),
            "delivery_terms_name",
          ],
        ],
        include: [
          { model: db.payment_milestone },
          {
            model: db.rfq,
            include: [
              { model: db.CompanyMaster, attributes: ["company_name"] },
            ],
          },
          { model: db.additional_cost_breakup_freigth },
          { model: db.additional_cost_freigth },
          { model: db.quo_require_docs },
          {
            model: db.additional_cost,
            // attributes: [
            //   "charge_name",
            //   "charge_amount",
            //   "heading",
            //   "for_delivery_term",
            // ],
          },
          {
            model: db.QuoDoc,
            attributes: [
              "q_doc_id",
              "quotation_id",
              "q_doc_name",
              "q_doc_remarks",
              "q_doc_filename",
              // "q_doc_file",
            ],
          },
          {
            model: db.vendor,
            attributes: ["vendor_name", "vendor_series"],
          },
          {
            model: db.quotation_items,
            include: [{ model: db.RfqItemDetail, include: [db.OprItems] }],
            attributes: [
              "quo_item_id",
              "quo_id",
              "item_id",
              "item_type",
              "line_total",
              "opr_qty",
              "quote_qtd",
              "rate",
              "remarks",
              "item_name",
              "no_packs",
              "pack_size",
              "pack_type",
              "quo_num",
              "item_code",
              "rfq_item_id",
              "item_name_vendor",
              "item_name_label",
              "uom_name",
              "cria_required",
              [
                sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                "pack_type_name",
              ],
            ],
          },
        ],
      });
      res.status(200).json(quo_details);
    }
  } catch (error) {
    next(error);
  }
};

// quotation by rfq it with items
const getQuotationbyrfqId = async (req, res, next) => {
  try {
    const rfq_id = req.query.rfq_id;
    if (rfq_id) {
      const query = `SELECT * 
                      FROM quotations_master
                      INNER JOIN payment_terms_master
                      ON quotations_master.payment_terms = payment_terms_master.payment_terms_id 
                      INNER JOIN delivery_terms_quo
                      ON quotations_master.delivery_terms = delivery_terms_quo.delivery_terms_id 
                      INNER JOIN lead_time_quo
                      ON quotations_master.lead_time = lead_time_quo.lead_time_id where rfq_id = ${rfq_id};`;
      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      // result.forEach(item => item.items = {
      //   await quotation_items.findall({
      //     where: { quo_id: item.quo_id }
      //   })
      // })

      for (const item of result) {
        item.items = await quotation_items.findAll({
          where: { quo_id: item.quo_id },
        });
      }
      res.status(200).json(result);
    } else {
      const query = `SELECT * 
                      FROM quotations_master
                      INNER JOIN payment_terms_master
                      ON quotations_master.payment_terms = payment_terms_master.payment_terms_id 
                      INNER JOIN delivery_terms_quo
                      ON quotations_master.delivery_terms = delivery_terms_quo.delivery_terms_id 
                      INNER JOIN lead_time_quo
                      ON quotations_master.lead_time = lead_time_quo.lead_time_id`;

      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      for (const item of result) {
        item.items = await quotation_items.findAll({
          where: { quo_id: item.quo_id },
        });
      }

      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const GetApprovalsByQuoId = async (req, res, next) => {
  const { quo_id, quo_num } = req.query;
  try {
    const result = await getApprovalData("QUO", quo_id, quo_num);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const GetQuotationDocByQuoId = async (req, res, next) => {
  const { quo_id } = req.query;
  try {
    const result = await QuoDoc.findAll({
      where: {
        quotation_id: quo_id.split(","),
        // status: { [Op.ne]: 1 }
      },
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteQuotationById = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  try {
    const result = await quotation_master.update(
      { status: 0 },
      {
        where: {
          quo_id: quo_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createQuotation = async (req, res, next) => {
  console.dir(req.body, { depth: null });
  console.log(req.files);
  const {
    rfq_id,
    vendor_id,
    reference_no,
    vendor_reference_no,
    reference_date,
    quo_date,
    currency,
    delivery_terms,
    lead_time,
    lead_initiation_point,
    payment_terms,
    remarks,
    quote_valid_till,
    address,
    total_cost,
    opr_lead_time,

    payment_milestone,
    additional_charges,
    charges,
    ReuireDocData,
    ItemData,
    quotation_docslist,
  } = req.body.quotation_details;

  const transaction = await sequelize.transaction(); // Start a transaction

  try {
    const doc_code = "QUO";
    const quotation_series = await generateSeries(doc_code);

    // Generate quotation
    const newQuotationMaster = await quotation_master.create(
      {
        quo_num: quotation_series,
        rfq_id,
        vendor_id,
        reference_no,
        reference_date,
        quo_date,
        lead_initiation_point,
        vendor_reference_no,
        currency,
        delivery_terms,
        quo_valid_till: quote_valid_till,
        lead_time: `${lead_time} Days`,
        payment_terms,
        remarks,
        total_cost,
        address,
        opr_lead_time,
        status: 1,
      }
      // { transaction }
    );

    const lastInsertedId = newQuotationMaster.quo_id;

    const promises = payment_milestone?.map(async (i) => {
      await db.payment_milestone.create(
        {
          quo_id: lastInsertedId,
          quo_num: quotation_series,
          vendor_id: vendor_id,
          initiated_point: i.initiated_point,
          milestone: i.milestone,
          percentage: i.percentage_value,
          payment_status: 0,
          status: 1,
        },
        { transaction }
      );
    });


    // Prepare and insert quotation items

    const updatedItemdata = ItemData?.filter(
      (item) => item.item_code !== ""
    )?.map((item) => ({
      quo_id: lastInsertedId,
      quo_num: quotation_series,
      rfq_id: rfq_id,
      vendor_id: vendor_id,
      cria_required: item?.cria_req,
      rfq_item_id: item.rfq_item_id,
      item_type: item.item_type,
      item_code: item.item_code,
      item_id: item.item_id,
      item_name: item.item_name,
      opr_qty: item.opr_qty,
      item_name_vendor: item.item_name_vendor,
      item_name_label: item.item_name_label,
      quote_qtd: item.quote_qtd,
      uom_name: item.uom,
      rate: item.rate,
      remarks: item.remarks,
      line_total: item.line_total,
      pack_type: item.pack_type,
      pack_size: item.pack_size,
      no_packs: item.no_packs,
      status: 1,
    }));

    await quotation_items.bulkCreate(updatedItemdata, { transaction });

    // Transform and insert quotation documents
    const updatedQuotationDocs = quotation_docslist.map((data, index) => ({
      ...data,
      quotation_id: lastInsertedId,
      q_doc_filename: req.files[index]?.originalname,
      q_doc_file: req.files[index]?.buffer.toString("base64"),
    }));

    await QuoDoc.bulkCreate(updatedQuotationDocs, { transaction });

    const RequireQuotationDocs = ReuireDocData.map((data, index) => ({
      quo_id: lastInsertedId,
      doc_name: data.name,
      doc_remarks: data.remark,
      isAvailable: data.available,
    }));

    if ([charges] && [charges]?.length > 0) {
      await Promise.all(
        [charges].map(async (item) => {
          await db.transportation_charges_lpr.create(
            {
              delivery_term: delivery_terms,
              quotation_id: lastInsertedId,
              quotation_number: quotation_series,
              no_of_truck: item.no_of_truck,
              truck_type: item.amount,
              transportation_rate: item.transportation_rate,
              transportation_amt: item.transportation_amt,
              vat: item.vat,
              total_amt_incl_vat: item.total_freight_charges,
              status: 1,
            },
            { transaction } // Pass the transaction object
          );
        })
      );
    }

    if (additional_charges && additional_charges?.length > 0) {
      await Promise.all(
        additional_charges.map(async (item) => {
          await db.additional_charges_lpr.create(
            {
              delivery_term: delivery_terms,
              quotation_id: lastInsertedId,
              quotation_number: quotation_series,
              headOfExpense: item.headOfExpense,
              amount: item.amount,
              vat: item.vat,
              amtInclVat: item.amtInclVat,
              roundOff: item.roundOff,
              status: 1,
            },
            { transaction } // Pass the transaction object
          );
        })
      );
    }

    await db.quo_require_docs.bulkCreate(RequireQuotationDocs, { transaction });

    await transaction.commit(); // Commit the transaction

    res.status(200).json({ message: "Quotation generated successfully" });
  } catch (err) {
    await transaction.rollback(); // Rollback the transaction in case of error
    console.error("Error creating quotation:", err); // More specific logging
    next(err);
  }
};

const updateQuotationById = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  try {
    const {
      rfq_id,
      vendor_id,
      reference_no,
      reference_date,
      quo_date,
      currency,
      delivery_terms,
      country_origin,
      country_supply,
      port_loading,
      lead_time,
      payment_terms,
      remarks,
      total_cost,
      updated_by,
    } = req.body;
    const result = await quotation_master.update(
      {
        rfq_id,
        vendor_id,
        reference_no,
        reference_date,
        quo_date,
        currency,
        delivery_terms,
        country_origin,
        country_supply,
        port_loading,
        lead_time,
        payment_terms,
        remarks,
        total_cost,
        updated_by,
        updated_on: formattedDateTime,
      },
      {
        where: {
          quo_id: quo_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateAdditionalCost = async (req, res, next) => {
  try {
    const {
      quo_id,
      additional_cost,
      shipment_type,
      quo_num,
      for_delivery_term,
      FreightArray,
    } = req.body;
    console.log(req.body);

    if (shipment_type === "FCL") {
      const AddFreightCharges = async () => {
        await Promise.all(
          FreightArray.map(async (item) => {
            if (!item.additional_cost_freigth_id) {
              await db.additional_cost_freigth.create({
                quo_id: quo_id,
                quo_num: quo_num,
                number_container: item.no_of_container,
                type_container: item.types_of_container,
                rate: item.rate,
                total_freigth: item.total_freight,
                for_delivery_term: for_delivery_term,
                charges_by: "Buyer",
                heading: "Freigth Charges",
                status: 1,
              });
            } else {
              await db.additional_cost_freigth.update(
                {
                  quo_id: quo_id,
                  quo_num: quo_num,
                  number_container: item.no_of_container,
                  type_container: item.types_of_container,
                  rate: item.rate,
                  total_freigth: item.total_freight,
                  for_delivery_term: for_delivery_term,
                },
                {
                  where: {
                    additional_cost_freigth_id: item.additional_cost_freigth_id,
                  },
                }
              );
            }
          })
        );
      };

      await AddFreightCharges();
    } else {
      const AddFreightCharges = async () => {
        await Promise.all(
          FreightArray.map(async (item) => {
            if (!item.additional_cost_breakup_freigth_id) {
              await db.additional_cost_breakup_freigth.create({
                quo_id: quo_id,
                quo_num: quo_num,
                freight_charge_for: item.freight_charge_for,
                input_wt: item.input_wt,
                rate: item.rate,
                total_freigth: item.total_freight,
                for_delivery_term: for_delivery_term,
                shipment_type,
                charges_by: "Buyer",
                heading: "Freigth Charges",
                status: 1,
              });
            } else {
              await db.additional_cost_breakup_freigth.update(
                {
                  quo_id: quo_id,
                  quo_num: quo_num,
                  freight_charge_for: item.freight_charge_for,
                  input_wt: item.input_wt,
                  rate: item.rate,
                  shipment_type,
                  total_freigth: item.total_freight,
                  for_delivery_term: for_delivery_term,
                },
                {
                  where: {
                    additional_cost_breakup_freigth_id:
                      item.additional_cost_breakup_freigth_id,
                  },
                }
              );
            }
          })
        );
      };

      await AddFreightCharges();
    }

    const results = await Promise.all(
      additional_cost.map(async (i) => {
        const data = await db.additional_cost.findAll({
          where: {
            status: 1,
            quo_id: quo_id,
            charge_name: i.name,
            charges_by: "Buyer",
            for_delivery_term: for_delivery_term,
          },
        });
        console.log("i.name", i.name);

        if (data.length === 1) {
          await db.additional_cost.update(
            { charge_amount: i.cost },
            {
              where: {
                quo_id: quo_id,
                charge_name: i.name,
                status: 1,
              },
            }
          );
          return { message: `Updated charge for ${i.name} successfully` };
        } else if (data.length === 0) {
          await db.additional_cost.create({
            quo_id: quo_id,
            quo_num: quo_num,
            charge_name: i.name,
            charge_amount: i.cost,
            charges_by: "Buyer",
            for_delivery_term: for_delivery_term,
            heading: [
              "load_transportation",
              "special_packaging",
              "inspection_charges",
              "miscellaneous_inland",
            ].includes(i.name)
              ? "Inland_Charges"
              : [
                  "bl",
                  "container_seal",
                  "container_stuffing",
                  "thc",
                  "vgm",
                  "miscellaneous",
                ].includes(i.name)
              ? "FOB"
              : "Freight_Charges",
            status: 1,
          });
          return { message: `Added new charge for ${i.name} successfully` };
        } else {
          return { message: `Error processing ${i.name}` };
        }
      })
    );

    // Filter and handle responses
    const successMessages = results.filter(
      (result) => result && result.message
    );
    if (successMessages.length > 0) {
      res.status(200).json(successMessages); // You might use 200 or 201 based on your requirement
    } else {
      res.status(400).json({ message: "No changes made or an error occurred" });
    }
  } catch (err) {
    next(err);
  }
};

// const updateAdditionalCost = async (req, res, next) => {
//   try {
//     const { quo_id, additional_cost, quo_num } = req.body;
//     console.log("put");
//     console.log(req.body);

//     const processCharges = async () => {
//       const addChargesPromises = additional_cost.map(async (i) => {
//         return db.additional_cost.create({
//           quo_id: quo_id,
//           quo_num: quo_num,
//           charge_name: i.name,
//           charge_amount: i.cost,
//           charges_by: 'Buyer',
//           heading: [
//             "load_transportation",
//             "special_packaging",
//             "inspection_charges",
//             "miscellaneous_inland",
//           ].includes(i.name)
//             ? "Inland_Charges"
//             : [
//                 "bl",
//                 "container_seal",
//                 "container_stuffing",
//                 "thc",
//                 "vgm",
//                 "miscellaneous",
//               ].includes(i.name)
//             ? "FOB"
//             : "Freight_Charges",
//           status: 1,
//         });
//       });

//       // Wait for all promises to resolve
//       await Promise.all(addChargesPromises);
//     };
//     processCharges();

//     res.status(200).json({message: "Add Additional Cost Successfully"}); // You might use 200 or 201 based on your requirement

//   } catch (err) {
//     next(err);
//   }
// };

const getQuotationmilestone = async (req, res, next) => {
  const quo_id = req.query.quo_id;
  try {
    const result = await db.payment_milestone.findAll({
      where: {
        quo_id: quo_id,
        status: { [Op.eq]: 1 },
      },
      attributes: [
        "payment_milestone_id",
        "quo_num",
        "quo_id",
        "vendor_id",
        "milestone",
        "percentage",
        "payment_status",
      ],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

//this function will genrate po with status 2 after finalize quotation
// const generatePo = async (req, res, next) => {
//   const doc_code = 'PO';
//   const po_series = await generateSeries(doc_code);

//   try {
//     const { quo_id, quo_num, total_cost, vendor_id, created_by } = req.body;
//     const result = await po_master.create({
//       po_num: po_series,
//       quo_id,
//       quo_num,
//       total_cost,
//       vendor_id,
//       status: 2,
//       created_by,
//       created_on: formattedDateTime,
//     });

//     const result2 = await quotation_master.update(
//       {
//         po_status: 2,
//       },
//       {
//         where: { quo_id },
//       }
//     );

//     // // extract item from quo_items by quo_id
//     // let quo_items = getQuotationItemByQuoId(quo_id);
//     // console.log("****************************");
//     // console.log(quo_items);

//     // //inset item in po_items table
//     // const response = await po_items.create({
//     //   po_id: po_response.po_id,
//     //   quo_id,
//     // })

//     res.status(201).json({ message: "Submit Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

quotationController = {
  getQuotation,
  deleteQuotationById,
  createQuotation,
  updateQuotationById,
  getQuotationbyrfqId,
  GetApprovalsByQuoId,
  GetQuotationDocByQuoId,
  getQuotationmilestone,
  updateAdditionalCost,
  // generatePo
};

module.exports = quotationController;
