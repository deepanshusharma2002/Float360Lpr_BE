// const { transport_operation_lapse_master } = ('../models');
const db = require("../../models");
const { transport_operation_lapse_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getTransportOpreationLapse = async (req, res, next) => {
  const transport_operation_lapse_master_id =
    req.query.transport_operation_lapse_master_id;
  try {
    if (!transport_operation_lapse_master_id) {
      const result = await transport_operation_lapse_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["transport_operation_lapse_master_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await transport_operation_lapse_master.findAll({
        where: {
          transport_operation_lapse_master_id:
            transport_operation_lapse_master_id,
          status: { [Op.ne]: 0 },
        },
        order: [["transport_operation_lapse_master_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getTransportOpreationLapseDropdown = async (req, res, next) => {
  try {
    const result = await transport_operation_lapse_master.findAll({
      attributes: ['transport_operation_lapse_master_id', 'transport_operation_lapse_name'],
      where: {
        status: { [Op.eq]: 1 },
      },
      order: [["transport_operation_lapse_master_id", "DESC"]],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteTransportOpreationLapseById = async (req, res, next) => {
  const transport_operation_lapse_master_id =
    req.query.transport_operation_lapse_master_id;
  try {
    const result = await transport_operation_lapse_master.update(
      { status: 0 },
      {
        where: {
          transport_operation_lapse_master_id:
            transport_operation_lapse_master_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createTransportOpreationLapse = async (req, res, next) => {
  try {
    const { transport_operation_lapse_name, status } = req.body;
    const result = await transport_operation_lapse_master.create({
      transport_operation_lapse_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateTransportOpreationLapseById = async (req, res, next) => {
  const transport_operation_lapse_master_id =
    req.query.transport_operation_lapse_master_id;
  try {
    const { transport_operation_lapse_name, status } = req.body;
    const result = await transport_operation_lapse_master.update(
      {
        transport_operation_lapse_name,
        status,
      },
      {
        where: {
          transport_operation_lapse_master_id:
            transport_operation_lapse_master_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

TransportOpreationLapseController = {
  getTransportOpreationLapse,
  deleteTransportOpreationLapseById,
  createTransportOpreationLapse,
  updateTransportOpreationLapseById,
  getTransportOpreationLapseDropdown,
};
module.exports = TransportOpreationLapseController;
