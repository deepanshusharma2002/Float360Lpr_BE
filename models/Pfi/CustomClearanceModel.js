module.exports = (sequelize, DataTypes) => {
  const custom_clearance = sequelize.define(
    "custom_clearance",
    {
      custom_clearance_id: {
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
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      goods_examination_booking_dt: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      goods_examination_dont_dt: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      re_examination_required: {
        type: DataTypes.STRING(555), // 'Yes' or 'No'
        allowNull: true,
      },
      re_examination_booking_dt: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      re_examination_done_dt: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      customs_release_received_on: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      customs_gate_release_rev_dt: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      custom_query: {
        type: DataTypes.STRING(555), // 'Yes' or 'No'
        allowNull: true,
      },
      query_raised_on_dt: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      query_resolved_on_dt: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      exchange_con_rev: {
        type: DataTypes.STRING(555), // 'Yes' or 'No'
        allowNull: true,
      },
      exchange_con_rev_dt: {
        type: DataTypes.DATEONLY, // Stores the date part (YYYY-MM-DD)
        allowNull: true,
      },
      query_types: {
        type: DataTypes.STRING(555), // To store the string like "Low Value, Wrong Hs Code, Capital Flight"
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
      tableName: "custom_clearance",
      timestamps: true,
    }
  );

  return custom_clearance;
};
