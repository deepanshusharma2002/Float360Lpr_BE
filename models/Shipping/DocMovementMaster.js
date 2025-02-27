const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const ci_doc_movement_master = sequelize.define(
    "ci_doc_movement_master",
    {
      shipping_entry_id: {
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
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      idec_applicable: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      idec_number: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      fast_track_clearance: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      nafdac_clearance_req: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      agency: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      agent: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      cria_clearance_req: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      cria_doc_available: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      son_clearance_req: {
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
      tableName: "ci_doc_movement_master",
      timestamps: true,
    }
  );

  ci_doc_movement_master.associate = (models) => {
    ci_doc_movement_master.belongsTo(models.commercial_invoice, {
      foreignKey: "ci_id",
    });
    ci_doc_movement_master.belongsTo(models.Pfi_master, {
      foreignKey: "pfi_id",
    });
    ci_doc_movement_master.hasMany(models.ci_shipping_doc_movement_dt, {
      foreignKey: "shipping_entry_id",
    });
  };

  return ci_doc_movement_master;
};
