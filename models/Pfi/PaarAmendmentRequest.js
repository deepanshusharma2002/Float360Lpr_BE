module.exports = (sequelize, DataTypes) => {
  const paar_amendment_request = sequelize.define(
    "paar_amendment_request",
    {
      paar_amendment_request_id: {
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
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      paar_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paar_revised: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      paar_amendment_date: {
        type: DataTypes.DATEONLY,
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
      tableName: "paar_amendment_request",
      timestamps: true,
    }
  );
  return paar_amendment_request;
};
