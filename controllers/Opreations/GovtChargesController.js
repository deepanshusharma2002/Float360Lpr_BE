const db = require("../../models");
const { govt_charges, document } = db;
const { Op } = require("sequelize");

// Create a new govt_charges
const createGovtCharges = async (req, res, next) => {
  try {
    console.log("Govt charge added log****************");
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      pfi_id,
      pfi_num,
      ci_id,
      ci_num,
      govt_charges_id,
      payment_types,
      add_expense,
      paid_to_others,
      invoice_num,
      invoice_date,
      amount,
      vat,
      remit_charges,
      narration,
      penalty_approval,
    } = req.body;

    if (govt_charges_id) {
      await govt_charges.update(
        {
          payment_types,
          add_expense,
          paid_to_others,
          invoice_num,
          invoice_date,
          amount,
          vat,
          remit_charges,
          narration,
          penalty_approval,
        },
        { where: { govt_charges_id: govt_charges_id } }
      );

      await document.update(
        {
          status: 0,
        },
        { where: { linked_id: govt_charges_id, table_name: "govt_charges" } }
      );

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await document.create({
              linked_id: govt_charges_id,
              table_name: "govt_charges",
              type: "GOVT CHARGES",
              doc_name: `${file.fieldname}-${file.originalname}`,
              title: "Govt Charges Document",
              doc_base64: base64,
              status: 1,
            });
          })
        );
      }
    } else {
      const result = await govt_charges.create({
        pfi_id,
        pfi_num,
        ci_id,
        ci_num,
        payment_types,
        add_expense,
        paid_to_others,
        invoice_num,
        invoice_date,
        amount,
        vat,
        remit_charges,
        narration,
        penalty_approval,
        status: 1,
      });

      const lastInsertedId = result.govt_charges_id;

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await document.create({
              linked_id: lastInsertedId,
              table_name: "govt_charges",
              type: "GOVT CHARGES",
              doc_name: `${file.fieldname}-${file.originalname}`,
              title: "Govt Charges Document",
              doc_base64: base64,
              status: 1,
            });
          })
        );
      }
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating govt_charges term:", err);
    next(err);
  }
};

const createOtherCharges = async (req, res, next) => {
  try {
    const { ci_id, other_amount, other_narration, other_head } = req.body;
    const result = await govt_charges.update(
      {
        other_head,
        other_amount,
        other_narration,
        govt_status: 1,
      },
      {
        where: { ci_id },
      }
    );

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating govt_charges term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getGovtCharges = async (req, res, next) => {
  const govt_charges_id = req.query.govt_charges_id;
  const ci_id = req.query.ci_id;
  try {
    if (govt_charges_id) {
      const result = await govt_charges.findByPk(govt_charges_id, {
        where: {
          status: { [Op.ne]: 0 },
        },
      });
      return res.status(200).json(result);
    } else if (ci_id) {
      const result = await govt_charges.findOne({
        where: {
          status: { [Op.ne]: 0 },
        },
      });
      return res.status(200).json(result);
    } else {
      const result = await govt_charges.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["govt_charges_id", "DESC"]],
      });
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateGovtCharges = async (req, res, next) => {
  const govt_charges_id = req.query.govt_charges_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await govt_charges.findByPk(govt_charges_id);

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
const deleteGovtCharges = async (req, res, next) => {
  const govt_charges_id = req.query.govt_charges_id;
  try {
    const result = await govt_charges.update(
      { status: 0 },
      {
        where: {
          govt_charges_id: govt_charges_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

GovtChargesController = {
  createGovtCharges,
  getGovtCharges,
  updateGovtCharges,
  deleteGovtCharges,
  createOtherCharges,
};

module.exports = GovtChargesController;
