module.exports = (sequelize, DataTypes) => {
    const freight_quote_service_po = sequelize.define(
      "freight_quote_service_po",
      {
        freight_quote_service_po_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        service_po_quote_master_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        cbm_container: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        rate: {
          type: DataTypes.DECIMAL(18, 4),
          allowNull: true,
        },
        currency: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        other_charges: {
          type: DataTypes.DECIMAL(18, 4),
          allowNull: true,
        },
        currency_of_other_charges: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        shipping_line: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        eta: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        ets: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        free_days_pod: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        free_days_pol: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        port_of_loading: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        port_of_delivery: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },

        type: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        created_by: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        updated_by: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: "freight_quote_service_po",
        timestamps: true,
      }
    );



    return freight_quote_service_po;
};