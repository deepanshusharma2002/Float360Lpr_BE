const db = require("../models");
const { RfqItemDetail } = db;

// Controller method to fetch all RFQ items
const getAllRfqItem = async (req, res, next) => {
  try {
    const items = await RfqItemDetail.findAll({
      attributes: ["rfq_item_id", "quantity", "additional_qty"],
      include: [
        {
          model: db.UomMaster,
          attributes: ["uom_name"],
        },
        {
          model: db.AddressMaster,
          attributes: ["city"],
        },
      ],
    });
    res.status(200).json(items);
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

// Controller method to fetch RFQ item by id
const getRfqItemById = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const item = await RfqItemDetail.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

const getRfqItemByRfqid = async (req, res, next) => {
  const rfqid = req.query.rfqid;
  try {
    const item = await RfqItemDetail.findAll({
      where: {
        rfq_id: rfqid,
      },
      include: [
        {
          model: db.OprItems,
        },
        {
          model: db.ItemsMaster,
          include: [
            {
              model: db.ItemSuperGroupMaster,
              attributes: ["item_super_group_name"],
            },
          ],
          attributes: { exclude: ["item_img"] },
        },
        {
          model: db.AddressMaster,
          attributes: ["city", "country"],
        },
      ],
    });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

// Controller method to delete RFQ item by id
const deleteRfqItemById = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const item = await RfqItemDetail.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    await item.destroy();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

module.exports = {
  getAllRfqItem,
  getRfqItemById,
  deleteRfqItemById,
  getRfqItemByRfqid,
};
