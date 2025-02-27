const { ServiceQuote, ServiceQuoteFreightList } = require("../../models");
const db = require("../../models");
const { uploadMulti } = require('../../middleware/fileHandler');
const { where } = require("sequelize");


const createFreightListEntries = (list, id) => {
    try {
        const updatedFreightList = list.map(item => {
            return {
                other_charge: item.other_charge,
                service_quote_id: item.service_quote_id,
                container_type: item.container_type_name,
                freedays_at_pod: item.free_days_at_pod,
                service_quote_id: id,
                cbm_rate_kg: item.cbm_rate_kg || null,
                rate: item.rate
            };
        });
        // Assuming ServiceFreightList is your Sequelize model
        ServiceQuoteFreightList.bulkCreate(updatedFreightList);
    } catch (error) {
        console.error('Error creating freight list entries:', error);
    }
};

//middleware to inset documnet
exports.createDocument = async (req, res, next) => {
    try {
        console.log(req.files);
        console.log(req.body);
        const metadata = req.body;
        const filesdata = req.files;
        const documentData = [];
        //create document data
        for (let i = 0; i < filesdata.length; i++) {
            const file = filesdata[i];
            const meta = metadata[i];
            // Prepare the document data
            const data = {
                linked_id: meta.linked_id,
                table_name: meta.table_name,
                type: meta.type,
                doc_name: file.originalname,
                doc_base64: file.buffer.toString('base64'),
                created_by: created_by,
                title: meta.title,
                status: 1
            };
            documentData.push(data);
        }

        // Bulk create documents in the database
        console.log(documentData);
        await document.bulkCreate(documentData);
        res.status(201).json({ msg: "Documents Submitted Successfully" });

    } catch (error) {
        next(error)
    }
};

const createServiceQuote = async (req, res) => {
    let {
        po_no,
        party_name,
        party_info,
        payment_term,
        shipping_line_type,
        free_days_at_pol,
        ets,
        eta,
        sailing_days,
        date_from,
        date_to,
        remarks,
        status,
        created_by,
        updated_by,
        freight_list
    } = req.body

    console.log("heres i req.b ody list ************");
    console.log(req.body);

    try {
        const serviceQuote = await ServiceQuote.create(req.body);
        console.log('Service Quote Created:', serviceQuote);
        let s_quo_id = serviceQuote.service_quo_id;

        const updatedFreightList = await freight_list.map(item => {
            return {
                ...item,
                service_quote_id: s_quo_id
            };
        });
        createFreightListEntries(freight_list, s_quo_id);


        res.status(201).json({
            data: serviceQuote,
            message: "Service Quote Created Success"
        })
    } catch (error) {
        console.error('Error creating service quote:', error);
        res.status(404).json({
            sucess: false
        })
    }
};

const getAllServiceQuotes = async (req, res) => {

    const po_id = req.query.po_id;
    if (po_id) {
        try {
            const serviceQuotes = await ServiceQuote.findAll({
                where: { po_no: po_id }
            });
            // Assuming the function is async
            const updatedData = await Promise.all(serviceQuotes.map(async (item) => {
                const freightList = await ServiceQuoteFreightList.findAll({
                    where: { service_quote_id: item.service_quo_id }
                });
                return { serviceQuote: item.dataValues, freight_list: freightList };
            }));
            return res.status(200).json({
                message: "serviceQuotes Fetched Successfully!",
                data: updatedData,
                success: true
            });

        } catch (error) {
            console.error('Error fetching service quotes:', error);
            return res.status(404).json({
                message: "ServiceQuotes Fetched Unsuccessfully!",
                success: false
            });
        }

    } else {
        try {
            const serviceQuotes = await ServiceQuote.findAll()
            console.log('All Service Quotes:', serviceQuotes);
            return res.status(200).json({
                message: "serviceQuotes Fetched Successfully!",
                data: serviceQuotes,
                success: true
            });
        } catch (error) {
            console.error('Error fetching service quotes:', error);
            return res.status(404).json({
                message: "ServiceQuotes Fetched Unsuccessfully!",
                success: false
            });
        }
    }

};

const getServiceQuoteByPoId = async (po_id) => {
    try {
        const serviceQuote = await ServiceQuote.find({ po_id });
        if (!serviceQuote) {
            console.log('Service Quote not found');
            return null;
        }
        console.log('Service Quote:', serviceQuote);
        return serviceQuote;
    } catch (error) {
        console.error('Error fetching service quote:', error);
        throw error;
    }
};

module.exports = { createServiceQuote, getAllServiceQuotes, getServiceQuoteByPoId }
