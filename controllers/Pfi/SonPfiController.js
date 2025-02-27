const db = require("../../models");
const { son_pfi, document } = db;
const { Op } = require("sequelize");

// Create a new son_pfi
const createSonPfiTerm = async (req, res, next) => {
  try {
    const {
      pfiId: pfi_id,
      pfiNum: pfi_num,
      pfiDate: pfi_date,
      payment_types,
      son_permit_app_date,
      invoice_rec_date,
      pay,
      permit_no,
      type,
      ci_id,
      ci_num
    } = req.body;
    console.log("req.body", req.body)
    const result = await son_pfi.create({
      pfi_id: pfi_id,
      pfi_num: pfi_num,
      pfi_date,
      permit_type: payment_types,
      son_date: son_permit_app_date,
      invoice_received_date: invoice_rec_date,
      pay_not: pay,
      permit_num: permit_no,
      type: type ? type : "FORM M",
      ci_id,
      ci_num,
      status: 1,
    });

    const lastInsertedId = result.son_pfi_id;
    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "son_pfi",
            type: "SON FOR PFI",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating son_pfi term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getSonPfiTerms = async (req, res, next) => {
  const son_pfi_id = req.query.son_pfi_id;
  const pfi_id = req.query.pfi_id;
  try {
    if (son_pfi_id) {
      const result = await son_pfi.findByPk(son_pfi_id, {
        where: {
          status: { [Op.ne]: 0 },
        },
      });
      return res.status(200).json(result);
    }else if(pfi_id){
      const result = await son_pfi.findAll({
        where: {
          status: { [Op.ne]: 0 },
          pfi_id
        },
      });
      return res.status(200).json(result);
    } else {
      const result = await son_pfi.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["son_pfi_id", "DESC"]],
      });
      return res.status(200).json(result);
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateSonPfiTerm = async (req, res, next) => {
  console.log(req.body);

  try {
    // Update the shipment mode
    const { pfi_id, soncap_num, soncap_apply_date } = req.body;

    await son_pfi.update(
      {
        son_date: soncap_apply_date,
        permit_num: soncap_num,
      },
      {
        where: {
          pfi_id,
        },
      }
    );

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const deleteSonPfiTerm = async (req, res, next) => {
  const son_pfi_id = req.query.son_pfi_id;
  try {
    const result = await son_pfi.update(
      { status: 0 },
      {
        where: {
          son_pfi_id: son_pfi_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const sonByPfiId = async (req, res, next) => {
  try {
    let { pfi_id } = req.query;
    const data = await son_pfi.findAll({
      where: { pfi_id },
      include: [
        {
          model: db.document,
          where: {
            table_name: "son_pfi",
          },
        },
      ],
    });
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

SonPfiController = {
  createSonPfiTerm,
  getSonPfiTerms,
  updateSonPfiTerm,
  deleteSonPfiTerm,
  sonByPfiId,
};

module.exports = SonPfiController;
