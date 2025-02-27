module.exports = (sequelize, DataTypes) => {
    const fcl_spo_rate_card_container = sequelize.define(
      "fcl_spo_rate_card_container",
      {
        fcl_spo_rate_card_container_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        fcl_spo_rate_card_master_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        container_type: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        shipping_line: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        currency: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        rate: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ets: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        eta: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        sailing_days: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        free_days_at_port_of_loading: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        free_days_at_port_of_discharge: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        remarks: {
          type: DataTypes.STRING(555),
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
        tableName: "fcl_spo_rate_card_container",
        timestamps: false,
      }
    );
    return fcl_spo_rate_card_container;
  };
  