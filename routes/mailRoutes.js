// routes/api.js
const express = require('express');
const senEmail = require('../utilites/sendmail')
const { createEmailMessage } = require('../controllers/emailMessageController.js')
const router = express.Router();
const { po_master, ServiceQUO } = require("../models")
const upload = require('../utilites/handlefile.js');
const { po_email_conformation } = require('../controllers/poController.js')
const { service_po_email_conformation } = require('../controllers/Services/servicePo.js')

//update po status after send mail to vendor
//po status will become 2 when po sent to vendor
const updateDocStatus = async (req, res, next) => {
    try {

        const { doc_type, doc_id } = req.body;
        // Validate request data
        if (!doc_type || !doc_id === undefined) {
            return res.status(400).json({ error: 'Document type, document ID, and status are required' });
        }

        switch (doc_type) {
            case 'po':
                const { doc_id: po_id } = req.body;
                let po_response = await po_master.update(
                    { status: 2 },
                    { where: { po_id } }
                );
                next();
                break;
            case 'service_po':
                const { doc_id: service_quo_id } = req.body;
                let service_response = await ServiceQUO.update(
                    { status: 3 },
                    { where: { service_quo_id } }
                );
                next();
                break;
            default:
                next();
        }


    } catch (err) {
        next(err);
    }
};




// API routes
router
    .post('/send', upload.single('attachment'), createEmailMessage, updateDocStatus, senEmail)

module.exports = router;