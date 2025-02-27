module.exports = (sequelize, DataTypes) => {

    const ItemVendorMap = sequelize.define('ItemVendorMap', {
        item_ven_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        }
    }, {
        tableName: 'item_vendor_map',
        timestamps: true // Set to true if you have created_at and updated_at fields
    });

    return ItemVendorMap;
    
}




