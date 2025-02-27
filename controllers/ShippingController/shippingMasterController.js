const { where } = require("sequelize");
const db = require("../../models");

//add shipping entry
exports.addshippingEntry = async (req, res) => {
  try {
    const { ci_id, pfi_id, pfi_no, ci_num, oblData, activity_authority } =
      req.body;
    console.log("dfghfjdshguufydsg");

    const transaction = await db.sequelize.transaction(); // Start a transaction
    let lastInsertedValue = 0;

    try {
      const result = await db.ci_doc_movement_master.findOne({
        where: {
          ci_id: ci_id,
          pfi_id,
        },
        transaction: transaction, // Pass the transaction here
      });

      if (result) {
        lastInsertedValue = result.shipping_entry_id;
      } else {
        let response = await db.ci_doc_movement_master.create({
          ci_id,
          pfi_id,
          pfi_num: pfi_no,
          ci_num,
          status: 1,
          transaction: transaction, // Pass the transaction here
        });
        lastInsertedValue = response.shipping_entry_id;
      }

      if (oblData.length && Array.isArray(oblData)) {
        console.log("huhfd");
        for (let key in oblData) {
          console.log("Array", oblData[key]);
          let exisitingDt = await db.ci_shipping_doc_movement_dt.findAll({
            where: {
              ci_id,
              pfi_id,
              activity_name: Object.keys(oblData[key])[0],
            },
            transaction: transaction, // Pass the transaction here
          });

          if (exisitingDt.length > 0) {
            await db.ci_shipping_doc_movement_dt.update(
              {
                status: 2,
              },
              {
                where: {
                  ci_id,
                  pfi_id,
                  activity_name: Object.keys(oblData[key])[0],
                },
                transaction: transaction, // Pass the transaction here
              }
            );

            await db.ci_shipping_doc_movement_dt.create({
              shipping_entry_id: lastInsertedValue,
              ci_id,
              pfi_id,
              activity_name: Object.keys(oblData[key])[0],
              activity_date: Object.values(oblData[key])[0],
              courier_name: oblData[key].courier_name,
              courier_date: oblData[key].courier_date,
              tracking_no: oblData[key].tracking_no,
              activity_authority: activity_authority,
              status_activity: exisitingDt.length,
              status: 1,
              transaction: transaction, // Pass the transaction here
            });
          } else {
            await db.ci_shipping_doc_movement_dt.create({
              shipping_entry_id: lastInsertedValue,
              ci_id,
              pfi_id,
              activity_name: Object.keys(oblData[key])[0],
              activity_date: Object.values(oblData[key])[0],
              courier_name: oblData[key].courier_name,
              courier_date: oblData[key].courier_date,
              tracking_no: oblData[key].tracking_no,
              activity_authority: activity_authority,
              status_activity: 1,
              status: 1,
              transaction: transaction, // Pass the transaction here
            });
          }
        }
      } else {
        console.log("oblData", oblData);
        for (let key in oblData) {
          console.log("eta_revising_dt", oblData[key]);
          let exisitingDt = await db.ci_shipping_doc_movement_dt.findAll({
            where: {
              ci_id,
              pfi_id,
              activity_name: key,
            },
            transaction: transaction, // Pass the transaction here
          });

          if (key === "eta_revising_dt") {
            await db.commercial_invoice.update(
              {
                eta_date: oblData[key],
              },
              {
                where: {
                  commercial_invoice_id: ci_id,
                },
                transaction: transaction, // Pass the transaction object
              }
            );
          }

          if (exisitingDt.length > 0) {
            await db.ci_shipping_doc_movement_dt.update(
              {
                status: 2,
              },
              {
                where: { ci_id, pfi_id, activity_name: key },
                transaction: transaction, // Pass the transaction here
              }
            );

            await db.ci_shipping_doc_movement_dt.create({
              shipping_entry_id: lastInsertedValue,
              ci_id,
              pfi_id,
              activity_name: key,
              activity_date: oblData[key],
              activity_authority: activity_authority,
              status_activity: exisitingDt.length,
              status: 1,
              transaction: transaction, // Pass the transaction here
            });
          } else {
            await db.ci_shipping_doc_movement_dt.create({
              shipping_entry_id: lastInsertedValue,
              ci_id,
              pfi_id,
              activity_name: key,
              activity_date: oblData[key],
              activity_authority: activity_authority,
              status_activity: 1,
              status: 1,
              transaction: transaction, // Pass the transaction here
            });
          }
        }
      }

      // Commit the transaction if all operations are successful
      await transaction.commit();

      res.status(201).json({
        status: "Success",
        message: "Successfully completed the shipping entry.",
      });
    } catch (err) {
      // Rollback the transaction in case of error
      await transaction.rollback();

      console.log("Error in shipping Entry");
      console.log("Error:", err);

      res.status(500).json({
        status: "Error",
        message: "An error occurred during the process.",
      });
    }
  } catch (err) {
    console.log("Error starting transaction:", err);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while initializing the transaction.",
    });
  }

  // try {
  //   const { ci_id, pfi_id, pfi_no, ci_num, oblData, activity_authority } =
  //     req.body;

  //   let lastInsertedValue = 0;
  //   const result = await db.ci_doc_movement_master.findOne({
  //     where: {
  //       ci_id: ci_id,
  //       pfi_id,
  //     },
  //   });

  //   if (result) {
  //     lastInsertedValue = result.shipping_entry_id;
  //   } else {
  //     let response = await db.ci_doc_movement_master.create({
  //       ci_id,
  //       pfi_id,
  //       pfi_num: pfi_no,
  //       ci_num,
  //       status: 1,
  //     });
  //     lastInsertedValue = response.shipping_entry_id;
  //   }
  //   if (oblData.length && Array.isArray(oblData)) {
  //     for (let key in oblData) {
  //       let exisitingDt = await db.ci_shipping_doc_movement_dt.findAll({
  //         where: {
  //           ci_id,
  //           pfi_id,
  //           activity_name: Object.keys(oblData[key])[0],
  //         },
  //       });

  //       if (exisitingDt.length > 0) {
  //         await db.ci_shipping_doc_movement_dt.update(
  //           {
  //             status: 2,
  //           },
  //           {
  //             where: {
  //               ci_id,
  //               pfi_id,
  //               activity_name: Object.keys(oblData[key])[0],
  //             },
  //           }
  //         );

  //         await db.ci_shipping_doc_movement_dt.create({
  //           shipping_entry_id: lastInsertedValue,
  //           ci_id,
  //           pfi_id,
  //           activity_name: Object.keys(oblData[key])[0],
  //           activity_date: Object.values(oblData[key])[0],
  //           courier_name: oblData[key].courier_name,
  //           courier_date: oblData[key].courier_date,
  //           tracking_no: oblData[key].tracking_no,
  //           activity_authority: activity_authority,
  //           status_activity: exisitingDt.length,
  //           status: 1,
  //         });
  //       } else {
  //         await db.ci_shipping_doc_movement_dt.create({
  //           shipping_entry_id: lastInsertedValue,
  //           ci_id,
  //           pfi_id,
  //           activity_name: Object.keys(oblData[key])[0],
  //           activity_date: Object.values(oblData[key])[0],
  //           courier_name: oblData[key].courier_name,
  //           courier_date: oblData[key].courier_date,
  //           tracking_no: oblData[key].tracking_no,
  //           activity_authority: activity_authority,
  //           status_activity: 1,
  //           status: 1,
  //         });
  //       }
  //     }
  //     res.status(201).json({
  //       status: "Sucess",
  //       message: "Successfully",
  //     });
  //   } else {
  //     for (let key in oblData) {
  //       let exisitingDt = await db.ci_shipping_doc_movement_dt.findAll({
  //         where: {
  //           ci_id,
  //           pfi_id,
  //           activity_name: key,
  //         },
  //       });

  //       if (exisitingDt.length > 0) {
  //         await db.ci_shipping_doc_movement_dt.update(
  //           {
  //             status: 2,
  //           },
  //           {
  //             where: { ci_id, pfi_id, activity_name: key },
  //           }
  //         );

  //         await db.ci_shipping_doc_movement_dt.create({
  //           shipping_entry_id: lastInsertedValue,
  //           ci_id,
  //           pfi_id,
  //           activity_name: key,
  //           activity_date: oblData[key],
  //           activity_authority: activity_authority,
  //           status_activity: exisitingDt.length,
  //           status: 1,
  //         });
  //       } else {
  //         await db.ci_shipping_doc_movement_dt.create({
  //           shipping_entry_id: lastInsertedValue,
  //           ci_id,
  //           pfi_id,
  //           activity_name: key,
  //           activity_date: oblData[key],
  //           activity_authority: activity_authority,
  //           status_activity: 1,
  //           status: 1,
  //         });
  //       }
  //     }
  //     res.status(201).json({
  //       status: "Sucess",
  //       message: "Successfully",
  //     });
  //   }
  // } catch (err) {
  //   console.log("Erro in shipping Entry");
  //   console.log("Error:", err);
  // }
};

