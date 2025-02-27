const db = require("../../models");
const {
  commercial_invoice,
} = db;
const { Op } = require("sequelize");
const { generateSeries } = require("../seriesGenerate");
const { PaymentRequest } = require("../../utilites/getStausName");

const getCustomClearance = async (req, res, next) => {
  let ci_id = req.query.ci_id;
  try {
    let result = await db.custom_clearance.findOne({
      where: { ci_id: ci_id, status: 1 },
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const GetShippingExpenseLapseByCiId = async (req, res, next) => {
  let ci_id = req.query.ci_id;
  try {
    let result = await db.shipping_lapse.findOne({
      where: { ci_id: ci_id, status: 1 },
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const GetShippingExpenseByCiId = async (req, res, next) => {
  let ci_id = req.query.ci_id;
  try {
    let result = await db.operations_shipping_expenses.findAll({
      where: { ci_id: ci_id, status: { [Op.ne]: 0 } },
      include: [
        { model: db.shipping_additinal_expenses },
        { model: db.shipping_expenses_container_allocation },
      ],
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const AddDOValidateDateContainer = async (req, res, next) => {
  try {
    const { containerItemArr } = req.body;
    console.log("req.body", containerItemArr);

    if (containerItemArr && containerItemArr.length > 0) {
      await Promise.all(
        containerItemArr.map(async (item) => {
          await db.add_shippment_container.update(
            { do_validity_dt: item.valid_till },
            {
              where: {
                add_shippment_container_id: item.add_shippment_container_id,
              },
            }
          );
        })
      );
    }

    return res.status(201).json({ mesage: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const createLapse = async (req, res, next) => {
  try {
    const {
      ci_id,
      ci_num,
      lapse_name,
      amount,
      narration,
      doc_type,
      user_id,
      payment_by,
      bank_id,
    } = req.body;
    console.log("req.body", req.body);
    const t = await db.sequelize.transaction();

    const result = await db.ci_lapse_master.create(
      {
        ci_id,
        ci_num,
        lapse_name,
        amount,
        narration,
        doc_type,
        payment_by,
        status: 5,
        created_by: user_id,
      },
      { transaction: t }
    );

    const lastInsertedId = result.ci_lapse_master_id;

    await PaymentRequest(
      payment_by,
      bank_id,
      doc_type,
      lastInsertedId,
      amount,
      ci_id,
      ci_num,
      t
    );

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await db.document.create(
            {
              linked_id: lastInsertedId,
              table_name: "ci_lapse_master",
              type: doc_type,
              doc_name: file.originalname,
              doc_base64: base64,
              status: 1,
            },
            { transaction: t }
          );
        })
      );
    }

    // Commit the transaction after all operations succeed
    await t.commit();

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    // If any error occurs, rollback the transaction
    await t.rollback();
    next(err);
  }
};

const createShippingExpense = async (req, res, next) => {
  const transaction = await db.sequelize.transaction(); // Start a new transaction

  try {
    const {
      ci_id,
      pfi_id,
      pfi_num,
      ci_num,
      billNo,
      shipmentLine,
      provision,
      billDate,
      amount,
      vat,
      total,
      narration,
      expenses,
      containers,
      type,
      reversal,
      created_by,
      payment_by,
      bank_id,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    if (reversal === "true") {
      await db.operations_shipping_expenses.update(
        {
          status: 1,
          updated_by: user_id,
        },
        {
          where: {
            operations_shipping_expenses_id:
              req.body.operations_shipping_expenses_id,
          },
          transaction, // Pass the transaction object
        }
      );

      await db.operations_shipping_expenses.create(
        {
          ci_id: req.body.ci_id,
          pfi_id: req.body.pfi_id,
          pfi_num: req.body.pfi_num,
          ci_num: req.body.ci_num,
          bill_no: req.body.bill_no,
          shipping_line: req.body.shipping_line,
          bill_date: req.body.bill_date,
          provision: req.body.provision,
          amount: -req.body.amount,
          vat: -req.body.vat,
          total: -req.body.total,
          narration: req.body.narration,
          type: req.body.type,
          status: 1,
          reverse: 1,
          reverse_id: req.body.operations_shipping_expenses_id,
          created_by: user_id,
        },
        { transaction } // Pass the transaction object
      );

      await transaction.commit(); // Commit the transaction
      return res.status(201).json({ message: "Submit Successfully" });
    } else {
      let result = await db.operations_shipping_expenses.create(
        {
          ci_id,
          pfi_id,
          pfi_num,
          ci_num,
          bill_no: billNo,
          shipping_line: shipmentLine,
          bill_date: billDate,
          provision: provision,
          amount,
          vat,
          total,
          payment_by,
          narration,
          type,
          status: provision === "Y" ? 2 : 5,
          created_by,
        },
        { transaction } // Pass the transaction object
      );

      let lastInsertedId = result.operations_shipping_expenses_id;

      if (provision !== "Y") {
        const doc_code = "PR";
        const pr_series = await generateSeries(doc_code);
        await db.PaymentRequestMaster.create(
          {
            pr_num: pr_series,
            po_id: ci_id,
            po_number: ci_num,
            advice_amount: total,
            reference_id: lastInsertedId,
            request_type: payment_by,
            bank_type_id: bank_id,
            doc_type: `${type} Expense`,
            status: payment_by === "Agent" ? 5 : 6,
          },
          { transaction } // Pass the transaction object
        );
      }

      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await db.document.create(
              {
                linked_id: lastInsertedId,
                table_name: "operations_shipping_expenses",
                type: "OPEARTIONS SHIPING EXPENSE",
                doc_name: file.originalname,
                doc_base64: base64,
                status: 1,
              },
              { transaction } // Pass the transaction object
            );
          })
        );
      }

      if (expenses && expenses.length > 0) {
        await Promise.all(
          expenses.map(async (item) => {
            await db.shipping_additinal_expenses.create(
              {
                operations_shipping_expenses_id: lastInsertedId,
                ci_id,
                ci_num,
                expense_head: item.expense_head,
                amount: item.amount,
                status: 1,
              },
              { transaction } // Pass the transaction object
            );
          })
        );
      }

      if (containers && containers.length > 0) {
        await Promise.all(
          containers.map(async (item) => {
            await db.shipping_expenses_container_allocation.create(
              {
                operations_shipping_expenses_id: lastInsertedId,
                add_shippment_container_id: item.add_shippment_container_id,
                ci_id,
                ci_num,
                container_no: item?.container_no || null,
                container_type: item?.size || null,
                container_deposit: item?.container_deposit || null,
                fixed_container_amount: item?.fixed_container_amount || null,
                demurrage_amount: item?.demurrage_amount || null,
                from_date: item?.from_date,
                to_date: item?.to_date,
                status: 1,
              },
              { transaction } // Pass the transaction object
            );
          })
        );
      }

      await transaction.commit(); // Commit the transaction
      return res.status(201).json({ message: "Submit Successfully" });
    }
  } catch (err) {
    await transaction.rollback(); // Rollback the transaction in case of error
    next(err);
  }
};

const createCustomClearance = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      goods_examination_booking_dt,
      goods_examination_dont_dt,
      re_examination_required,
      re_examination_booking_dt,
      re_examination_done_dt,
      customs_release_received_on,
      customs_gate_release_rev_dt,
      custom_query,
      query_raised_on_dt,
      query_resolved_on_dt,
      exchange_con_rev,
      exchange_con_rev_dt,
      updatedStr,
      custom_clearance_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    if (custom_clearance_id) {
      await db.custom_clearance.update(
        {
          goods_examination_booking_dt,
          goods_examination_dont_dt,
          re_examination_required,
          re_examination_booking_dt,
          re_examination_done_dt,
          customs_release_received_on,
          customs_gate_release_rev_dt,
          custom_query,
          query_raised_on_dt,
          query_resolved_on_dt,
          exchange_con_rev,
          exchange_con_rev_dt,
          query_types: updatedStr,
          updated_by: user_id,
        },
        {
          where: { custom_clearance_id: custom_clearance_id },
        }
      );
    } else {
      await db.custom_clearance.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        goods_examination_booking_dt,
        goods_examination_dont_dt,
        re_examination_required,
        re_examination_booking_dt,
        re_examination_done_dt,
        customs_release_received_on,
        customs_gate_release_rev_dt,
        custom_query,
        query_raised_on_dt,
        query_resolved_on_dt,
        exchange_con_rev,
        exchange_con_rev_dt,
        query_types: updatedStr,
        status: 1,
        created_by,
      });
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

const createNafdacPenalty = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      endorsement_penalty_type,
      first_endorsement,
      Second_endorsement,
      penalty_item_label,
      invoiceItemsArr,
      nafdac_penalty_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    let lastInsertedId = 0;

    if (nafdac_penalty_id) {
      await db.nafdac_penalty.update(
        {
          endorsement_penalty_type,
          first_endorsement,
          Second_endorsement,
          penalty_item_label,
          updated_by: user_id,
        },
        {
          where: { nafdac_penalty_id: nafdac_penalty_id },
        }
      );
      lastInsertedId = nafdac_penalty_id;
    } else {
      let result = await db.nafdac_penalty.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        endorsement_penalty_type,
        first_endorsement,
        Second_endorsement,
        penalty_item_label,
        status: 1,
        created_by,
      });
      let lastInsertedId = result?.nafdac_penalty_id;

      if (invoiceItemsArr && invoiceItemsArr.length > 0) {
        await Promise.all(
          invoiceItemsArr.map(async (item) => {
            await db.nafdac_penalty_item.create({
              nafdac_penalty_id: lastInsertedId,
              ...item,
              status: 1,
            });
          })
        );
      }
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Create a new Other Govt Charges and Edit
const createNafdacClearing = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      nafdac_applied_dt,
      nafdac_clearance_type,
      invoice_received_dt,
      invoice_type,
      first_endorsement_received_dt,
      second_endorsement_received_dt,
      release_type,
      full_release_date,
      partial_release_date,
      full_release_received,
      full_release_received_date,
      sample_collected_dt,
      sample_collected_qty,
      sample_return,
      sample_return_date,
      sample_return_qty,
      nafdac_clearance_id,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    if (nafdac_clearance_id) {
      await db.nafdac_clearance.update(
        {
          nafdac_applied_dt,
          nafdac_clearance_type,
          invoice_received_dt,
          invoice_type,
          first_endorsement_received_dt,
          second_endorsement_received_dt,
          release_type,
          full_release_date,
          partial_release_date,
          full_release_received,
          full_release_received_date,
          sample_collected_dt,
          sample_collected_qty,
          sample_return,
          sample_return_date,
          sample_return_qty,
          updated_by: user_id,
        },
        {
          where: { nafdac_clearance_id: nafdac_clearance_id },
        }
      );
    } else {
      await db.nafdac_clearance.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        nafdac_applied_dt,
        nafdac_clearance_type,
        invoice_received_dt,
        invoice_type,
        first_endorsement_received_dt,
        second_endorsement_received_dt,
        release_type,
        full_release_date,
        partial_release_date,
        full_release_received,
        full_release_received_date,
        sample_collected_dt,
        sample_collected_qty,
        sample_return,
        sample_return_date,
        sample_return_qty,
        status: 1,
        created_by,
      });
    }

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Create a new Other Govt Charges and Edit
const createNafdac = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      bill_num,
      bill_dt,
      Amount,
      vat,
      inv_total,
      remita_charges,
      remita_vat,
      payment_total,
      payment_dt,
      ref_no,
      payment_bank,
      payment_bank_account_num,
      penalty_amount,
      penalty_type,
      penalty_vat,
      penalty_total,
      penalty_remita_charges,
      penalty_remita_vat,
      penalty_payment_total,
      penalty_approved_by,
      penalty_approved_dt,
      remarks,
      nafdac_applied_dt,
      nafdac_clearance_type,
      invoice_received_dt,
      invoice_type,
      first_endorsement_received_dt,
      second_endorsement_received_dt,
      release_type,
      full_release_date,
      partial_release_date,
      full_release_received,
      full_release_received_date,
      sample_collected_dt,
      sample_collected_qty,
      sample_return,
      sample_return_date,
      sample_return_qty,
      endorsement_penalty_type,
      first_endorsement,
      Second_endorsement,
      penalty_item_label,
      invoiceItemsArr,
      payment_by,
      bank_id,
      doc_type,
      grand_total,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    const t = await db.sequelize.transaction();

    const result = await db.nafdac_clearance.create(
      {
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        nafdac_applied_dt,
        nafdac_clearance_type,
        invoice_received_dt,
        invoice_type,
        first_endorsement_received_dt,
        second_endorsement_received_dt,
        release_type,
        full_release_date,
        partial_release_date,
        full_release_received,
        full_release_received_date,
        sample_collected_dt,
        sample_collected_qty,
        sample_return,
        sample_return_date,
        sample_return_qty,
        payment_by,
        status: 5,
        created_by,
      },
      { transaction: t }
    );

    const lastInsertedId = result.nafdac_clearance_id;

    await PaymentRequest(
      payment_by,
      bank_id,
      doc_type,
      lastInsertedId,
      grand_total,
      ci_id,
      ci_num,
      t
    );

    await db.nafdac_inspection_expense.create(
      {
        nafdac_clearance_id: lastInsertedId,
        bill_num,
        bill_dt,
        Amount,
        vat,
        inv_total,
        remita_charges,
        remita_vat,
        payment_total,
        payment_dt,
        ref_no,
        payment_bank,
        payment_bank_account_num,
        penalty_amount,
        penalty_type,
        penalty_vat,
        penalty_total,
        penalty_remita_charges,
        penalty_remita_vat,
        penalty_payment_total,
        penalty_approved_by,
        penalty_approved_dt,
        remarks,
        status: 1,
        created_by,
      },
      { transaction: t }
    );

    await db.nafdac_penalty.create(
      {
        nafdac_clearance_id: lastInsertedId,
        endorsement_penalty_type,
        first_endorsement,
        Second_endorsement,
        penalty_item_label,
        status: 1,
        created_by,
      },
      { transaction: t }
    );

    if (invoiceItemsArr && invoiceItemsArr.length > 0) {
      await Promise.all(
        invoiceItemsArr.map(async (item) => {
          await db.nafdac_penalty_item.create(
            {
              nafdac_clearance_id: lastInsertedId,
              ...item,
              status: 1,
            },
            { transaction: t }
          );
        })
      );
    }

    // Commit the transaction after all operations succeed
    await t.commit();
    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    // If any error occurs, rollback the transaction
    await t.rollback();
    next(err);
  }
};

// Create a new Other Govt Charges and Edit
const createOtherGovtCharges = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      agency,
      payment_mode_to,
      bill_num,
      bill_dt,
      Amount,
      vat,
      inv_total,
      remita_charges,
      remita_vat,
      payment_total,
      payment_dt,
      ref_no,
      payment_bank,
      payment_bank_account_num,
      penalty_amount,
      penalty_vat,
      penalty_total,
      penalty_remita_charges,
      penalty_remita_vat,
      penalty_payment_total,
      penalty_approved_by,
      penalty_approved_dt,
      remarks,
      other_govt_charges_id,
      payment_by,
      bank_id,
      doc_type,
      grand_total,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);
    const t = await db.sequelize.transaction();

    if (other_govt_charges_id) {
      await db.other_govt_charges.update(
        {
          agency,
          payment_mode_to,
          bill_num,
          bill_dt,
          Amount,
          vat,
          inv_total,
          remita_charges,
          remita_vat,
          payment_total,
          payment_dt,
          ref_no,
          payment_bank,
          payment_bank_account_num,
          penalty_amount,
          penalty_vat,
          penalty_total,
          penalty_remita_charges,
          penalty_remita_vat,
          penalty_payment_total,
          penalty_approved_by,
          penalty_approved_dt,
          remarks,
          updated_by: user_id,
        },
        {
          where: { other_govt_charges_id: other_govt_charges_id },
        },
        { transaction: t }
      );
    } else {
      const result = await db.other_govt_charges.create(
        {
          ci_id,
          pfi_id,
          pfi_num: pfi_no,
          ci_num,
          agency,
          payment_mode_to,
          bill_num,
          bill_dt,
          Amount,
          vat,
          inv_total,
          remita_charges,
          remita_vat,
          payment_total,
          payment_dt,
          ref_no,
          payment_bank,
          payment_bank_account_num,
          penalty_amount,
          penalty_vat,
          penalty_total,
          penalty_remita_charges,
          penalty_remita_vat,
          penalty_payment_total,
          penalty_approved_by,
          payment_by,
          penalty_approved_dt,
          remarks,
          status: 5,
          created_by,
        },
        { transaction: t }
      );
      const lastInsertedId = result.other_govt_charges_id;

      await PaymentRequest(
        payment_by,
        bank_id,
        doc_type,
        lastInsertedId,
        grand_total,
        ci_id,
        ci_num,
        t
      );
    }

    // Commit the transaction after all operations succeed
    await t.commit();
    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    // If any error occurs, rollback the transaction
    await t.rollback();
    next(err);
  }
};

