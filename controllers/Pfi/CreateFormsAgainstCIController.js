const db = require("../../models");
const { Op } = require("sequelize");

const CreateContainerAllocationByCiId = async (req, res, next) => {
  try {
    const { NafdacData } = req.body;

    if (!Array.isArray(NafdacData)) {
      return res
        .status(400)
        .json({ message: "Invalid data format. NafdacData must be an array." });
    }
    console.log(req.files);
    console.log("req.body", req.body);
    // Iterate over each item in NafdacData
    // if (NafdacData && NafdacData.length > 0) {
    //   await Promise.all(
    //     NafdacData.map(async (item) => {
    //       let result = await db.exchange_controll.create({
    //         pfi_id: item?.pfi_id,
    //         pfi_num: item?.pfi_num,
    //         ci_amount: item?.ci_amount,
    //         ci_id: item?.ci_id,
    //         ci_num: item?.ci_num,
    //         bl_awb_no: item?.bl_awb_no,
    //         ba_num: item?.ba_num,
    //         revised_eta: item?.revised_eta,
    //         tdo_dt: item?.tdo_dt,
    //         ecd_received: item?.ecd_received,
    //         ecd_received_dt: item?.ecd_received_dt,
    //         multi_upload_copy: item?.multi_upload_copy,
    //         submitted_to_bank: item?.submitted_to_bank,
    //         multi_upload_copy_bank: item?.multi_upload_copy_bank,
    //         status: 1,
    //       });
    //       let multi_upload_copy = item.multi_upload_copy.split(","),
    //       // let lastInsertedId = result.exchange_controll_id;

    //       // if (req.files && req.files.length > 0) {
    //       //   await Promise.all(
    //       //     req.files.map(async (file) => {
    //       //       file.originalname === 
    //       //       // const base64 = file.buffer.toString("base64");
    //       //       // await db.document.create({
    //       //       //   linked_id: lastInsertedId,
    //       //       //   table_name: "operations_shipping_expenses",
    //       //       //   type: "Operations Shipping Expense Doc / Sad Doc",
    //       //       //   doc_name: file.originalname,
    //       //       //   doc_base64: base64,
    //       //       //   status: 1,
    //       //       // });
    //       //     })
    //       //   );
    //       // }
        


    //     })
    //   );
    // }
  } catch (err) {
    next(err);
  }
};

CommercialInvoiceControllerCreate = {
  CreateContainerAllocationByCiId,
};

module.exports = CommercialInvoiceControllerCreate;
