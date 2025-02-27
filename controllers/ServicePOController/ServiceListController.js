// const { service_list } = require("../../models");
// const sq = require("sequelize");

// // const createServiceList = async (req, res) => {
// //   try {
// //     console.log("req.body");
// //     console.log("req.body", req.files);
// //     const { po_id, po_num, servicearr } = req.body;

// //     console.dir(req.body, { depth: null });

// //     const newServiceList = await service_list.create({
// //       po_id,
// //       po_num,
// //       servicearr,
// //       status: 1,
// //       created_by: "Admin",
// //       updated_by: "Admin",
// //     });
    

// //     if (ContainerArr && ContainerArr.length > 0) {
// //       await Promise.all(
// //         ContainerArr.map(async (item) => {
// //           await freight_quote_service_po.create({
// //             cbm_container: item.container_type,
// //             rate: item.rate,
// //             port_of_delivery: item.free_days_at_pod,
// //             port_of_loading: item.port_of_loading,
// //             // free_days: item.free_days_at_pod,
// //             currency: item.currency,
// //             other_charges: item.other_charge,
// //             type: quoteType,
// //             status: 1,
// //           });
// //         })
// //       );
// //     }

// //     res.status(201).json({ message: "Services Generated Successfully" });
// //   } catch (err) {
// //     console.error("Error in createServiceList:", err); // Enhanced error logging
// //     res.status(500).json({ message: "Services couldn't be generated" });
// //   }
// // };

// const createServiceList = async (req, res) => {
//   try {
//     console.log("req.body:", req.body);

//     const { po_id, po_num, servicearr } = req.body;

//     console.dir(req.body, { depth: null });

//     const newServiceList = await service_list.create({
//       po_id,
//       po_num,
//       servicearr,
//       status: 1,
//       created_by: "Admin",
//       updated_by: "Admin",
//     });

    // if (servicearr && servicearr.length > 0) {
    //   await Promise.all(
    //     servicearr.map(async (service) => {

    //       await service_list.create({
    //         service_name: service.service,
    //         rate: service.rate,
    //         purchase_quote_rate: service.purchaseQuoteRate,
    //         po_id: po_id,
    //         status: 1,
    //         created_by: "Admin",
    //         updated_by: "Admin",
    //       });
    //     })
    //   );
    // }

//     res.status(201).json({ message: "Services Generated Successfully" });
//   } catch (err) {
//     console.error("Error in createServiceList:", err);
//     res.status(500).json({ message: "Services couldn't be generated" });
//   }
// };


// const serviceList = {
//   createServiceList,
// };
// module.exports = serviceList;


const { service_list } = require("../../models"); // Correct model import
const sq = require("sequelize");

const createServiceList = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const { po_id, po_num, servicearr } = req.body;

   if (servicearr && servicearr.length > 0) {
     await Promise.all(
       servicearr.map(async (service) => {
         await service_list.create({
           po_id,
           po_num,
           service: service.service,
           rate: service.rate,
           purchaseQuoteRate: service.purchaseQuoteRate,
           status: 1,
           created_by: "Admin",
           updated_by: "Admin",
         });
       })
     );
   }

    // Send response if successful
    res.status(201).json({ message: "Services Generated Successfully" });
  } catch (err) {
    console.error("Error in createServiceList:", err);
    res.status(500).json({ message: "Services couldn't be generated" });
  }
};

const serviceList = {
  createServiceList,
};

module.exports = serviceList;
