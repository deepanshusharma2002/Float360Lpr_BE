module.exports = (sequelize, DataTypes) => {
    const state = sequelize.define(
      "state",
      {
        state_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        state: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        country_id: {
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
        tableName: "state",
        timestamps: false,
      }
    );
  
    return state;
  };
  