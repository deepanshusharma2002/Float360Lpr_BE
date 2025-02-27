// const { opr_master } = ('../models');
const db = require("../models");
const {
  OprMaster: opr_master,
  company_master,
  OprItems,
  Vertical,
  ItemsMaster,
  sequelize,
} = db;
const formattedDateTime = require("../middleware/time");
const { Op, count } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");
const { getStatusName } = require("../utilites/getStausName");
const { query } = require("express");
const {
  GetDocByIdAndTableName,
} = require("../utilites/GetDocByIdAndTableName");

const GetOprDocByOprId = async (req, res, next) => {
  try {
    const opr_id = req.query.opr_id;
    const result = await GetDocByIdAndTableName(opr_id, "opr_master");
    res.status(201).json(result);
  } catch (err) {}
};

const getOpr = async (req, res, next) => {
  try {
    console.log('id');
    let { id } = req.query;
    if (id) {
      let opr_detials = await opr_master.findAll({
        where: { opr_id: id.includes(",") ? id.split(",") : id, status: { [Op.ne]: 0 } },
        order: [["opr_id", "DESC"]],
        include: [
          {
            model: db.CompanyMaster,
            attributes: ["company_name", "company_id"],
          },
          { model: db.Vertical, attributes: ["vertical_name"] },
          { model: db.Division, attributes: ["division_name"] },
          { model: db.ShipMode, attributes: ["shipment_mode_name"] },
          { model: db.Department, attributes: ["dept_name"] },
          {
            model: db.BuyingHouse,
            attributes: ["buying_house_name", "country"],
          },
          {
            model: db.shipment_type_master,
            attributes: ["shipment_type_name"],
          },
          {
            model: db.ItemSuperGroupMaster,
            attributes: ["item_super_group_name"],
          },
          { model: db.OprItems },
        ],
      });

      // Function to transform nested fields into top-level fields
      const transformData = (data) => {
        return data.map((item) => {
          const transformed = {
            ...item.toJSON(), // Convert Sequelize instance to plain object
            company_name: item.company_master
              ? item.company_master.company_name
              : null,
            vertical_name: item.vertical_opr
              ? item.vertical_opr.vertical_name
              : null,
            division_name: item.Division ? item.Division.division_name : null,
            shipment_mode_name: item.ShipMode
              ? item.ShipMode.shipment_mode_name
              : null,
            delivery_timeline_name: item.DeliveryTimeline
              ? item.DeliveryTimeline.delivery_timeline_name
              : null,
            dept_name: item.Department ? item.Department.dept_name : null,
            buying_house_name: item.BuyingHouse
              ? item.BuyingHouse.buying_house_name
              : null,
            buying_house_name: item.BuyingHouse
              ? item.BuyingHouse.buying_house_name
              : null,
          };
          // Remove the now redundant nested objects
          delete transformed.company_master;
          delete transformed.vertical_opr;
          delete transformed.Division;
          delete transformed.ShipMode;
          delete transformed.DeliveryTimeline;
          delete transformed.Department;
          delete transformed.BuyingHouse;
          return transformed;
        });
      };

      opr_detials = await transformData(opr_detials);

      await Promise.all(
        opr_detials.map(async (item) => {
          item.total_item_count = await db.OprItems.count({
            where: { opr_id: item.opr_id },
          });
          item.remaining_item_count = await db.OprItems.count({
            where: {
              opr_id: item.opr_id,
              rfq_id: {
                [Op.is]: null, // Checks that rfq_id is null
              },
            },
          });
          item.status = await getStatusName("opr", item.status);
          return item; // Ensure each item is returned
        })
      );

      let rfqcountquery = `select COUNT(*) as qs from quotations_master
                                    where rfq_id in (Select rfq_id from opr_items where opr_id=10)`;
      opr_detials.received_quotatoins = await db.sequelize.query(rfqcountquery);

      //   console.log("********opr master*******");
      //   console.log(opr_detials);

      res.status(200).json(opr_detials);
    } else {
      let opr_detials = await opr_master.findAll({
        where: { status: { [Op.ne]: 0 } },
        order: [["opr_id", "DESC"]],
        include: [
          {
            model: db.CompanyMaster,
            attributes: ["company_name", "company_id"],
          },
          { model: db.Vertical, attributes: ["vertical_name"] },
          { model: db.Division, attributes: ["division_name"] },
          { model: db.ShipMode, attributes: ["shipment_mode_name"] },
          { model: db.Department, attributes: ["dept_name"] },
          {
            model: db.BuyingHouse,
            attributes: ["buying_house_name", "country"],
          },
          {
            model: db.shipment_type_master,
            attributes: ["shipment_type_name"],
          },
          {
            model: db.ItemSuperGroupMaster,
            attributes: ["item_super_group_name"],
          },
          { model: db.OprItems },
        ],
      });

      // Function to transform nested fields into top-level fields
      const transformData = (data) => {
        return data.map((item) => {
          const transformed = {
            ...item.toJSON(), // Convert Sequelize instance to plain object
            company_name: item.company_master
              ? item.company_master.company_name
              : null,
            vertical_name: item.vertical_opr
              ? item.vertical_opr.vertical_name
              : null,
            division_name: item.Division ? item.Division.division_name : null,
            shipment_mode_name: item.ShipMode
              ? item.ShipMode.shipment_mode_name
              : null,
            delivery_timeline_name: item.DeliveryTimeline
              ? item.DeliveryTimeline.delivery_timeline_name
              : null,
            dept_name: item.Department ? item.Department.dept_name : null,
            buying_house_name: item.BuyingHouse
              ? item.BuyingHouse.country
              : null,
          };
          // Remove the now redundant nested objects
          delete transformed.company_master;
          delete transformed.vertical_opr;
          delete transformed.Division;
          delete transformed.ShipMode;
          delete transformed.DeliveryTimeline;
          delete transformed.Department;
          delete transformed.BuyingHouse;
          return transformed;
        });
      };

      opr_detials = await transformData(opr_detials);

      await Promise.all(
        opr_detials.map(async (item) => {
          item.total_item_count = await db.OprItems.count({
            where: { opr_id: item.opr_id },
          });
          item.remaining_item_count = await db.OprItems.count({
            where: {
              opr_id: item.opr_id,
              rfq_id: {
                [Op.is]: null, // Checks that rfq_id is null
              },
            },
          });
          item.status = await getStatusName("opr", item.status);
          return item; // Ensure each item is returned
        })
      );

      let rfqcountquery = `select COUNT(*) as qs from quotations_master
                                where rfq_id in (Select rfq_id from opr_items where opr_id=10)`;
      opr_detials.received_quotatoins = await db.sequelize.query(rfqcountquery);

      console.log("********opr master*******");
      console.log(opr_detials);

      res.status(200).json(opr_detials);
    }
  } catch (err) {
    next(err);
  }
};

