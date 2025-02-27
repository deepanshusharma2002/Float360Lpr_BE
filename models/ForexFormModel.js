const { forex_form } = require(".");

module.exports = (sequelize, DataTypes) => {
  const forexAmount = sequelize.define(
    "forexAmount",
    {
      forex_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pfi_num: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      ci_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      type_of_purchase: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pfi_currency: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      forex_purchase_from_bank: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      forexPurchaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      forexMaturityDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      purchased_amount: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true,
      },
      forex_rate: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true,
      },
      premium_rate: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true,
      },
      premium_amount: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true,
      },
      bank_charges_amount: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true,
      },
      bank_ref_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      forex_purchase_account_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bank_charges_ac_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      premium_paid_ac_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      premium_paid_through: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },

      form_m_bank_name: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },

      premium_paid_from: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },

      status: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
    },
    {
      tableName: "forexAmount",
      timestamps: true,
    }
  );

  // Define association in models/index.js
  forexAmount.associate = (models) => {
    forexAmount.belongsTo(models.Pfi_master, {
      foreignKey: "pfi_id",
    });
  };

  return forexAmount;
};
