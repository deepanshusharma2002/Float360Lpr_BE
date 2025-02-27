module.exports = (sequelize, DataTypes) => {
  const form_m = sequelize.define(
    "form_m",
    {
      form_m_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bank1_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      insurance_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      insurance_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      form_m_num: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      form_m_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pfi_description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      form_m_expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ba_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      form_m_recd_date: {
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
      tableName: "form_m",
      timestamps: false,
    }
  );

  form_m.associate = (models) => {
    form_m.belongsTo(models.Pfi_master, {
      foreignKey: 'pfi_id',  // Ensure this matches the foreign key in pfi_master
    });
    form_m.belongsTo(models.commercial_invoice, {
      foreignKey: 'pfi_id',
      targetKey: 'pfi_id',
    });
  };

  return form_m;
};
