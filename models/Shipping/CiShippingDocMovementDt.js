const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const ci_shipping_doc_movement_dt = sequelize.define(
    "ci_shipping_doc_movement_dt",
    {
        ci_shipping_doc_movement_dt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      shipping_entry_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      activity_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      activity_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      courier_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      courier_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      tracking_no: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      activity_authority: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      status_activity: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(155),
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
      tableName: "ci_shipping_doc_movement_dt",
      timestamps: true,
    }
  );

  ci_shipping_doc_movement_dt.associate = (models) => {
    ci_shipping_doc_movement_dt.belongsTo(models.ci_doc_movement_master, {
      foreignKey: "shipping_entry_id",
    });
  };

  return ci_shipping_doc_movement_dt;
};
