// controllers/criaController.js
const { CriaMaster } = require('../models');


const createCriaEntry = async (req, res, next) => {
    try {
        const {
            item_id,
            cria_name,
            description,
            hs_code,
            exporter_detail,
            exporting_country,
            type_packaging,
            pack_size,
            quantity_approved,
            quality_imported,
            doc_uploaded,
            doc_uploaded_name,
            updated_by
        } = req.body;

        const newCria = await CriaMaster.create({
            item_id,
            cria_name,
            description,
            hs_code,
            exporter_detail,
            exporting_country,
            type_packaging,
            pack_size,
            quantity_approved,
            quality_imported,
            doc_uploaded,
            doc_uploaded_name,
            updated_by
        });

        res.status(201).json(newCria);
    } catch (error) {
        next(error)
    }
};

const getAllCriaEntries = async (req, res, next) => {
    try {
        const criaEntries = await CriaMaster.findAll({ attributes: ['cria_id', 'cria_name'] });
        res.json(criaEntries);
    } catch (error) {
        next(error)
    }
};

const updateCriaEntry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            item_id,
            description,
            hs_code,
            exporter_detail,
            exporting_country,
            type_packaging,
            pack_size,
            quantity_approved,
            quality_imported,
            doc_uploaded,
            doc_uploaded_name,
            updated_by
        } = req.body;

        const existingCria = await CriaMaster.findByPk(id);
        if (!existingCria) {
            return res.status(404).json({ error: 'CRIA entry not found' });
        }

        existingCria.item_id = item_id;
        existingCria.description = description;
        existingCria.hs_code = hs_code;
        existingCria.exporter_detail = exporter_detail;
        existingCria.exporting_country = exporting_country;
        existingCria.type_packaging = type_packaging;
        existingCria.pack_size = pack_size;
        existingCria.quantity_approved = quantity_approved;
        existingCria.quality_imported = quality_imported;
        existingCria.doc_uploaded = doc_uploaded;
        existingCria.doc_uploaded_name = doc_uploaded_name;
        existingCria.updated_on = new Date();
        existingCria.updated_by = updated_by;

        await existingCria.save();

        res.json(existingCria);
    } catch (error) {
        next(error)
    }
};


const deleteCriaEntry = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingCria = await CriaMaster.findByPk(id);
        if (!existingCria) {
            return res.status(404).json({ error: 'CRIA entry not found' });
        }

        await existingCria.destroy();

        res.json({ message: 'CRIA entry deleted successfully' });
    } catch (error) {
        next(error);
    }
};


// Export the functions for use in routes or other controllers
module.exports = {
    createCriaEntry,
    getAllCriaEntries,
    updateCriaEntry,
    deleteCriaEntry
};
