module.exports = (sequelize, DataTypes) => {
    const country = sequelize.define(
      "country",
      {
        country_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        country: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        currency: {
          type: DataTypes.STRING(150),
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
        tableName: "country",
        timestamps: false,
      }
    );
  
    return country;
  };
  