// Create a new penalty term
const createSoncap = async (req, res, next) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      bill_num,
      bill_dt,
      Amount,
      vat,
      inv_total,
      remita_charges,
      remita_vat,
      payment_total,
      ref_no,
      payment_bank,
      payment_bank_account_num,
      penalty_amount,
      penalty_vat,
      penalty_total,
      penalty_remita_charges,
      penalty_remita_vat,
      penalty_payment_total,
      penalty_approved_by,
      penalty_approved_dt,
      remarks,
      ConatinerArr,
      bl_num,
      soncap_master_id,
      payment_by,
      bank_id,
      doc_type,
      grand_total,
      created_by,
      user_id,
    } = req.body;
    console.log("req.body", req.body);

    const t = await db.sequelize.transaction();

    if (ConatinerArr && ConatinerArr.length > 0) {
      await Promise.all(
        ConatinerArr.map(async (item) => {
          await db.add_shippment_container.update(
            {
              bl_num: bl_num,
              soncap_amount: item.amount,
            },
            {
              where: {
                add_shippment_container_id: item.add_shippment_container_id,
              },
            },
            { transaction: t }
          );
        })
      );
    }

    if (soncap_master_id) {
      await db.soncap_master.update(
        {
          bill_num,
          bill_dt,
          Amount,
          vat,
          inv_total,
          remita_charges,
          remita_vat,
          payment_total,
          ref_no,
          payment_bank,
          payment_bank_account_num,
          penalty_amount,
          penalty_vat,
          penalty_total,
          penalty_remita_charges,
          penalty_remita_vat,
          penalty_payment_total,
          penalty_approved_by,
          penalty_approved_dt,
          remarks,
          updated_by: user_id,
        },
        {
          where: { soncap_master_id: soncap_master_id },
        },
        { transaction: t }
      );
    } else {
      const result = await db.soncap_master.create(
        {
          ci_id,
          pfi_id,
          pfi_num: pfi_no,
          ci_num,
          bill_num,
          bill_dt,
          Amount,
          vat,
          inv_total,
          remita_charges,
          remita_vat,
          payment_total,
          ref_no,
          payment_bank,
          payment_bank_account_num,
          penalty_amount,
          penalty_vat,
          penalty_total,
          penalty_remita_charges,
          penalty_remita_vat,
          penalty_payment_total,
          penalty_approved_by,
          penalty_approved_dt,
          remarks,
          payment_by,
          status: 5,
          created_by,
        },
        { transaction: t }
      );

      const lastInsertedId = result.soncap_master_id;

      await PaymentRequest(
        payment_by,
        bank_id,
        doc_type,
        lastInsertedId,
        grand_total,
        ci_id,
        ci_num,
        t
      );
    }

    // Commit the transaction after all operations succeed
    await t.commit();
    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    // If any error occurs, rollback the transaction
    await t.rollback();
    next(err);
  }
};

