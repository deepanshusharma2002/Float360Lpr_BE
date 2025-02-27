const { DocTypeMaster } = require('../../models'); // Adjust the path as needed

// Create a new document type
exports.createDocType = async (req, res) => {
    try {
        const { doc_name, doc_description, status, created_by } = req.body;
        const newDocType = await DocTypeMaster.create({
            doc_name,
            doc_description,
            status,
            created_by,
        });
        res.status(201).json(newDocType);
    } catch (error) {
        res.status(500).json({ message: 'Error creating document type', error: error.message });
    }
};

// Get all document types
exports.getAllDocTypes = async (req, res) => {

    try {
        const docTypes = await DocTypeMaster.findAll({
            attributes: ["doc_name"]
        });
        res.status(200).json(docTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document types', error: error.message });
    }
};


// // Get a document type by ID
// exports.getDocTypeById = async (req, res) => {
//     try {
//         const docType = await DocTypeMaster.findByPk(req.params.id);
//         if (!docType) {
//             return res.status(404).json({ message: 'Document type not found' });
//         }
//         res.status(200).json(docType);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching document type', error: error.message });
//     }
// };

// // Update a document type by ID
// exports.updateDocType = async (req, res) => {
//     try {
//         const { doc_name, doc_description, status, updated_by } = req.body;
//         const [updated] = await DocTypeMaster.update(
//             { doc_name, doc_description, status, updated_by },
//             { where: { doc_id: req.params.id } }
//         );
//         if (!updated) {
//             return res.status(404).json({ message: 'Document type not found' });
//         }
//         const updatedDocType = await DocTypeMaster.findByPk(req.params.id);
//         res.status(200).json(updatedDocType);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating document type', error: error.message });
//     }
// };

// // Delete a document type by ID
// exports.deleteDocType = async (req, res) => {
//     try {
//         const deleted = await DocTypeMaster.destroy({ where: { doc_id: req.params.id } });
//         if (!deleted) {
//             return res.status(404).json({ message: 'Document type not found' });
//         }
//         res.status(204).json(); // No content
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting document type', error: error.message });
//     }
// };
