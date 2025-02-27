const { where } = require("sequelize");
const db = require("../../models");

const { GdnMaster, GdnItems, po_items, po_master } = db;

const createGdn = async (req, res, next) => {
  try {
    let { agency_code, agency_id, ref_doc, ref_doc_id, status, gdnitemsdata } =
      req.body;
    console.log("Gdn data");
    console.log(req.body);
    // Create the GDN master record
    const result = await GdnMaster.create({
      agency_code,
      agency_id,
      ref_doc,
      ref_doc_id,
      status,
    });

    // Get the last inserted GDN ID
    let lastInsertId = result.dataValues.gdn_id;

    // Prepare GDN items data by adding gdn_master_id
    const itemsWithGdnId = gdnitemsdata.map((item) => ({
      ...item,
      gdn_id: lastInsertId,
    }));

    // Bulk create the GDN items
    const itemResult = await GdnItems.bulkCreate(itemsWithGdnId);

    if (agency_code === "bh") {
      const updates = gdnitemsdata.map(async (item) => {
        return await db.po_items.update(
          { grn_qty: item.gdn_item_qty },
          { where: { item_id: item.item_id, po_id: ref_doc_id } }
        );
      });
      await Promise.all(updates); // Await all updates
    }

    const statusUpdate = agency_code === "bh" ? 11 : 8;
    await po_master.update(
      { status: statusUpdate },
      { where: { po_id: ref_doc_id } }
    );

    res.status(200).json({ msg: "GDN Created Successfully", data: result });
  } catch (error) {
    console.error("Error creating GDN:", error);
    next(error);
  }
};

const getAllGdn = async (req, res, next) => {
  try {
    let { gdn_id, po_id } = req.query;
    // Construct the where condition
    const whereCondition = gdn_id
      ? { gdn_id }
      : po_id
      ? { ref_doc_id: po_id, ref_doc: "po" }
      : {};
    // Fetch GDN records based on the condition
    let foundGdn = await GdnMaster.findAll({
      where: { ...whereCondition },

      include: {
        model: GdnItems,
      },
    });
    res.status(200).json({ message: "Success", data: foundGdn });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGdn, getAllGdn };
