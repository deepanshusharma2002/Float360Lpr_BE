module.exports = (sequelize, DataTypes) => {
  const spo_items = sequelize.define(
    "spo_items",
    {
      spo_services_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      spo_master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cbm_container: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      rate: {
        type: DataTypes.DECIMAL(18, 4),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      other_charges: {
        type: DataTypes.DECIMAL(18, 4),
        allowNull: true,
      },
      shipping_line: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      eta: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ets: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      free_days_pod: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      free_days_pol: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      port_of_loading: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      port_of_delivery: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "spo_items",
      timestamps: true,
    }
  );

  return spo_items;
};
