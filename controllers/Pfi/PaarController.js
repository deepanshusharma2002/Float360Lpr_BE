const db = require("../../models");
const { paar, document } = db;
const { Op } = require("sequelize");
const pdf = require("pdf-parse");

const ValidatePaarDoc = async (req, res, next) => {
  // console.log("file: ", req.files);
  try {
    const data = await pdf(req.files[0].buffer);
    const base64 = req.files[0].buffer.toString("base64");
    console.log(data.text)
    const lines = data?.text?.split("\n");

    const paar_num = lines[17]?.trim();
    const paar_issue_date = lines[16]?.trim();
    // const ba_number = `${lines[14]?.trim()}${lines[5]?.trim()}${lines[16]?.trim()}`;

    if (!paar_num.startsWith("IN")) {
      return res.status(205).json({ message: "Please upload a valid PAAR document" });
    }
    return res
      .status(200)
      .json({
        paar_num,
        paar_issue_date,
        // ba_number,
        base64

      });
  } catch (err) {
    console.error("Error creating form_m term:", err);
    next(err);
  }
};


const createPaarRequest = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.body.ItemArr);
    console.log("file: ", req.files);

    const {
      pfi_id,
      pfi_num,
      ci_id,
      ci_num,
      paar_id,
      paar_revised,
      paar_amendment_date,
    } = req.body;

    const result = await db.paar_amendment_request.create({
      pfi_id,
      pfi_num,
      ci_id,
      ci_num,
      paar_id,
      paar_revised,
      paar_amendment_date,
      status: 1,
    });

    const lastInsertedId = result.paar_amendment_request_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "paar_amendment_request",
            type: "PAAR AMENDEMENT REQUEST",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating paar term:", err);
    next(err);
  }
};

// Create a new paar
const createPaarTerm = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.body.ItemArr);
    console.log("file: ", req.files);

    const {
      pfi_id,
      pfi_num,
      ci_id,
      ci_num,
      paar_no,
      paar_date,
      received_on,
      exchange_rate,
      fob_invoice_amount,
      fob_uplift,
      freight_uplift,
      insurance_uplift,
      cif_value_naira,
      remarks,
      update_hsn_code,
      cfr_invoice_amount,
      ItemsData,
      revise,
    } = req.body;

    if (revise) {
      await paar.update({ status: 2 }, { where: { ci_id: ci_id } });
      const result = await paar.create({
        pfi_id,
        pfi_num,
        ci_id,
        ci_num,
        paar_num: paar_no, // Ensure this field matches the model
        paar_date,
        received_on,
        exchange_rate, // Ensure this field matches the model
        fob_invoice_amount,
        fob_uplift,
        freight_uplift,
        insurance_uplift,
        cif_value_naira,
        remarks,
        update_hsn_code,
        cfr_invoice_amount,
        status: 1,
      });

      const lastInsertedId = result.paar_id;

      if (Array.isArray(ItemsData) && ItemsData?.length > 0) {
        await Promise.all(
          ItemsData?.map(async (item) => {
            await db.shipment_advise_items.update(
              {
                paar_id: lastInsertedId,
                hsn_code: item.hsn_code,
              },
              {
                where: {
                  shipment_advise_item_id: item.shipment_advise_item_id,
                },
              }
            );
          })
        );
      }

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await document.create({
              linked_id: lastInsertedId,
              table_name: "paar",
              type: "PAAR",
              doc_name: file.originalname,
              doc_base64: base64,
              status: 1,
            });
          })
        );
      }
    } else {
      const result = await paar.create({
        pfi_id,
        pfi_num,
        ci_id,
        ci_num,
        paar_num: paar_no, // Ensure this field matches the model
        paar_date,
        received_on,
        exchange_rate, // Ensure this field matches the model
        fob_invoice_amount,
        fob_uplift,
        freight_uplift,
        insurance_uplift,
        cif_value_naira,
        remarks,
        update_hsn_code,
        cfr_invoice_amount,
        status: 1,
      });

      const lastInsertedId = result.paar_id;

      if (Array.isArray(ItemsData) && ItemsData?.length > 0) {
        await Promise.all(
          ItemsData?.map(async (item) => {
            await db.shipment_advise_items.update(
              {
                paar_id: lastInsertedId,
                hsn_code: item.hsn_code,
              },
              {
                where: {
                  shipment_advise_item_id: item.shipment_advise_item_id,
                },
              }
            );
          })
        );
      }

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await document.create({
              linked_id: lastInsertedId,
              table_name: "paar",
              type: "PAAR",
              doc_name: file.originalname,
              doc_base64: base64,
              status: 1,
            });
          })
        );
      }
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating paar term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getPaarTerms = async (req, res, next) => {
  const paar_id = req.query.paar_id;
  try {
    if (!paar_id) {
      const result = await paar.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["paar_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await paar.findByPk(paar_id, {
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
const updatePaarTerm = async (req, res, next) => {
  const paar_id = req.query.paar_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await paar.findByPk(paar_id);

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
const deletePaarTerm = async (req, res, next) => {
  const paar_id = req.query.paar_id;
  try {
    const result = await paar.update(
      { status: 0 },
      {
        where: {
          paar_id: paar_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

PaarController = {
  createPaarTerm,
  createPaarRequest,
  ValidatePaarDoc,
  getPaarTerms,
  updatePaarTerm,
  deletePaarTerm,
};

module.exports = PaarController;
