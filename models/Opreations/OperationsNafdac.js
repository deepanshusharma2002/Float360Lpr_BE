module.exports = (sequelize, DataTypes) => {
  const operations_nafdac = sequelize.define(
    "operations_nafdac",
    {
      operations_nafdac_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      form_m_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      form_m_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      nafdac_date: {
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
      tableName: "operations_nafdac",
      timestamps: false,
    }
  );

  operations_nafdac.associate = (models) => {
    operations_nafdac.belongsTo(models.Pfi_master, {
      foreignKey: "pfi_id",
    });
  }
  

  return operations_nafdac;
};
