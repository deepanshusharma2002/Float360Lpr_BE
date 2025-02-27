const { sequelize } = require('../../models');

async function getBuyingNameById(data) {
    try {

        const query = `SELECT dbo.fn_companyName(${data[0].buying_house_id}) as buying_house_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        data[0].dataValues.buying_house_name = await results.buying_house_name
        return data;

    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}

module.exports = getBuyingNameById;

