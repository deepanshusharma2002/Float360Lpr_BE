module.exports = (sequelize, DataTypes) => {
    const approval_matrix = sequelize.define(
      "approval_matrix",
      {
        approval_matrix_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        approval_matrix__master_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        table_name: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        last_approved_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        last_approved_on: {
          type: DataTypes.DATE, // Updated to DATE type
          allowNull: true,
        },
        assigned_on: {
          type: DataTypes.STRING(50),
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
        remarks: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        approval_updated_on: {
          type: DataTypes.DATE, 
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
        tableName: "approval_matrix",
        timestamps: false,
      }
    );
  
    return approval_matrix;
  };
  