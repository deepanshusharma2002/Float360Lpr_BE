// const { shipment_type_master } = ('../models');
const db = require("../../models");
const { shipment_type_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getShipmentTypes = async (req, res, next) => {
  const shipment_type_id = req.query.shipment_type_id;
  try {
    if (!shipment_type_id) {
      const result = await shipment_type_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shipment_type_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await shipment_type_master.findAll({
        where: {
          shipment_type_id: shipment_type_id,
          status: { [Op.ne]: 0 },
        },
        order: [["shipment_type_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getShipmentTypesDropdown = async (req, res, next) => {
  try {
      const result = await shipment_type_master.findAll({
        attributes: ['shipment_type_id', 'shipment_type_name'],
        where: {
          status: { [Op.eq]: 1 },
        },
        order: [["shipment_type_id", "DESC"]],
      });
      res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteShipmentTypesById = async (req, res, next) => {
  const shipment_type_id = req.query.shipment_type_id;
  try {
    const result = await shipment_type_master.update(
      { status: 0 },
      {
        where: {
          shipment_type_id: shipment_type_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createShipmentTypes = async (req, res, next) => {
  try {
    const { shipment_type_name, status } = req.body;
    const result = await shipment_type_master.create({
      shipment_type_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateShipmentTypesById = async (req, res, next) => {
  const shipment_type_id = req.query.shipment_type_id;
  try {
    const { shipment_type_name, status } = req.body;
    const result = await shipment_type_master.update(
      {
        shipment_type_name,
        status,
      },
      {
        where: {
          shipment_type_id: shipment_type_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

ShipmentTypesController = {
  getShipmentTypes,
  deleteShipmentTypesById,
  createShipmentTypes,
  updateShipmentTypesById,
  getShipmentTypesDropdown
};
module.exports = ShipmentTypesController;
