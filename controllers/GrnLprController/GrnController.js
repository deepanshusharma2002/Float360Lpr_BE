// const db = require('../../models');
// const {sequelize} = db;
// const { grn_master, grn_item, grn_additional_charge, grn_file } = db;
// const { Op, where } = require("sequelize");

// exports.createGRN = async (req, res) => {
//   const {
//     vendor_invoice_no,
//     invoice_date,
//     bill_no,
//     bill_date,
//     head_of_charges,
//     charges_at_warehouse_amount,
//     no_of_trucks,
//     transportation_rate,
//     transportation_amt,
//     vat,
//     total_amt_incl_vat,
//     preclaimed_amount,
//     invoice_amount,
//     round_off,
//     total_amount,
//     short_close_lpo,
//     items,
//     additional_charges,
//     files,
//   } = req.body;

//   try {

//     const grn = await db.grn_master.create({
//       vendor_invoice_no,
//       invoice_date,
//       bill_no,
//       bill_date,
//       head_of_charges,
//       charges_at_warehouse_amount,
//       no_of_trucks,
//       transportation_rate,
//       transportation_amt,
//       vat,
//       total_amt_incl_vat,
//       preclaimed_amount,
//       invoice_amount,
//       round_off,
//       total_amount,
//       short_close_lpo,
//     //   created_by: req.user.id,
//     });

//     // Create GRN Items
//     if (items && items.length > 0) {
//       await db.grn_item.bulkCreate(
//         items.map((item) => ({
//           ...item,
//           grn_id: grn.grn_id,
//         }))
//       );
//     }

//     // Create Additional Charges
//     if (additional_charges && additional_charges.length > 0) {
//       await db.grn_additional_charge.bulkCreate(
//         additional_charges.map((charge) => ({
//           ...charge,
//           grn_id: grn.grn_id,
//         }))
//       );
//     }

//     // Create Files
//     if (files && files.length > 0) {
//       await db.grn_file.bulkCreate(
//         files.map((file) => ({
//           ...file,
//           grn_id: grn.grn_id,
//         }))
//       );
//     }

//     res.status(201).json({ message: "GRN created successfully", grn });
//   } catch (error) {
//     console.error("Error creating GRN:", error);
//     res.status(500).json({ message: "Failed to create GRN", error: error.message });
//   }
// };

const db = require("../../models");
const { sequelize } = db;
const { grn_master, grn_item, grn_additional_charge, grn_file } = db;
const { Op, where } = require("sequelize");

exports.createGRN = async (req, res) => {
  const {
    additionalCharges,
    bill_date,
    bill_no,
    chargesSummary,
    vendor_invoice_no,
    invoice_date,
    grnAmountBreakup,
    itemList,
    transportationCharges,
    files,
    short_close_lpo,
  } = req.body;

  console.log("abc", req.body);
  console.log("abc", req.files);

  // Validate required fields
  if (!vendor_invoice_no || !invoice_date || !bill_no || !bill_date) {
    return res.status(400).json({
      message:
        "Missing required fields: vendor_invoice_no, invoice_date, bill_no, bill_date",
    });
  }

  const transaction = await db.sequelize.transaction(); // Initialize transaction

  try {
    // Create GRN
    const grn = await db.grn_master.create(
      {
        vendor_invoice_no,
        invoice_date,
        bill_no,
        bill_date,
        short_close_lpo,
        head_of_charges: chargesSummary.headOfCharges || null,
        charges_at_warehouse_amount:
          chargesSummary.chargesAtWarehouseAmount || null,
        no_of_trucks: transportationCharges.no_of_truck || null,
        transportation_rate: transportationCharges.transportation_rate || null,
        transportation_amt: transportationCharges.transportation_amt || null,
        vat: transportationCharges.vat || null,
        total_amt_incl_vat: transportationCharges.total_amt_incl_vat || null,
        preclaimed_amount: transportationCharges.preclaimed_amount || null,
        invoice_amount: transportationCharges.invoice_amount || null,
        round_off: transportationCharges.round_off || null,
        total_amount: grnAmountBreakup.totalAmount || null,
      },
      { transaction } // Pass transaction to the create method
    );

    // Create GRN Items
    if (itemList && itemList.length > 0) {
      await db.grn_item.bulkCreate(
        itemList.map((item) => ({
          item_code: item?.item_code || null,
          item_name: item?.item_name || null,
          uom: item?.uom || null,
          pack: item?.pack || null,
          po_qty: item?.poQty || null,
          previous_received: item?.previous_recived || null,
          po_rate: item?.poRate || null,
          inv_qty: item?.invQty || null,
          packs_in_inv: item?.packsInInv || null,
          rec_qty: item?.recQty || null,
          rec_pack: item?.recPack || null,
          qty_short_rec: item?.qtyShortRec || null,
          pack_short_rec: item?.packShortRec || null,
          damage_qty: item?.damageQty || null,
          damage_pack_rec: item?.damagePackRec || null,
          grn_amount: item?.grnAmount || null,
          vat: item?.vat || null,
          balance_qty: item?.balanceQTY || null,
          full_received: item?.fullRecieved || null,
          grn_id: grn.grn_id,
        })),
        { transaction } // Pass transaction to bulkCreate
      );
    }

    // Create Additional Charges
    if (additionalCharges && additionalCharges.length > 0) {
      await db.grn_additional_charge.bulkCreate(
        additionalCharges.map((charge) => ({
          head_of_expense: charge?.headOfExpense,
          amount: charge?.amount,
          vat: charge?.vat,
          amt_incl_vat: charge?.amtInclVat,
          round_off: charge?.roundOff,
          grn_id: grn.grn_id,
        })),
        { transaction } // Pass transaction to bulkCreate
      );
    }

    // Create Files
    if (files && files.length > 0) {
      await db.grn_file.bulkCreate(
        files.map((file) => ({
          ...file,
          grn_id: grn.grn_id,
        })),
        { transaction } // Pass transaction to bulkCreate
      );
    }

    // Commit the transaction
    await transaction.commit();
    res.status(201).json({ message: "GRN created successfully", grn });
  } catch (error) {
    // Rollback the transaction in case of error
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error creating GRN:", error);
    res
      .status(500)
      .json({ message: "Failed to create GRN", error: error.message });
  }
};
