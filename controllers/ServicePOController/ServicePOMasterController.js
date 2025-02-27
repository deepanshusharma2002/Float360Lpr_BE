const { spo_master, spo_items } = require("../../models");
const sq = require("sequelize");

// const createServicePO = async (req, res) => {
//   try {
//     console.log("req.body");

//     const {
//       po_id,
//       party_name,
//       party_add,
//       party_email,
//       party_contact,
//       quote_date,
//       payment_term,
//       rate_validity_from,
//       rate_validity_to,
//       qoute_remarks,
//       vendor_quote_ref_no,
//       ServiceItemArr,
//       //   fileArray,
//       quoteType,
//       po_remarks,
//     } = req.body;

//     console.dir(req.body, { depth: null });

//     // if (!po_id || !party_name || !quote_date ) {
//     //   return res
//     //     .status(400)
//     //     .json({ message: "Please provide all the required fields for generating PO" });
//     // }
//     if (!ServiceItemArr || ServiceItemArr.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Please provide Services" });
//     }

//     const newQuotation = await spo_master.create({
//       po_id,
//       party_name,
//       party_add,
//       party_email,
//       party_contact,
//       quote_date,
//       payment_term,
//       rate_validity_from,
//       rate_validity_to,
//       vendor_quote_ref_no,
//       qoute_remarks: qoute_remarks,
//       po_remarks: po_remarks,
//       status: 1,
//       quote_type: quoteType,
//     });
//     const lasteInsdertedId = newQuotation.spo_master_id;

//     console.log(ServiceItemArr && ServiceItemArr.length > 0);

//     if (ServiceItemArr && ServiceItemArr.length > 0) {
//       await Promise.allSettled(
//         ServiceItemArr.map(async (item) => {
//           await spo_items.create({
//             spo_master_id: lasteInsdertedId,
//             cbm_container: item.container_type,
//             shipping_line: item.shipping_line,
//             currency: item.currency,
//             rate: item.rate,
//             other_charges: item.other_charge,
//             ets: item.ets,
//             eta: item.eta,
//             free_days_pol: item.free_days_at_pol,
//             free_days_pod: item.free_days_at_pod,
//             port_of_loading: item.port_of_loading,
//             port_of_delivery: item.free_days_at_pod,

//             type: quoteType,
//             status: 1,
//           });
//         })
//       );
//     }


//     res.status(201).json({ message: "Service PO Generated Successfully" });
//   } catch (err) {
//     console.error(
//       "Error in the creation of Service PO:",
//       err.message,
//       err.stack
//     ); // Enhanced error logging
//     res.status(500).json({ message: "SPO couldn't be generated" });
//   }
// };

const createServicePO = async (req, res) => {
  try {
    const {
      po_id,
      party_name,
      party_add,
      party_email,
      party_contact,
      quote_date,
      payment_term,
      rate_validity_from,
      rate_validity_to,
      qoute_remarks,
      vendor_quote_ref_no,
      ServiceItemArr,
      quoteType,
      po_remarks,
    } = req.body;

    // Validate required fields
    if (!po_id || !party_name || !quote_date) {
      return res
        .status(400)
        .json({
          message: "Please provide all the required fields for generating PO",
        });
    }

    if (!ServiceItemArr || ServiceItemArr.length === 0) {
      return res.status(400).json({ message: "Please provide Services" });
    }

    // Create new quotation
    const newQuotation = await spo_master.create({
      po_id,
      party_name,
      party_add,
      party_email,
      party_contact,
      quote_date,
      payment_term,
      rate_validity_from,
      rate_validity_to,
      vendor_quote_ref_no,
      qoute_remarks,
      po_remarks,
      status: 1,
      quote_type: quoteType,
    });

    const lasteInsdertedId = newQuotation.spo_master_id;

    // Create service items
    if (ServiceItemArr && ServiceItemArr.length > 0) {
      await Promise.allSettled(
        ServiceItemArr.map(async (item) => {
          await spo_items.create({
            spo_master_id: lasteInsdertedId,
            cbm_container: item.container_type,
            shipping_line: item.shipping_line,
            currency: item.currency,
            currency_of_other_charges: item.currency_of_other_charges,
            rate: item.rate,
            other_charges: item.other_charge,
            ets: item.ets,
            eta: item.eta,
            free_days_pol: item.free_days_at_pol,
            free_days_pod: item.free_days_at_pod,
            port_of_loading: item.port_of_loading,
            port_of_delivery: item.free_days_at_pod,
            type: quoteType,
            status: 1,
          });
        })
      );
    }

    res.status(201).json({ message: "Service PO Generated Successfully" });
  } catch (err) {
    console.error(
      "Error in the creation of Service PO:",
      err.message,
      err.stack
    );
    res
      .status(500)
      .json({ message: "SPO couldn't be generated", error: err.message });
  }
};

const getServicePO = async (req, res) => {
  try {
    const { po_id } = req.query; // Optionally filter by po_id

    let query = {};
    if (po_id) {
      query.po_id = po_id;
    }

    const servicePOs = await spo_master.findAll({
      where: query,
      include: [
        {
          model: spo_items,
          // as: "service_items", // Ensure this alias matches your model association
        },
      ],
      order: [["quote_date", "DESC"]],
    });

    if (!servicePOs || servicePOs.length === 0) {
      return res.status(404).json({ message: "No Service POs found" });
    }

    res.status(200).json(servicePOs);
  } catch (err) {
    console.error("Error fetching Service POs:", err.message, err.stack);
    res.status(500).json({ message: "Failed to fetch Service POs"+err });
  }
};

module.exports = { getServicePO };


const servicePOController = {
  createServicePO,
  getServicePO,
};
module.exports = servicePOController;
