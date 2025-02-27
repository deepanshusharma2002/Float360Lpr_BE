// const { lead_time_quo } = ('../models');
const db = require("../models");
const { lead_time_quo } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require("sequelize");

// Controller method to fetch all items
const getLeadTime = async (req, res, next) => {
  const lead_time_id = req.query.lead_time_id;
  try {
    if (!lead_time_id) {
      const result = await lead_time_quo.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["lead_time_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await lead_time_quo.findAll({
        where: {
          lead_time_id: lead_time_id,
          status: { [Op.ne]: 0 },
        },
        order: [["lead_time_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteLeadTimeById = async (req, res, next) => {
  const lead_time_id = req.query.lead_time_id;
  try {
    const result = await lead_time_quo.update(
      { status: 0 },
      {
        where: {
          lead_time_id: lead_time_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createLeadTime = async (req, res, next) => {
  try {
    const { lead_time_name, status } = req.body;
    const result = await lead_time_quo.create({
      lead_time_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateLeadTimeById = async (req, res, next) => {
  const lead_time_id = req.query.lead_time_id;
  try {
    const { lead_time_name, status } = req.body;
    const result = await lead_time_quo.update(
      {
        lead_time_name,
        status,
      },
      {
        where: {
          lead_time_id: lead_time_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

LeadTimeController = {
  getLeadTime,
  deleteLeadTimeById,
  createLeadTime,
  updateLeadTimeById,
};
module.exports = LeadTimeController;
