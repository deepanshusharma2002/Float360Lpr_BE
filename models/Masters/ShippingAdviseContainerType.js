module.exports = (sequelize, DataTypes) => {
    const shipping_advise_container_type_master = sequelize.define(
      "shipping_advise_container_type_master",
      {
        shipping_advise_container_type_master_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        container_type_name: {
          type: DataTypes.STRING(100),
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
        tableName: "shipping_advise_container_type_master",
        timestamps: false,
      }
    );
  
    return shipping_advise_container_type_master;
  };
  