exports.addOBLshippingEntry = async (req, res) => {
  try {
    const {
      ci_id,
      pfi_id,
      pfi_no,
      ci_num,
      nafdac,
      son,
      idec,
      idec_name,
      cria,
      cria_doc_available,
      fast_track_clearing,
      agency_name,
      agent,
    } = req.body;
    console.log(req.body);

    const result = await db.ci_doc_movement_master.findOne({
      where: {
        ci_id: ci_id,
        pfi_id,
      },
    });

    if (result) {
      lastInsertedValue = result.shipping_entry_id;

      await db.ci_doc_movement_master.update(
        {
          nafdac_clearance_req: nafdac,
          son_clearance_req: son,
          idec_applicable: idec,
          idec_number: idec_name,
          cria_clearance_req: cria,
          cria_doc_available: cria_doc_available,
          fast_track_clearance: fast_track_clearing,
          agency: agency_name,
          agent: agent,
          status: 1,
        },
        {
          where: { shipping_entry_id: result.shipping_entry_id },
        }
      );
    } else {
      await db.ci_doc_movement_master.create({
        ci_id,
        pfi_id,
        pfi_num: pfi_no,
        ci_num,
        nafdac_clearance_req: nafdac,
        son_clearance_req: son,
        idec_applicable: idec,
        idec_number: idec_name,
        cria_clearance_req: cria,
        cria_doc_available: cria_doc_available,
        fast_track_clearance: fast_track_clearing,
        agency: agency_name,
        agent: agent,
        status: 1,
      });
    }

    res.status(201).json({
      status: "Sucess",
      message: "Sucessfully",
    });
  } catch (err) {
    console.log("Erro in shipping Entry");
    console.log("Error:", err);
  }
};

