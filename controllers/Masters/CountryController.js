// const { country } = ('../models');
const db = require("../../models");
const { country } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getCountry = async (req, res, next) => {
  const country_id =
    req.query.country_id;
  try {
    if (!country_id) {
      const result = await country.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["country_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await country.findAll({
        where: {
          country_id: country_id,
          status: { [Op.ne]: 0 },
        },
        order: [["country_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getCountryDropdown = async (req, res, next) => {
  try {
    const result = await country.findAll({
      attributes: [
        "country_id",
        "country"
      ],
      where: {
        status: { [Op.eq]: 1 },
      },
      order: [["country_id", "DESC"]],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteCountryById = async (req, res, next) => {
  const country_id =
    req.query.country_id;
  try {
    const result = await country.update(
      { status: 0 },
      {
        where: {
          country_id: country_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createCountry = async (req, res, next) => {
  try {
    const { country, status } = req.body;
    const result = await db.country.create({
      country,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateCountryById = async (req, res, next) => {
  const country_id =
    req.query.country_id;
  try {
    const { country, status } = req.body;
    const result = await db.country.update(
      {
        country,
        status,
      },
      {
        where: {
          country_id: country_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

CountryController = {
  getCountry,
  deleteCountryById,
  createCountry,
  updateCountryById,
  getCountryDropdown,
};
module.exports = CountryController;
