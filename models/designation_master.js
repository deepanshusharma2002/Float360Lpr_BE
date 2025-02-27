module.exports = (sequelize, DataTypes) => {
    const DesignationMaster = sequelize.define('desigMaster', {
        designation_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        designation_name: {
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
        },
        created_on: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        tableName: 'designation_master', // Adjust table name if necessary
        timestamps: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    });

    return DesignationMaster;
};
