const db = require("../../models");
const { nafdac_pfi, document } = db;
const { Op } = require("sequelize");

// Create a new nafdac_pfi
const createNafdacPfiTerm = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      pfiDate,
      payment_types,
      son_permit_app_date,
      invoice_rec_date,
      pay,
      permit_no,
      pfi_id,
      pfi_num,
    } = req.body;
    const result = await nafdac_pfi.create({
      pfi_id: pfi_id,
      pfi_num: pfi_num,
      pfi_date: pfiDate,
      permit_type: payment_types,
      nafdac_date: son_permit_app_date,
      invoice_received_date: invoice_rec_date,
      pay_not: pay,
      permit_num: permit_no,
      status: 1,
    });

    const lastInsertedId = result.nafdac_pfi_id;
    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "nafdac_pfi",
            type: "PFI Add NAFDAC",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating nafdac_pfi term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getNafdacPfiTerms = async (req, res, next) => {
  const nafdac_pfi_id = req.query.nafdac_pfi_id;
  try {
    if (!nafdac_pfi_id) {
      const result = await nafdac_pfi.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["nafdac_pfi_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await nafdac_pfi.findByPk(nafdac_pfi_id, {
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
const updateNafdacPfiTerm = async (req, res, next) => {
  console.log(req.body);

  try {
    // Update the shipment mode
    const { pfi_id, soncap_num, soncap_apply_date } = req.body;

    await nafdac_pfi.update(
      {
        nafdac_date: soncap_apply_date,
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
const deleteNafdacPfiTerm = async (req, res, next) => {
  const nafdac_pfi_id = req.query.nafdac_pfi_id;
  try {
    const result = await nafdac_pfi.update(
      { status: 0 },
      {
        where: {
          nafdac_pfi_id: nafdac_pfi_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const NafdacByPfiId = async (req, res, next) => {
  try {
    let { pfi_id } = req.query;
    const data = await nafdac_pfi.findAll({
      where: { pfi_id },
      include: [
        {
          model: db.document,
          where: {
            table_name: "nafdac_pfi",
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

NafdacPfiController = {
  createNafdacPfiTerm,
  getNafdacPfiTerms,
  updateNafdacPfiTerm,
  deleteNafdacPfiTerm,
  NafdacByPfiId,
};

module.exports = NafdacPfiController;
