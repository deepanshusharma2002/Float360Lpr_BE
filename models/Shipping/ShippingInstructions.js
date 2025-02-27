module.exports = (sequelize, DataTypes) => {
  const shippment_instructions = sequelize.define(
    "shippment_instructions",
    {
      shippment_instructions_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      po_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      po_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      shipper: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      goods_description: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      port_of_discharge: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      final_destination: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      marks_nos: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      no_of_og_bl_req: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      notify_party: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      no_of_non_negotiable_bl_copy_req: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      label_check: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bill_of_loading_check: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      additional_information1: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },
      additional_information2: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },

      notify_party_1_address: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },
      notify_party_2: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },
      notify_party_2_address: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },
      consignee_address: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },
      consignee_name: {
        type: DataTypes.STRING(555),
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
      tableName: "shippment_instructions",
      timestamps: false,
    }
  );

  shippment_instructions.associate = (models) => {
    shippment_instructions.belongsTo(models.po_master, {
      foreignKey: "po_id",
    });
  };

  return shippment_instructions;
};
