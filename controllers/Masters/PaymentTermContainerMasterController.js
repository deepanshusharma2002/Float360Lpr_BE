// const { payment_term_container_master } = ('../models');
const db = require("../../models");
const { payment_term_container_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getPaymentTermContainer = async (req, res, next) => {
  const payment_term_container_master_id =
    req.query.payment_term_container_master_id;
  try {
    if (!payment_term_container_master_id) {
      const result = await payment_term_container_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["payment_term_container_master_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await payment_term_container_master.findAll({
        where: {
          payment_term_container_master_id: payment_term_container_master_id,
          status: { [Op.ne]: 0 },
        },
        order: [["payment_term_container_master_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getPaymentTermContainerDropdown = async (req, res, next) => {
  try {
    const result = await payment_term_container_master.findAll({
      attributes: [
        "payment_term_container_master_id",
        "payment_term_container_name"
      ],
      where: {
        status: { [Op.eq]: 1 },
      },
      order: [["payment_term_container_master_id", "DESC"]],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deletePaymentTermContainerById = async (req, res, next) => {
  const payment_term_container_master_id =
    req.query.payment_term_container_master_id;
  try {
    const result = await payment_term_container_master.update(
      { status: 0 },
      {
        where: {
          payment_term_container_master_id: payment_term_container_master_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createPaymentTermContainer = async (req, res, next) => {
  try {
    const { payment_term_container_name, status } = req.body;
    const result = await payment_term_container_master.create({
      payment_term_container_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updatePaymentTermContainerById = async (req, res, next) => {
  const payment_term_container_master_id =
    req.query.payment_term_container_master_id;
  try {
    const { payment_term_container_name, status } = req.body;
    const result = await payment_term_container_master.update(
      {
        payment_term_container_name,
        status,
      },
      {
        where: {
          payment_term_container_master_id: payment_term_container_master_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

PaymentTermContainerController = {
  getPaymentTermContainer,
  deletePaymentTermContainerById,
  createPaymentTermContainer,
  updatePaymentTermContainerById,
  getPaymentTermContainerDropdown,
};
module.exports = PaymentTermContainerController;
