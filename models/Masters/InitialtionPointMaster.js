module.exports = (sequelize, DataTypes) => {
    const initiation_point_master = sequelize.define("initiation_point_master", {
        initiation_point_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        initiation_point: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
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
        tableName: 'initiation_point_master',
        timestamps: true
    });

    return initiation_point_master;
};
