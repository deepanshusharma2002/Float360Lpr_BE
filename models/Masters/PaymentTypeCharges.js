module.exports = (sequelize, DataTypes) => {
    const payment_type_charges_master = sequelize.define(
      "payment_type_charges_master",
      {
        payment_type_charges_master_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        payment_type_charges_name: {
          type: DataTypes.STRING(100),
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
        tableName: "payment_type_charges_master",
        timestamps: false,
      }
    );
  
    return payment_type_charges_master;
  };
  