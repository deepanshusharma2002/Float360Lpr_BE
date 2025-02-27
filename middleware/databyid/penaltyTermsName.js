const { sequelize } = require('../../models');

async function getPenaltyTermsNameById(data) {
    try {

        const query = `SELECT dbo.fn_penaltyTermsName(${data[0].penalty_terms_id}) as penalty_terms_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        data[0].dataValues.penalty_terms_name = await results.penalty_terms_name
        return data;
    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}

module.exports = getPenaltyTermsNameById;