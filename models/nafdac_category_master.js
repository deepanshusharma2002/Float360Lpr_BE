module.exports = (sequelize, DataTypes) => {
    return NafdacCategoryMaster = sequelize.define('NafdacCategoryMaster', {
        nafdac_category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nafdac_category_name: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        nafdac_category_description: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'nafdac_category_master',
        timestamps: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    });

}
