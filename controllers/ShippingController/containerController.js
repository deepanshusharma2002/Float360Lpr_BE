//Rakesh
const { where } = require('sequelize');
const { Container } = require('../../models'); // Adjust the path to where your model is located

// Create a new Container
exports.createContainer = async (req, res) => {
    try {
        const {
            shipping_id, container_num, size, type, seal_no, arrival_date, freedays_ending_date,
            discharge_date, transfer_date, tdo_validity_date, created_by
        } = req.body;

        const newContainer = await Container.create({
            shipping_id,
            container_num,
            size,
            type,
            seal_no,
            arrival_date,
            freedays_ending_date,
            discharge_date,
            transfer_date,
            tdo_validity_date,
            created_by
        });

        res.status(201).json({ message: 'Container created successfully', container: newContainer });
    } catch (error) {
        res.status(500).json({ message: 'Error creating container', error: error.message });
    }
};

//add container expense 
exports.addContainerExpense = async (req, res, next) => {
    try {
        const { container_expenses, updated_by } = req.body;
        const bulkUpdateContainerExpenses = async (dataset) => {
            try {
                await Promise.all(
                    dataset.map(async (item) => {
                        let { fixed_amount, storage_amount, from_date, container_id, to_date } = item
                        let updateFields = {};
                        if (fixed_amount !== undefined) updateFields.fixed_amount = fixed_amount;
                        if (storage_amount !== undefined) updateFields.storage_amount = storage_amount;
                        if (from_date !== undefined) updateFields.from_date = from_date;
                        if (to_date !== undefined) updateFields.to_date = to_date;
                        updateFields.updated_by = updated_by

                        await Container.update(updateFields, {
                            where: { container_id }
                        });

                    })
                );
            } catch (error) {
                next(error);
            }
        };

        bulkUpdateContainerExpenses(container_expenses);
        res.status(201).json({ message: 'Container Expenses  added successfully' });

    } catch (error) {
        next(error);
    }
};



// Get all Containers by shipping ID
exports.getAllContainersByShippingId = async (req, res) => {
    try {
        const { shipping_id } = req.query; // Assume shipping_id is passed as a URL parameter
        console.log(shipping_id);
        const containers = await Container.findAll({
            where: {
                shipping_id
            }
        });

        res.status(200).json(containers);

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving containers', error: error.message });
    }
};


// Get all Containers
exports.getAllContainers = async (req, res) => {
    try {
        const containers = await Container.findAll();
        res.status(200).json(containers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving containers', error: error.message });
    }
};

// Get a single Container by ID
exports.getContainerById = async (req, res) => {
    try {
        const { id } = req.params;
        const container = await Container.findByPk(id);

        if (!container) {
            return res.status(404).json({ message: 'Container not found' });
        }

        res.status(200).json(container);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving container', error: error.message });
    }
};

// Update a Container by ID
exports.updateContainer = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            shiping_id, container_num, size, type, seal_no, arrival_date, freedays_ending_date,
            discharge_date, transfer_date, tdo_validity_date, updated_by
        } = req.body;

        const container = await Container.findByPk(id);

        if (!container) {
            return res.status(404).json({ message: 'Container not found' });
        }

        await container.update({
            shiping_id,
            container_num,
            size,
            type,
            seal_no,
            arrival_date,
            freedays_ending_date,
            discharge_date,
            transfer_date,
            tdo_validity_date,
            updated_by
        });

        res.status(200).json({ message: 'Container updated successfully', container });
    } catch (error) {
        res.status(500).json({ message: 'Error updating container', error: error.message });
    }
};

// Delete a Container by ID
exports.deleteContainer = async (req, res) => {
    try {
        const { id } = req.params;
        const container = await Container.findByPk(id);

        if (!container) {
            return res.status(404).json({ message: 'Container not found' });
        }

        await container.destroy();
        res.status(200).json({ message: 'Container deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting container', error: error.message });
    }
};
