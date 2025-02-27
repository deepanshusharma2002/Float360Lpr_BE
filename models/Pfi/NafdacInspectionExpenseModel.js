module.exports = (sequelize, DataTypes) => {
  const nafdac_inspection_expense = sequelize.define(
    "nafdac_inspection_expense",
    {
      nafdac_inspection_expense_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nafdac_clearance_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bill_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      bill_dt: {
        type: DataTypes.DATEONLY, // Changed to DATEONLY if only date is needed
        allowNull: true,
      },
      Amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      vat: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      inv_total: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      remita_charges: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      remita_vat: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      payment_total: {
        type: DataTypes.DECIMAL(18, 2), // Correcting the duplicated `payment_total` field type
        allowNull: true,
      },
      payment_dt: {
        type: DataTypes.DATEONLY, // Changed to DATEONLY if only date is needed
        allowNull: true,
      },
      ref_no: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payment_bank: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payment_bank_account_num: {
        type: DataTypes.STRING(50), // Changed from DATE to STRING to store account number
        allowNull: true,
      },
      penalty_amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      penalty_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      penalty_vat: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      penalty_total: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      penalty_remita_charges: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      penalty_remita_vat: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      penalty_payment_total: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      penalty_approved_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      penalty_approved_dt: {
        type: DataTypes.DATEONLY, // Changed to DATEONLY if it's just a date
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "nafdac_inspection_expense",
      timestamps: true,
    }
  );

  return nafdac_inspection_expense;
};
