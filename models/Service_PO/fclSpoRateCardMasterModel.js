module.exports = (sequelize, DataTypes) => {
    const fcl_spo_rate_card_master = sequelize.define(
      "fcl_spo_rate_card_master",
      {
        fcl_spo_rate_card_master_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          quote_ref_no: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          quote_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
          },
          rate_valid_from: {
            type: DataTypes.DATEONLY,
            allowNull: true,
          },
          rate_valid_till: {
            type: DataTypes.DATEONLY,
            allowNull: true,
          },
          port_of_loading: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          port_of_discharge: {
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
        tableName: "fcl_spo_rate_card_master",
        timestamps: false,
      }
    );

    fcl_spo_rate_card_master.associate = (models) => {
      fcl_spo_rate_card_master.hasMany(models.fcl_spo_rate_card_container, {
        foreignKey: "fcl_spo_rate_card_master_id",
      });
    };
    return fcl_spo_rate_card_master;
  };
  