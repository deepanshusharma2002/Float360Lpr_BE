const { sequelize } = require('.../modles'); // Import your Sequelize instance

async function getItemNameById(data) {
    try {
        const query = `SELECT dbo.fn_itemName(${data.item_id}) as item_name`;
        const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        data.item_name = results[0].Result.item_name
        // Return the result
        // return results[0].Result; 

    } catch (error) {
        console.error('Error calling UDF:', error);
        throw error;
    }
}
module.exports = getItemNameById;



// // Example usage
// getFieldValueById('item_master', 'item_name', 'item_id', 2)
//   .then(result => {
//     console.log('Field Value:', result);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });



