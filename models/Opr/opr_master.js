module.exports = (sequelize, DataTypes) => {
    const OprMaster = sequelize.define("OprMaster", {
        opr_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        opr_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        vertical_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        opr_date: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        division_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        buy_from: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        buying_house_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        shipment_mode_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        shipment_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        delivery_timeline_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        requested_by: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        no_quot_email_alert: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        item_category_id: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        delivery_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        suppliers: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(255),
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
        tableName: 'opr_master',
        timestamps: true,
        logging: false
    });

    // Define associations
    OprMaster.associate = (models) => {
        OprMaster.belongsTo(models.CompanyMaster, { foreignKey: 'company_id' });
        OprMaster.belongsTo(models.Vertical, { foreignKey: 'vertical_id' });
        OprMaster.belongsTo(models.Division, { foreignKey: 'division_id' });
        OprMaster.belongsTo(models.ShipMode, { foreignKey: 'shipment_mode_id' });
        // OprMaster.belongsTo(models.DeliveryTimeline, { foreignKey: 'delivery_timeline_id' });
        OprMaster.belongsTo(models.Department, { foreignKey: 'department_id' });
        OprMaster.belongsTo(models.BuyingHouse, { foreignKey: 'buying_house_id' });
        OprMaster.hasMany(models.OprItems, { foreignKey: 'opr_id' });
        OprMaster.belongsTo(models.shipment_type_master, { foreignKey: 'shipment_type_id' });
        OprMaster.belongsTo(models.ItemSuperGroupMaster,
            {
                foreignKey: 'item_category_id',
                targetKey: 'item_super_group_id'
            }
        )
    };
    return OprMaster;
};