module.exports = (sequelize, DataTypes) => {
    const shipping_lapse = sequelize.define(
      "shipping_lapse",
      {
        shipping_lapse_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        ci_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        ci_num: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        lapse_type: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        lapse_amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        lapse_narration: {
          type: DataTypes.STRING(155),
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
        tableName: "shipping_lapse",
        timestamps: false,
      }
    );
    return shipping_lapse;
  };
  