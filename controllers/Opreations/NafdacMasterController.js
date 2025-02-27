const db = require("../../models");
const { operations_nafdac_master, operations_nafdac_lapse, document } = db;
const { Op, where } = require("sequelize");



// Create a new operations_nafdac_master
const addappliedDate = async (req, res, next) => {
  try {
    const {
      pfi_id,
      nafdac_applied_date
    } = req.body;

    const result = await operations_nafdac_master.create({
      pfi_id,
      nafdac_applied_date
    });

    return res.status(201).json({ message: "applied date inserted successfully" });

  } catch (err) {
    console.error("Error creating operations_nafdac_master term:", err);
    next(err);
  }
};


const createOperationsNafdacMaster = async (req, res, next) => {
  
  try {

    console.log("add nafdac document in operation nafdac")
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      pfi_id,
      operations_nafdac_id,
      payment_type,
      penalty_type,
      bill_date,
      amount,
      remit_charges,
      vat,
      penalty_payment_date,
      penalty_approved_date,
      penalty_approved,
      narration,
    } = req.body;

    
    const result = await operations_nafdac_master.update({
      operations_nafdac_id,
      payment_type,
      penalty_type,
      bill_date,
      amount,
      remit_charges,
      vat,
      total: amount + remit_charges + vat,
      penalty_payment_date,
      penalty_approved_date,
      penalty_approved_by: penalty_approved,
      narration,
      status: 1,
      
    },{
  where:{pfi_id}
});


console.log("Result after data update");
console.log(result);

    const lastInsertedId = result.operations_nafdac_master_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "operations_nafdac_master",
            type: "OPERATIONS NAFDAC",
            doc_name: `${file.fieldname}-${file.originalname}`,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating operations_nafdac_master term:", err);
    next(err);
  }
};



// Create a new operations_nafdac_master
const createOperationsNafdacLapse = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      operations_nafdac_master_id,
      operations_nafdac_id,
      lapse_type,
      lapse_amount,
      lapse_narration,
    } = req.body;

    const result = await operations_nafdac_lapse.create({
      operations_nafdac_id,
      operations_nafdac_master_id: operations_nafdac_master_id,
      lapse_type,
      lapse_amount,
      lapse_narration,
      status: 1,
    });

    const lastInsertedId = result.operations_nafdac_lapse_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "operations_nafdac_lapse",
            type: "OPERATIONS NAFDAC LAPSE",
            doc_name: `${file.fieldname}-${file.originalname}`,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating operations_nafdac_master term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getOperationsNafdacMasters = async (req, res, next) => {
  const operations_nafdac_master_id = req.query.operations_nafdac_master_id;
  try {
    if (!operations_nafdac_master_id) {
      const result = await operations_nafdac_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["operations_nafdac_master_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await operations_nafdac_master.findByPk(
        operations_nafdac_master_id,
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
const updateOperationsNafdacMaster = async (req, res, next) => {
  const operations_nafdac_master_id = req.query.operations_nafdac_master_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await operations_nafdac_master.findByPk(
      operations_nafdac_master_id
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
const deleteOperationsNafdacMaster = async (req, res, next) => {
  const operations_nafdac_master_id = req.query.operations_nafdac_master_id;
  try {
    const result = await operations_nafdac_master.update(
      { status: 0 },
      {
        where: {
          operations_nafdac_master_id: operations_nafdac_master_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

OperationsNafdacMasterController = {
  addappliedDate,
  createOperationsNafdacMaster,
  getOperationsNafdacMasters,
  updateOperationsNafdacMaster,
  deleteOperationsNafdacMaster,
  createOperationsNafdacLapse,
};

module.exports = OperationsNafdacMasterController;
