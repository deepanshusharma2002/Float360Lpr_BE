const { forex_form } = require("../models");
const { Sq, where } = require("sequelize");

console.log("forexAmount Model:", forex_form);

exports.createForexAmount = async (req, res) => {
  try {
    const {
      forex_id,
      pfi_id,
      pfi_num,
      type_of_purchase,
      purchased_amount,
      pfi_currency,
      form_m_bank_name,
      forex_purchase_from_bank,
      forexPurchaseDate,
      forexMaturityDate,
      bank_charges_amount,
      premium_rate,
      forex_rate,
      bank_ref_no,
      premium_amount,
      premium_paid_through,
      premium_paid_from,
      forex_purchase_account_no,
      bank_charges_ac_no,
      status,
    } = req.body;
    console.log(req.body);
    const newForexAmount = await forex_form.create({
      forex_id,
      pfi_id,
      pfi_num,
      type_of_purchase,
      purchased_amount,
      pfi_currency,
      form_m_bank_name,
      forex_purchase_from_bank,
      forexPurchaseDate,
      forexMaturityDate,
      bank_charges_amount,
      premium_rate,
      forex_rate,
      bank_ref_no,
      premium_amount,
      premium_paid_through,
      premium_paid_from,
      forex_purchase_account_no,
      bank_charges_ac_no,
      status,
    });
    console.log("Saved Forex Record:", newForexAmount);
    res.status(201).json({
      message: "Forex Created Successfully",
      data: newForexAmount,
    });
  } catch (error) {
    console.error("Error in forexAmount.create():", error);
    res.status(500).json({ error: error.message });
  }
};

// exports.getForexAmount = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const forexAmount = await forex_form.findAll();
//     res.status(200).json(forexAmount);
//   } catch (error) {
//     console.error("Error in forexAmount.findAll():", error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getForexAmount = async (req, res) => {
  const { pfi_id } = req.query;

  try {
    let forexAmount;

    if (pfi_id) {
      forexAmount = await forex_form.findAll({ where: { pfi_id } });
      if (!forexAmount) {
        return res.status(404).json({ error: "Forex amount not found" });
      }
    } else {
      forexAmount = await forex_form.findAll();
    }

    res.status(200).json(forexAmount);
  } catch (error) {
    console.error("No Forex Found", error);
    res.status(500).json({ error: error.message });
  }
};
