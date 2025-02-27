const { ShippingMaster } = require('../../models'); // Adjust the path as necessary

// Retrieve all shipping info records
exports.getTerminalOperationData = async (req, res) => {
    try {
        const ShippingMasters = await ShippingMaster.findAll({
            attributes: ["agency_name", "agent", "bl_date", "bl_no", "cbm", "ci_date", "discharge_terminal", "eta", "formm_num", "free_days", "no_of_container", "supplier_name", "transfer_terminal", "ci_id"]

        });
        res.status(200).json(ShippingMasters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update terminal view (free_days and cbm) in the shipping record against ci_id
exports.updateTerminalDatabyCiID = async (req, res, next) => {
    console.log(req.body);
    try {
        const { ci_id } = req.body;
        const {
            free_days,
            cbm,
            tdo_received_date,
            tdo_valid_till,
            updated_by
        } = req.body;


        // Dynamically build the update object with only the fields that are not undefined or null
        const updateFields = {};
        if (free_days !== undefined) updateFields.free_days = free_days;
        if (cbm !== undefined) updateFields.cbm = cbm;
        if (updated_by !== undefined) updateFields.updated_by = updated_by;

        // Perform the update
        const [updated] = await ShippingMaster.update(updateFields, {
            where: { ci_id }
        });
        if (updated) {
            const updatedShippingRecord = await ShippingMaster.findOne({ where: { ci_id } });
            res.status(200).json({ message: 'Terminal details updated successfully' });
        } else {
            res.status(404).json({ message: 'Shipping record not found' });
        }
    } catch (error) {
        next(next);
    }
};