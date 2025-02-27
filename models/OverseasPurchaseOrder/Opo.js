module.exports = (sequelize, DataTypes) => {
  const opo_master = sequelize.define(
    "opo_master",
    {
      opo_master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      opo_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      quo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quo_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      rfq_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rfq_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      opr_id: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      opr_ids: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      opr_num: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      opr_nums: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_cost: {
        type: DataTypes.DECIMAL(10, 2),
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
      status: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      unit_justification: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      opo_description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      procurement_justification: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "opo_master",
      timestamps: true,
    }
  );

  opo_master.associate = (models) => {
    opo_master.belongsTo(models.quotation_master, {
        foreignKey: "quo_id",
    });
    opo_master.belongsTo(models.OprMaster, {
        foreignKey: "opr_id",
    });
    opo_master.belongsTo(models.vendor, {
        foreignKey: "vendor_id",
    });
    opo_master.hasMany(models.opo_items, {
        foreignKey: "opo_id",
    });
    opo_master.hasMany(models.Pfi_master, {
      foreignKey: "opo_selected_id",
  });
  opo_master.hasMany(models.po_master, {
    foreignKey: "selected_opo_id",
});
}

  return opo_master;
};
