const db = require('../models');
const { series_master } = db;
const { Op } = require('sequelize');
const formattedDateTime = require("../middleware/time"); 
const { isValid, parseISO } = require('date-fns');

async function generateSeries(doc_code) {
    try {
        const series = await series_master.findOne({
            where: {
                status: { [Op.eq]: 1 },
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


// Create a new shipment mode
const createSeriesMode = async (req, res, next) => {
    try {
        const {
            doc_code, prefix, range_start, range_end, suffix, int_ext, validity, additional
        } = req.body;

        const result1 = await series_master.update({ status: 0 }, {
            where: {
                doc_code: doc_code
            }
        });

        const isDateValid = isValid(parseISO(validity));

        if (!isDateValid) {
            const result = await series_master.create({
                doc_code, prefix, range_start, range_end, suffix, int_ext, current_num: range_start, validity: "", additional, status: 1
            });
            return res.status(201).json({ message: "Submit date Successfully" });
        }

        const result = await series_master.create({
            doc_code, prefix, range_start, range_end, suffix, int_ext, current_num: range_start, validity, additional, status: 1
        });
        return res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};


// Get all shipment modes
const getAllSeriesModes = async (req, res, next) => {
    const series_id = req.query.series_id;
    try {
        if (!series_id) {
            const result = await series_master.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                order: [['series_id', 'DESC']]
            });
           return res.status(200).json(result);
        } else {
            const result = await series_master.findByPk((series_id),{
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            return res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};


module.exports = {
    generateSeries,
    createSeriesMode,
    getAllSeriesModes
};


