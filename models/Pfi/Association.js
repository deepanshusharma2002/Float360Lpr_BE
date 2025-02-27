const db = require("../index");
const {
  commercial_invoice,
  Pfi_master,
  insurance,
  form_m,
  letter_of_credit,
  son_pfi
} = db;

// Define associations
commercial_invoice.belongsTo(Pfi_master, { foreignKey: 'pfi_id' });
Pfi_master.hasOne(commercial_invoice, { foreignKey: 'pfi_id' });

commercial_invoice.belongsTo(form_m, { foreignKey: 'pfi_id' });
form_m.hasOne(commercial_invoice, { foreignKey: 'pfi_id' });

commercial_invoice.belongsTo(insurance, { foreignKey: 'pfi_id' });
insurance.hasOne(commercial_invoice, { foreignKey: 'pfi_id' });

commercial_invoice.belongsTo(letter_of_credit, { foreignKey: 'pfi_id' });
letter_of_credit.hasOne(commercial_invoice, { foreignKey: 'pfi_id' });

commercial_invoice.belongsTo(son_pfi, { foreignKey: 'pfi_id' });
son_pfi.hasOne(commercial_invoice, { foreignKey: 'pfi_id' });

module.exports = {
  commercial_invoice,
  Pfi_master,
  form_m,
  insurance,
  letter_of_credit,
  son_pfi
};