const { ApprovalMatrix } = require('../../models');

const ApprovalMatrixController = {
    
    // Create a new approval matrix
    async create(req, res) {
        let { module_name, approval_level, user_id, status } = req.body
        try {
            const approvalMatrix = await ApprovalMatrix.create(req.body);
            return res.status(201).json(approvalMatrix);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    // Get all approval matrices
    async findAll(req, res) {
        try {
            const approvalMatrices = await ApprovalMatrix.findAll();
            return res.status(200).json(approvalMatrices);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Get an approval matrix by ID
    async findById(req, res) {
        try {
            const approvalMatrix = await ApprovalMatrix.findByPk(req.params.id);
            if (!approvalMatrix) {
                return res.status(404).json({ error: 'Approval matrix not found' });
            }
            return res.status(200).json(approvalMatrix);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Update an approval matrix by ID
    async update(req, res) {
        try {
            const [updated] = await ApprovalMatrix.update(req.body, {
                where: { approval_id: req.params.id },
            });
            if (!updated) {
                return res.status(404).json({ error: 'Approval matrix not found' });
            }
            const updatedApprovalMatrix = await ApprovalMatrix.findByPk(req.params.id);
            return res.status(200).json(updatedApprovalMatrix);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    // Delete an approval matrix by ID
    async delete(req, res) {
        try {
            const deleted = await ApprovalMatrix.destroy({
                where: { approval_id: req.params.id },
            });
            if (!deleted) {
                return res.status(404).json({ error: 'Approval matrix not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ApprovalMatrixController;
