// const { shipping_advise_container_type_master } = ('../models');
const db = require("../../models");
const { shipping_advise_container_type_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getContainerTypes = async (req, res, next) => {
  const shipping_advise_container_type_master_id = req.query.shipping_advise_container_type_master_id;
  try {
    if (!shipping_advise_container_type_master_id) {
      const result = await shipping_advise_container_type_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shipping_advise_container_type_master_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await shipping_advise_container_type_master.findAll({
        where: {
          shipping_advise_container_type_master_id: shipping_advise_container_type_master_id,
          status: { [Op.ne]: 0 },
        },
        order: [["shipping_advise_container_type_master_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getContainerTypesDropdown = async (req, res, next) => {
  try {
      const result = await shipping_advise_container_type_master.findAll({
        attributes: ['shipping_advise_container_type_master_id', 'container_type_name'],
        where: {
          status: { [Op.eq]: 1 },
        },
        order: [["shipping_advise_container_type_master_id", "DESC"]],
      });
      res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteContainerTypesById = async (req, res, next) => {
  const shipping_advise_container_type_master_id = req.query.shipping_advise_container_type_master_id;
  try {
    const result = await shipping_advise_container_type_master.update(
      { status: 0 },
      {
        where: {
          shipping_advise_container_type_master_id: shipping_advise_container_type_master_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createContainerTypes = async (req, res, next) => {
  try {
    const { container_type_name, status } = req.body;
    const result = await shipping_advise_container_type_master.create({
      container_type_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateContainerTypesById = async (req, res, next) => {
  const shipping_advise_container_type_master_id = req.query.shipping_advise_container_type_master_id;
  try {
    const { container_type_name, status } = req.body;
    const result = await shipping_advise_container_type_master.update(
      {
        container_type_name,
        status,
      },
      {
        where: {
          shipping_advise_container_type_master_id: shipping_advise_container_type_master_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

ContainerTypesController = {
  getContainerTypes,
  deleteContainerTypesById,
  createContainerTypes,
  updateContainerTypesById,
  getContainerTypesDropdown
};
module.exports = ContainerTypesController;
