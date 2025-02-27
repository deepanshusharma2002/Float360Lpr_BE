const db = require("../models");
const { ItemsMaster: Item } = db;
const { generateSeries } = require("../utilites/genrateSeries");

// Controller method to fetch all items
const getAllItems = async (req, res, next) => {
  const uom_ids = req.query.uom_ids;
  try {
    if(uom_ids){
      const items = await Item.findAll({
        // where: {uom_id : uom_ids},
        // include: [{ model: db.UomMaster, attributes: ["uom_id", "uom_name"] }],
      });
  
      res.status(200).json(items);
    }else{
      const items = await Item.findAll({
        // to be correct
        // include: [{ model: db.UomMaster, attributes: ["uom_id", "uom_name"] }],
      });
  
      res.status(200).json(items);
    }
  } catch (err) {
    next(err);
  }
};

const getItemById = async (req, res) => {
  const itemid = req.params.id;
  try {
    const item = await Item.findByPk(itemid);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    // console.error(`Error fetching item with id ${itemid}:`, err);
    // res.status(500).json({ error: 'Error fetching item' });
    next(err);
  }
};

// Controller method to delte item by id
const createItem = async (req, res, next) => {
  const doc_code = "ITM";
  const item_series = await generateSeries(doc_code);
  console.log("req.body", req.body);
  req.body.item_series = item_series;
  req.body.super_category_id = req.body.superCategory;

  try {
    const fileBuffer = req?.file?.buffer;
    const base64String = await fileBuffer?.toString("base64");
    (req.body.item_img = base64String),
      (req.body.item_img_name = req?.file?.originalname);

    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res) => {
  const itemid = req.params.id;
  try {
    const item = await Item.findByPk(itemid);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.destroy();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  deleteItem,
};
