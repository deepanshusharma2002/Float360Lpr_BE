module.exports = (sequelize, DataTypes) => {
  const payment_term_container_master = sequelize.define(
    "payment_term_container_master",
    {
      payment_term_container_master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_term_container_name: {
        type: DataTypes.STRING(100),
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
      tableName: "payment_term_container_master",
      timestamps: false,
    }
  );

  return payment_term_container_master;
};
