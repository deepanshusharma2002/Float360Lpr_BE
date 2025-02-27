module.exports = (sequelize, DataTypes) => {
    const shippment_advise_master = sequelize.define(
      "shippment_advise_master",
      {
        shippment_advise_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        po_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        po_num: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        ci_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        ci_num: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        shipment_status: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        invoice_amount: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        bl_awb_no: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        bl_awb_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        type_of_bl: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        shipment_type: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        cbm_information: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        free_days: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          shipping_vehicle: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          vehicle_description: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          port_of_loading: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          port_of_discharge: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          final_destination: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          goods_description: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          shipper_name: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          consignee_name: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          notify_name: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          free_days_time: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          freight: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          eta: {
            type: DataTypes.STRING(155),
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
        tableName: "shippment_advise_master",
        timestamps: false,
      }
    );

    shippment_advise_master.associate = (models) => {
      shippment_advise_master.belongsTo(models.po_master, {
          foreignKey: "po_id",
      });
      shippment_advise_master.hasMany(models.shippment_advise_additional_instruction, {
          foreignKey: "shippment_advise_id",
      });
      shippment_advise_master.hasMany(models.shipment_advise_items, {
          foreignKey: "shipment_advise_id",
      });
    }
  
    return shippment_advise_master;
  };
  