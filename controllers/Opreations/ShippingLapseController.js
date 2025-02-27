const db = require("../../models");
const { shipping_lapse, document } = db;
const { Op } = require("sequelize");

// Create a new shipping_lapse
const createShippingLapseLapse = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const { ci_id, ci_num, lapse_type, lapse_amount, lapse_narration } =
      req.body;

    const result = await shipping_lapse.create({
      ci_id,
      ci_num,
      lapse_type,
      lapse_amount,
      lapse_narration,
      status: 1,
    });

    const lastInsertedId = result.shipping_lapse_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "shipping_lapse",
            type: "Against Operations Add Shipping Lapse Doc",
            doc_name: `${file.fieldname}-${file.originalname}`,
            doc_base64: base64,
            title: "Shippment Lapse Document ",
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating shipping_lapse term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getShippingLapses = async (req, res, next) => {
  const shipping_lapse_id = req.query.shipping_lapse_id;
  try {
    if (!shipping_lapse_id) {
      const result = await shipping_lapse.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shipping_lapse_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await shipping_lapse.findByPk(shipping_lapse_id, {
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
const updateShippingLapse = async (req, res, next) => {
  const shipping_lapse_id = req.query.shipping_lapse_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await shipping_lapse.findByPk(shipping_lapse_id);

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
const deleteShippingLapse = async (req, res, next) => {
  const shipping_lapse_id = req.query.shipping_lapse_id;
  try {
    const result = await shipping_lapse.update(
      { status: 0 },
      {
        where: {
          shipping_lapse_id: shipping_lapse_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

ShippingLapseController = {
  createShippingLapseLapse,
  getShippingLapses,
  updateShippingLapse,
  deleteShippingLapse,
};

module.exports = ShippingLapseController;
