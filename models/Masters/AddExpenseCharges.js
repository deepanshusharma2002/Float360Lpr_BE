module.exports = (sequelize, DataTypes) => {
    const add_expense_charges_master = sequelize.define(
      "add_expense_charges_master",
      {
        add_expense_charges_master_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        add_expense_charges_name: {
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
        tableName: "add_expense_charges_master",
        timestamps: false,
      }
    );
  
    return add_expense_charges_master;
  };
  