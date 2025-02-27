const db = require("../../models");
const { insurance, document, sequelize } = db;
const { Op } = require("sequelize");

// Create a new Insurance
const createInsuranceTerm = async (req, res, next) => {
  try {
    console.log("*********************")
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      pfiId,
      pfiNum,
      pfiDate,
      pfiValue,
      currency,
      bank,
      applicationDate,
      insurancePremiumRate,
      insuranceCertNo,
      invoiceNo,
      formMDate,
      insuranceCompany,
      insuranceClause,
      exchangeRate,
      paymentDate,
      remarks,
      sumInsuredUSD,
      premiumAmount,
      sumInsuredNaira,
    } = req.body;

    const result = await insurance.create({
      pfi_id: pfiId,
      pfi_num: pfiNum,
      pfi_date: pfiDate,
      pfi_value: pfiValue,
      currency: currency,
      bank: bank,
      application_date: applicationDate,
      insurance_company: insuranceCompany,
      insurance_clause: insuranceClause,
      insurance_premium_rate: insurancePremiumRate,
      insurance_certificate_num: insuranceCertNo,
      exchange_rate: exchangeRate,
      sum_insured_usd: sumInsuredUSD,
      sum_insured_naira: sumInsuredNaira,
      premium_amount_naira: premiumAmount,
      payment_date: paymentDate,
      invoice_no: invoiceNo,
      remarks: remarks,
      form_applied_date: formMDate,
      status: 1,
    });

    const lastInsertedId = result.insurance_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "insurance",
            type: "INSURANCE",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating insurance term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getInsuranceTerms = async (req, res, next) => {
  const insurance_id = req.query.insurance_id;
  try {
    if (!insurance_id) {
      const result = await insurance.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["insurance_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await insurance.findByPk(insurance_id, {
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
const updateInsuranceTerm = async (req, res, next) => {
  const insurance_id = req.query.insurance_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await insurance.findByPk(insurance_id);

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
const deleteInsuranceTerm = async (req, res, next) => {
  const insurance_id = req.query.insurance_id;
  try {
    const result = await insurance.update(
      { status: 0 },
      {
        where: {
          insurance_id: insurance_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};


const InsuranceByPfi_id = async (req, res, next) => {
  try {
    let { pfi_id } = req.query;
    const formData = await insurance.findAll({
      where: { pfi_id },
      include: [
        {
          model: db.document,
          where: {
            table_name: 'insurance'
          }
        },

      ]

    })
    res.status(200).json({
      data: formData
    })


  } catch (err) {
    next(err)
  }
}

InsuranceController = {
  createInsuranceTerm,
  getInsuranceTerms,
  updateInsuranceTerm,
  deleteInsuranceTerm,
  InsuranceByPfi_id
};

module.exports = InsuranceController;
