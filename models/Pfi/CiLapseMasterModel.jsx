module.exports = (sequelize, DataTypes) => {
    const ci_lapse_master = sequelize.define("ci_lapse_master", {
        ci_lapse_master_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        ci_id: { 
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ci_num: { 
            type: DataTypes.STRING(155),
            allowNull: true
        },
        lapse_name: { 
            type: DataTypes.STRING(155),
            allowNull: true
        },
        amount: { 
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        narration: { 
            type: DataTypes.STRING(255),
            allowNull: true
        },
        payment_by: { 
            type: DataTypes.STRING(255),
            allowNull: true
        },
        doc_type: {
            type: DataTypes.STRING(155),
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
        tableName: 'ci_lapse_master',
        timestamps: false
    });

    return ci_lapse_master;
};
