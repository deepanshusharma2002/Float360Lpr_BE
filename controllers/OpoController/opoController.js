// const { po_master } = ('../models');
const db = require("../models");
const { sequelize } = db
const { OpoMaster, OpoItems, quotation_master, po_items } = db;
const { Op, where } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");
const { getQuotationItemByQuoId } = require('./quotationItemsController');

exports.getOpo = async (req, res, next) => {
  try {
    const opoList = OpoMaster.findAll({
      where: { status: { [Op.ne]: 0 } },
     
    })
    res.status(200).json(opoList)
  } catch (err) {
    next(err)
  }
};

// Controller method to delete by id
exports.deleteOpo = async (req, res, next) => {
  try {
    const { opo_id } = req.query;
    const opo = await OpoMaster.findOne({
      where: { id: opo_id, status: { [Op.ne]: 0 } }
    });
    if (!opo) {
      return res.status(404).json({ message: 'Record not found or already deleted' });
    }
    await opo.update({ status: 0 });
    res.status(200).json({ message: 'Record soft-deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create OPO with status 1
exports.genrateOpo = async (req, res, next) => {
  console.log("Generate po ");
  console.log(req.body);
  let { quo_id, quo_num, vendor_id, itemList } = req.body;
  try {
    const doc_code = 'OPO';
    const opo_series = await generateSeries(doc_code);
    const { quo_id, quo_num, total_cost, vendor_id, created_by } = req.body;

    //genrate po
    const newopo = await po_master.create({
      opo_num: opo_series,
      vendor_id,
      quo_id,
      quo_num,
      vendor_id,
      status: 1,
    });

    //update quotation
    const result2 = await quotation_master.update(
      {
        opo_status: 1,
      },
      {
        where: { quo_id },
      }
    );

    // extract item from quo_items by quo_id
    let opo_items = await getQuotationItemByQuoId(quo_id);
    let opo_id = newopo.dataValues.po_id;

    // insert po_id and rfq_id in in each quo_items
    await itemList.forEach(element => {
      element.dataValues.opo_id = opo_id, element.dataValues.rfq_id = rfq_id
    });

    const extractedData = opo_items.map(item => item.dataValues);
    const response = await OpoItems.bulkCreate(extractedData)
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

//update po status after send mail to vendor
exports.po_email_conformation = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { po_id } = req.body;
    const po_response = await po_master.update(
      { status: 2 }, // New values to update
      { where: { po_id: po_id } } // Condition to match records
    );
    next();
  } catch (err) {
    next(err);
  }
};


exports.updatePOById = async (req, res, next) => {
  const po_id = req.query.po_id;
  try {
    const { delivery_timeline_name, updated_by } = req.body;
    const result = await po_master.update(
      {
        delivery_timeline_name,
        updated_by,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.AcceptPO = async (req, res, next) => {
  try {
    const { status, po_id, remarks } = req.body;
    let updated_by = '###'

    console.log(req.body);

    const result = await po_master.update(
      {
        acceptance_remarks: remarks,
        status: status ? 3 : 4,
        updated_by: updated_by,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

