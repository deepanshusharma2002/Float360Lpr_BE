// const { shipping_lapse_master } = ('../models');
const db = require("../../models");
const { shipping_lapse_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getShippingLapse = async (req, res, next) => {
  const shipping_lapse_master_id = req.query.shipping_lapse_master_id;
  try {
    if (!shipping_lapse_master_id) {
      const result = await shipping_lapse_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shipping_lapse_master_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await shipping_lapse_master.findAll({
        where: {
          shipping_lapse_master_id: shipping_lapse_master_id,
          status: { [Op.ne]: 0 },
        },
        order: [["shipping_lapse_master_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getShippingLapseDropdown = async (req, res, next) => {
  try {
    const result = await shipping_lapse_master.findAll({
      attributes: ["shipping_lapse_master_id", "shipping_lapse_name"],
      where: {
        status: { [Op.eq]: 1 },
      },
      order: [["shipping_lapse_master_id", "DESC"]],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteShippingLapseById = async (req, res, next) => {
  const shipping_lapse_master_id = req.query.shipping_lapse_master_id;
  try {
    const result = await shipping_lapse_master.update(
      { status: 0 },
      {
        where: {
          shipping_lapse_master_id: shipping_lapse_master_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createShippingLapse = async (req, res, next) => {
  try {
    const { shipping_lapse_name, status } = req.body;
    const result = await shipping_lapse_master.create({
      shipping_lapse_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateShippingLapseById = async (req, res, next) => {
  const shipping_lapse_master_id = req.query.shipping_lapse_master_id;
  try {
    const { shipping_lapse_name, status } = req.body;
    const result = await shipping_lapse_master.update(
      {
        shipping_lapse_name,
        status,
      },
      {
        where: {
          shipping_lapse_master_id: shipping_lapse_master_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

ShippingLapseController = {
  getShippingLapse,
  deleteShippingLapseById,
  createShippingLapse,
  updateShippingLapseById,
  getShippingLapseDropdown,
};
module.exports = ShippingLapseController;
