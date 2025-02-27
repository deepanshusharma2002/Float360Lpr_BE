module.exports = (sequelize, DataTypes) => {
  const service_list_master = sequelize.define(
    "service_list_master",
    {
      service_list_master_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      po_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      po_num: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      service: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      purchaseQuoteRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rate: {
        type: DataTypes.INTEGER,
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
      tableName: "service_list_master",
      timestamps: true, // Disable createdAt and updatedAt if they are not needed
    }
  );

  return service_list_master;
};
