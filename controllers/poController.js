// const { po_master } = ('../models');
const db = require("../models");
const {
  sequelize,
  document: Document,
  QuoDoc,
} = db;
const { po_master, opo_master, po_items } = db;
const formattedDateTime = require("../middleware/time");
const { Op } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");

//get all po
const getPO = async (req, res, next) => {
  const po_id = req.query.po_id;
  const ci_id = req.query.ci_id;
  const mode = req.query.mode;
  try {
    if (po_id) {
      console.log("fgjjdvbdfbgf");
      let result = await po_master.findAll({
        where: { po_id },
        attributes: { exclude: ["delivery_terms"] },
        include: [
          {
            model: db.add_shippment_container,
            attributes: [
              "add_shippment_container_id",
              "po_id",
              "po_num",
              "container_no",
              "container_type",
              "net_weight",
              "total_gross_weight",
              "package_detail",
              "created_on",
              "created_by",
              "updated_on",
              "updated_by",
              "status",
              "soncap_amount",
              "bl_num",
              "do_validity_dt",
              "total_quantity",
              "total_packages",
              [
                db.sequelize.literal("dbo.fn_containerType(container_type)"),
                "container_size_name",
              ],
            ],
            // include: [
            //   {
            //     model: db.shippment_container_detail,
            //     include: [
            //       {
            //         model: db.UomMaster,
            //         attributes: ["uom_name"],
            //       },
            //       {
            //         model: db.PackageTypeMaster,
            //         attributes: ["package_type"],
            //       },
            //     ],
            //   },
            // ],
          },
          { model: db.shippment_instructions },
          {
            model: db.shippment_advise_master,
            include: [
              { model: db.shippment_advise_additional_instruction },
              { model: db.shipment_advise_items },
            ],
          },
          {
            model: db.opo_master,
            include: [
              {
                model: db.Pfi_master,
                include: [
                  {
                    model: db.commercial_invoice,
                    include: [
                      {
                        model: db.ci_doc_movement_master,
                        include: [{ model: db.ci_shipping_doc_movement_dt }],
                      },
                      { model: db.custom_clearance },
                      { model: db.soncap_master },
                      { model: db.other_govt_charges },
                      { model: db.nafdac_inspection_expense },
                      { model: db.assessment },
                      { model: db.nafdac_clearance },
                      { model: db.operations_son },
                      {
                        model: db.nafdac_penalty,
                        include: [{ model: db.nafdac_penalty_item }],
                      },
                    ],
                  },
                  { model: db.Pfi_line_items },
                  {
                    model: db.VendorsBanksDetailsMaster,
                    attributes: {
                      exclude: ["bank_ref_cheque_name", "bank_ref_cheque"],
                    },
                  },
                  { model: db.insurance },
                  { model: db.form_m },
                  { model: db.letter_of_credit },
                  { model: db.son_pfi },
                  { model: db.CompanyMaster },
                  { model: db.operations_nafdac },
                  {
                    model: db.paar,
                    include: [{ model: db.paar_amendment_request }],
                  },
                  { model: db.operations_nafdac_master },
                  { model: db.govt_charges },
                  { model: db.nafdac_pfi },
                ],
              },
              {
                model: db.OprMaster,
                attributes: [
                  "opr_id",
                  "opr_num",
                  "vertical_id",
                  "company_id",
                  "opr_date",
                  "division_id",
                  "buy_from",
                  "buying_house_id",
                  "shipment_mode_id",
                  "delivery_timeline_id",
                  "department_id",
                  "requested_by",
                  "no_quot_email_alert",
                  "remarks",
                  "suppliers",
                  "item_category_id",
                  [
                    db.sequelize.literal(
                      "dbo.fn_ShipmentModeName(shipment_mode_id)"
                    ),
                    "shipment_mode_name",
                  ],
                ],
                include: [
                  {
                    model: db.BuyingHouse,
                    attributes: ["address_line1", "address_line2", "country"],
                  },
                  // {
                  //   model: db.CompanyMaster,
                  //   include: [{ model: db.AddressMaster }],
                  // },
                ],
              },
              {
                model: db.quotation_master,
                include: [
                  { model: db.additional_cost_breakup_freigth },
                  {
                    model: db.quo_require_docs,
                    where: {
                      isAvailable: "true",
                    },
                  },
                  {
                    model: db.delivery_terms_quo,
                    attributes: ["delivery_terms_name"],
                  },
                  {
                    model: db.rfq,
                    attributes: [
                      "rfq_num",
                      "remarks",
                      "vendor_list",
                      "req_doc_id",
                      "port_of_destination",
                      "shipment_type",
                      "shipment_mode",
                      "delivery_timeline_in_weeks",
                      [
                        db.sequelize.literal(
                          "dbo.fn_GetPortDestinationName(port_of_destination)"
                        ),
                        "port_destination_name",
                      ],
                    ],
                  },
                  { model: db.additional_cost },
                  {
                    model: db.payment_milestone,
                    attributes: ["milestone", "percentage", "status"],
                  },
                ],
              },
            ],
          },
          {
            model: db.po_items,
            include: [
              {
                model: db.ItemsMaster,
                attributes: { exclude: ["item_img", "item_img_name"] },
              },
            ],
            attributes: [
              "po_item_id",
              "po_id",
              "po_num",
              "opo_id",
              "item_id",
              "item_code",
              "item_name",
              "item_type",
              "line_total",
              "no_packs",
              "pack_size",
              "pack_type",
              "rate",
              "remarks",
              "address_id",
              "po_qty",
              "grn_qty",
              [sequelize.literal("dbo.GetOpoNum(opo_id)"), "opo_num"],
            ],
          },
          {
            model: db.vendor,
            include: [
              { model: db.VendorsAddressDetailsMaster },
              {
                model: db.VendorsBanksDetailsMaster,
                attributes: {
                  exclude: ["bank_ref_cheque_name", "bank_ref_cheque"],
                },
              },
            ],
            attributes: [
              "vendor_series",
              "vendor_name",
              "phone_number",
              "alternate_phone_number",
              "email",
              "contact_person",
              "contact_person_phone",
              "contact_person_email",
              "tax_id",
              "payment_terms_id",
              "pan_num",
              "tin_num",
              "gst_num",
              "vat_num",
              "reference_by",
              "vendor_type_id",
              "vendor_status",
              "registration_date",
              "compliance_status",
            ],
          },
        ],
        distinct: true, // Ensure no duplicate results
      });
      res.status(200).json(result);
    } else if (ci_id) {
      let result = await po_master.findAll({
        attributes: { exclude: ["delivery_terms"] }, // Exclude only what's unnecessary
        include: [
          {
            model: db.add_shippment_container,
            attributes: [
              "add_shippment_container_id",
              "po_id",
              "po_num",
              "container_no",
              "container_type",
              "net_weight",
              "total_gross_weight",
              "package_detail",
              "created_on",
              "created_by",
              "updated_on",
              "updated_by",
              "status",
              "soncap_amount",
              "bl_num",
              "do_validity_dt",
              "total_quantity",
              "total_packages",
              [
                db.sequelize.literal("dbo.fn_containerType(container_type)"),
                "container_size_name",
              ],
            ],
            // include: [
            //   {
            //     model: db.shippment_container_detail,
            //     include: [
            //       {
            //         model: db.UomMaster,
            //         attributes: ["uom_name"],
            //       },
            //       {
            //         model: db.PackageTypeMaster,
            //         attributes: ["package_type"],
            //       },
            //     ],
            //   },
            // ],
          },
          { model: db.shippment_instructions }, // No need to fetch all attributes if not necessary
          {
            model: db.shippment_advise_master,
            include: [
              { model: db.shippment_advise_additional_instruction },
              { model: db.shipment_advise_items },
            ],
          },
          {
            model: db.opo_master,
            include: [
              {
                model: db.Pfi_master,
                include: [
                  {
                    model: db.commercial_invoice,
                    where: { commercial_invoice_id: ci_id },
                    include: [
                      {
                        model: db.ci_doc_movement_master,
                        include: [{ model: db.ci_shipping_doc_movement_dt }],
                      },
                      { model: db.custom_clearance },
                      { model: db.soncap_master },
                      { model: db.other_govt_charges },
                      { model: db.nafdac_inspection_expense },
                      { model: db.assessment },
                      { model: db.nafdac_clearance },
                      { model: db.operations_son },
                      {
                        model: db.nafdac_penalty,
                        include: [{ model: db.nafdac_penalty_item }],
                      },
                    ],
                  },
                  { model: db.Pfi_line_items },
                  {
                    model: db.VendorsBanksDetailsMaster,
                    attributes: {
                      exclude: ["bank_ref_cheque_name", "bank_ref_cheque"],
                    },
                  },
                  { model: db.insurance },
                  { model: db.form_m },
                  { model: db.letter_of_credit },
                  { model: db.son_pfi },
                  { model: db.CompanyMaster },
                  { model: db.operations_nafdac },
                  {
                    model: db.paar,
                    include: [{ model: db.paar_amendment_request }],
                  },
                  { model: db.operations_nafdac_master },
                  { model: db.govt_charges },
                  { model: db.nafdac_pfi },
                ],
              },
              {
                model: db.OprMaster,
                attributes: [
                  "opr_id",
                  "opr_num",
                  "vertical_id",
                  "company_id",
                  "opr_date",
                  "division_id",
                  "buy_from",
                  "buying_house_id",
                  "shipment_mode_id",
                  "delivery_timeline_id",
                  "department_id",
                  "requested_by",
                  "no_quot_email_alert",
                  "remarks",
                  "suppliers",
                  "item_category_id",
                  [
                    db.sequelize.literal(
                      "dbo.fn_ShipmentModeName(shipment_mode_id)"
                    ),
                    "shipment_mode_name",
                  ],
                ],
                include: [
                  {
                    model: db.BuyingHouse,
                    attributes: ["address_line1", "address_line2", "country"],
                  },
                  // {
                  //   model: db.CompanyMaster,
                  //   include: [{ model: db.AddressMaster }],
                  // },
                ],
              },

              {
                model: db.quotation_master,
                include: [
                  { model: db.additional_cost_breakup_freigth },
                  {
                    model: db.quo_require_docs,
                    where: {
                      isAvailable: "true",
                    },
                  },
                  {
                    model: db.delivery_terms_quo,
                    attributes: ["delivery_terms_name"],
                  },
                  {
                    model: db.rfq,
                    attributes: [
                      "rfq_num",
                      "remarks",
                      "vendor_list",
                      "req_doc_id",
                      "port_of_destination",
                      "shipment_type",
                      "shipment_mode",
                      "delivery_timeline_in_weeks",
                      [
                        db.sequelize.literal(
                          "dbo.fn_GetPortDestinationName(port_of_destination)"
                        ),
                        "port_destination_name",
                      ],
                    ],
                  },
                  { model: db.additional_cost },

                  {
                    model: db.payment_milestone,
                    attributes: ["milestone", "percentage", "status"],
                  },
                ],
              },
            ],
          },
          {
            model: db.po_items,
            include: [
              {
                model: db.ItemsMaster,
                attributes: { exclude: ["item_img", "item_img_name"] },
              },
            ],
            attributes: [
              "po_item_id",
              "po_id",
              "po_num",
              "opo_id",
              "item_id",
              "item_code",
              "item_name",
              "item_type",
              "line_total",
              "no_packs",
              "pack_size",
              "pack_type",
              "rate",
              "remarks",
              "address_id",
              "po_qty",
              "grn_qty",
              [sequelize.literal("dbo.GetOpoNum(opo_id)"), "opo_num"],
            ],
          },
          {
            model: db.vendor,
            include: [
              { model: db.VendorsAddressDetailsMaster },
              {
                model: db.VendorsBanksDetailsMaster,
                attributes: {
                  exclude: ["bank_ref_cheque_name", "bank_ref_cheque"],
                },
              },
            ],
            attributes: [
              "vendor_series",
              "vendor_name",
              "phone_number",
              "alternate_phone_number",
              "email",
              "contact_person",
              "contact_person_phone",
              "contact_person_email",
              "tax_id",
              "payment_terms_id",
              "pan_num",
              "tin_num",
              "gst_num",
              "vat_num",
              "reference_by",
              "vendor_type_id",
              "vendor_status",
              "registration_date",
              "compliance_status",
            ],
          },
        ],
      });
      res.status(200).json(result);
    } else {
      let result = await po_master.findAll({
        order: [["po_id", "DESC"]],
        attributes: { exclude: ["delivery_terms"] },
        include: [
          {
            model: db.add_shippment_container,
            attributes: [
              "add_shippment_container_id",
              "po_id",
              "po_num",
              "container_no",
              "container_type",
              "net_weight",
              "total_gross_weight",
              "package_detail",
              "created_on",
              "created_by",
              "updated_on",
              "updated_by",
              "status",
              "soncap_amount",
              "bl_num",
              "do_validity_dt",
              "total_quantity",
              "total_packages",
              [
                db.sequelize.literal("dbo.fn_containerType(container_type)"),
                "container_size_name",
              ],
            ],
            // include: [
            //   {
            //     model: db.shippment_container_detail,
            //     include: [
            //       {
            //         model: db.UomMaster,
            //         attributes: ["uom_name"],
            //       },
            //       {
            //         model: db.PackageTypeMaster,
            //         attributes: ["package_type"],
            //       },
            //     ],
            //   },
            // ],
          },
          { model: db.shippment_instructions },
          {
            model: db.shippment_advise_master,
            include: [
              { model: db.shippment_advise_additional_instruction },
              { model: db.shipment_advise_items },
            ],
          },
          {
            model: db.opo_master,
            include: [
              {
                model: db.Pfi_master,
                include: [
                  {
                    model: db.commercial_invoice,
                    include: [
                      {
                        model: db.ci_doc_movement_master,
                        // include: [{ model: db.ci_shipping_doc_movement_dt }],
                      },
                      { model: db.custom_clearance },
                      { model: db.soncap_master },
                      { model: db.other_govt_charges },
                      { model: db.nafdac_inspection_expense },
                      { model: db.assessment },
                      { model: db.nafdac_clearance },

                      { model: db.operations_son },
                      {
                        model: db.nafdac_penalty,
                        include: [{ model: db.nafdac_penalty_item }],
                      },
                    ],
                  },
                  { model: db.Pfi_line_items },
                  {
                    model: db.VendorsBanksDetailsMaster,
                    attributes: {
                      exclude: ["bank_ref_cheque_name", "bank_ref_cheque"],
                    },
                  },
                  { model: db.insurance },
                  { model: db.form_m },
                  { model: db.letter_of_credit },
                  { model: db.son_pfi },
                  { model: db.CompanyMaster },
                  { model: db.operations_nafdac },
                  {
                    model: db.paar,
                    include: [{ model: db.paar_amendment_request }],
                  },
                  { model: db.operations_nafdac_master },
                  { model: db.govt_charges },
                  { model: db.nafdac_pfi },
                ],
              },
              {
                model: db.OprMaster,
                attributes: [
                  "opr_id",
                  "opr_num",
                  "vertical_id",
                  "company_id",
                  "opr_date",
                  "division_id",
                  "buy_from",
                  "buying_house_id",
                  "shipment_mode_id",
                  "delivery_timeline_id",
                  "department_id",
                  "requested_by",
                  "no_quot_email_alert",
                  "remarks",
                  "suppliers",
                  "item_category_id",
                  [
                    db.sequelize.literal(
                      "dbo.fn_ShipmentModeName(shipment_mode_id)"
                    ),
                    "shipment_mode_name",
                  ],
                ],
                include: [
                  {
                    model: db.BuyingHouse,
                    attributes: ["buying_house_name", "address_line1", "address_line2", "country"],
                  },
                  {
                    model: db.CompanyMaster,
                    include: [{ model: db.AddressMaster }],
                  },
                ],
              },
              {
                model: db.quotation_master,
                include: [
                  { model: db.additional_cost_breakup_freigth },
                  {
                    model: db.quo_require_docs,
                    where: {
                      isAvailable: "true",
                    },
                  },
                  {
                    model: db.delivery_terms_quo,
                    attributes: ["delivery_terms_name"],
                  },
                  {
                    model: db.rfq,
                    attributes: [
                      "rfq_num",
                      "remarks",
                      "vendor_list",
                      "req_doc_id",
                      "port_of_destination",
                      "shipment_type",
                      "shipment_mode",
                      "delivery_timeline_in_weeks",
                      [
                        db.sequelize.literal(
                          "dbo.fn_GetPortDestinationName(port_of_destination)"
                        ),
                        "port_destination_name",
                      ],
                    ],
                  },
                  { model: db.additional_cost },
                  {
                    model: db.payment_milestone,
                    attributes: ["milestone", "percentage", "status"],
                  },
                ],
              },
              {
                model: db.quotation_master,
                include: [
                  { model: db.additional_cost_breakup_freigth },
                  {
                    model: db.quo_require_docs,
                    where: {
                      isAvailable: "true",
                    },
                  },
                  {
                    model: db.delivery_terms_quo,
                    attributes: ["delivery_terms_name"],
                  },
                  {
                    model: db.rfq,
                    attributes: [
                      "rfq_num",
                      "remarks",
                      "vendor_list",
                      "req_doc_id",
                      "port_of_destination",
                      "shipment_type",
                      "shipment_mode",
                      "delivery_timeline_in_weeks",
                      [
                        db.sequelize.literal(
                          "dbo.fn_GetPortDestinationName(port_of_destination)"
                        ),
                        "port_destination_name",
                      ],
                    ],
                  },
                  { model: db.additional_cost },
                  {
                    model: db.payment_milestone,
                    attributes: ["milestone", "percentage", "status"],
                  },
                ],
              },
            ],
          },
          {
            model: db.po_items,
            include: [
              {
                model: db.ItemsMaster,
                attributes: { exclude: ["item_img", "item_img_name"] },
              },
            ],
            attributes: [
              "po_item_id",
              "po_id",
              "po_num",
              "opo_id",
              "item_id",
              "item_code",
              "item_name",
              "item_type",
              "line_total",
              "no_packs",
              "pack_size",
              "pack_type",
              "rate",
              "remarks",
              "address_id",
              "po_qty",
              "grn_qty",
              [sequelize.literal("dbo.GetOpoNum(opo_id)"), "opo_num"],
            ],
          },
          {
            model: db.vendor,
            include: [
              { model: db.VendorsAddressDetailsMaster },
              {
                model: db.VendorsBanksDetailsMaster,
                attributes: {
                  exclude: ["bank_ref_cheque_name", "bank_ref_cheque"],
                },
              },
            ],
            attributes: [
              "vendor_series",
              "vendor_name",
              "phone_number",
              "alternate_phone_number",
              "email",
              "contact_person",
              "contact_person_phone",
              "contact_person_email",
              "tax_id",
              "payment_terms_id",
              "pan_num",
              "tin_num",
              "gst_num",
              "vat_num",
              "reference_by",
              "vendor_type_id",
              "vendor_status",
              "registration_date",
              "compliance_status",
            ],
          },
        ],
        distinct: true,
      });

      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error calling UDF:", error);
    throw error;
  }
};
const getBankChargebypoid = async (req, res, next) => {
  let po_id = req.query.po_id;
  try {
    let result = await db.PaymentRequestTransactionsMaster.findAll({
      where: { doc_id: po_id },
      attributes: {
        exclude: ["receipt_image"], // Correctly exclude the receipt_image field
      },
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

//get po for grn
const getPOforGrn = async (req, res, next) => {
  try {
    const query = `  SELECT po_master.*
      FROM po_master
      INNER JOIN quotations_master
      ON po_master.quo_id = quotations_master.quo_id where  po_master.[status] > 8 and po_master.grn_status is  null`;
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// soft delte po by po id make status 0
const deletePOById = async (req, res, next) => {
  const po_id = req.query.po_id;
  try {
    const result = await po_master.update(
      { status: 0 },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const generatePo = async (req, res, next) => {
  const transaction = await db.sequelize.transaction(); // Start a transaction
  console.dir(req.body, { depth: null });
  try {
    // const opo_id = opo_ids.length > 0 ? req.body.opo_ids.split(","): opo_ids;
    // console.log("opo_id", opo_id);
    const {
      opo_ids,
      opo_nums,
      total_cost,
      quo_id,
      vendor_id,
      lead_time,
      payment_terms,
      delivery_terms,
      created_by,
      items_list,
    } = req.body;

    const doc_code = "PO";
    const po_series = await generateSeries(doc_code);

    const items2 = items_list.map((element) => ({
      line_total: Number(element.opr_qty) * Number(element.rate),
    }));

    function calculateTotalLineTotal(itemsList) {
      return itemsList.reduce((total, item) => {
        return total + item.line_total; // Accumulate the line total
      }, 0); // Start with 0
    }
    const totalAmount = calculateTotalLineTotal(items2);
    // Generate PO
    const po_response = await po_master.create(
      {
        po_num: po_series,
        vendor_id,
        selected_opo_id: opo_ids,
        opo_ids,
        opo_nums,
        total_cost: totalAmount,
        lead_time,
        quo_id,
        payment_terms,
        delivery_terms,
        status: 1,
        created_by,
        created_on: new Date(), // Adjust date format if necessary
      },
      { transaction } // Pass the transaction
    );

    // const arr = opo_ids.split(",").map(Number);

    console.log("before updating opo_master");
    await opo_master.update(
      {
        status: 2,
      },
      {
        where: {
          opo_master_id: opo_ids,
        },
        transaction, // Pass the transaction
      }
    );

    let lastInserted = po_response.po_id;

    const items = items_list.map((element) => ({
      po_id: lastInserted,
      po_num: po_series,
      opo_id: element.opo_id,
      item_id: element.item_id,
      item_code: element.item_code,
      item_name: element.item_name,
      item_type: element.item_type,
      line_total: Number(element.opr_qty) * Number(element.rate),
      no_packs: Number(element.opr_qty) / Number(element.pack_size),
      pack_size: element.pack_size,
      pack_type: element.pack_type,
      rate: element.rate,
      status: 1,
      po_qty: element.opr_qty,
      rfq_item_id: element.quotation_item.rfq_item_id,
      quo_item_id: element.quotation_item.quo_item_id,
    }));

    console.log("Items to be inserted:", items);
    const response = await po_items.bulkCreate(items, { transaction }); // Pass the transaction

    await transaction.commit(); // Commit the transaction if all is well
    res.status(201).json({
      message: "Submit Successfully",
      po_id: lastInserted,
      po_num: po_series,
    });
  } catch (err) {
    await transaction.rollback(); // Rollback the transaction on error
    next(err);
  }
};

const po_email_conformation = async (req, res, next) => {
  try {
    const { po_id } = req.body;
    const po_response = await po_master.update(
      { status: 2 },
      { where: { po_id: po_id } }
    );
    next();
  } catch (err) {
    next(err);
  }
};

const AcceptPO = async (req, res, next) => {
  const { status, po_id, remarks, fileArray, po_num, vendor_approval_date } =
    req.body;
  const t = await db.sequelize.transaction(); // Start a new transaction

  try {
    console.log("fileArray", fileArray);

    // Update po_master table within the transaction
    const result = await po_master.update(
      {
        acceptance_remarks: remarks,
        status: status ? 3 : 4,
        updated_on: formattedDateTime,
        vendor_approval_date,
      },
      {
        where: {
          po_id: po_id,
        },
        transaction: t, // Ensure this update is part of the transaction
      }
    );

    if (fileArray.length > 0) {
      const SubmitDoc = async () => {
        const promises = fileArray.map(async (item, index) => {
          await QuoDoc.create(
            {
              q_doc_name: item.name,
              q_doc_remarks: item.remark,
              q_doc_filename: req.files[index]?.originalname,
              q_doc_file: req.files[index]?.buffer.toString("base64"),
              doc_id: po_id,
              file_date: item?.acceptance_date,
              doc_num: po_num,
              module: "po_master",
              quotation_id: 3111,
            },
            { transaction: t }
          ); // Ensure document creation is also part of the transaction
        });
        await Promise.all(promises);
      };
      await SubmitDoc();
    }

    // Commit the transaction if all operations are successful
    await t.commit();

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    // Rollback the transaction in case of an error
    await t.rollback();
    next(err);
  }
};

// const AcceptPO = async (req, res, next) => {
//   try {
//     const { status, po_id, remarks, fileArray, po_num, vendor_approval_date } = req.body;
//     console.log("fileArray", fileArray);
//     const result = await po_master.update(
//       {
//         acceptance_remarks: remarks,
//         status: status ? 3 : 4,
//         updated_on: formattedDateTime,
//         vendor_approval_date,
//       },
//       {
//         where: {
//           po_id: po_id,
//         },
//       }
//     );

//     if (fileArray.length > 0) {
//       const SubmitDoc = async () => {
//         const promises = fileArray.map(async (item, index) => {
//           await QuoDoc.create({
//             q_doc_name: item.name,
//             q_doc_remarks: item.remark,
//             q_doc_filename: req.files[index]?.originalname,
//             q_doc_file: req.files[index]?.buffer.toString("base64"),
//             doc_id: po_id,
//             file_date: item?.acceptance_date,
//             doc_num: po_num,
//             module: "po_master",
//             quotation_id: 3111,
//           });
//         });
//         await Promise.all(promises);
//       };
//       await SubmitDoc();
//     }

//     res.status(201).json({ message: "Updated Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

const confimPoPaymentsbyVendor = async (req, res, next) => {
  try {
    const { status, po_id, remarks } = req.body;
    const result = await po_master.update(
      {
        acceptance_remarks: remarks,
        status: 7,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const confimPoFinalPaymentsbyVendor = async (req, res, next) => {
  try {
    const { status, po_id, final_doc_dispatch_no, disptach_date } = req.body;
    const result = await po_master.update(
      {
        final_doc_dispatch_no,
        disptach_date,
        status: 10,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const completePo = async (req, res, next) => {
  const { po_id, pocompletion_docslist, created_by } = req.body;

  try {
    //change po_master Status
    const result = await po_master.update(
      {
        status: 8,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );

    //transform quotation docs
    await pocompletion_docslist.map((data, i) => {
      data.linked_id = po_id;
      data.table_name = "PO";
      data.doc_name = req.files[i].originalname;
      data.doc_base64 = req.files[i].buffer.toString("base64");
      data.uploaded_by = created_by;
    });

    // insert quotation documents
    await Document.bulkCreate(pocompletion_docslist);
    res.status(200).json({ message: "Po completion update Suceesfully" });
  } catch (err) {
    next(err);
  }
};

const getPoItemsbypoid = async (req, res, next) => {
  try {
    const { po_id } = req.query;

    let FoundPoItems = await po_items.findAll({
      where: { po_id: po_id },
      include: [
        { model: db.quotation_items },
        { model: db.RfqItemDetail },
        {
          // model: db.po_items,
          model: db.ItemsMaster,
          // attributes: [
          //   "item_name",
          //   "item_type",
          //   "item_code",
          //   "quantity_in_stock",
          //   "quantity_on_order",
          //   "nafdac_category",
          // ],
          attributes: {
            exclude: ["item_img", "item_img_name"],
          },
        },
      ],
    });
    res.status(201).json(FoundPoItems);
  } catch (error) {
    next(error);
  }
};
const updatePOById = async (req, res, next) => {
  const po_id = req.query.po_id;
  try {
    const { delivery_timeline_name, updated_by } = req.body;
    const result = await po_master.update(
      {
        delivery_timeline_name,
        updated_by,
        updated_on: formattedDateTime,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const getVendorDeailsByPoId = async (req, res, next) => {
  try {
    const { po_id } = req.query;
    let foudnVendor = await po_master.findAll({
      where: { po_id: po_id },
      include: [
        {
          model: db.quotation_master,
          attributes: [
            "quo_id",
            "quo_num",
            "rfq_id",
            "vendor_id",
            "reference_no",
            "reference_date",
            "quo_date",
            "currency",
            "delivery_terms",
            "country_origin",
            "country_supply",
            "port_loading",
            "lead_time",
            "payment_terms",
            "remarks",
            "approval_status",
            "total_cost",
            "po_status",
            "opo_status",
            "quote_doc",
            "quote_doc_name",
            "opr_lead_time",
            "port_of_loading",
          ],
          include: [
            {
              model: db.quo_require_docs,
              where: {
                isAvailable: "true",
              },
            },
            {
              model: db.additional_cost,
            },
            {
              model: db.QuoDoc,
              attributes: [
                "q_doc_id",
                "quotation_id",
                "q_doc_name",
                "q_doc_remarks",
                "q_doc_filename",
                // "q_doc_file",
              ],
            },
            // {
            //   model: db.vendor,
            //   attributes: ["vendor_name", "vendor_series"],
            // },
            {
              model: db.quotation_items,
              attributes: [
                "quo_item_id",
                "quo_id",
                "item_id",
                "item_type",
                "line_total",
                "opr_qty",
                "quote_qtd",
                "rate",
                "remarks",
                "item_name",
                "no_packs",
                "pack_size",
                "pack_type",
                "quo_num",
                "item_code",
                "rfq_item_id",
                [
                  sequelize.literal("dbo.fn_GetPackageType(pack_type)"),
                  "pack_type_name",
                ],
              ],
            },
          ],
        },
        {
          model: db.VendorsMaster,
          attributes: {
            exclude: ["last_audited_docs", "last_audited_docs_name"],
          },
          include: [
            {
              model: db.VendorsAddressDetailsMaster,
            },
            {
              model: db.VendorsBanksDetailsMaster,
              attributes: {
                exclude: ["bank_ref_cheque", "bank_ref_cheque_name"],
              },
            },
          ],
        },
      ],
    });
    res.status(201).json(foudnVendor);
  } catch (error) {
    next(error);
  }
};

const poStatusController = async (req, res, next) => {
  let { po_id, action } = req.body;
  try {
    let foundPo = await po_master.findByPk(po_id);
    if (!foundPo) {
      res.status(404).json({ message: "Document not found" });
    } else {
      switch (action) {
        case "approve":
          foundPo.status = 1;
          await foundPo.save();
          break;
        case "reject":
          foundPo.status = 1;
          await foundPo.save();
          break;
        case "archive":
          foundPo.status = 1;
          await foundPo.save();
          break;
        default:
          return res.status(400).json({ message: "Invalid action" });
      }
      // Common response
      res.status(200).json({ message: "Action processed successfully" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  poStatusController,
  confimPoFinalPaymentsbyVendor,
  completePo,
  confimPoPaymentsbyVendor,
  getVendorDeailsByPoId,
  getPOforGrn,
  getBankChargebypoid,
  po_email_conformation,
  AcceptPO,
  getPO,
  deletePOById,
  generatePo,
  updatePOById,
  getPoItemsbypoid,
};
