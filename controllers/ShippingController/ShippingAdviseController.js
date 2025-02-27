const db = require("../../models");
const {
  shippment_advise_master,
  shippment_advise_additional_instruction,
  document,
} = db;
const { Op } = require("sequelize");
const { generateSeries } = require("../../utilites/genrateSeries");

// Create a new shippment_advise_master
const createShippingAdviseTerm = async (req, res, next) => {
  const transaction = await db.sequelize.transaction(); // Start a transaction

  console.dir(req.body, { depth: null });
  try {
    console.log("file: ", req.files);
    console.log("file: ", req.body);
    const {
      po_num,
      po_id,
      shipment_status,
      invoice_amount,
      bl_awb_no,
      bl_awb_date,
      type_of_bl,
      shipment_type,
      cbm_information,
      free_days,
      shipping_vehicle,
      vehicle_description,
      port_of_loading,
      port_of_discharge,
      final_destination,
      goods_description,
      shipper_name,
      consignee_name,
      notify_name,
      free_days_time,
      freight,
      eta,
      additional_information,
      doc_list,
      cpackageDetail,
      grnData,
      freightArray,
      addAdditinalCostArr,
      additinalCostDataArr,
      additinalCostFreigthDataArr,
      quo_id,
      quo_num,
      for_delivery_term,
      totalFreigth,
      package_info
    } = req.body;

    if (for_delivery_term.toUpperCase() === "CFR") {
      // Step 1: Create the shipment advise
      const result = await shippment_advise_master.create(
        {
          po_id,
          po_num,
          shipment_status,
          invoice_amount,
          bl_awb_no,
          bl_awb_date: bl_awb_date || null,
          type_of_bl,
          shipment_type,
          cbm_information,
          free_days,
          shipping_vehicle,
          vehicle_description,
          port_of_loading,
          port_of_discharge,
          final_destination,
          goods_description,
          shipper_name,
          consignee_name,
          notify_name,
          free_days_time,
          freight,
          eta,
          status: 1,
        },
        { transaction }
      );

      const lastInsertedId = result.shippment_advise_id;

      // Step 3: Handle additional freight charges
      if (shipment_type?.toUpperCase() === "FCL") {
        if (additinalCostFreigthDataArr?.length > 0) {
          await Promise.all(
            additinalCostFreigthDataArr?.map(async (item) => {
              await db.additional_cost_freigth.create(
                {
                  reference_id: lastInsertedId,
                  quo_id,
                  quo_num,
                  number_container: item.number_container,
                  type_container: item.type_container,
                  rate: item.shipment_advise_rate,
                  total_freigth: item.line_total,
                  reference_table_name: "shippment_advise_master",
                  charges_by: "Supplier",
                  heading: "Freigth Charges",
                  for_delivery_term,
                  status: 1,
                },
                { transaction }
              ); // Pass the transaction
            })
          );
        }
      } else {
        if (freightArray?.length > 0) {
          await Promise.all(
            freightArray.map(async (item) => {
              await db.additional_cost_breakup_freigth.create(
                {
                  reference_id: lastInsertedId,
                  reference_table_name: 'shippment_advise_master',
                  quo_id: quo_id,
                  quo_num: quo_num,
                  freight_charge_for: item.freight_charge_for,
                  input_wt: item.input_wt,
                  rate: item.advise_rate,
                  total_freigth: item.total,
                  for_delivery_term: for_delivery_term,
                  shipment_type: shipment_type,
                  charges_by: "Supplier",
                  heading: "Freigth Charges",
                  status: 1,
                },
                { transaction }
              );
            })
          );
        }

        if (package_info?.length > 0) {
          await Promise.all(
            package_info.map(async (item) => {
              await db.pack_info.create(
                {
                  shippment_advise_id: lastInsertedId,
                  no_of_package: item.no_of_package,
                  package_type: item.package_type,
                  l_input: item.l_input,
                  b_input: item.b_input,
                  h_input: item.h_input,
                  net_wt_of_package: item.net_wt_of_package,
                  gr_wt_of_package: item.gr_wt_of_package,
                  cbm: item.cbm,
                  remark: item.remark,
                  status: 1,
                },
                { transaction }
              );
            })
          );
        }
      }


      // Step 2: Add additional cost for freight
      await db.additional_cost.create(
        {
          reference_id: lastInsertedId,
          quo_id,
          quo_num,
          charge_name: "total_freight_charges",
          reference_table_name: "shippment_advise_master",
          charge_amount: totalFreigth,
          charges_by: "Supplier",
          heading: "Freight_Charges",
          for_delivery_term,
          status: 1,
        },
        { transaction }
      ); // Pass the transaction

      // Step 4: Handle additional costs
      let filterAdditinalCostDataArr = additinalCostDataArr?.filter(
        (i) => i.add_amount > 0 && i.charge_name !== "Total"
      );
      if (filterAdditinalCostDataArr?.length > 0) {
        await Promise.all(
          filterAdditinalCostDataArr?.map(async (i) => {
            await db.additional_cost.create(
              {
                reference_id: lastInsertedId,
                quo_id,
                quo_num,
                charge_name: i.charge_name,
                reference_table_name: "shippment_advise_master",
                charge_amount: i.add_amount,
                charges_by: "Supplier",
                heading: i.heading,
                for_delivery_term,
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          })
        );
      }

      // Step 5: Handle additional charges in shipping advise
      if (addAdditinalCostArr?.length > 0) {
        await Promise.all(
          addAdditinalCostArr?.map(async (i) => {
            await db.additional_cost.create(
              {
                reference_id: lastInsertedId,
                quo_id,
                quo_num,
                charge_name: i.charge_name,
                reference_table_name: "shippment_advise_master",
                charge_amount: i.charge_amount,
                charges_by: "Supplier",
                heading: "Add Charges in Shipping Advise",
                for_delivery_term,
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          })
        );
      }

      // Step 6: Handle additional instructions (if any)
      if (additional_information && additional_information?.length > 0) {
        await Promise.all(
          additional_information?.map(async (item) => {
            await shippment_advise_additional_instruction.create(
              {
                shippment_advise_id: lastInsertedId,
                po_id: po_id,
                po_num: po_num,
                other: item.other,
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          })
        );
      }

      // Step 7: Handle GRN data (if any)
      if (grnData?.po_item_id_lists && grnData?.po_item_id_lists?.length > 0) {
        await Promise.all(
          grnData?.po_item_id_lists?.map(async (item) => {
            await db.shipment_advise_items.create(
              {
                shipment_advise_id: lastInsertedId,
                po_id: po_id,
                po_num: po_num,
                item_id: item.item_id,
                po_item_id: item.po_item_id,
                pack_size: item.pack_size,
                pack_type: item.pack_type,
                quantity: item.grn_qty,
                no_of_packs: Number(item.pack_size) * Number(item.grn_qty),
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          })
        );
      }

      // Step 8: Handle document uploads
      const updatedShippingAdviseDocs = doc_list?.map((data, index) => ({
        quotation_id: quo_id,
        doc_id: lastInsertedId,
        module: "shippment_advise_master",
        q_doc_remarks: data.name,
        q_doc_name: data.remark,
        q_doc_filename: req.files[index]?.originalname,
        q_doc_file: req.files[index]?.buffer.toString("base64"),
      }));

      await db.QuoDoc.bulkCreate(updatedShippingAdviseDocs, { transaction }); // Pass the transaction

      // Step 9: Create containers
      if (cpackageDetail) {
        const containerPromises = cpackageDetail?.map(async (container) => {
          console.log("container", container);
          const createdContainer = await db.add_shippment_container.create(
            {
              shippment_advise_id: lastInsertedId,
              container_no: container.container_no,
              container_type: container.container_type,
              total_gross_weight: container.gross_weight,
              net_weight: container.total_weigth,
              total_packages: container.total_packages,
              total_quantity: container.total_quantity,
              po_id: po_id,
              po_num: po_num,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
          const lastInsertedIdContainer = createdContainer.add_shippment_container_id;

          const detailPromises = container.pack?.map(async (detail) => {
            await db.shippment_container_detail.create(
              {
                add_shippment_container_id: lastInsertedIdContainer,
                quantity: detail?.quantity,
                uom: detail?.uom,
                no_package: detail?.pack_size,
                pack_type: detail?.pack_type,
                packet_weight: detail?.net_weight,
                gross_weight: detail?.gross_weigth,
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          });
          await Promise.all(detailPromises);
        });

        await Promise.all(containerPromises);
      }

      // Step 10: Update PO status
      await db.po_master.update(
        {
          status: 11,
        },
        {
          where: { po_id },
          transaction, // Pass the transaction
        }
      );
    } else {
      // Step 1: Create the shipment advise
      const result = await shippment_advise_master.create(
        {
          po_id,
          po_num,
          shipment_status,
          invoice_amount,
          bl_awb_no,
          bl_awb_date: bl_awb_date || null,
          type_of_bl,
          shipment_type,
          cbm_information,
          free_days,
          shipping_vehicle,
          vehicle_description,
          port_of_loading,
          port_of_discharge,
          final_destination,
          goods_description,
          shipper_name,
          consignee_name,
          notify_name,
          free_days_time,
          freight,
          eta,
          status: 1,
        },
        { transaction }
      );

      const lastInsertedId = result.shippment_advise_id;

      // Step 2: Handle additional costs
      let filterAdditinalCostDataArr = additinalCostDataArr?.filter(
        (i) => i.add_amount > 0 && i.charge_name !== "Total"
      );
      if (filterAdditinalCostDataArr?.length > 0) {
        await Promise.all(
          filterAdditinalCostDataArr?.map(async (i) => {
            await db.additional_cost.create(
              {
                reference_id: lastInsertedId,
                quo_id,
                quo_num,
                charge_name: i.charge_name,
                reference_table_name: "shippment_advise_master",
                charge_amount: i.add_amount,
                charges_by: "Supplier",
                heading: i.heading,
                for_delivery_term,
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          })
        );
      }

      // Step 3: Handle additional charges in shipping advise
      if (addAdditinalCostArr?.length > 0) {
        await Promise.all(
          addAdditinalCostArr?.map(async (i) => {
            await db.additional_cost.create(
              {
                reference_id: lastInsertedId,
                quo_id,
                quo_num,
                charge_name: i.charge_name,
                reference_table_name: "shippment_advise_master",
                charge_amount: i.charge_amount,
                charges_by: "Supplier",
                heading: "Add Charges in Shipping Advise",
                for_delivery_term,
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          })
        );
      }

      // Step 4: Handle additional instructions (if any)
      if (additional_information && additional_information?.length > 0) {
        await Promise.all(
          additional_information?.map(async (item) => {
            await shippment_advise_additional_instruction.create(
              {
                shippment_advise_id: lastInsertedId,
                po_id: po_id,
                po_num: po_num,
                other: item.other,
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          })
        );
      }

      // Step 5: Handle GRN data (if any)
      if (grnData?.po_item_id_lists && grnData?.po_item_id_lists?.length > 0) {
        await Promise.all(
          grnData?.po_item_id_lists?.map(async (item) => {
            await db.shipment_advise_items.create(
              {
                shipment_advise_id: lastInsertedId,
                po_id: po_id,
                po_num: po_num,
                item_id: item.item_id,
                po_item_id: item.po_item_id,
                pack_size: item.pack_size,
                pack_type: item.pack_type,
                quantity: item.grn_qty,
                no_of_packs: Number(item.pack_size) * Number(item.grn_qty),
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          })
        );
      }

      // Step 6: Handle document uploads
      const updatedShippingAdviseDocs = doc_list?.map((data, index) => ({
        quotation_id: quo_id,
        doc_id: lastInsertedId,
        module: "shippment_advise_master",
        q_doc_remarks: data.name,
        q_doc_name: data.remark,
        q_doc_filename: req.files[index]?.originalname,
        q_doc_file: req.files[index]?.buffer.toString("base64"),
      }));

      await db.QuoDoc.bulkCreate(updatedShippingAdviseDocs, { transaction }); // Pass the transaction

      // Step 7: Update PO status
      await db.po_master.update(
        {
          status: 11,
        },
        {
          where: { po_id },
          transaction, // Pass the transaction
        }
      );
    }

    await transaction.commit();

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    // Rollback transaction if any error occurs
    console.error("Error creating shipment advise:", err);
    await transaction.rollback();
    next(err);
  }
};

const createCommercialInvoice = async (req, res, next) => {
  
  const transaction = await db.sequelize.transaction();
  try {
    const {
      addAdditinalCostArr,
      additinalCostDataArr,
      additinalCostFreigthDataArr,
      totalFreigth,
      po_id,
      quo_id,
      po_num,
      pfi_id,
      pfi_num,
      shippment_advise_id,
      item_list,
      shipment_status,
      bl_awb_no,
      bl_awb_date,
      type_of_bl,
      shipment_type,
      cbm_information,
      free_days,
      shipping_vehicle,
      vehicle_description,
      port_of_loading,
      port_of_discharge,
      final_destination,
      freight,
      eta,
      fobCost,
      totalInlandFob,
      ci_amount,
      quo_num,
      currency,
      shipment_mode,
      PackageArr,
      shipper_name,

      total_package,
      country_supply,
      country_origin,
      delivery_terms,
      bh_id,
      company_id,
      total_net_weight,
      total_gross_weight,
      invoice_remarks
    } = req.body;

    console.dir(req.body, { depth: null });
    console.log("item_list", item_list);
    const ci_series = await generateSeries("INVOICE");

    const result = await db.commercial_invoice.create(
      {
        pfi_id: pfi_id,
        pfi_num: pfi_num,
        invoice_date: new Date(),
        shipment_type,
        mode: shipment_mode,
        currency,
        total_package,
        country_supply,
        country_origin,
        port_of_loading,
        port_dc: port_of_discharge,
        delivery_terms,
        final_destination,
        inland_charges: totalInlandFob,
        freight_charges: totalFreigth,
        ci_amount,
        fob_cost: fobCost,
        po_id,
        quo_id,
        po_num,
        shippment_advise_id,
        bh_id,
        company_id,

        freight,
        shipper_name,
        shipment_status,
        type_of_bl,
        bl_num: bl_awb_no,
        bl_date: bl_awb_date || null,
        vessel_name: vehicle_description,
        shipping_line_name: shipping_vehicle,
        eta_date: eta || null,
        free_days,
        total_net_weight,
        total_gross_weight,
        cbm: cbm_information,
        invoice_remarks,

        ci_num: ci_series,
        status: 1,
      },
      { transaction }
    );
    let lastInsertedId = result.commercial_invoice_id;

    // Handle additional charges (create entries)
    if (addAdditinalCostArr.length > 0) {
      await Promise.all(
        addAdditinalCostArr.map(async (i) => {
          await db.additional_cost.create(
            {
              reference_id: lastInsertedId,
              quo_id,
              quo_num,
              charge_name: i.charge_name,
              reference_table_name: "commercial_invoice",
              charge_amount: i.charge_amount,
              charges_by: "Buyer",
              heading: "Add in CI",
              for_delivery_term: delivery_terms,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    await db.additional_cost.create(
      {
        reference_id: lastInsertedId,
        quo_id,
        quo_num,
        charge_name: "total_freight_charges",
        reference_table_name: "commercial_invoice",
        charge_amount: totalFreigth,
        charges_by: "Buyer",
        heading: "Freight_Charges",
        for_delivery_term: delivery_terms,
        status: 1,
      },
      { transaction }
    ); // Pass the transaction

    // Handle additional cost data (create entries)
    let filterAdditinalCostDataArr = additinalCostDataArr.filter(
      (i) => i.add_amount > 0 && i.charge_name !== "Total"
    );
    if (filterAdditinalCostDataArr.length > 0) {
      await Promise.all(
        filterAdditinalCostDataArr.map(async (i) => {
          await db.additional_cost.create(
            {
              reference_id: lastInsertedId,
              quo_id,
              quo_num,
              charge_name: i.charge_name,
              reference_table_name: "commercial_invoice",
              charge_amount: i.add_amount,
              charges_by: "Buyer",
              heading: i.heading,
              for_delivery_term: delivery_terms,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Handle additional freight charges (create entries)
    if (additinalCostFreigthDataArr.length > 0 && shipment_type?.toUpperCase() === "FCL") {
      await Promise.all(
        additinalCostFreigthDataArr.map(async (item) => {
          await db.additional_cost_freigth.create(
            {
              reference_id: lastInsertedId,
              quo_id,
              quo_num,
              number_container: item.number_container,
              type_container: item.type_container,
              rate: item.ci_rate,
              total_freigth: item.line_total,
              reference_table_name: "commercial_invoice",
              charges_by: "Buyer",
              heading: "Freigth Charges",
              for_delivery_term: delivery_terms,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    if (shipment_type?.toUpperCase() === "FCL") {
      if (PackageArr?.length > 0) {
        const containerPromises = PackageArr?.map(async (container) => {
          console.log("container", container);
          const createdContainer = await db.add_shippment_container.create(
            {
              shippment_advise_id: lastInsertedId,
              container_no: container.container_no,
              container_type: container.container_type,
              total_gross_weight: container.gross_weight,
              net_weight: container.total_weigth,
              total_packages: container.total_packages,
              total_quantity: container.total_quantity,
              po_id: po_id,
              po_num: po_num,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
          const lastInsertedIdContainer = createdContainer.add_shippment_container_id;

          const detailPromises = container.pack?.map(async (detail) => {
            await db.shippment_container_detail.create(
              {
                add_shippment_container_id: lastInsertedIdContainer,
                quantity: detail?.quantity,
                uom: detail?.uom,
                no_package: detail?.pack_size,
                pack_type: detail?.pack_type,
                packet_weight: detail?.net_weight,
                gross_weight: detail?.gross_weigth,
                status: 1,
              },
              { transaction }
            ); // Pass the transaction
          });
          await Promise.all(detailPromises);
        });

        await Promise.all(containerPromises);
      }
    } else {
      if (PackageArr?.length > 0) {
        await Promise.all(
          PackageArr.map(async (item) => {
            await db.pack_info.create(
              {
                shippment_advise_id: lastInsertedId,
                no_of_package: item.no_of_package,
                package_type: item.package_type,
                l_input: item.l_input,
                b_input: item.b_input,
                h_input: item.h_input,
                net_wt_of_package: item.net_wt_of_package,
                gr_wt_of_package: item.gr_wt_of_package,
                cbm: item.cbm,
                remark: item.remark,
                status: 1,
              },
              { transaction }
            );
          })
        );
      }
    }

    await Promise.all(
      item_list?.map(async (item) => {
        await db.shipment_advise_items.update(
          {
            ci_id: lastInsertedId,
            ci_rate: item.ci_rate,
            ci_line_total: item.line_total,
          },
          {
            where: {
              shipment_advise_item_id: item.shipment_advise_item_id,
            },
          },
          { transaction }
        );
      })
    );

    await shippment_advise_master.update(
      {
        status: 6,
        ci_id: lastInsertedId,
        ci_num: ci_series,
      },
      {
        where: {
          shippment_advise_id: shippment_advise_id,
        },
      },
      { transaction }
    );
    await db.Pfi_master.update(
      {
        status: 6,
      },
      {
        where: {
          pfi_id: pfi_id,
        },
      },
      { transaction }
    );
    await db.po_master.update(
      {
        status: 20,
      },
      {
        where: {
          po_id: po_id,
        },
      },
      { transaction }
    );

    // Commit the transaction if everything is successful
    await transaction.commit();
    res.status(201).json({
      message: "Created Successfully",
      ci_id: lastInsertedId,
      ci_num: ci_series,
    });
  } catch (err) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    next(err);
  }
};

const UpdateRotationNumber = async (req, res, next) => {
  const t = await db.sequelize.transaction(); // Start a transaction
  try {
    const {
      pfi_id,
      ci_id,
      rotation_num,
      arrival_dt,
      port_of_discharge,
      transferred_terminal,
      revised_eta,
    } = req.body;
    console.log("ABC", req.body);

    if (revised_eta) {
      await db.ci_shipping_doc_movement_dt.update(
        {
          status: 2,
        },
        {
          where: {
            ci_id: ci_id,
            activity_name: "eta_revising_dt",
          },
          transaction: t, // Pass the transaction object
        }
      );

      // Assuming 'lastInsertedValue' is defined and fetched from a previous query or operation
      await db.ci_shipping_doc_movement_dt.create(
        {
          ci_id,
          pfi_id,
          activity_name: "eta_revising_dt",
          activity_date: revised_eta,
          status_activity: 1,
          status: 1,
        },
        {
          transaction: t, // Pass the transaction object
        }
      );
    }

    await db.commercial_invoice.update(
      {
        rotation_no: rotation_num,
        arrival_dt,
        port_of_discharge_shipping: port_of_discharge,
        transferred_terminal,
        eta_date: revised_eta,
      },
      {
        where: {
          commercial_invoice_id: ci_id,
        },
        transaction: t, // Pass the transaction object
      }
    );

    // If everything is successful, commit the transaction
    await t.commit();
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    // If any error occurs, rollback the transaction
    await t.rollback();
    next(err); // Pass the error to the error handler middleware
  }
};
// const UpdateRotationNumber = async (req, res, next) => {
//   try {
//     const {
//       pfi_id,
//       ci_id,
//       rotation_no,
//       arrival_dt,
//       port_of_discharge_shipping,
//       transferred_terminal,
//       revised_eta,
//     } = req.body;
//     console.log("ABC", req.body);

//     if (revised_eta) {
//       await db.ci_shipping_doc_movement_dt.update(
//         {
//           status: 2,
//         },
//         {
//           where: {
//             ci_id: ci_id,
//             activity_name: "eta_revising_dt"
//           },
//         }
//       );

//       await db.ci_shipping_doc_movement_dt.create({
//         shipping_entry_id: lastInsertedValue,
//         ci_id,
//         pfi_id,
//         activity_name: "eta_revising_dt",
//         activity_date: revised_eta,
//         status_activity: 1,
//         status: 1,
//       });
//     }
//     await db.commercial_invoice.update(
//       {
//         rotation_no,
//         arrival_dt,
//         port_of_discharge_shipping,
//         transferred_terminal,
//       },
//       {
//         where: {
//           ci_id: ci_id,
//         },
//       }
//     );
//     res.status(201).json({ message: "Submit Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

const createGrn = async (req, res, next) => {
  try {
    const { shippment_advise_id, pfi_id, po_id, ItemDataArr } = req.body;
    console.log("ABC", req.body);

    if (ItemDataArr?.length > 0) {
      await Promise.all(
        ItemDataArr?.map(async (item) => {
          await db.grn_qty.create({
            shipment_advise_id: shippment_advise_id,
            po_id,
            pfi_id,
            grn_qty: item.grn_qty,
            shipment_advise_item_id: item.shipment_advise_item_id
          });
        })
      );
    }

    if (ItemDataArr?.length > 0) {
      await Promise.all(
        ItemDataArr?.map(async (item) => {
          await db.shipment_advise_items.update(
            {
              grn_qty: item.grn_qty,
            },
            {
              where: { shipment_advise_item_id: item.shipment_advise_item_id },
            }
          );
        })
      );
    }

    await shippment_advise_master.update(
      {
        status: 5,
      },
      {
        where: {
          shippment_advise_id: shippment_advise_id,
        },
      }
    );
    await db.Pfi_master.update(
      {
        status: 5,
      },
      {
        where: {
          pfi_id: pfi_id,
        },
      }
    );
    await db.po_master.update(
      {
        status: 12,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(201).json({ message: "Created Successfully" });
  } catch (err) {
    next(err);
  }
};

//Get Shipping Type Items
const getShippingAdviseTypeByID = async (req, res, next) => {
  console.log("ABC");
  const shipment_advise_id = req.query.shipment_advise_id;
  try {
    const result = await db.shipment_advise_items.findAll({
      attributes: [
        "shipment_advise_item_id",
        "shipment_advise_id",
        "po_id",
        "item_id",
        "item_type",
        "item_specification",
        "item_description",
        "opo_qty",
        "rate",
        "currency",
        "remarks",
        "quantity",
        "pack_size",
        "no_of_packs",
        "created_by",
        "updated_by",
        "status",
        "createdAt",
        "updatedAt",
        "po_item_id",
        "ci_id",
        "ci_rate",
        "grn_qty",
        "ci_line_total",
        "hsn_code",
        [db.sequelize.col("shipment_advise_items.pack_type"), "pack_type"],
        [
          db.sequelize.literal(
            "dbo.fn_GetPackageType(shipment_advise_items.pack_type)"
          ),
          "pack_type_name",
        ],
      ],
      include: [
        {
          model: db.po_items,
        },
      ],
      where: {
        shipment_advise_id: shipment_advise_id, // The value for the 'shippment_advise_id' field
        status: { [Op.ne]: 0 }, // The 'status' field should not be equal to 0
      },
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Get Commercial Invoice
const getShippingAdviseTerms = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;
  try {
    if (!shippment_advise_master_id) {
      const result = await shippment_advise_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shippment_advise_master_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await shippment_advise_master.findByPk(
        shippment_advise_master_id,
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
const updateShippingAdviseTerm = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await shippment_advise_master.findByPk(
      shippment_advise_master_id
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
const deleteShippingAdviseTerm = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;
  try {
    const result = await shippment_advise_master.update(
      { status: 0 },
      {
        where: {
          shippment_advise_master_id: shippment_advise_master_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

ShippingAdviseController = {
  createShippingAdviseTerm,
  getShippingAdviseTerms,
  updateShippingAdviseTerm,
  deleteShippingAdviseTerm,
  getShippingAdviseTypeByID,
  createGrn,
  createCommercialInvoice,
  UpdateRotationNumber,
};

module.exports = ShippingAdviseController;
