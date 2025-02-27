const { Op } = require('sequelize');
const { reqdocMaster, rfq_req_doc_master } = require('../models'); // Adjust the path as necessary

// Create a new required document
exports.createRequiredDocument = async (req, res) => {
    console.log("Received document data");
    console.log(req.body);
    try {
        let { module_name, req_doc_name, req_doc_description, status } = req.body;
        const requiredDocument = await reqdocMaster.create({
            module_name,
            req_doc_name,
            req_doc_description,
            status,
        });
        res.status(201).json({ msg: 'Document created successfully', data: requiredDocument });
    } catch (error) {
        console.error("Error creating document:", error); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};

// Get all required documents
exports.getAllRequiredDocuments = async (req, res) => {
    try {
        const requiredDocuments = await reqdocMaster.findAll({
            where: { status: { [Op.ne]: 0 } } // Assuming 0 means deleted
        });
        res.status(200).json(requiredDocuments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all required documents
exports.getAllRequiredDocumentsByIds = async (req, res) => {
    let { rfq_id } = req.query;
    //convert incoming into array
    try {
        const requiredDocuments = await rfq_req_doc_master.findAll({
            attributes: ["rfq_req_doc_master_name", "description"],
            where: { 
                status: { [Op.ne]: 0 },
                rfq_id: rfq_id
            }
        });
        res.status(200).json(requiredDocuments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get a required document by ID
exports.getRequiredDocumentById = async (req, res) => {
    try {
        const requiredDocument = await reqdocMaster.findByPk(req.params.id);
        if (requiredDocument) {
            res.status(200).json(requiredDocument);
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a required document by ID
exports.updateRequiredDocument = async (req, res) => {
    try {
        const requiredDocument = await reqdocMaster.findByPk(req.params.id);
        if (requiredDocument) {
            await requiredDocument.update(req.body);
            res.status(200).json(requiredDocument);
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Soft delete a required document by ID
exports.deleteRequiredDocument = async (req, res) => {
    try {
        const requiredDocument = await reqdocMaster.findByPk(req.params.id);
        if (requiredDocument) {
            // Perform a soft delete by updating the status to 0
            await requiredDocument.update({ status: 0 });
            res.status(200).json({ message: 'Document deleted successfully' });
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
