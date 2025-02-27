module.exports = (sequelize, DataTypes) => {
  const BuyingHouse = sequelize.define(
    "BuyingHouse",
    {
      buying_house_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      buying_house_code: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      buying_house_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      vertical_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(50),
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
      contact_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      contact_email: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      address_line1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address_line2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },    
    },
    {
      tableName: "buyinghouse_master",
      timestamps: true,
    }
  );

  BuyingHouse.associate = (models) => {
    BuyingHouse.hasMany(models.OprMaster, { foreignKey: "buying_house_id" });
    BuyingHouse.hasOne(models.country, { foreignKey: "country_id", sourceKey: "country", as: 'CountryData' });
    BuyingHouse.hasOne(models.state, { foreignKey: "state_id", sourceKey: "state", as: 'StateData' });
    BuyingHouse.hasOne(models.city, { foreignKey: "city_id", sourceKey: "city", as: 'CityData' });
  };

  return BuyingHouse;
};
