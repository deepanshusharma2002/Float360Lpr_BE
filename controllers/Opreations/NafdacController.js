const db = require("../../models");
const { operations_nafdac, document } = db;
const { Op } = require("sequelize");

// Create a new operations_nafdac
const createOperationsNafdac = async (req, res, next) => {
  try {
    const {
      pfi_id,
      pfi_num,
      form_m_id,
      form_m_num,
      nafdac_date
    } = req.body;

    const result = await operations_nafdac.create({
      pfi_id,
      pfi_num,
      form_m_id,
      form_m_num,
      nafdac_date: nafdac_date,
      status: 1,
    });

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating operations_nafdac term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getOperationsNafdacs = async (req, res, next) => {
  const operations_nafdac_id = req.query.operations_nafdac_id;
  try {
    if (!operations_nafdac_id) {
      const result = await operations_nafdac.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["operations_nafdac_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await operations_nafdac.findByPk(operations_nafdac_id, {
        where: {
          status: { [Op.ne]: 0 },
        },
      });
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateOperationsNafdac = async (req, res, next) => {
  const operations_nafdac_id = req.query.operations_nafdac_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await operations_nafdac.findByPk(operations_nafdac_id);

    // Update the shipment mode
    const { penalty_terms_name, status } = req.body;
    await PenaltyTerms.update({
      penalty_terms_name,
      status,
    });

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const deleteOperationsNafdac = async (req, res, next) => {
  const operations_nafdac_id = req.query.operations_nafdac_id;
  try {
    const result = await operations_nafdac.update(
      { status: 0 },
      {
        where: {
          operations_nafdac_id: operations_nafdac_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

OperationsNafdacController = {
  createOperationsNafdac,
  getOperationsNafdacs,
  updateOperationsNafdac,
  deleteOperationsNafdac,
};

module.exports = OperationsNafdacController;
