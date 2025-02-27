const { where, Op } = require("sequelize");
const db = require("../models"); // Adjust the path to your models file
const {
  PaymentRequestMaster,
  PaymentTypeMaster,
  po_master,
  ServiceQUO,
  assessment,
} = db;

const { generateSeries } = require("./seriesGenerate");

const updateDocumentStatus = async (doc_type, doc_id, reference_id, res) => {
  try {
    switch (doc_type) {
      case "po":
        const po = await po_master.findByPk(doc_id);
        if (!po) {
          return res.status(404).json({ message: "Po id is not valid" });
        }
        await po_master.update({ status: 5 }, { where: { po_id: doc_id } });
        break;
      case "assessment":
        await db.assessment.update(
          { status: 2 },
          { where: { assessment_id: reference_id } }
        );
        break;
      case "service_po":
        await ServiceQUO.update(
          { status: 5 },
          { where: { service_quo_id: doc_id } }
        );

        break;
      case "assesment_ci":
        await ServiceQUO.update(
          { status: 2 },
          { where: { assessment_id: doc_id } }
        );

        break;
      default:
        console.log("doct type is not give");
    }
  } catch (err) {
    console.error("Error updating document status:", err);
    throw err;
  }
};

exports.createPaymentRequestMaster = async (req, res) => {
  try {
    console.log(req.body);
    console.log("Check");
    const doc_code = "PR";
    const pr_series = await generateSeries(doc_code);
    req.body.pr_num = pr_series;
    const {
      pr_num,
      doc_id,
      reference_id,
      doc_type,
      po_number,
      po_amount,
      bank_type_id,
      vendor_id,
      amount_payment_term,
      advice_amount,
      advice_date,
      remarks,
      payment_type_id,
      request_type
    } = req.body;

    updateDocumentStatus(doc_type, doc_id, reference_id, res);

    const response = await PaymentRequestMaster.create({
      po_id: doc_id,
      doc_type,
      pr_num,
      po_number,
      reference_id,
      po_amount,
      bank_type_id,
      request_type,
      vendor_id,
      amount_payment_term,
      advice_date,
      advice_amount,
      advice_remarks: remarks,
      status: 2,
      payment_milestone_id: payment_type_id,
    });

    await db.payment_milestone.update(
      { status: 2 },
      { where: { payment_milestone_id: payment_type_id } }
    );

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating PaymentRequestMaster:", error);
    res.status(500).json({
      error: "An error occurred while creating the PaymentRequestMaster.",
    });
  }
};

// Get all PaymentRequestMaster records
exports.getAllPaymentRequestMasters = async (req, res) => {
  const { type, reference_type, reference_id } = req.query;
  console.log("547ytrhfgdhfdg", type, reference_type, reference_id);
  try {
    if (type || reference_type || reference_id) {
      const paymentRequests = await db.PaymentRequestTransactionsMaster.findAll(
        {
          where: {
            payment_type: type,
            reference_type,
            reference_id,
          },
          include: [
            {
              model: PaymentRequestMaster,
              as: "paymentRequest",
            },
            {
              model: db.VendorsBanksDetailsMaster,
              attributes: { exclude: ["bank_ref_cheque"] }, // Correct way to exclude fields
            },
          ],
        }
      );
      res.status(200).json(paymentRequests);
    } else {
      const paymentRequests = await PaymentRequestMaster.findAll({
        include: [
          {
            model: PaymentTypeMaster,
            as: "paymentType",
          },
          {
            model: db.VendorsBanksDetailsMaster,
            attributes: { exclude: ["bank_ref_cheque"] }, // Correct way to exclude fields
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

exports.AcceptRequestByPH = async (req, res) => {
  try {
    const { payment_request_id, advice_remarks } = req.body;

    await PaymentRequestMaster.update(
      {
        advice_remarks,
        advice_date: new Date(),
        status: 5,
      },
      { where: { payment_request_id } }
    );

    res.status(200).json({ message: "Payment Request Approve Successfully" });
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
    next(error);
  }
};

exports.PaymentRequestListForTreasury = async (req, res, next) => {
  const { type } = req.query;
  console.log("type", type);

  try {
    // Define the base query options
    const baseOptions = {
      include: [
        {
          model: db.payment_milestone,
          model: db.VendorsBanksDetailsMaster,
        },
      ],
      where: {
        status: { [Op.ne]: 0 }, // Exclude records with status 0
      },
    };

    // Add request_type condition based on the type
    // if (type === "BH") {
    //   baseOptions.where.request_type = null; // BH has request_type as null
    // } else if (type === "PH" || type === "Agent") {
    //   baseOptions.where.request_type = type; // PH and Agent have specific request_type
    // }
    if (type) {
      baseOptions.where.request_type = type;
    } 

    // Fetch payment requests
    const paymentRequests = await PaymentRequestMaster.findAll(baseOptions);

    res.status(200).json(paymentRequests);
  } catch (error) {
    next(error);
  }
};
