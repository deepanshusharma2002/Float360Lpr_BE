module.exports = (sequelize, DataTypes) => {
    const grn_file = sequelize.define(
      "grn_file",
      {
        grn_file_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        grn_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "grn_master",
            key: "grn_id",
          },
        },
        file_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        file_path: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "grn_files",
        timestamps: true,
      }
    );
  
    return grn_file;
  };