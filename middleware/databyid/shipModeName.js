const { sequelize } = require('../../models');

async function getShipModeNameById(data) {
    try {

        const query = `SELECT dbo.fn_shipModeName(${data[0].shipment_mode_id}) as shipment_mode_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        data[0].dataValues.shipment_mode_name = await results.shipment_mode_name
        return data;

    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}

module.exports = getShipModeNameById;

