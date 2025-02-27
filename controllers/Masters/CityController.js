// const { city } = ('../models');
const db = require("../../models");
const { city } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getCity = async (req, res, next) => {
  const city_id = req.query.city_id;
  try {
    if (!city_id) {
      const result = await city.findAll({
        attributes: [
          "city_id",
          "city",
          "state_id",
          "created_on",
          "created_by",
          "updated_on",
          "updated_by",
          "status",
          [
            db.sequelize.literal("dbo.fn_StateName(state_id)"),
            "StateName",
          ],
        ],
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["city_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await city.findAll({
        
        attributes: [
          "city_id",
          "city",
          "state_id",
          "created_on",
          "created_by",
          "updated_on",
          "updated_by",
          "status",
          [
            db.sequelize.literal("dbo.fn_StateName(state_id)"),
            "StateName",
          ],
        ],
        where: {
          city_id: city_id,
          status: { [Op.ne]: 0 },
        },
        order: [["city_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getCityDropdown = async (req, res, next) => {
  const state_id = req.query.state_id;
  try {
    if(state_id){
      const result = await city.findAll({
        attributes: ["city_id", "city"],
        where: {
          state_id,
          status: { [Op.eq]: 1 },
        },
        order: [["city_id", "DESC"]],
      });
      res.status(200).json(result);
    }else{
    const result = await city.findAll({
      attributes: ["city_id", "city"],
      where: {
        status: { [Op.eq]: 1 },
      },
      order: [["city_id", "DESC"]],
    });
    res.status(200).json(result);
  }
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteCityById = async (req, res, next) => {
  const city_id = req.query.city_id;
  try {
    const result = await city.update(
      { status: 0 },
      {
        where: {
          city_id: city_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createCity = async (req, res, next) => {
  console.log("req.body", req.body)
  try {
    const { cityName, status, state_id } = req.body;
    const result = await db.city.create({
      city: cityName,
      status,
      state_id,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateCityById = async (req, res, next) => {
  const city_id = req.query.city_id;
  try {
    const { city, status, state_id } = req.body;
    const result = await db.city.update(
      {
        city,
        status,
        state_id,
      },
      {
        where: {
          city_id: city_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

CityController = {
  getCity,
  deleteCityById,
  createCity,
  updateCityById,
  getCityDropdown,
};
module.exports = CityController;
