const { sequelize } = require('../../models');

async function getCompnayNameById(data) {
    try {

        const query = `SELECT dbo.fn_companyName(${data[0].company_id}) as compnay_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        data[0].dataValues.compnay_name = await results.compnay_name
        return data;

    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}

module.exports = getCompnayNameById;

