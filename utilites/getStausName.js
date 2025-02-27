const { generateSeries } = require("../controllers/seriesGenerate");
const db = require("../models");
const { StatusMaster } = db;
const { Op } = require("sequelize");

async function getStatusName(doc_name, status_code) {
  try {
    const status_name = await StatusMaster.findOne({
      where: {
        status: { [Op.ne]: 0 },
        status_code,
        doc_name,
      },
    });

    if (!status_name) {
      return status_code;
    }

    return status_name.status_name;
  } catch (err) {
    throw err;
  }
}

async function PaymentRequest(payment_by, bank_id, doc_type, lastInsertedId, amount, ci_id, ci_num, transaction) {
  try {
    const doc_code = "PR";
    const pr_series = await generateSeries(doc_code);
    await db.PaymentRequestMaster.create(
      {
        pr_num: pr_series,
        po_id: ci_id,
        po_number: ci_num,
        advice_amount: amount,
        reference_id: lastInsertedId,
        request_type: payment_by,
        bank_type_id: bank_id,
        doc_type: doc_type,
        status: payment_by === "Agent" ? 5 : 6,
      },
      { transaction }
    );
  } catch (err) {
    throw err;
  }
}

module.exports = { getStatusName, PaymentRequest };
