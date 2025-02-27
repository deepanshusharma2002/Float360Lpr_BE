const db = require("../../models");
const { shippment_instructions, document } = db;
const { Op } = require("sequelize");

// Create a new shippment_instructions
const createShippingInstructionsTerm = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      po_id,
      po_number,
      shipper,
      goods_description,
      port_of_discharge,
      final_destination,
      marks_nos,
      no_of_og_bl_req,
      no_of_non_negotiable_bl_copy_req,
      additional_information1,
      additional_information2,
      label_check, 
      bill_of_loading_check,

      
      notify_party_1,
      notify_party_1_address,
      notify_party_2,
      notify_party_2_address,
      consignee_address,
      consignee_name,
    } = req.body;

    const result = await shippment_instructions.create({
      po_id,
      po_num: po_number,
      shipper,
      goods_description,
      port_of_discharge,
      final_destination,
      marks_nos,
      no_of_og_bl_req,
      notify_party: notify_party_1,
      no_of_non_negotiable_bl_copy_req,
      additional_information1,
      additional_information2,
      label_check, 
      bill_of_loading_check,
      notify_party_1_address,
      notify_party_2,
      notify_party_2_address,
      consignee_address,
      consignee_name,
      status: 1,
    });

    const lastInsertedId = result.shippment_instructions_id;

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "shippment_instructions",
            type: "SHIPING INSTRUCTIONS",
            doc_name: file.originalname,
            doc_base64: base64,
            status: 1,
          });
        })
      );
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating shippment_instructions term:", err);
    next(err);
  }
};

// Get Commercial Invoice
const getShippingInstructionsTerms = async (req, res, next) => {
  const shippment_instructions_id = req.query.shippment_instructions_id;
  try {
    if (!shippment_instructions_id) {
      const result = await shippment_instructions.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shippment_instructions_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await shippment_instructions.findByPk(
        shippment_instructions_id,
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
const updateShippingInstructionsTerm = async (req, res, next) => {
  const shippment_instructions_id = req.query.shippment_instructions_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await shippment_instructions.findByPk(
      shippment_instructions_id
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
const deleteShippingInstructionsTerm = async (req, res, next) => {
  const shippment_instructions_id = req.query.shippment_instructions_id;
  try {
    const result = await shippment_instructions.update(
      { status: 0 },
      {
        where: {
          shippment_instructions_id: shippment_instructions_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

ShippingInstructionsController = {
  createShippingInstructionsTerm,
  getShippingInstructionsTerms,
  updateShippingInstructionsTerm,
  deleteShippingInstructionsTerm,
};

module.exports = ShippingInstructionsController;
