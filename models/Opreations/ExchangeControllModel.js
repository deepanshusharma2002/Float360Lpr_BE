module.exports = (sequelize, DataTypes) => {
  const exchange_controll = sequelize.define(
    "exchange_controll",
    {
      exchange_controll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
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
      ci_amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      bl_awb_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      ba_num: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      revised_eta: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      tdo_dt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      ecd_received: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ecd_received_dt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      submitted_to_bank: {
        type: DataTypes.STRING(255),
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
    },
    {
      tableName: "exchange_controll",
      timestamps: true,
    }
  );

  return exchange_controll;
};
