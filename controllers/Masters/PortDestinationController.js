// const { port_destination_master } = ('../models');
const db = require("../../models");
const { port_destination_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getPortDestination = async (req, res, next) => {
  const port_destination_id = req.query.port_destination_id;
  try {
    if (!port_destination_id) {
      const result = await port_destination_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["port_destination_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await port_destination_master.findAll({
        where: {
          port_destination_id: port_destination_id,
          status: { [Op.ne]: 0 },
        },
        order: [["port_destination_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getPortDestinationDropdown = async (req, res, next) => {
  try {
    const result = await port_destination_master.findAll({
      attributes: ["port_destination_id", "port_destination_name", "country_name"],
      where: {
        status: { [Op.eq]: 1 },
      },
      order: [["port_destination_id", "DESC"]],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


// Controller method to delete by id
const deletePortDestinationById = async (req, res, next) => {
  const port_destination_id = req.query.port_destination_id;
  try {
    const result = await port_destination_master.update(
      { status: 0 },
      {
        where: {
          port_destination_id: port_destination_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createPortDestination = async (req, res, next) => {
  try {
    const { port_destination_name, status } = req.body;
    const result = await port_destination_master.create({
      port_destination_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updatePortDestinationById = async (req, res, next) => {
  const port_destination_id = req.query.port_destination_id;
  try {
    const { port_destination_name, status } = req.body;
    const result = await port_destination_master.update(
      {
        port_destination_name,
        status,
      },
      {
        where: {
          port_destination_id: port_destination_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

PortDestinationController = {
  getPortDestination,
  deletePortDestinationById,
  createPortDestination,
  updatePortDestinationById,
  getPortDestinationDropdown,
};
module.exports = PortDestinationController;
