module.exports = (sequelize, DataTypes) => {
    const lapse_nain = sequelize.define(
      "lapse_nain",
      {
        lapse_nain_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        doc_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        doc_name: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        type: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        table_name: {
          type: DataTypes.STRING(255),
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
        tableName: "lapse_nain",
        timestamps: false,
      }
    );
    return lapse_nain;
  };
  