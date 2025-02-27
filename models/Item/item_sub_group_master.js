module.exports = (sequelize, DataTypes) => {
  const ItemSubGroupMaster=sequelize.define('item_sub_group_master', {
    item_sub_group_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    item_parent_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_sub_group_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    item_sub_group_description: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: 'item_sub_group_master',
    timestamps: true 
  });

  ItemSubGroupMaster.associate = (models) => {
      ItemSubGroupMaster.hasMany(models.ItemsMaster, { foreignKey: 'group_name', targetKey:'item_group_id' });
    };

return ItemSubGroupMaster;
}

