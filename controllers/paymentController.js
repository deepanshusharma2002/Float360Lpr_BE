const {
  PaymentTypeMaster,
  PaymentTerms,
  PenaltyTermsMaster,
  PaymentRequestMaster,
  po_master,
  PaymentRequestTransactionsMaster,
  ServiceQUO,
  payment_milestone,
} = require("../models");
const db = require("../models/index");
const { Op } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");

//************************************************Payments Type Controller************************************************/
// Create a new payment type
exports.createPaymentType = async (req, res, next) => {
  try {
    const { payment_type_name, status } = req.body;
    const paymentType = await PaymentTypeMaster.create(req.body);
    res.status(201).json({
      message: "payment terms created Sucessfully",
      data: paymentType,
    });
  } catch (error) {
    next(error);
  }
};

// Get payment types (all or by ID)
exports.getPaymentTypes = async (req, res) => {
  try {
    const id = req.query.payment_type_id;
    const paymentTypes = id
      ? await PaymentTypeMaster.findByPk(id)
      : await PaymentTypeMaster.findAll({
          where: { status: { [Op.ne]: 0 } },
        });

    if (id && !paymentTypes) {
      return res.status(404).json({ message: "Payment Type not found" });
    }
    res.status(200).json(paymentTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all payment types fro drop down
exports.getPaymentTypesDropDown = async (req, res) => {
  try {
    const paymentTypes = await PaymentTypeMaster.findAll({
      where: { status: { [Op.ne]: 0 } },
    });
    res.status(200).json(paymentTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single payment type by ID
exports.getPaymentTypeById = async (req, res) => {
  try {
    const paymentType = await PaymentTypeMaster.findByPk(
      req.query.payment_type_id
    );
    if (paymentType && !paymentType.deletedAt) {
      res.status(200).json(paymentType);
    } else {
      res.status(404).json({ message: "Payment Type not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a payment type
exports.updatePaymentType = async (req, res) => {
  try {
    const paymentType = await PaymentTypeMaster.findByPk(
      req.query.payment_type_id
    );
    await paymentType.update(req.body);
    res.status(200).json({ msg: "Payment type updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Soft delete a payment type
exports.deletePaymentType = async (req, res, next) => {
  try {
    const paymentType = await PaymentTypeMaster.findByPk(
      req.query.payment_type_id
    );
    if (paymentType && paymentType.status !== 0) {
      paymentType.status = 0;
      await paymentType.save();
      res.status(204).json();
    } else if (paymentType && paymentType.status === 0) {
      res.status(404).json({ message: "Payment Type already deleted" });
    } else {
      res.status(404).json({ message: "Payment Type not found" });
    }
  } catch (error) {
    next(error);
  }
};

//************************************************Payments terms Controller************************************************/
// Get all payment types fro drop down
exports.getAllPaymentTerms = async (req, res) => {
  try {
    const paymentsTerms = await PaymentTerms.findAll({
      where: { status: { [Op.ne]: 0 } },
    });
    res.status(200).json(paymentsTerms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new payment term
exports.createPaymentTerm = async (req, res, next) => {
  try {
    const {
      payment_terms_name,
      payment_type_id,
      penalty_terms_id,
      status,
      created_by,
      updated_by,
    } = req.body;
    const paymentTerm = await PaymentTerms.create({
      payment_terms_name,
      payment_type_id,
      penalty_terms_id,
      status,
      created_by,
      updated_by,
    });
    res.status(201).json({
      message: "Payment term created successfully",
      data: paymentTerm,
    });
  } catch (error) {
    next(error);
  }
};

// Get payment terms (all or by ID)
exports.getPaymentTerms = async (req, res) => {
  try {
    const id = req.query.payment_terms_id;
    const paymentTerms = id
      ? await PaymentTerms.findByPk(id)
      : await PaymentTerms.findAll({
          where: { status: { [Op.ne]: 0 } },
        });

    if (id && !paymentTerms) {
      return res.status(404).json({ message: "Payment Term not found" });
    }
    res.status(200).json(paymentTerms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all payment terms for dropdown
exports.getPaymentTermsDropDown = async (req, res) => {
  try {
    const paymentTerms = await PaymentTerms.findAll({
      where: { status: { [Op.ne]: 0 } },
      attributes: ["payment_terms_id", "payment_terms_name"],
    });
    res.status(200).json(paymentTerms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single payment term by ID
exports.getPaymentTermById = async (req, res) => {
  try {
    const paymentTerm = await PaymentTerms.findByPk(req.query.payment_terms_id);
    if (paymentTerm && !paymentTerm.deletedAt) {
      res.status(200).json(paymentTerm);
    } else {
      res.status(404).json({ message: "Payment Term not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a payment term
exports.updatePaymentTerm = async (req, res) => {
  try {
    const paymentTerm = await PaymentTerms.findByPk(req.query.payment_terms_id);
    if (paymentTerm) {
      await paymentTerm.update(req.body);
      res.status(200).json({ message: "Payment term updated successfully" });
    } else {
      res.status(404).json({ message: "Payment Term not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Soft delete a payment term
exports.deletePaymentTerm = async (req, res, next) => {
  try {
    const paymentTerm = await PaymentTerms.findByPk(req.query.payment_terms_id);
    if (paymentTerm && paymentTerm.status !== 0) {
      paymentTerm.status = 0;
      await paymentTerm.save();
      res.status(204).json();
    } else if (paymentTerm && paymentTerm.status === 0) {
      res.status(404).json({ message: "Payment Term already deleted" });
    } else {
      res.status(404).json({ message: "Payment Term not found" });
    }
  } catch (error) {
    next(error);
  }
};

//************************************************Penalty terms  Controller************************************************/
// Create a new penalty term
exports.createPenaltyTerm = async (req, res, next) => {
  try {
    const { penalty_terms_name, created_by, updated_by, status } = req.body;
    const penaltyTerm = await PenaltyTermsMaster.create({
      penalty_terms_name,
      created_by,
      updated_by,
      status,
    });
    console.log(penaltyTerm);
    res.status(201).json({
      message: "Penalty term created successfully",
      data: penaltyTerm,
    });
  } catch (error) {
    next(error);
  }
};

// Get penalty terms (all or by ID)
exports.getPenaltyTerms = async (req, res) => {
  try {
    const id = req.query.penalty_terms_id;
    const penaltyTerms = id
      ? await PenaltyTermsMaster.findByPk(id)
      : await PenaltyTermsMaster.findAll({
          where: { status: { [Op.ne]: 0 } },
        });

    if (id && !penaltyTerms) {
      return res.status(404).json({ message: "Penalty Term not found" });
    }
    res.status(200).json(penaltyTerms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all penalty terms for dropdown
exports.getPenaltyTermsDropDown = async (req, res) => {
  try {
    const penaltyTerms = await PenaltyTermsMaster.findAll({
      where: { status: { [Op.ne]: 0 } },
    });
    res.status(200).json(penaltyTerms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single penalty term by ID
exports.getPenaltyTermById = async (req, res) => {
  try {
    const penaltyTerm = await PenaltyTermsMaster.findByPk(
      req.query.penalty_terms_id
    );
    if (penaltyTerm && !penaltyTerm.deletedAt) {
      res.status(200).json(penaltyTerm);
    } else {
      res.status(404).json({ message: "Penalty Term not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a penalty term
exports.updatePenaltyTerm = async (req, res) => {
  try {
    const penaltyTerm = await PenaltyTermsMaster.findByPk(
      req.query.penalty_terms_id
    );
    if (penaltyTerm) {
      await penaltyTerm.update(req.body);
      res.status(200).json({ message: "Penalty term updated successfully" });
    } else {
      res.status(404).json({ message: "Penalty Term not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Soft delete a penalty term
exports.deletePenaltyTerm = async (req, res, next) => {
  try {
    const penaltyTerm = await PenaltyTermsMaster.findByPk(
      req.query.penalty_terms_id
    );
    if (penaltyTerm && penaltyTerm.status !== 0) {
      penaltyTerm.status = 0;
      await penaltyTerm.save();
      res.status(204).json();
    } else if (penaltyTerm && penaltyTerm.status === 0) {
      res.status(404).json({ message: "Penalty Term already deleted" });
    } else {
      res.status(404).json({ message: "Penalty Term not found" });
    }
  } catch (error) {
    next(error);
  }
};

//************************************************PAYMENT REQUEST CONTOLLER************************************************/

// this function will genrate data in payment request table
exports.createPaymentRequestMaster = async (req, res, next) => {
  try {
    const doc_code = "PR";
    const pr_series = await generateSeries(doc_code);
    req.body.pr_num = pr_series;
    const {
      pr_num,
      po_id,
      po_number,
      po_amount,
      advice_amount,
      advice_date,
      remarks,
      payment_type_id,
    } = req.body;

    // Ensure po_id is valid and update po_staus
    const po = await po_master.findByPk(po_id);
    if (!po) {
      return res.status(404).json({ message: "Po id is not valid" });
    }

    // Ensure payment_type_id is valid
    const paymentType = await PaymentTypeMaster.findByPk(payment_type_id);
    if (!paymentType) {
      return res.status(404).json({ message: "PaymentTypeMaster not found" });
    }

    const response = await PaymentRequestMaster.create({
      po_id,
      payment_type_id,
      pr_num,
      po_number,
      po_amount,
      advice_date,
      advice_amount,
      advice_remarks: remarks,
      status: 1,
    });

    //update po status
    await po_master.update({ status: 5 }, { where: { po_id: po_id } });

    res
      .status(201)
      .json({ msg: "Payment Request Genreted Successfully", data: response });
  } catch (error) {
    console.error("Error creating PaymentRequestMaster:", error);
    next(error);
  }
};

// Get all PaymentRequestMaster records
exports.getAllPaymentRequestMasters = async (req, res) => {
  const { type, reference_type, reference_id } = req.query;
  console.log("547ytrhfgdhfdg", type, reference_type, reference_id);
  try {
    if (type || reference_type || reference_id) {
      const paymentRequests = await PaymentRequestMaster.findAll({
        where: {
          doc_type: reference_type,
          request_type: type,
          reference_id,
        },
        include: [
          {
            model: PaymentTypeMaster,
            as: "paymentType",
          },
        ],
      });
      res.status(200).json(paymentRequests);
    } else {
      const paymentRequests = await PaymentRequestMaster.findAll({
        include: [
          {
            model: PaymentTypeMaster,
            as: "paymentType",
          },
        ],
      });
      res.status(200).json(paymentRequests);
    }
  } catch (error) {
    console.error("Error fetching PaymentRequestMasters:", error);
    res.status(500).json({
      error: "An error occurred while fetching PaymentRequestMasters.",
    });
  }
};

// Get a PaymentRequestMaster by ID
exports.getPaymentRequestMasterById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentRequest = await PaymentRequestMaster.findByPk(id, {
      include: [
        {
          model: PaymentTypeMaster,
          as: "paymentType",
        },
      ],
    });

    if (!paymentRequest) {
      return res
        .status(404)
        .json({ message: "PaymentRequestMaster not found" });
    }

    res.status(200).json(paymentRequest);
  } catch (error) {
    console.error("Error fetching PaymentRequestMaster:", error);
    res.status(500).json({
      error: "An error occurred while fetching the PaymentRequestMaster.",
    });
  }
};

// Update a PaymentRequestMaster by ID
exports.updatePaymentRequestMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      po_id,
      po_number,
      po_amount,
      advice_date,
      advice_amount,
      advice_remarks,
      status,
      created_by,
      updated_by,
      payment_type_id,
    } = req.body;

    const paymentRequest = await PaymentRequestMaster.findByPk(id);

    if (!paymentRequest) {
      return res
        .status(404)
        .json({ message: "PaymentRequestMaster not found" });
    }

    if (payment_type_id) {
      // Ensure payment_type_id is valid
      const paymentType = await PaymentTypeMaster.findByPk(payment_type_id);
      if (!paymentType) {
        return res.status(404).json({ message: "PaymentTypeMaster not found" });
      }
    }

    await paymentRequest.update({
      po_id,
      po_number,
      po_amount,
      advice_date,
      advice_amount,
      advice_remarks,
      status,
      created_by,
      updated_by,
      payment_type_id,
    });

    res.status(200).json(paymentRequest);
  } catch (error) {
    console.error("Error updating PaymentRequestMaster:", error);
    res.status(500).json({
      error: "An error occurred while updating the PaymentRequestMaster.",
    });
  }
};

// Delete a PaymentRequestMaster by ID
exports.deletePaymentRequestMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentRequest = await PaymentRequestMaster.findByPk(id);

    if (!paymentRequest) {
      return res
        .status(404)
        .json({ message: "PaymentRequestMaster not found" });
    }

    await paymentRequest.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting PaymentRequestMaster:", error);
    res.status(500).json({
      error: "An error occurred while deleting the PaymentRequestMaster.",
    });
  }
};

exports.deletePaymentRequestMaster = async (req, res) => {
  try {
    const { payment_request_id } = req.params;
    const paymentRequest = await PaymentRequestMaster.findByPk(
      payment_request_id
    );

    if (!paymentRequest) {
      return res
        .status(404)
        .json({ message: "PaymentRequestMaster not found" });
    }

    // Perform soft delete by setting status to 0
    await paymentRequest.update({ status: 0 });

    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting PaymentRequestMaster:", error);
    res.status(500).json({
      error: "An error occurred while deleting the PaymentRequestMaster.",
    });
  }
};

exports.rejectPaymentRequestByTreasury = async (req, res, next) => {
  try {
    const { request_id, remarks } = req.body;

    //verify request id
    const paymentRequest = await PaymentRequestMaster.findByPk(request_id);
    if (!paymentRequest) {
      return res
        .status(404)
        .json({ message: "PaymentRequestMaster not found" });
    }

    //update PaymentRequest
    const response = await PaymentRequestMaster.update(
      { status: 4, remarks: remarks },
      { where: { payment_request_id: request_id } }
    );

    res.status(200).send();
  } catch (error) {
    // console.error('Error deleting PaymentRequestMaster:', error);
    // res.status(500).json({ error: 'An error occurred while deleting the PaymentRequestMaster.' });
    next(error);
  }
};

exports.PaymentRequestListForTreasury = async (req, res, next) => {
  try {
    const paymentRequests = await PaymentRequestMaster.findAll({
      include: [
        {
          model: PaymentTypeMaster,
          as: "paymentType",
        },
      ],
      where: {
        status: [2, 4, 3],
      },
    });
    res.status(200).json(paymentRequests);
  } catch (error) {
    next(error);
  }
};

const updateDocumentStatus = async (
  transaction,
  doc_type,
  doc_id,
  reference_id,
  res,
  request_type,
  partially
) => {
  try {
    console.log("doc_type", doc_type);

    if (request_type === "PH" || request_type === "Agent") {
      switch (doc_type) {
        case "assessment":
          // Update the assessment status
          await db.assessment.update(
            { status: partially ? 10 : 1 },
            { where: { assessment_id: reference_id }, transaction }
          );
          break;

          case "transport":
            // Update the transport status
            await db.transport_add_bill.update(
              { status: partially ? 10 : 1 },
              { where: { transport_add_bill_id: reference_id }, transaction }
            );
            break;

            case "other_govt_charge":
            // Update the transport status
            await db.other_govt_charges.update(
              { status: partially ? 10 : 1 },
              { where: { other_govt_charges_id: reference_id }, transaction }
            );
            break;

            case "soncap":
              // Update the transport status
              await db.soncap_master.update(
                { status: partially ? 10 : 1 },
                { where: { soncap_master_id: reference_id }, transaction }
              );
              break;

        case "Shipping Expense":
        case "Terminal Expense":
          // Update shipping/terminal expense status
          await db.operations_shipping_expenses.update(
            { status: partially ? 10 : 1 },
            {
              where: { operations_shipping_expenses_id: reference_id },
              transaction,
            }
          );
          break;

        case "assessment Lapse":
        case "nafdac Lapse":
        case "shipping Lapse":
        case "customClearance Lapse":
        case "son Lapse":
        case "transport Lapse":
        case "govtCharge Lapse":
        case "otherCharges Lapse":
          await db.ci_lapse_master.update(
            { status: partially ? 10 : 1 },
            {
              where: { ci_lapse_master_id: reference_id },
              transaction,
            }
          );
          break;

        default:
          throw new Error("Invalid document type");
      }
    } else {
      switch (doc_type) {
        case "po":
          // Update PO status
          await po_master.update(
            { status: 6 },
            { where: { po_id: doc_id }, transaction }
          );
          break;

        case "service_po":
          // Update service PO status
          await ServiceQUO.update(
            { status: 6 },
            { where: { service_quo_id: doc_id }, transaction }
          );
          break;

        default:
          throw new Error("Invalid document type");
      }
    }
  } catch (err) {
    console.error("Error updating document status:", err);
    throw err; // Rethrow error to be caught by the caller
  }
};

exports.createPaymentTransactions = async (req, res, next) => {
  try {
    const {
      payment_request_id,
      doc_id,
      payment_date,
      value_date,
      payment_amount,
      from_bank_detail_id,
      to_bank_detail_id,
      bank_charge,
      bank_reference_no,
      doc_type,
      requested_amount,
      request_type,
      payment_milestone_id,
      reference_id,
    } = req.body;
    console.log("req.body", req.body);

    const paymentRequestsData =
      await db.PaymentRequestTransactionsMaster.findAll({
        where: {
          payment_type: request_type,
          reference_type: doc_type,
          reference_id,
          doc_id,
        },
      });

    const previousAmount =
      paymentRequestsData.length > 0
        ? paymentRequestsData.reduce(
            (acc, item) => (acc += Number(item.payment_amount)),
            0
          )
        : 0;
    console.log("previousAmount", previousAmount);

    const transaction = await db.sequelize.transaction();

    if (
      Number(previousAmount) + Number(payment_amount) ===
      Number(requested_amount)
    ) {
      console.log("gyfehgyrhghb");
      // Update document status within the transaction
      await updateDocumentStatus(
        transaction,
        doc_type,
        doc_id,
        reference_id,
        res,
        request_type,
        (partially = false)
      );

      // Update payment request status
      const paymentRequest = await PaymentRequestMaster.update(
        { status: 3 },
        { where: { payment_request_id }, transaction }
      );

      await payment_milestone.update(
        { status: 5 },
        { where: { payment_milestone_id }, transaction }
      );

      // Check if the payment request is not found
      if (!paymentRequest) {
        await transaction.rollback();
        return res.status(404).json({ message: "Request id is not valid" });
      }

      // Handle image file
      const fileBuffer = req.files[0].buffer;
      const base64String = await fileBuffer.toString("base64");

      // Generate transaction
      const newTransaction = await PaymentRequestTransactionsMaster.create(
        {
          payment_request_id,
          doc_id,
          payment_date,
          value_date,
          payment_amount,
          from_bank_detail_id,
          to_bank_detail_id,
          bank_charge,
          bank_refenence_no: bank_reference_no,
          reference_type: doc_type,
          payment_type: request_type,
          payment_milestone_id,
          reference_id,
          receipt_image: base64String,
          receipt_image_name: req.files[0].originalname,
        },
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();

      res.status(201).json(newTransaction);
    } else if (
      Number(previousAmount) + Number(payment_amount) <
      Number(requested_amount)
    ) {
      console.log("false", doc_type);
      // Update document status within the transaction
      await updateDocumentStatus(
        transaction,
        doc_type,
        doc_id,
        reference_id,
        res,
        request_type,
        (partially = true)
      );

      // Update payment request status
      const paymentRequest = await PaymentRequestMaster.update(
        { status: 10 },
        { where: { payment_request_id }, transaction }
      );

      await payment_milestone.update(
        { status: 10 },
        { where: { payment_milestone_id }, transaction }
      );

      // Check if the payment request is not found
      if (!paymentRequest) {
        await transaction.rollback();
        return res.status(404).json({ message: "Request id is not valid" });
      }

      // Handle image file
      const fileBuffer = req.files[0].buffer;
      const base64String = await fileBuffer.toString("base64");

      // Generate transaction
      const newTransaction = await PaymentRequestTransactionsMaster.create(
        {
          payment_request_id,
          doc_id,
          payment_date,
          value_date,
          payment_amount,
          from_bank_detail_id,
          to_bank_detail_id,
          bank_charge,
          bank_refenence_no: bank_reference_no,
          reference_type: doc_type,
          payment_type: request_type,
          payment_milestone_id,
          reference_id,
          receipt_image: base64String,
          receipt_image_name: req.files[0].originalname,
        },
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();

      res.status(201).json(newTransaction);
    } else {
      res.status(201).json({
        message: "Payment Amount cannot be greater than requested Amount",
      });
    }
  } catch (error) {
    next(error);
  }
};
