module.exports = (sequelize, DataTypes) => {
    const shippment_container_detail = sequelize.define(
      "shippment_container_detail",
      {
        shippment_container_detail_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        add_shippment_container_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        quantity: {
          type: DataTypes.DECIMAL(18, 2),
          allowNull: true,
        },
        uom: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        pack_type: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        no_package: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        packet_weight: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },   
        gross_weight: {
          type: DataTypes.DECIMAL(18, 2),
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
        tableName: "shippment_container_detail",
        timestamps: false,
      }
    );
  
    shippment_container_detail.associate = (models) => {
      shippment_container_detail.belongsTo(models.UomMaster, {
        foreignKey: "uom",
      });
      shippment_container_detail.belongsTo(models.PackageTypeMaster, {
        foreignKey: "pack_type",
      });
    }

    return shippment_container_detail;
  };
  