module.exports = (sequelize, DataTypes) => {
    const ItemGroupMaster = sequelize.define('item_group_master', {
        item_group_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        item_super_group_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        item_group_name: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        item_group_description: {
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
            allowNull: true
        }
    }, {
        tableName: 'item_group_master',
        timestamps: true
    })

    return ItemGroupMaster;

}


