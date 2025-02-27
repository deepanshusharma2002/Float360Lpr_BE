const db = require("../../models");

const { GrnMaster2, GrnItems, GdnMaster } = db;

const createGrn = async (req, res, next) => {
  try {
    let {
      gdn_id,
      agency_code,
      agency_id,
      ref_doc,
      ref_doc_id,
      status,
      gdnitemsdata,
    } = req.body;
    console.log("req.body", req.body);

    // Create the GDN master record
    const result = await GrnMaster2.create({
      gdn_id,
      agency_id,
      ref_doc,
      ref_doc_id,
      status,
    });

    // Get the last inserted GDN ID
    // let lastInsertId = result.dataValues.grn_id;

    // Prepare GDN items data by adding gdn_master_id
    // const itemsWithGdnId = gdnitemsdata.map((item) => ({
    //   ...item,
    //   grn_id: lastInsertId,
    // }));

    // // Bulk create the GDN items
    // const itemResult = await GrnItems.bulkCreate(itemsWithGdnId);

    //change Gdn status
    await GdnMaster.update({ status: 2 });

    res.status(200).json({ msg: "GRN Created Successfully", data: result });
  } catch (error) {
    console.error("Error creating Grn:", error);
    next(error);
  }
};

const getAllGrn = async (req, res, next) => {
  try {
    let { grn_id } = req.query;
    // Construct the where condition
    const whereCondition = grn_id ? { grn_id } : {};

    // Fetch GDN records based on the condition
    let foundGdn = await GrnMaster2.findAll({
      where: whereCondition,
      include: {
        model: GrnItems,
      },
    });

    res.status(200).json({ message: "Success", data: foundGdn });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGrn, getAllGrn };
