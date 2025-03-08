module.exports = (sequelize, DataTypes) => {
    const grn_additional_charge = sequelize.define(
      "grn_additional_charge",
      {
        grn_additional_charge_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        grn_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "grn_master",
            key: "grn_id",
          },
        },
        head_of_expense: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        vat: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
        },
        amt_incl_vat: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        round_off: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "grn_additional_charges",
        timestamps: true,
      }
    );
  
    return grn_additional_charge;
  };