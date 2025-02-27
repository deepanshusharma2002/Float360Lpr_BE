
module.exports = (sequelize, DataTypes) => {
    const payment_milestone = sequelize.define("payment_milestone", {
        payment_milestone_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quo_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        quo_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        milestone: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        percentage: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        payment_status: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        initiated_point: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
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
        }
    }, {
        tableName: 'payment_milestone',
        timestamps: false
    });    

    return payment_milestone;
};
