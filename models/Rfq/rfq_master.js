module.exports = (sequelize, DataTypes) => {
    const rfq = sequelize.define('RfqMaster', {
        rfq_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        rfq_num: {
            type: DataTypes.STRING(55),
            allowNull: true,
        },
        req_doc_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        shipment_mode: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        shipment_type: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        port_of_destination: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        delivery_timeline_in_weeks: {
            type: DataTypes.STRING(500),
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
            type: DataTypes.STRING(50),
            allowNull: true
        },
        vendor_list: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        respond_time: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        buying_house_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        tableName: 'rfq_master',
        timestamps: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    })
    rfq.associate = (models) => {
        rfq.hasMany(models.quotation_master, { foreignKey: 'rfq_id' });
        rfq.belongsTo(models.CompanyMaster, { foreignKey: 'company_id' });
        rfq.hasMany(models.rfq_req_doc_master, { foreignKey: 'rfq_id' });
        rfq.belongsTo(models.port_destination_master, { foreignKey: 'port_of_destination' });
    };
    return rfq;
};