const deleteOprById = async (req, res, next) => {
  const opr_id = req.query.opr_id;
  try {
    const result = await opr_master.update(
      { status: 0 },
      {
        where: {
          opr_id: opr_id,
        },
      }
    );
    res.status(204).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const createOpr = async (req, res, next) => {
  try {
    const doc_code = "OPR";
    const opr_series = await generateSeries(doc_code);
    req.body.opr_num = opr_series;
    console.log("opr_series: ", opr_series);
    console.log("file: ", req.files);

    const {
      vertical_id,
      company_id,
      opr_date,
      division_id,
      buy_from,
      buying_house_id,
      shipment_mode_id,
      shipment_type_id,
      delivery_timeline_id,
      department_id,
      requested_by,
      no_quot_email_alert,
      item_category_id,
      remarks,
      suppliers,
      created_by,
    } = req.body;

    // req.body.buying_house_id ? buying_house_id : 19;
    req.body.status = 2;
    const result = await opr_master.create(req.body);

    const lastInsertedId = result.opr_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await db.document.create({
            linked_id: lastInsertedId,
            table_name: "opr_master",
            type: "OPR",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    res
      .status(201)
      .json({
        message: "Submit Successfully",
        opr_id: result.opr_id,
        opr_num: opr_series,
      });
  } catch (err) {
    next(err);
  }
};

const updateOprById = async (req, res, next) => {
  console.log("file: ", req.files);
  console.log("file: ", req.body);
  try {
    const {
      opr_id,
      opr_num,
      vertical_id,
      company_id,
      opr_date,
      division_id,
      buy_from,
      buying_house_id,
      shipment_mode_id,
      shipment_type_id,
      delivery_timeline_id,
      department_id,
      requested_by,
      no_quot_email_alert,
      item_category_id,
      remarks,
    } = req.body;

    const data = await opr_master.findByPk(opr_id);
    const value = data.item_category_id == item_category_id ? true : false;
    console.log("data.item_category_id", value);
    if (!value) {
      await OprItems.update(
        { status: 0 },
        {
          where: {
            opr_id: opr_id,
          },
        }
      );
    }

    const result = await opr_master.update(
      {
        vertical_id,
        company_id,
        opr_date,
        division_id,
        buy_from,
        buying_house_id,
        shipment_mode_id,
        shipment_type_id,
        delivery_timeline_id,
        department_id,
        requested_by,
        no_quot_email_alert,
        item_category_id,
        remarks,
        status: 15,
        updated_on: formattedDateTime,
      },
      {
        where: {
          [Op.or]: [{ opr_id: opr_id }, { opr_num: opr_num }],
        },
      }
    );

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await db.document.create({
            linked_id: opr_id,
            table_name: "opr_master",
            type: "OPR",
            doc_name: file.originalname,
            doc_base64: base64,
            title: "OPR Added Documents",
            status: 1,
          });
        })
      );
    }

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const confirmOpr = async (req, res, next) => {
  try {
    const opr_id = req.params.opr_id;
    const response = await opr_master.update(
      {
        status: 15,
      },
      {
        where: {
          opr_id: opr_id,
        },
      }
    );

    //update opr items status
    const response2 = await OprItems.update(
      { status: 2 },
      {
        where: {
          opr_id: opr_id,
        },
      }
    );

    res.status(201).json({ message: "OPR Genrated Successfully" });
  } catch (err) {}
};

const sentforApproval = async (req, res, next) => {
  const { doc_id, status } = req.body;
  try {
    const response = await opr_master.findByPk(doc_id);
    if (!response) {
      return res.status(404).json({ message: "Document not found" });
    } else {
      response.status = status;
      await response.save();
      console.log({
        message: "OPR sent for approval successfully",
        data: response,
      });
      res.status(200).json({
        message: "OPR sent for approval successfully",
        data: response,
      });
    }
  } catch (err) {
    next(err);
  }
};

const createOpr2 = async (req, res, next) => {
  try {
    const {
      vertical_id,
      company_id,
      opr_date,
      division_id,
      buy_from,
      buying_house_id,
      shipment_mode_id,
      delivery_timeline_id,
      department_id,
      requested_by,
      no_quot_email_alert,
      item_category_id,
      remarks,
      suppliers,
      created_by,
    } = req.body;

    req.body.buying_house_id ? buying_house_id : 19;
    req.body.status = 1;

    const result = await opr_master.create(req.body);
    res
      .status(201)
      .json({ message: "Submit Successfully", opr_id: result.opr_id });
  } catch (err) {
    next(err);
  }
};

const itemforOpr = async (req, res, next) => {
  try {
    let { super_category_id } = req.query;
    let foundItem = await ItemsMaster.findAll({
      where: { super_category_id },
      attributes: { exclude: ["item_img"] },
    });
    res.status(200).json({ msg: "Sucess", data: foundItem });
  } catch (err) {
    next(err);
  }
};

const oprAction = async (req, res, next) => {
  const { opr_id, action } = req.query;
  let newStatus;
  try {
    switch (action) {
      case "delete":
        newStatus = 0; // Mark as deleted
        break;
      case "send_for_approval":
        newStatus = 1.1; // Mark as approved
        break;
      case "approved":
        newStatus = 1.2; // Mark as rejected
        break;
      case "reject":
        newStatus = 1.3; // Mark as pending
        break;
      default:
        return res.status(400).json({ message: "Invalid action specified" });
    }

    const result = await opr_master.update(
      { status: newStatus },
      {
        where: { opr_id: opr_id },
      }
    );

    if (result[0] === 0) {
      return res
        .status(404)
        .json({ message: "Document not found or status unchanged" });
    }

    res.status(200).json({ message: "Status updated successfully" });
  } catch (err) {
    next(err);
  }
};

oprController = {
  confirmOpr,
  getOpr,
  GetOprDocByOprId,
  deleteOprById,
  createOpr,
  updateOprById,
  itemforOpr,
  sentforApproval,
  oprAction,
};

module.exports = oprController;
