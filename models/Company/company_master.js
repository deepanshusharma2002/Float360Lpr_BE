module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define(
    "companyMaster",
    {
      isBH: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company_series: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      vertical_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      company_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      alternate_phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      contact_person: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      contact_person_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      contact_person_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      registration_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
    },
    {
      tableName: "company_master",
      timestamps: true,
    }
  );

  // Define associations
  company.associate = (models) => {
    company.hasMany(models.AddressMaster, {
      foreignKey: "entity_id",
      constraints: false,
    });
    company.hasMany(models.OprMaster, { foreignKey: "company_id" });
    company.hasMany(models.OprItems, { foreignKey: "company_id" });
    company.hasMany(models.Pfi_master, { foreignKey: "company_id" });
  };
  return company;
};
