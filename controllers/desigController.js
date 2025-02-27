// designation_masterController.js

const db = require("../models");
const { Op } = require("sequelize");

const { desigMaster: DesignationMaster } = db;

// Create a new designation
exports.createDesignation = async (req, res, next) => {
  try {
    const { designation_name, status } = req.body;
    const result = await DesignationMaster.create({
      designation_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Get all designations
exports.getAllDesignations = async (req, res, next) => {
  const designation_id = req.query.designation_id;
  try {
    if (!designation_id) {
      const result = await DesignationMaster.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["designation_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await DesignationMaster.findAll({
        where: {
          designation_id: designation_id,
          status: { [Op.ne]: 0 },
        },
        order: [["designation_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a designation by ID
exports.updateDesignationById = async (req, res, next) => {
  const designation_id = req.query.designation_id;
  try {
    const { designation_name, status } = req.body;
    const result = await DesignationMaster.update(
      {
        designation_name,
        status,
      },
      {
        where: {
          designation_id: designation_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a designation by ID
exports.deleteDesignationById = async (req, res, next) => {
  const designation_id = req.query.designation_id;
  try {
    const result = await DesignationMaster.update(
      { status: 0 },
      {
        where: {
          designation_id: designation_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
