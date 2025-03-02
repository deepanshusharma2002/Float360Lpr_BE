module.exports = (sequelize, DataTypes) => {
    const additionalChargesLpr = sequelize.define(
      "additional_charges_lpr",
      {
        additional_charges_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        reference_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        reference_type: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        reference_tableName: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        charged_by: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        delivery_term: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        quotation_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        quotation_number: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        headOfExpense: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        vat: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        amtInclVat: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        roundOff: {
          type: DataTypes.DECIMAL(10, 2),
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
        tableName: "additional_charges_lpr",
        timestamps: true,
      }
    );
    additionalChargesLpr.associate = (models) => {
      additionalChargesLpr.belongsTo(models.quotation_master, {
        foreignKey: "quotation_id",
      });
    };
  
    return additionalChargesLpr;
};
