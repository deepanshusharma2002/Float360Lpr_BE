module.exports = (sequelize, DataTypes) => {
  const insurance = sequelize.define(
    "insurance",
    {
      insurance_id: {
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
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pfi_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pfi_value: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      bank: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      application_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      insurance_company: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      insurance_clause: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      insurance_premium_rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      insurance_certificate_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      exchange_rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      sum_insured_usd: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      sum_insured_naira: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      premium_amount_naira: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      invoice_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      form_applied_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      updated_on: {
        type: DataTypes.DATE,
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
      tableName: "insurance",
      timestamps: false,
    }
  );
  insurance.associate = (models) => {
    insurance.hasMany(models.document, {
      foreignKey: 'linked_id',
    });

    insurance.belongsTo(models.Pfi_master, {
      foreignKey: 'pfi_id',  // Ensure this matches the foreign key in pfi_master
    });
  }; 


  return insurance;
};
