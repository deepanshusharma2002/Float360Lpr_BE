module.exports = (sequelize, DataTypes) => {
  const container_allocation = sequelize.define(
    "container_allocation",
    {
      container_allocation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      bl_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      transporter: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      no_of_container_allocated: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      type_of_container: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      rate: {
        type: DataTypes.DECIMAL(18,2),
        allowNull: true,
      },
      tdo_given_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      delivery_location: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      payment_terms: {
        type: DataTypes.STRING(255),
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
      tableName: "container_allocation",
      timestamps: false,
    }
  );
  return container_allocation;
};
