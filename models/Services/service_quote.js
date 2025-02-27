module.exports = (sequelize, DataTypes) => {
    const ServiceQuote = sequelize.define("ServiceQuote", {
        service_quo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        po_no: {
            type: DataTypes.INTEGER,
            require: true
        },
        party_name: {
            type: DataTypes.STRING
        },
        party_info: {
            type: DataTypes.STRING
        },
        payment_term: {
            type: DataTypes.STRING
        },
        shipping_line_type: {
            type: DataTypes.STRING
        },
        free_days_at_pol: {
            type: DataTypes.INTEGER
        },
        ets: {
            type: DataTypes.DATEONLY
        },
        eta: {
            type: DataTypes.DATEONLY
        },
        sailing_days: {
            type: DataTypes.INTEGER
        },
        date_from: {
            type: DataTypes.DATEONLY
        },
        date_to: {
            type: DataTypes.DATEONLY
        },

        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
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
    }, {
        tableName: 'service_quote',
        timestamps: true,
    });

    return ServiceQuote;
};