// Create a new penalty term
const createCommercialInvoiceTerm = async (req, res, next) => {
  try {
    const ci_series = await generateSeries("INVOICE");

    const {
      pfiId,
      pfiNum,
      ciSender,
      ciSenderDate,
      customer,
      invoiceNo,
      invoiceDate,
      oprNo,
      shipmentType,
      mode,
      exchangeDate,
      totalPackage,
      portOfDC,
      deliveryTerms,
      portOfLoading,
      countryOfOrigin,
      countryOfSupply,
      paymentTerms,
      finalDestination,
      countryOfFinalDestination,
      blNo,
      blDate,
      vesselName,
      vesselNo,
      shippingLineName,
      etaDate,
      freeDays,
      totalNetWeight,
      totalGrossWeight,
      uom,
      sealNo,
      cbm,
      invoiceRemark,
      inlandCharges,
      freightCharges,
      inspectionCharges,
      fullandFinal,
    } = req.body;

    const result = await commercial_invoice.create({
      pfi_id: pfiId,
      pfi_num: pfiNum,
      ci_num: ci_series,
      ci_sender: ciSender,
      ci_sender_date: ciSenderDate,
      customer: customer,
      invoice_num: invoiceNo,
      invoice_date: invoiceDate,
      opr_num: oprNo,
      shipment_type: shipmentType,
      mode: mode,
      full_final: fullandFinal,
      currency: exchangeDate, // Assuming `exchangeDate` should map to `currency`, adjust if needed
      total_package: totalPackage,
      port_dc: portOfDC,
      delivery_terms: deliveryTerms,
      port_of_loading: portOfLoading,
      country_origin: countryOfOrigin,
      country_supply: countryOfSupply,
      payment_terms: paymentTerms,
      final_destination: finalDestination,
      country_final_destination: countryOfFinalDestination,
      bl_num: blNo,
      bl_date: blDate,
      vessel_name: vesselName,
      vessel_no: vesselNo,
      shipping_line_name: shippingLineName,
      eta_date: etaDate,
      free_days: freeDays,
      total_net_weight: totalNetWeight,
      total_gross_weight: totalGrossWeight,
      uom: uom,
      seal_num: sealNo,
      cbm: cbm,
      invoice_remarks: invoiceRemark,
      inland_charges: inlandCharges,
      freight_charges: freightCharges,
      inspection_charges: inspectionCharges,
      status: 1,
    });
    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Get Commercial Invoice
const getCommercialInvoiceTerms = async (req, res, next) => {
  const { commercial_invoice_id } = req.query;
  console.log("commercial_invoice_id", commercial_invoice_id);
  try {
    if (!commercial_invoice_id) {
      const result = await commercial_invoice.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        include: [
          { model: db.form_m, as: 'FormM', attributes: ['form_m_num', 'form_m_date', "form_m_expiry_date", "ba_num"] },
          { model: db.CompanyMaster, attributes: ['company_name'] },
          { model: db.BuyingHouse, attributes: ['buying_house_name'] },
        ],
        order: [["commercial_invoice_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await commercial_invoice.findByPk(commercial_invoice_id, {
        include: [
          { model: db.form_m, as: 'FormM', attributes: ['form_m_num', 'form_m_date', "form_m_expiry_date", "ba_num"] },
          { model: db.letter_of_credit, as: 'LC', attributes: ['lc_number', "lc_expiry_date", "lc_type"] },
        ],
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
const updateCommercialInvoiceTerm = async (req, res, next) => {
  const commercial_invoice_id = req.query.commercial_invoice_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await commercial_invoice.findByPk(
      commercial_invoice_id
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
const deleteCommercialInvoiceTerm = async (req, res, next) => {
  const commercial_invoice_id = req.query.commercial_invoice_id;
  try {
    const result = await commercial_invoice.update(
      { status: 0 },
      {
        where: {
          commercial_invoice_id: commercial_invoice_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const addRotaionNo = async (req, res, next) => {
  const { roation_no, commercial_invoice_id } = req.body;
  try {
    const result = await commercial_invoice.update(
      { status: 0 },
      {
        where: {
          commercial_invoice_id: commercial_invoice_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

CommercialInvoiceController = {
  createCommercialInvoiceTerm,
  getCommercialInvoiceTerms,
  updateCommercialInvoiceTerm,
  deleteCommercialInvoiceTerm,
  createSoncap,
  createOtherGovtCharges,
  createNafdac,
  createNafdacClearing,
  createNafdacPenalty,
  createCustomClearance,
  getCustomClearance,
  createShippingExpense,
  createLapse,
  GetShippingExpenseByCiId,
  AddDOValidateDateContainer,
  GetShippingExpenseLapseByCiId,
};

module.exports = CommercialInvoiceController;
