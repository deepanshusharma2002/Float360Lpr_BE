module.exports = (sequelize, DataTypes) => {
    const CategoryMaster = sequelize.define('CategoryMaster', {
        category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        category_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        tableName: 'category_master',
        timestamps: false // Disable createdAt and updatedAt if they are not needed
    });



    return CategoryMaster;
};