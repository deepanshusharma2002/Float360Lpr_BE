const db = require("../../models");
const { operations_son, operations_son_lapse, document } = db;
const { Op } = require("sequelize");

// Create a new operations_son
const createOperationsSon = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      ci_id,
      ci_num,
      penalty_payment_date,
      penalty_approved_date,
      payment_type,
      bill_no,
      bill_date,
      amount,
      remit_charges,
      vat,
      penalty_approved_by,
      narration,
      operations_son_id,
    } = req.body;

    if (operations_son_id) {
      const result = await operations_son.update(
        {
          penalty_payment_date,
          penalty_approved_date,
          payment_type,
          bill_num: bill_no,
          bill_date,
          amount,
          remit_charges,
          vat,
          total: Number(amount) + Number(remit_charges) + Number(vat),
          penalty_approved_by,
          narration,
          status: 1,
        },
        {
          where: { operations_son_id: operations_son_id },
        }
      );

      await document.update(
        { status: 0 },
        {
          where: { table_name: "operations_son", linked_id: operations_son_id },
        }
      );

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await document.create({
              linked_id: operations_son_id,
              table_name: "operations_son",
              type: "SON FOR OPERATIONS",
              doc_name: `${file.fieldname}-${file.originalname}`,
              doc_base64: base64,
              status: 1,
            });
          })
        );
      }
    } else {
      const result = await operations_son.create({
        ci_id,
        ci_num,
        penalty_payment_date,
        penalty_approved_date,
        payment_type,
        bill_num: bill_no,
        bill_date,
        amount,
        remit_charges,
        vat,
        total: Number(amount) + Number(remit_charges) + Number(vat),
        penalty_approved_by,
        narration,
        status: 1,
      });

      const lastInsertedId = result.operations_son_id;

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await document.create({
              linked_id: lastInsertedId,
              table_name: "operations_son",
              type: "SON FOR OPERATIONS",
              doc_name: `${file.fieldname}-${file.originalname}`,
              doc_base64: base64,
              status: 1,
            });
          })
        );
      }
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating operations_son term:", err);
    next(err);
  }
};

// Create a new operations_son
const createOperationsSonLapse = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const { operations_son_id, lapse_type, lapse_amount, lapse_narration } =
      req.body;

    const result = await operations_son_lapse.create({
      operations_son_id: operations_son_id,
      lapse_type,
      lapse_amount,
      lapse_narration,
      status: 1,
    });

    const lastInsertedId = result.operations_son_lapse_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "operations_son_lapse",
            type: "ASON FOR OPERATIONS LAPSE",
            doc_name: `${file.fieldname}-${file.originalname}`,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating operations_son term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getOperationsSons = async (req, res, next) => {
  const operations_son_id = req.query.operations_son_id;
  try {
    if (!operations_son_id) {
      const result = await operations_son.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["operations_son_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await operations_son.findByPk(operations_son_id, {
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
const updateOperationsSon = async (req, res, next) => {
  const operations_son_id = req.query.operations_son_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await operations_son.findByPk(operations_son_id);

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
const deleteOperationsSon = async (req, res, next) => {
  const operations_son_id = req.query.operations_son_id;
  try {
    const result = await operations_son.update(
      { status: 0 },
      {
        where: {
          operations_son_id: operations_son_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

OperationsSonController = {
  createOperationsSon,
  getOperationsSons,
  updateOperationsSon,
  deleteOperationsSon,
  createOperationsSonLapse,
};

module.exports = OperationsSonController;
