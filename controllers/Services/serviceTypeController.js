const { ServiceTypeMaster } = require('../../models'); // Adjust the path as needed

// Create a new service type
exports.createServiceType = async (req, res,next) => {
    try {    
        const {service_type_name,service_type_code}= req.body
        const serviceType = await ServiceTypeMaster.create(req.body);
        res.status(201).json(serviceType);
    } catch (error) {
        console.log({module:'Create Service Type', Error:error})
        next(error)
    }
};

// Get all service types
exports.getAllServiceTypes = async (req, res) => {
    try {
        const serviceTypes = await ServiceTypeMaster.findAll();
        res.status(200).json(serviceTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
