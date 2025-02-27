module.exports = (sequelize, DataTypes) => {
    const StatusMaster = sequelize.define("StatusMaster", {
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doc_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status_code: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
                is: /^[0-9]+(\.[0-9]+)*$/, // Matches format like "1.2.0", "2.2", etc.
            },
        },
        status_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status_description: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'status_master',
        timestamps: true
    });

    return StatusMaster;
};  
