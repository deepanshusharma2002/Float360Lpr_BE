// companyVertical.model.js

module.exports = (sequelize, DataTypes) => {
    const CompanyVertical = sequelize.define('CompanyVertical', {
        vertical_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // Adjust allowNull based on your requirements
            primaryKey: true,
            autoIncrement: true
        },
        vertical_name: {
            type: DataTypes.STRING(255),
            allowNull: true // Adjust allowNull based on your requirements
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true // Adjust allowNull based on your requirements
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true // Adjust allowNull based on your requirements
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true // Adjust allowNull based on your requirements
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true // Adjust allowNull based on your requirements
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true // Adjust allowNull based on your requirements
        }
    }, {
        tableName: 'company_vertical',
        tiemStamp: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    });

    return CompanyVertical;
};