// Add Eta in shhipin recorad againg ci_ic
exports.addETAinShippingMaster = async (req, res) => {
  {
    try {
      const { pfi_id, eta, updated_by } = req.body;
      const existingRecord = await db.ci_doc_movement_master.findOne({
        where: { pfi_id },
      });

      if (existingRecord) {
        await db.ci_doc_movement_master.update(
          { eta, updated_by },
          {
            where: { pfi_id },
          }
        );
      } else {
        await db.ci_doc_movement_master.create({ pfi_id, eta, updated_by });
      }
      res.status(201).json({
        status: "Sucess",
        message: "Shipping Entry added Successfully inShipping Master",
      });
    } catch (err) {
      console.log("Error in shipping Entry add eta");
      console.log("Error:", err);
    }
  }
};

// Create a new shipping info record
exports.createShippingMaster = async (req, res) => {
  try {
    console.log("Gnerate Shipping Entry");
    console.log(req.body);
    await db.ci_doc_movement_master.create(req.body);
    res.status(201).json({ msg: "OBL Receipt APAPA Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new shipping info record
exports.addcomplianceinShippingMaster = async (req, res) => {
  try {
    const {
      ci_id,
      son,
      idec,
      cria,
      fast_track_clearing,
      agency,
      agent,
      updated_by,
    } = req.body;

    console.log("Create Add compplaince-------------");
    console.log(req.body);

    await db.ci_doc_movement_master.update(
      {
        nafdac,
        son,
        idec,
        cria,
        fast_track_clearing,
        agency,
        agent,
        updated_by,
      },
      {
        where: { ci_id },
      }
    );

    res.status(200).json({ msg: "Shipping Entry APAPA Updated Success fully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update terminal view (discharge and transfer terminal) in the shipping record against ci_id
exports.updateShippingDetailsByCiId = async (req, res) => {
  console.log(req.body);
  try {
    const { ci_id } = req.body;
    const {
      discharge_terminal,
      transfer_terminal,
      supplier_name,
      ci_date,
      bl_no,
      bl_date,
      pfi_num,
      formm_num,
      formm_date,
      no_of_container,
      agency_name,
      free_days,
      cbm,
      eta,
      updated_by,
    } = req.body;

    // Dynamically build the update object with only the fields that are not undefined or null
    const updateFields = {};

    if (discharge_terminal !== undefined)
      updateFields.discharge_terminal = discharge_terminal;
    if (transfer_terminal !== undefined)
      updateFields.transfer_terminal = transfer_terminal;
    if (supplier_name !== undefined) updateFields.supplier_name = supplier_name;
    if (ci_date !== undefined) updateFields.ci_date = ci_date;
    if (bl_no !== undefined) updateFields.bl_no = bl_no;
    if (bl_date !== undefined) updateFields.bl_date = bl_date;
    if (pfi_num !== undefined) updateFields.pfi_num = pfi_num;
    if (formm_num !== undefined) updateFields.formm_num = formm_num;
    if (formm_date !== undefined) updateFields.formm_date = formm_date;
    if (no_of_container !== undefined)
      updateFields.no_of_container = no_of_container;
    if (agency_name !== undefined) updateFields.agency_name = agency_name;
    if (free_days !== undefined) updateFields.free_days = free_days;
    if (cbm !== undefined) updateFields.cbm = cbm;
    if (eta !== undefined) updateFields.eta = eta;
    updateFields.updated_by = updated_by;

    // Perform the update
    const [updated] = await db.ci_doc_movement_master.update(updateFields, {
      where: { ci_id },
    });

    if (updated) {
      const updatedShippingRecord = await db.ci_doc_movement_master.findOne({
        where: { ci_id },
      });
      res.status(200).json({
        message: "Shipping details updated successfully",
        data: updatedShippingRecord,
      });
    } else {
      res.status(404).json({ message: "Shipping record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all shipping info records
exports.getAllShippingMasters = async (req, res) => {
  try {
    const ShippingMasters = await db.ci_doc_movement_master.findAll({
      include: [
        { model: commercial_invoice },
        {
          model: Pfi_master,
          include: [
            { model: insurance },
            { model: form_m },
            { model: letter_of_credit },
            { model: son_pfi },
          ],
        },
        // { model: form_m, letter_of_credit, as: "FormM" },
        // { model: letter_of_credit, as: "LC" },
      ],
    });
    res.status(200).json(ShippingMasters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single shipping info record by ci_id
exports.getShippingMasterByCiId = async (req, res) => {
  try {
    const { ci_id } = req.query; // Extract ci_id from query parameters
    if (!ci_id) {
      return res
        .status(400)
        .json({ message: "ci_id query parameter is required" });
    }

    const Shipping = await db.ci_doc_movement_master.findOne({
      where: { ci_id },
    });

    if (!db.ci_doc_movement_master) {
      return res
        .status(404)
        .json({ message: "db.ci_doc_movement_master not found" });
    }

    res.status(200).json(Shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single shipping info record by id
exports.getShippingById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.ci_doc_movement_master.findByPk(id);
    if (!db.ci_doc_movement_master) {
      return res
        .status(404)
        .json({ message: "db.ci_doc_movement_master not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shipping info record by id
exports.updateShippingDetailsByCiId = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      shipping_doc_receipt_date_ho,
      received_from_bank_date_ho,
      obl_sent_port_date,
      obl_received_date,
    } = req.body;
    const [updated] = await db.ci_doc_movement_master.update(
      {
        shipping_doc_receipt_date_ho,
        received_from_bank_date_ho,
        obl_sent_port_date,
        obl_received_date,
      },
      {
        where: { ci_id: id },
      }
    );
    if (updated) {
      const result = await db.ci_doc_movement_master.findByPk(id);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "db.ci_doc_movement_master not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a shipping info record by id
exports.deleteshipping = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await shipping.destroy({
      where: { ci_id: id },
    });
    if (deleted) {
      res.status(204).json({ message: "shipping deleted successfully" });
    } else {
      res.status(404).json({ message: "shipping not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
