// const { payment_type_charges_master } = ('../models');
const db = require("../../models");
const { payment_type_charges_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getPaymentTypeCharges = async (req, res, next) => {
  const payment_type_charges_master_id = req.query.payment_type_charges_master_id;
  try {
    if (!payment_type_charges_master_id) {
      const result = await payment_type_charges_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["payment_type_charges_master_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await payment_type_charges_master.findAll({
        where: {
          payment_type_charges_master_id: payment_type_charges_master_id,
          status: { [Op.ne]: 0 },
        },
        order: [["payment_type_charges_master_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getPaymentTypeChargesDropdown = async (req, res, next) => {
  try {
    const result = await payment_type_charges_master.findAll({
      attributes: [
        "payment_type_charges_master_id",
        "payment_type_charges_name"
      ],
      where: {
        status: { [Op.eq]: 1 },
      },
      order: [["payment_type_charges_master_id", "DESC"]],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deletePaymentTypeChargesById = async (req, res, next) => {
  const payment_type_charges_master_id =
    req.query.payment_type_charges_master_id;
  try {
    const result = await payment_type_charges_master.update(
      { status: 0 },
      {
        where: {
          payment_type_charges_master_id: payment_type_charges_master_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createPaymentTypeCharges = async (req, res, next) => {
  try {
    const { payment_type_charges_name, status } = req.body;
    const result = await payment_type_charges_master.create({
      payment_type_charges_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updatePaymentTypeChargesById = async (req, res, next) => {
  const payment_type_charges_master_id =
    req.query.payment_type_charges_master_id;
  try {
    const { payment_type_charges_name, status } = req.body;
    const result = await payment_type_charges_master.update(
      {
        payment_type_charges_name,
        status,
      },
      {
        where: {
          payment_type_charges_master_id: payment_type_charges_master_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

PaymentTypeChargesController = {
  getPaymentTypeCharges,
  deletePaymentTypeChargesById,
  createPaymentTypeCharges,
  updatePaymentTypeChargesById,
  getPaymentTypeChargesDropdown,
};
module.exports = PaymentTypeChargesController;
