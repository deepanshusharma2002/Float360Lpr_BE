module.exports = (sequelize, DataTypes) => {
  const letter_of_credit = sequelize.define(
    "letter_of_credit",
    {
      letter_of_credit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      application_date: {
        type: DataTypes.DATE,
        allowNull: true, // Make it true if you want to allow null values
      },
      lc_type: {
        type: DataTypes.STRING(50), // Adjust the length as needed
        allowNull: true,
      },
      lc_amount: {
        type: DataTypes.DECIMAL(18, 2), // You can adjust the precision as needed
        allowNull: true,
      },
      latest_shipment_date: {
        type: DataTypes.DATE,
        allowNull: true, // Adjust based on your requirement
      },
      lc_expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lc_toleranceL: {
        type: DataTypes.STRING(50), // Adjust type if needed
        allowNull: true,
      },
      tolerance_value: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      payment_term: {
        type: DataTypes.STRING(100), // Adjust type and size as needed
        allowNull: true,
      },
      tenor_days: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      off_shore_charges_borne_by: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      confirmation_charges: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      confirm_bank_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      confirm_bank_swift_code: {
        type: DataTypes.STRING(20), // SWIFT code length varies but generally around 20 characters
        allowNull: true,
      },
      lc_advising_bank_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lc_advising_bank_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      lc_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      lc_issue_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lc_status: {
        type: DataTypes.STRING(20), // For status, you might want to limit it to a small set of values
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
      tableName: "letter_of_credit",
      timestamps: true,
    }
  );


  letter_of_credit.associate = (models) => {
    letter_of_credit.hasMany(models.document, {
      foreignKey: 'linked_id',
    });

    letter_of_credit.belongsTo(models.Pfi_master, {
      foreignKey: 'pfi_id',  // Ensure this matches the foreign key in pfi_master
    });
  };
  return letter_of_credit;
};
