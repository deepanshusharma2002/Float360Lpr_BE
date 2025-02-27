const db = require("../../models");
const { assessment, document } = db;
const { Op } = require("sequelize");
const { PaymentRequest } = require("../../utilites/getStausName");

// Create a new assessment
const createAssessment = async (req, res, next) => {
  const t = await db.sequelize.transaction();  // Start a transaction

  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      rotation_no,
      pfi_id,
      pfi_num,
      ci_id,
      ci_num,
      cNumber,
      assessmentDate,
      assessNo,
      agentName,
      dutyPaidToBank,
      exchangeRate,
      cifValue,
      dutyAmount,
      surchargeAmount,
      cissAmount,
      etlsAmount,
      levyAmount,
      vatAmount,
      penalty_amt,
      totalDuty,
      doc_type,
      financing_ncs_operation,
      assessment_type,
      bank_id,
      payment_by
    } = req.body;


    // Create the assessment inside the transaction
    const result = await assessment.create({
      pfi_id,
      rotation_no,
      pfi_num,
      ci_id: ci_id,
      ci_num: ci_num,
      assessment_date: assessmentDate,
      c_number: cNumber,
      assess_num: assessNo,
      agent_name: agentName,
      duty_to_be_paid_to_bank: dutyPaidToBank,
      exchange_rate: exchangeRate,
      cif_value: cifValue,
      duty_amount: dutyAmount,
      surcharge_amount: surchargeAmount,
      ciss_amount: cissAmount,
      elts_amount: etlsAmount,
      levy_amount: levyAmount,
      vat_amount: vatAmount,
      penalty_amount: penalty_amt,
      total_duty: totalDuty,
      assessment_type,
      financing_ncs_operation,
      payment_by,
      status: 5,
    }, { transaction: t });

    const lastInsertedId = result.assessment_id;
    
    await PaymentRequest(payment_by, bank_id, doc_type, lastInsertedId, totalDuty, ci_id, ci_num, t);

    // If files are provided, save them inside the transaction
    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "ASSESSMENT",
            type: "CI Assessment & SAD Docs",
            doc_name: `${file.fieldname}-${file.originalname}`,
            doc_base64: base64,
            status: 1,
          }, { transaction: t });
        })
      );
    }

    // Commit the transaction after all operations succeed
    await t.commit();

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    // If any error occurs, rollback the transaction
    await t.rollback();

    console.error("Error creating assessment term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getAssessments = async (req, res, next) => {
  const { assessment_id, ci_id } = req.query;
  try {
    if (assessment_id) {
      const result = await assessment.findByPk(assessment_id, {
        where: {
          status: { [Op.ne]: 0 },
        },
      });
      return res.status(200).json(result);
    } else if (ci_id) {
      const result = await assessment.findAll({
        where: {
          ci_id,
          status: { [Op.ne]: 0 },
        },
        order: [["assessment_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await assessment.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["assessment_id", "DESC"]],
      });
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateAssessment = async (req, res, next) => {
  const assessment_id = req.query.assessment_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await assessment.findByPk(assessment_id);

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
const deleteAssessment = async (req, res, next) => {
  const assessment_id = req.query.assessment_id;
  try {
    const result = await assessment.update(
      { status: 0 },
      {
        where: {
          assessment_id: assessment_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

AssessmentController = {
  createAssessment,
  getAssessments,
  updateAssessment,
  deleteAssessment,
};

module.exports = AssessmentController;
