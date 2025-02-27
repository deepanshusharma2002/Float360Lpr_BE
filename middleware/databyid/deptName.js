const { sequelize } = require('../../models');

async function getDepartmentNameById(data) {
    try {

        const query = `SELECT dbo.fn_departmentName(${data[0].department_id}) as department_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        data[0].dataValues.department_name = await results.department_name
        return data;

    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}

module.exports = getDepartmentNameById;

