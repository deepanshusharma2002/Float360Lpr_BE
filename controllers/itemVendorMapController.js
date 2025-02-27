// controllers/itemVendorMapController.js
/**
* Description: for find vedor list by item list in rfq genrate vendor selection
* Developer: Rakesh
* Created Date: 17-07-2023
* Updated By: Rakesh
* Last Updated:17-07-2023
*/


const { where } = require('sequelize');
const db = require('../models');
let { ItemVendorMap, VendorsMaster, item } = db;


const createItemVendorMap = async (req, res, next) => {
    try {
        const { item_id, vendor_id, created_by, updated_by } = req.body;
        const itemVendorMap = await ItemVendorMap.create({ item_id, vendor_id, created_by, updated_by });
        res.status(201).json(itemVendorMap);
    } catch (error) {
        next(error);
    }
};


const getItemVendorMap = async (req, res, next) => {
    try {
        const { item_ven_id } = req.query;
        let itemVendorMaps;

        if (item_ven_id) {
            itemVendorMaps = await ItemVendorMap.findByPk(item_ven_id);
            if (!itemVendorMaps) return res.status(404).json({ message: 'ItemVendorMap not found' });
        } else {
            itemVendorMaps = await ItemVendorMap.findAll();
        }

        res.status(200).json(itemVendorMaps);
    } catch (error) {
        next(error);
    }
};


const updateItemVendorMap = async (req, res, next) => {
    try {
        const { item_ven_id } = req.params;
        const { item_id, vendor_id, created_by, updated_by } = req.body;
        const itemVendorMap = await ItemVendorMap.findByPk(item_ven_id);

        if (!itemVendorMap) return res.status(404).json({ message: 'ItemVendorMap not found' });

        itemVendorMap.item_id = item_id || itemVendorMap.item_id;
        itemVendorMap.vendor_id = vendor_id || itemVendorMap.vendor_id;
        itemVendorMap.created_by = created_by || itemVendorMap.created_by;
        itemVendorMap.updated_by = updated_by || itemVendorMap.updated_by;

        await itemVendorMap.save();
        res.status(200).json(itemVendorMap);
    } catch (error) {
        next(error);
    }
};



const deleteItemVendorMap = async (req, res, next) => {
    try {
        const { item_ven_id } = req.params;
        const itemVendorMap = await ItemVendorMap.findByPk(item_ven_id);

        if (!itemVendorMap) return res.status(404).json({ message: 'ItemVendorMap not found' });

        await itemVendorMap.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        next(error);
    }
};

const getVednorListbyitemids = async (req, res, next) => {
    let { item_list } = req.body;
    try {
        let result = await ItemVendorMap.findAll({
            where: {
                item_id: item_list
            },
            attributes: ['vendor_id']
        })

        const vendorIds = result.map(result => result.vendor_id);
        let vendorlist = await VendorsMaster.findAll({
            where: {
                vendor_id: vendorIds
            },
        })
        res.status(200).json(vendorlist);
        // res.status(200).json({ msg: "Hello" });

    } catch (error) {
        next(error)
    }

};


module.exports = {
    createItemVendorMap,
    getItemVendorMap,
    updateItemVendorMap,
    deleteItemVendorMap,
    getVednorListbyitemids
};
