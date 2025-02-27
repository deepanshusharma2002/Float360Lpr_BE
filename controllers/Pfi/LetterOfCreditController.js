const db = require("../../models");
const { letter_of_credit, document } = db;
const { Op } = require("sequelize");

// Create a new letter_of_credit
const createLetterOfCreditTerm = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      pfiId: pfi_id,
      pfiNum: pfi_num,
      lc_date,
      lc_type,
      lc_amount,
      latest_shipment_date,
      lc_expiry_date,
      lc_toleranceL,
      tolerance_value,
      payment_term,
      tenor_days,
      off_shore_charges_borne_by,
      confirmation_charges,
      confirm_bank_name,
      confirm_bank_swift_code,
      lc_advising_bank_name,
      lc_advising_bank_code,
      lc_number,
      lc_issue_date,
      lc_id: letter_of_credit_id,
      lc_status,
    } = req.body;

   if(letter_of_credit_id){
    const result = await letter_of_credit.update({
      lc_type,
      lc_amount,
      latest_shipment_date,
      lc_expiry_date,
      lc_toleranceL,
      tolerance_value,
      payment_term,
      tenor_days,
      off_shore_charges_borne_by,
      confirmation_charges,
      confirm_bank_name,
      confirm_bank_swift_code,
      lc_advising_bank_name,
      lc_advising_bank_code,
      lc_number,
      lc_issue_date,
      lc_status,
    },{
      where: { letter_of_credit_id: letter_of_credit_id }
    });

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: letter_of_credit_id,
            table_name: "letter_of_credit",
            type: "LC",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }
   }else{
    const result = await letter_of_credit.create({
      pfi_id,
      pfi_num,
      application_date: lc_date,
      status: 1
    });
   }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating letter_of_credit term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getLetterOfCreditTerms = async (req, res, next) => {
  const letter_of_credit_id = req.query.letter_of_credit_id;
  try {
    if (!letter_of_credit_id) {
      const result = await letter_of_credit.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["letter_of_credit_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await letter_of_credit.findByPk(letter_of_credit_id, {
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
const updateLetterOfCreditTerm = async (req, res, next) => {
  const letter_of_credit_id = req.query.letter_of_credit_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await letter_of_credit.findByPk(letter_of_credit_id);

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
const deleteLetterOfCreditTerm = async (req, res, next) => {
  const letter_of_credit_id = req.query.letter_of_credit_id;
  try {
    const result = await letter_of_credit.update(
      { status: 0 },
      {
        where: {
          letter_of_credit_id: letter_of_credit_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};



const lcByPfiId = async (req, res, next) => {
  try {
    let { pfi_id } = req.query;
    const data = await letter_of_credit.findAll({
      where: { pfi_id },
      include: [
        {
          model: db.document,
          where: {
            table_name: 'letter_of_credit'
          }
        },

      ]

    })
    res.status(200).json({
      data: data
    })
  } catch (err) {
    next(err)
  }
}

LetterOfCreditController = {
  createLetterOfCreditTerm,
  getLetterOfCreditTerms,
  updateLetterOfCreditTerm,
  deleteLetterOfCreditTerm,
  lcByPfiId
};

module.exports = LetterOfCreditController;
