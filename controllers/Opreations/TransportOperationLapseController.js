const db = require("../../models");
const { transport_operation_lapse, document } = db;
const { Op } = require("sequelize");

// Create a new transport_operation_lapse
const createTransportOperationLapse = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      ci_id,
      ci_num,
      pfi_id,
      pfi_no,
      lapse_type,
      lapse_amount,
      lapse_narration,
    } = req.body;

    const result = await transport_operation_lapse.create({
      ci_id,
      ci_num,
      pfi_id,
      pfi_num: pfi_no,
      lapse_type: lapse_type,
      lapse_amount: lapse_amount,
      lapse_narration,
      status: 1,
    });

    const lastInsertedId = result.transport_operation_lapse_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "transport_operation_lapse",
            type: "Against Operations Add Transport Operation Doc",
            doc_name: `${file.fieldname}-${file.originalname}`,
            doc_base64: base64,
            title: "Lapse Document",
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating transport_operation_lapse term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getTransportOperationLapse = async (req, res, next) => {
  const transport_operation_lapse_id = req.query.transport_operation_lapse_id;
  try {
    if (!transport_operation_lapse_id) {
      const result = await transport_operation_lapse.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["transport_operation_lapse_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await transport_operation_lapse.findByPk(
        transport_operation_lapse_id,
        {
          where: {
            status: { [Op.ne]: 0 },
          },
        }
      );
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateTransportOperationLapse = async (req, res, next) => {
  const transport_operation_lapse_id = req.query.transport_operation_lapse_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await transport_operation_lapse.findByPk(
      transport_operation_lapse_id
    );

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
const deleteTransportOperationLapse = async (req, res, next) => {
  const transport_operation_lapse_id = req.query.transport_operation_lapse_id;
  try {
    const result = await transport_operation_lapse.update(
      { status: 0 },
      {
        where: {
          transport_operation_lapse_id: transport_operation_lapse_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

TransportOperationLapseController = {
  createTransportOperationLapse,
  getTransportOperationLapse,
  updateTransportOperationLapse,
  deleteTransportOperationLapse,
};

module.exports = TransportOperationLapseController;
