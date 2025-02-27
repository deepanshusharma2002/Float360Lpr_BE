module.exports = (sequelize, DataTypes) => {
  const other_govt_charges = sequelize.define(
    "other_govt_charges",
    {
      other_govt_charges_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      agency: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      payment_mode_to: {
        type: DataTypes.STRING(155),
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
      tableName: "other_govt_charges",
      timestamps: true,
    }
  );

  return other_govt_charges;
};
