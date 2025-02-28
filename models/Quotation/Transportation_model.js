  module.exports = (sequelize, DataTypes) => {
    const transportationCharges = sequelize.define(
      "transportation_charges",
      {
        transportation_charges_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        reference_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        reference_type: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        reference_tableName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        charged_by: {
          type: DataTypes.STRING(55),
          allowNull: false,
        },
        delivery_term: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        quotation_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quotation_number: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        no_of_truck: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        truck_type: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        transportation_rate: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        transportation_amt: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        vat: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        total_amt_incl_vat: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
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
        tableName: "transportation_charges",
        timestamps: true,
      }
    );
  
    return transportationCharges;
};
