const db = require('../models');
const { series_master } = db;
const { Op } = require('sequelize');
const formattedDateTime = require("../middleware/time");


async function generateSeries(doc_code) {
    try {
        const series = await series_master.findOne({
            where: {
                status: { [Op.ne]: 0 },
                doc_code: doc_code
            }
        });
        if (!series) {
            return { message: `Series master record not found for doc_code: '${doc_code}'` };
        }
        const prefix = series.prefix;
        const suffix = series.suffix;
        const end = series.range_end;
        const last = parseInt(series.current_num) + 1;
        const start = series.range_start;
        const validity = series.validity;
        const generatedSeries = `${prefix}${last}${suffix}`;
        

        console.log(start, last, end, validity, formattedDateTime);

        if (start < last && last < end && (validity === "" || validity === "NULL" || formattedDateTime < validity)) {
            await series_master.update({ current_num: last }, {
                where: {
                    doc_code: doc_code
                }
            });

            return generatedSeries;
        } else {
            return { message: "Create New Series Or Check Validity: Error In Generating Number" };
        }
    } catch (err) {
        throw err;
    }
}

module.exports = generateSeries;
