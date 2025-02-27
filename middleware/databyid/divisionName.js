const { sequelize } = require('../../models');

async function getDivisionNameById(data) {
    try {

        const query = `SELECT dbo.fn_divisionName(${data[0].division_id}) as division_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        data[0].dataValues.division_name = await results.division_name
        return data;

    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}

module.exports = getDivisionNameById;

