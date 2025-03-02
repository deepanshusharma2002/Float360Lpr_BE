  module.exports = (sequelize, DataTypes) => {
    const transportationChargesLpr = sequelize.define(
      "transportation_charges_lpr",
      {
        transportation_charges_id: {
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
        no_of_truck: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        truck_type: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        transportation_rate: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        transportation_amt: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        vat: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        total_amt_incl_vat: {
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
        tableName: "transportation_charges_lpr",
        timestamps: true,
      }
    );
    transportationChargesLpr.associate = (models) => {
      transportationChargesLpr.belongsTo(models.quotation_master, {
        foreignKey: "quotation_id",
      });
    };
  
  
    return transportationChargesLpr;
};
