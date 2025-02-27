// const { initiation_point_master } = ('../models');
const db = require("../../models");
const { initiation_point_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getInitiationPoint = async (req, res, next) => {
  const initiation_point_id = req.query.initiation_point_id;
  try {
    if (!initiation_point_id) {
      const result = await initiation_point_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["initiation_point_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await initiation_point_master.findAll({
        where: {
          initiation_point_id: initiation_point_id,
          status: { [Op.ne]: 0 },
        },
        order: [["initiation_point_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getInitiationPointDropdown = async (req, res, next) => {
  try {
      const result = await initiation_point_master.findAll({
        attributes: ['initiation_point_id', 'initiation_point'],
        where: {
          status: { [Op.eq]: 1 },
        },
        order: [["initiation_point_id", "DESC"]],
      });
      res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteInitiationPointById = async (req, res, next) => {
  const initiation_point_id = req.query.initiation_point_id;
  try {
    const result = await initiation_point_master.update(
      { status: 0 },
      {
        where: {
          initiation_point_id: initiation_point_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createInitiationPoint = async (req, res, next) => {
  try {
    const { initiation_point, status } = req.body;
    const result = await initiation_point_master.create({
      initiation_point,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateInitiationPointById = async (req, res, next) => {
  const initiation_point_id = req.query.initiation_point_id;
  try {
    const { initiation_point, status } = req.body;
    const result = await initiation_point_master.update(
      {
        initiation_point,
        status,
      },
      {
        where: {
          initiation_point_id: initiation_point_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

InitiationPointMasterController = {
  getInitiationPoint,
  deleteInitiationPointById,
  createInitiationPoint,
  updateInitiationPointById,
  getInitiationPointDropdown
};
module.exports = InitiationPointMasterController;
