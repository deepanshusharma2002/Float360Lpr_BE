module.exports = (sequelize, DataTypes) => {
    const city = sequelize.define(
      "city",
      {
        city_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        city: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        state_id: {
            type: DataTypes.INTEGER,
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
        tableName: "city",
        timestamps: false,
      }
    );
  
    return city;
  };
  