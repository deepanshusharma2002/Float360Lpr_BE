module.exports = (sequelize, DataTypes) => {
    const lead_time_quo = sequelize.define("lead_time_quo", {
        lead_time_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        lead_time_name: {
            type: DataTypes.STRING(100),
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
        tableName: 'lead_time_quo',
        timestamps: false
    });

    return lead_time_quo;
};
