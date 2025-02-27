const { sequelize } = require('../../models');

async function getVerticalNameById(data) {
    try {

        const query = `SELECT dbo.fn_verticalName(${data[0].vertical_id}) as vertical_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        console.log(results)
        console.log("************")
        data[0].dataValues.vertical_name = await results.vertical_name
        return data;

    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}

module.exports = getVerticalNameById;



