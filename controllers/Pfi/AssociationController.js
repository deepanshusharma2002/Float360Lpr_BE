const {
  commercial_invoice,
  Pfi_master,
  form_m,
  insurance,
  letter_of_credit,
  son_pfi,
} = require("../../models/Pfi/Association");
const { Op } = require("sequelize");
const { sequelize } = require("../../models/index");

const GetAllCiDataWithPfi = async (req, res, next) => {
  try {
    const results = await commercial_invoice.findAll({
      attributes: [
        "commercial_invoice_id",
        "ci_sender",
        "ci_sender_date",
        "customer",
        "invoice_num",
        "invoice_date",
        "opr_num",
        "shipment_type",
        "mode",
        "full_final",
        "currency",
        "total_package",
        "country_supply",
        "country_origin",
        "port_of_loading",
        "port_dc",
        "final_destination",
        "country_final_destination",
        "delivery_terms",
        "payment_terms",
        "bl_num",
        "bl_date",
        "vessel_name",
        "vessel_no",
        "shipping_line_name",
        "eta_date",
        "free_days",
        "total_net_weight",
        "total_gross_weight",
        "uom",
        "seal_num",
        "cbm",
        "invoice_remarks",
        "inland_charges",
        "freight_charges",
        "inspection_charges",
        "pfi_id",
        "pfi_num",
        "ci_num",
      ],
      where: {
        status: { [Op.ne]: 0 },
      },
      include: [
        {
          model: Pfi_master,
          attributes: [
            "pfi_sender_id",
            "pfi_sent_date",
            "opr_no",
            "company_id",
            "controlling_office",
            "pfi_date",
            "exchange_date",
            "shipment_mode",
            "delivery_time",
            "country_of_origin",
            "country_of_supply",
            "container_count_type",
            "port_of_discharge",
            "pfi_description",
            "freight_remark",
            "inhand_charges",
            "thc_charges",
            "container_stuffing",
            "container_seal",
            "bl",
            "vgm",
            "miscellaneous_fob",
            "advising_commission",
            "llc_commission",
            "courier",
            "miscellaneous_doc",
            "document_name",
          ],
          required: false, // Allow inclusion even if no data exists
          where: {
            status: { [Op.ne]: 0 },
          },
        },
        {
          model: form_m,
          attributes: [
            "form_m_id",
            "insurance_id",
            "insurance_num",
            "form_m_num",
            "form_m_date",
            "pfi_description",
            "form_m_expiry_date",
            "ba_num",
            "form_m_recd_date",
          ],
          required: false, // Allow inclusion even if no data exists
          where: {
            status: { [Op.ne]: 0 },
          },
        },
        {
          model: insurance,
          attributes: [
            "insurance_id",
            "pfi_value",
            "currency",
            "bank",
            "application_date",
            "insurance_company",
            "insurance_clause",
            "insurance_premium_rate",
            "insurance_certificate_num",
            "exchange_rate",
            "sum_insured_usd",
            "sum_insured_naira",
            "premium_amount_naira",
            "payment_date",
            "invoice_no",
            "remarks",
            "form_applied_date",
          ],
          required: false, // Allow inclusion even if no data exists
          where: {
            status: { [Op.ne]: 0 },
          },
        },
        {
          model: letter_of_credit,
          attributes: [
            "letter_of_credit_id",
            "lc_status",
            "lc_num",
            "lc_date",
            "application_date",
            "lc_type",
            "lc_issue_amount",
            "lc_expiry_date",
            "latest_shipment_date",
            "advising_bank",
            "lc_tolerance",
            "lc_tolerance_value",
            "payment_terms",
            "tenor_days",
            "offshore_charges_borne",
            "confirmation_charges_borne",
          ],
          required: false, // Allow inclusion even if no data exists
          where: {
            status: { [Op.ne]: 0 },
          },
        },
        {
          model: son_pfi,
          attributes: [
            "son_pfi_id",
            "permit_type",
            "son_date",
            "invoice_received_date",
            "pay_not",
            "permit_num",
          ],
          required: false, // Allow inclusion even if no data exists
          where: {
            status: { [Op.ne]: 0 },
          },
        },
      ],
      raw: true, // This is important if you want to get plain data, not instances
    });

    // console.log(results);
    return res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

module.exports = { GetAllCiDataWithPfi };
