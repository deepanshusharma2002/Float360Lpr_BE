module.exports = (sequelize, DataTypes) => {
  const approval_matrix__master = sequelize.define(
    "approval_matrix__master",
    {
      approval_matrix__master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      reference_table_name: {
        type: DataTypes.STRING(255), // Updated to STRING for table name
        allowNull: true,
      },
      reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      module: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      assigned_on: {
        type: DataTypes.DATE, // Updated to DATE
        allowNull: true,
      },
      assigned_to: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      approval_status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      approval_updated_on: {
        type: DataTypes.DATE, // Updated to DATE
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
      tableName: "approval_matrix__master",
      timestamps: false,
    }
  );

  return approval_matrix__master;
};
