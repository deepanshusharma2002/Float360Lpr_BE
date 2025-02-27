
module.exports = (sequelize, DataTypes) => {
    const CategoryMaster = sequelize.define("itemcategory", {
        item_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: false

        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: false

        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }, {
        tableName: 'item_category_master', // specify the table name if different
        timestamps: true, // automatically adds `createdAt` and `updatedAt`
        createdAt: 'created_on', // renaming `createdAt` field
        updatedAt: 'updated_on', // renaming `updatedAt` field
    });

    return CategoryMaster
};


