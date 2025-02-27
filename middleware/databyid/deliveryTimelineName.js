const { sequelize } = require('../../models');

async function getDTimelineNameById(data) {
    try {
        const query = `SELECT dbo.fn_delivery_timelinName(${data[0].delivery_timeline_id}) as d_timeline_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        data[0].dataValues.d_timeline_name = await results.d_timeline_name
        return data;

    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}

module.exports = getDTimelineNameById;



