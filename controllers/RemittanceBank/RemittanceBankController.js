const db = require("../../models");

// const getRemittanceBanks = async (req, res) => {
//   try {
//     const { remittance_bank_id } = req.params;
//     if (remittance_bank_id) {
//       const bank = await db.remittance_bank.findByPk(remittance_bank_id);

//       if (bank) {
//         res.status(200).json({
//           success: true,
//           data: bank,
//         });
//       } else {
//         res.status(404).json({
//           success: false,
//           message: "Remittance bank not found",
//         });
//       }
//     } else {
//       const remittanceBanks = await db.remittance_bank.findAll();

//       res.status(200).json({
//         success: true,
//         data: remittanceBanks,
//       });
//     }
//   } catch (error) {
//     console.error("Error in getRemittanceBanks:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error retrieving remittance banks",
//       error: error.message,
//     });
//   }
// };




//Get api 


const getRemittanceBanks = async (req, res) => {
  try {
    const { remittance_bank_id } = req.params;

    if (remittance_bank_id) {
      const bank = await db.remittance_bank.findByPk(remittance_bank_id);

      if (bank) {
        const responseData = {
          ...bank.toJSON(),
          head_bank_charges: bank.head_bank_charges || "", 
          amount_ngn: bank.amount_ngn || "",
        };

        res.status(200).json({
          success: true,
          data: responseData,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Remittance bank not found",
        });
      }
    } else {

      const remittanceBanks = await db.remittance_bank.findAll();

      
      const formattedBanks = remittanceBanks.map((bank) => ({
        ...bank.toJSON(),
        head_bank_charges: bank.head_bank_charges || "", 
        amount_ngn: bank.amount_ngn || "",
      }));

      res.status(200).json({
        success: true,
        data: formattedBanks,
      });
    }
  } catch (error) {
    console.error("Error in getRemittanceBanks:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving remittance banks",
      error: error.message,
    });
  }
};



const createRemittanceBank = async (req, res) => {
  try {
    const { bankCharges } = req.body;

    if (bankCharges && bankCharges.length > 0) {
      await Promise.all(
        bankCharges.map(async (service) => {
          await db.remittance_bank.create({
            pfi_num: service?.pfi_num,
            ci_id: service?.ci_id,
            ci_num: service?.ci_num,
            exchange_rate: service?.exchange_rate,
            remittance_amount_ngn: service?.remittance_amount_ngn,
            head_bank_charges: service?.head_bank_charges,
            amount_ngn: service?.amount_ngn,
            created_by: service?.created_by,
            updated_by: service?.updated_by,
            status : 1
          });
        })
      );
    }

    res.status(201).json({
      success: true,
      message: "Remittance bank created successfully",
      data: "jh",
    });
  } catch (error) {
    console.error("Error in createRemittanceBank:", error);
    res.status(500).json({
      success: false,
      message: "Error creating remittance bank",
      error: error.message,
    });
  }
};

const remittanceBankController = {
  getRemittanceBanks,
  createRemittanceBank,
};

module.exports = remittanceBankController;
