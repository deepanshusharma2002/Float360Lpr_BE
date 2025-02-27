// const { payment_type_transport_master } = ('../models');
const db = require("../../models");
const { payment_type_transport_master } = db;
const { Op } = require("sequelize");

// Controller method to fetch all items
const getPaymentTypeTransport = async (req, res, next) => {
  const payment_type_transport_master_id =
    req.query.payment_type_transport_master_id;
  try {
    if (!payment_type_transport_master_id) {
      const result = await payment_type_transport_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["payment_type_transport_master_id", "DESC"]],
      });
      res.status(200).json(result);
    } else {
      const result = await payment_type_transport_master.findAll({
        where: {
          payment_type_transport_master_id: payment_type_transport_master_id,
          status: { [Op.ne]: 0 },
        },
        order: [["payment_type_transport_master_id", "DESC"]],
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

//For Dropdown
const getPaymentTypeTransportDropdown = async (req, res, next) => {
  try {
    const result = await payment_type_transport_master.findAll({
      attributes: [
        "payment_type_transport_master_id",
        "payment_type_transport_name",
      ],
      where: {
        status: { [Op.eq]: 1 },
      },
      order: [["payment_type_transport_master_id", "DESC"]],
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete by id
const deletePaymentTypeTransportById = async (req, res, next) => {
  const payment_type_transport_master_id =
    req.query.payment_type_transport_master_id;
  try {
    const result = await payment_type_transport_master.update(
      { status: 0 },
      {
        where: {
          payment_type_transport_master_id: payment_type_transport_master_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create
const createPaymentTypeTransport = async (req, res, next) => {
  try {
    const { payment_type_transport_name, status } = req.body;
    const result = await payment_type_transport_master.create({
      payment_type_transport_name,
      status,
    });
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const updatePaymentTypeTransportById = async (req, res, next) => {
  const payment_type_transport_master_id =
    req.query.payment_type_transport_master_id;
  try {
    const { payment_type_transport_name, status } = req.body;
    const result = await payment_type_transport_master.update(
      {
        payment_type_transport_name,
        status,
      },
      {
        where: {
          payment_type_transport_master_id: payment_type_transport_master_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

PaymentTypeTransportController = {
  getPaymentTypeTransport,
  deletePaymentTypeTransportById,
  createPaymentTypeTransport,
  updatePaymentTypeTransportById,
  getPaymentTypeTransportDropdown,
};
module.exports = PaymentTypeTransportController;
