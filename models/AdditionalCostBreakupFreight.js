module.exports = (sequelize, DataTypes) => {
  const additional_cost_breakup_freigth = sequelize.define(
    "additional_cost_breakup_freigth",
    {
      additional_cost_breakup_freigth_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      quo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quo_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reference_table_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      input_wt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      freight_charge_for: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      rate: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      total_freigth: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      shipment_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      heading: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      for_delivery_term: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      charges_by: {
        type: DataTypes.STRING(255),
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
      tableName: "additional_cost_breakup_freigth",
      timestamps: false,
    }
  );

  additional_cost_breakup_freigth.associate = (models) => {
    additional_cost_breakup_freigth.belongsTo(models.quotation_master, {
      foreignKey: "quo_id",
    });
  };

  return additional_cost_breakup_freigth;
};
