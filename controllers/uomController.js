const db = require("../models");
const { UomMaster: Uom } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getAllUom = async (req, res, next) => {
  const uom_ids = req.query.uom_ids;
  console.log(uom_ids);
  const uom = uom_ids?.split(",").map(Number);
  try {
    if (uom_ids) {
      const items = await Uom.findAll({
        where: { uom_id: uom },
        attributes: ["uom_id", "uom_name"],
      });

      res.status(200).json(items);
    } else {
      const items = await Uom.findAll({
        where: { status: { [Op.ne]: 0 } },
      });
      res.status(200).json(items);
    }
  } catch (err) {
    // console.error('Error fetching uom data:', err);
    // res.status(500).json({ error: 'Error fetching uom data' });
    next(err);
  }
};

// Controller method to fetch item by id
const getUomById = async (req, res) => {
  const itemid = req.query.uom_id;
  try {
    const item = await Uom.findByPk(itemid, {
      where: { status: { [Op.ne]: 0 } },
    });

    if (!item) {
      return res.status(404).json({ error: "uom not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    // console.error(`Error fetching uom with id ${itemid}:`, err);
    // res.status(500).json({ error: 'Error fetching uom item' });
    next(err);
  }
};

// Controller method to update Uom
const updateUomById = async (req, res, next) => {
  const itemId = req.query.uom_id;
  const updatedData = req.body;
  try {
    const item = await Uom.findByPk(itemId, {
      where: { status: { [Op.ne]: 0 } },
    });
    if (!item) {
      return res.status(404).json({ error: "UOM not found" });
    }
    await item.update(updatedData);
    res.status(200).json({ msg: "Uom Update Successfully", data: item });
  } catch (err) {
    console.error(`Error updating UOM with id ${itemId}:`, err);
    next(err);
  }
};

//delete uom set status =0
const deleteUomById = async (req, res, next) => {
  const itemId = req.query.uom_id;
  try {
    const item = await Uom.findByPk(itemId, {
      where: { status: { [Op.ne]: 0 } },
    });

    if (!item) {
      return res.status(404).json({ error: "UOM not found" });
    }

    // Set status to 0 instead of deleting the record
    await item.update({ status: 0 });

    res.status(200).json({ msg: "UOM deleted successfully", data: item });
  } catch (err) {
    console.error(`Error deleting UOM with id ${itemId}:`, err);
    next(err);
  }
};

// Controller method to delte item by id
const createUom = async (req, res) => {
  try {
    const { unit_of_measurement_name } = req.body;
    const newItem = await Uom.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    // console.error('Error creating oum:', err);
    // res.status(500).json({ error: 'Error creating oum' });
    next(err);
  }
};

module.exports = {
  getAllUom,
  getUomById,
  deleteUomById,
  createUom,
  updateUomById,
};
