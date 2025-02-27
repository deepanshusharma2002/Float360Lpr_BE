// const { add_expense_charges_master } = ('../models');
const db = require("../../models");
const { add_expense_charges_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getAddExpenseCharges = async (req, res, next) => {
  const add_expense_charges_master_id = req.query.add_expense_charges_master_id;
  try {
    if (!add_expense_charges_master_id) {
      const result = await add_expense_charges_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["add_expense_charges_master_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await add_expense_charges_master.findAll({
        where: {
          add_expense_charges_master_id: add_expense_charges_master_id,
          status: { [Op.ne]: 0 },
        },
        order: [["add_expense_charges_master_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getAddExpenseChargesDropdown = async (req, res, next) => {
  try {
      const result = await add_expense_charges_master.findAll({
        attributes: ['add_expense_charges_master_id', 'add_expense_charges_name'],
        where: {
          status: { [Op.eq]: 1 },
        },
        order: [["add_expense_charges_master_id", "DESC"]],
      });
      res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deleteAddExpenseChargesById = async (req, res, next) => {
  const add_expense_charges_master_id = req.query.add_expense_charges_master_id;
  try {
    const result = await add_expense_charges_master.update(
      { status: 0 },
      {
        where: {
          add_expense_charges_master_id: add_expense_charges_master_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createAddExpenseCharges = async (req, res, next) => {
  try {
    const { add_expense_charges_name, status } = req.body;
    const result = await add_expense_charges_master.create({
      add_expense_charges_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updateAddExpenseChargesById = async (req, res, next) => {
  const add_expense_charges_master_id = req.query.add_expense_charges_master_id;
  try {
    const { add_expense_charges_name, status } = req.body;
    const result = await add_expense_charges_master.update(
      {
        add_expense_charges_name,
        status,
      },
      {
        where: {
          add_expense_charges_master_id: add_expense_charges_master_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

AddExpenseChargesController = {
  getAddExpenseCharges,
  deleteAddExpenseChargesById,
  createAddExpenseCharges,
  updateAddExpenseChargesById,
  getAddExpenseChargesDropdown
};
module.exports = AddExpenseChargesController;
