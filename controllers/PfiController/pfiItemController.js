const { Pfi_line_items: pfi_line_item, ItemsMaster } = require('../../models'); // Adjust the path based on your file structure

// Create a new pfi_line_item
exports.createPfiLineItem = async (req, res, next) => {
    try {
        const { po_id, pfi_id, payment_request_id, rfq_id, company_id, item_id, item_description, po_qty, rate, margin_percent, remarks, status, created_by } = req.body;
        const newPfiLineItem = await pfi_line_item.create({
            po_id,
            pfi_id,
            payment_request_id,
            rfq_id,
            company_id,
            item_id,
            item_description,
            po_qty,
            rate,
            margin_percent,
            remarks,
            status,
            created_by
        });

        res.status(201).json(newPfiLineItem);
    } catch (error) {
        console.error('Error creating pfi_line_item:', error);
        next(error);
    }
};

// Get all pfi_line_items
exports.getAllPfiLineItems = async (req, res, next) => {
    try {
        const items = await pfi_line_item.findAll();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching pfi_line_items:', error);
        next(error);
    }
};



// Get a pfi_line_item by ID
exports.getPfiLineItemByPoid = async (req, res, next) => {
    try {
        const { po_id } = req.query;
        const item = await pfi_line_item.findAll({
            where: { po_id: po_id },
            include: {
                model: ItemsMaster,
                attributes: ["item_name", "item_code"]
            }
        });

        if (!item) {
            return res.status(404).json({ message: 'pfi_line_item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching pfi_line_item:', error);
        next(error);
    }
};

// Update a pfi_line_item by ID
exports.updatePfiLineItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { po_id, pfi_id, payment_request_id, rfq_id, company_id, item_id, item_description, po_qty, rate, margin_percent, remarks, status, updated_by } = req.body;

        const [updated] = await pfi_line_item.update({
            po_id,
            pfi_id,
            payment_request_id,
            rfq_id,
            company_id,
            item_id,
            item_description,
            po_qty,
            rate,
            margin_percent,
            remarks,
            status,
            updated_by
        }, {
            where: { pfi_item_id: id }
        });

        if (!updated) {
            return res.status(404).json({ message: 'pfi_line_item not found' });
        }

        const updatedItem = await pfi_line_item.findByPk(id);
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating pfi_line_item:', error);
        next(error);
    }
};

// Delete a pfi_line_item by ID
exports.deletePfiLineItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await pfi_line_item.destroy({
            where: { pfi_item_id: id }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'pfi_line_item not found' });
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting pfi_line_item:', error);
        next(error);
    }
};
