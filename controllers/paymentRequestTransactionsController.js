const { PaymentRequestTransactionsMaster, PaymentRequestMaster, po_master, Pfi_master, sequelize } = require('../models'); // Adjust the path to your models file

//this funcation will insert data in transaction table and same time i will also insert data in pfi master without pfi number(series)
exports.createPaymentRequestTransactionsMaster = async (req, res, next) => {
    try {
        const { payment_request_id, po_id, doc_type } = req.body;

        //update request status 
        const paymentRequest = await PaymentRequestMaster.update(
            { status: 3 },
            { where: { payment_request_id: payment_request_id } }
        );


        //if id not found in master
        if (!paymentRequest) {
            return res.status(404).json({ message: 'Request id is not valid' });
        }

        //update po status
        const poMaterResponse = await po_master.update(
            { status: 6 },
            { where: { po_id: po_id } }
        );

        //if id not found in master
        if (!poMaterResponse) {
            return res.status(404).json({ message: 'Po id is not valid' });
        }

        // handle image file
        const fileBuffer = req.file.buffer;
        const base64String = await fileBuffer.toString("base64");
        req.body.receipt_image = base64String;
        req.body.receipt_image_name = req.file.originalname;

        // genrate transactions
        const newTransaction = await PaymentRequestTransactionsMaster.create(req.body);

        //create data for pfi
        let query = `select  distinct  opr_items.company_id ,dbo.fn_companyname(opr_items.company_id)  as comp_name
            from opr_items            
            inner join po_items
            on opr_items.rfq_id =  po_items.rfq_id
            where  po_items.po_id=${po_id}`
        let [result, metadata] = await sequelize.query(query);

        // genrate pfi master
        // insert po_id request_id in talbe
        result.forEach(item => { item.status = 1, item.po_id = po_id, item.payment_request_id = payment_request_id, item.created_by = req.body.created_by })
        const PFI_response = await Pfi_master.bulkCreate(result);
        res.status(201).json(newTransaction);

    } catch (error) {
        next(error);
    }
};

// Get all PaymentRequestTransactionsMaster records
exports.getAllPaymentRequestTransactionsMasters = async (req, res) => {
    try {
        const transactions = await PaymentRequestTransactionsMaster.findAll({
            include: [{
                model: PaymentRequestMaster,
                as: 'paymentRequest'
            }]
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching PaymentRequestTransactionsMasters:', error);
        res.status(500).json({ error: 'An error occurred while fetching PaymentRequestTransactionsMasters.' });
    }
};

// Get a PaymentRequestTransactionsMaster by ID
exports.getPaymentRequestTransactionsMasterById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await PaymentRequestTransactionsMaster.findByPk(id, {
            include: [{
                model: PaymentRequestMaster,
                as: 'paymentRequest'
            }]
        });

        if (!transaction) {
            return res.status(404).json({ message: 'PaymentRequestTransactionsMaster not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error fetching PaymentRequestTransactionsMaster:', error);
        res.status(500).json({ error: 'An error occurred while fetching the PaymentRequestTransactionsMaster.' });
    }
};

// Get a PaymentRequestTransactionsMaster by ID
exports.getPaymentRequestTransactionsMasterRequestId = async (req, res) => {
    try {
        const { payment_request_id } = req.query;
        const transaction = await PaymentRequestTransactionsMaster.findOne(
            {
                where: { payment_request_id: payment_request_id },
                include: [{
                    model: PaymentRequestMaster,
                    as: 'paymentRequest'
                }],
                attributes: [
                    'payment_request_id',
                    'payment_amount',
                    'from_bank_detail_id',
                    'to_bank_detail_id',
                    'bank_charge',
                    'bank_refenence_no',
                    'payment_date'
                ]
            }
        );

        if (!transaction) {
            return res.status(404).json({ message: 'PaymentRequestTransactionsMaster not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error fetching PaymentRequestTransactionsMaster:', error);
        res.status(500).json({ error: 'An error occurred while fetching the PaymentRequestTransactionsMaster.' });
    }
};

// Get a PaymentRequestTransactionsMaster by ID
exports.getPaymentRequestTransactionsfileRequestId = async (req, res) => {
    try {
        const { payment_request_id } = req.query;
        const transaction = await PaymentRequestTransactionsMaster.findOne(
            {
                where: { payment_request_id: payment_request_id },
                // include: [{
                //     model: PaymentRequestMaster,
                //     as: 'paymentRequest'
                // }],
                attributes: [
                    'payment_request_id',
                    'receipt_image_name',
                    'receipt_image',
                ]
            }
        );

        if (!transaction) {
            return res.status(404).json({ message: 'PaymentRequestTransactionsMaster not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error fetching PaymentRequestTransactionsMaster:', error);
        res.status(500).json({ error: 'An error occurred while fetching the PaymentRequestTransactionsMaster.' });
    }
};

// Update a PaymentRequestTransactionsMaster by ID
exports.updatePaymentRequestTransactionsMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const { payment_request_id, payment_date, payment_amount, from_bank_detail_id, to_bank_detail_id, receipt_file, created_by, updated_by } = req.body;

        const transaction = await PaymentRequestTransactionsMaster.findByPk(id);

        if (!transaction) {
            return res.status(404).json({ message: 'PaymentRequestTransactionsMaster not found' });
        }

        if (payment_request_id) {
            // Ensure payment_request_id is valid
            const paymentRequest = await PaymentRequestMaster.findByPk(payment_request_id);
            if (!paymentRequest) {
                return res.status(404).json({ message: 'PaymentRequestMaster not found' });
            }
        }

        await transaction.update({
            payment_request_id,
            payment_date,
            payment_amount,
            from_bank_detail_id,
            to_bank_detail_id,
            receipt_file,
            created_by,
            updated_by
        });

        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error updating PaymentRequestTransactionsMaster:', error);
        res.status(500).json({ error: 'An error occurred while updating the PaymentRequestTransactionsMaster.' });
    }
};

// Delete a PaymentRequestTransactionsMaster by ID
exports.deletePaymentRequestTransactionsMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await PaymentRequestTransactionsMaster.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: 'PaymentRequestTransactionsMaster not found' });
        }
        await transaction.destroy();
        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting PaymentRequestTransactionsMaster:', error);
        res.status(500).json({ error: 'An error occurred while deleting the PaymentRequestTransactionsMaster.' });
    }
};

//get payment id by doc_id
exports.getPaymentTransactionByCoID = async (req, res, next) => {
    try {
        const { doc_id } = req.query;
        const transaction = await PaymentRequestTransactionsMaster.findAll({
            where: { doc_id }
        });

        if (!transaction) {
            return res.status(404).json({ message: 'PaymentRequestTransactionsMaster not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error fetching PaymentRequestTransactionsMaster:', error);
        next(error);
    }
}

exports.sentPaymentForApproval = async (req, res, next) => {
    const { doc_id, status } = req.body;
    try {
        const response = await PaymentRequestTransactionsMaster.findByPk(doc_id);
        if (!response) {
            return res.status(404).json({ message: "Document not found" });
        } else {
            response.status = status; // Change to the new status
            await response.save(); // Save the updated document
            // res.status(200).json({ message: "OPR sent for approval successfully", data: response });
            next();
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
}