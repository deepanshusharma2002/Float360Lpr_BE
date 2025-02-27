// const { state } = ('../models');
const db = require("../../models");
const { state } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getState = async (req, res, next) => {
  const state_id = req.query.state_id;
  try {
    if (state_id) {
      const result = await state.findAll({
        attributes: [
          "state_id",
          "state",
          "country_id",
          "created_on",
          "created_by",
          "updated_on",
          "updated_by",
          "status",
          [
            db.sequelize.literal("dbo.fn_CountryName(country_id)"),
            "CountryName",
          ],
        ],
        where: {
          state_id: state_id,
          status: { [Op.ne]: 0 },
        },
        order: [["state_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await state.findAll({
        attributes: [
          "state_id",
          "state",
          "country_id",
          "created_on",
          "created_by",
          "updated_on",
          "updated_by",
          "status",
          [
            db.sequelize.literal("dbo.fn_CountryName(country_id)"),
            "CountryName",
          ],
        ],
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["state_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getStateDropdown = async (req, res, next) => {
  const country_id = req.query.country_id;
  try {
    if (country_id) {
      const result = await state.findAll({
        attributes: ["state_id", "state"],
        where: { country_id: country_id, status: { [Op.eq]: 1 } },
        order: [["state_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await state.findAll({
        attributes: ["state_id", "state"],
        where: {
          status: { [Op.eq]: 1 },
        },
        order: [["state_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteStateById = async (req, res, next) => {
  const state_id = req.query.state_id;
  try {
    const result = await state.update(
      { status: 0 },
      {
        where: {
          state_id: state_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createState = async (req, res, next) => {
  try {
    const { state, status, country_id } = req.body;
    const result = await db.state.create({
      state,
      status,
      country_id,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateStateById = async (req, res, next) => {
  const state_id = req.query.state_id;
  try {
    const { state, status, country_id } = req.body;
    const result = await db.state.update(
      {
        state,
        status,
        country_id,
      },
      {
        where: {
          state_id: state_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

StateController = {
  getState,
  deleteStateById,
  createState,
  updateStateById,
  getStateDropdown,
};
module.exports = StateController;
