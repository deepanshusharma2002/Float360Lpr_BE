const db = require("../models");
const { OprItems } = db;
const formattedDateTime = require("../middleware/time");
const { Op, where } = require("sequelize");
const { sequelize } = db;
const { QueryTypes } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");
// const opr_items = require('../models/');

const getOprItem = async (req, res, next) => {
  const opr_id = req.query.opr_id;
  try {
    if (opr_id) {
      let Opr_Items = await OprItems.findAll({
        where: {
          opr_id: opr_id,
          status: { [Op.ne]: 0 }, // status is not equal to 0
        },
        include: [
          { model: db.CompanyMaster, attributes: ["company_name"] },
          { model: db.OprMaster, attributes: ["opr_num"] },
          { model: db.AddressMaster, attributes: ["city", "address_id"] },
          {
            model: db.ItemsMaster,
            include: [
              {
                model: db.ItemSuperGroupMaster,
                attributes: ["item_super_group_name"],
              },
            ],
            attributes: { exclude: ["item_img"] },
            // attributes: ['item_name', 'item_type', 'item_code', 'quantity_in_stock', 'quantity_on_order', 'nafdac_category',]
          },
        ],
        attributes: {
          exclude: [
            "created_by",
            "updated_by",
            "updatedAt",
            "vertical_id",
            "company_id",
            "division_id",
            "rfq_id",
          ],
        },
      });

      // Transform the data
      const transformedData = Opr_Items.map((item) => ({
        opr_item_id: item.opr_item_id,
        item_id: item.item_id,
        opr_id: item.opr_id,
        opr_num: item.OprMaster.opr_num,
        qty: item.qty,
        stock_in_transit: item.stock_in_transit,
        stock_in_hand: item.stock_in_hand,
        monthly_consumption: item.monthly_consumption,
        item_description: item.item_description,
        status: item.status,
        item_type: item.ItemsMaster.item_type,
        item_code: item.ItemsMaster.item_code,
        item_name: item.ItemsMaster.item_name,
        quantity_in_stock: item.ItemsMaster.quantity_in_stock,
        quantity_on_order: item.ItemsMaster.quantity_on_order,
        nafdac_category: item.ItemsMaster.nafdac_category,
        sub_group: item.ItemsMaster.sub_group,
      }));
      res.status(200).json(Opr_Items);
    } else {
      let Opr_Items = await OprItems.findAll({
        where: {
          status: { [Op.ne]: 0 }, // status is not equal to 0
        },
        include: [
          { model: db.CompanyMaster, attributes: ["company_name"] },
          { model: db.OprMaster, attributes: ["opr_num"] },
          { model: db.AddressMaster, attributes: ["city", "address_id"] },
          {
            model: db.ItemsMaster,
            include: [
              {
                model: db.ItemSuperGroupMaster,
                attributes: ["item_super_group_name"],
              },
            ],
            attributes: { exclude: ["item_img"] },
            // attributes: ['item_name', 'item_type', 'item_code', 'quantity_in_stock', 'quantity_on_order', 'nafdac_category',]
          },
        ],
        attributes: {
          exclude: [
            "created_by",
            "updated_by",
            "updatedAt",
            "vertical_id",
            "company_id",
            "division_id",
            "rfq_id",
          ],
        },
      });

      // Transform the data
      const transformedData = Opr_Items.map((item) => ({
        opr_item_id: item.opr_item_id,
        item_id: item.item_id,
        opr_id: item.opr_id,
        opr_num: item.OprMaster.opr_num,
        qty: item.qty,
        stock_in_transit: item.stock_in_transit,
        stock_in_hand: item.stock_in_hand,
        monthly_consumption: item.monthly_consumption,
        item_description: item.item_description,
        status: item.status,
        item_type: item.ItemsMaster.item_type,
        item_code: item.ItemsMaster.item_code,
        item_name: item.ItemsMaster.item_name,
        quantity_in_stock: item.ItemsMaster.quantity_in_stock,
        quantity_on_order: item.ItemsMaster.quantity_on_order,
        nafdac_category: item.ItemsMaster.nafdac_category,
        sub_group: item.ItemsMaster.sub_group,
      }));
      res.status(200).json(Opr_Items);
    }
  } catch (err) {
    next(err);
  }
};

//this function will send only those data which status is 2
const getOprItemForRfq = async (req, res, next) => {
  try {
    let { opr_id_list } = req.query;
    if (typeof opr_id_list === "string") {
      opr_id_list = opr_id_list.split(",").map(Number); // Convert to numbers if needed
    }

    if (!opr_id_list || opr_id_list.length === 0) {
      return res.status(400).json({ message: "No opr_id provided" });
    }
    let Opr_Items = await OprItems.findAll({
      where: {
        [Op.and]: [{ status: 2 }, { opr_id: { [Op.in]: opr_id_list } }],
      },
      include: [
        { model: db.CompanyMaster, attributes: ["company_id", "company_name"] },
        // { model: db.OprMaster, attributes: ['opr_num', 'delivery_timeline_id', 'buy_from', 'buying_house_id'] },
        {
          model: db.OprMaster,
          attributes: [
            "opr_num",
            "buy_from",
            "buying_house_id",
            "delivery_timeline_id",
          ],
        },
        { model: db.AddressMaster, attributes: ["city", "address_id"] },
        {
          model: db.ItemsMaster,
          attributes: [
            "item_name",
            "item_type",
            "item_code",
            "quantity_in_stock",
            "quantity_on_order",
            "nafdac_category",
          ],
        },
      ],
      attributes: {
        exclude: [
          "created_by",
          "updated_by",
          "createdAt",
          "updatedAt",
          "vertical_id",
          "company_id",
          "division_id",
        ],
      },
    });
    res.status(200).json(Opr_Items);
  } catch (err) {
    next(err);
  }
};

const getOprItemForRfq3 = async (req, res, next) => {
  try {
    let Opr_Items = await OprItems.findAll({
      where: { status: 2 },
      include: [
        { model: db.company_master, attributes: ["company_name"] },
        {
          model: db.OprMaster,
          include: {
            model: db.DeliveryTimeline,
            attributes: ["delivery_timeline_name"],
          },
          attributes: ["opr_num"],
        },
        {
          model: db.ItemsMaster,
          include: {
            model: db.UomMaster,
            attributes: ["uom_name"],
          },
          attributes: [
            "item_name",
            "item_type",
            "item_code",
            "quantity_in_stock",
            "quantity_on_order",
            "nafdac_category",
          ],
        },
      ],
      attributes: {
        exclude: [
          "created_by",
          "updated_by",
          "createdAt",
          "updatedAt",
          "vertical_id",
          "company_id",
          "division_id",
        ],
      },
    });

    // Transform the data
    const transformedData = Opr_Items.map((item) => ({
      opr_item_id: item.opr_item_id,
      item_id: item.item_id,
      opr_id: item.opr_id,
      opr_num: item.OprMaster.opr_num,
      qty: item.qty,
      stock_in_transit: item.stock_in_transit,
      stock_in_hand: item.stock_in_hand,
      monthly_consumption: item.monthly_consumption,
      item_description: item.item_description,
      status: item.status,
      item_type: item.ItemsMaster.item_type,
      item_code: item.ItemsMaster.item_code,
      item_name: item.ItemsMaster.item_name,
      quantity_in_stock: item.ItemsMaster.quantity_in_stock,
      quantity_on_order: item.ItemsMaster.quantity_on_order,
      nafdac_category: item.ItemsMaster.nafdac_category,
      sub_group: item.ItemsMaster.sub_group,
      uom: item.ItemsMaster.UomMaster.uom_name || "null",
    }));
    res.status(200).json(transformedData);
  } catch (err) {
    next(err);
  }
};

const getOprItemForRfq2 = async (req, res, next) => {
  try {
    let Opr_Items = await OprItems.findAll({
      where: { status: 2 },
      include: [
        { model: db.company_master, attributes: ["company_name"] },
        { model: db.OprMaster, attributes: ["opr_num"] },
        {
          model: db.ItemsMaster,
          include: {
            model: db.UomMaster,
            attributes: ["uom_name"], // Fetch the UOM name
          },
          attributes: [
            "item_name",
            "item_type",
            "item_code",
            "quantity_in_stock",
            "quantity_on_order",
            "nafdac_category",
          ],
        },
        { model: db.AddressMaster, attributes: ["address_type", "address_id"] },
      ],
      attributes: {
        exclude: [
          "created_by",
          "updated_by",
          "createdAt",
          "updatedAt",
          "vertical_id",
          "company_id",
          "division_id",
        ],
      },
    });

    // Transform the data
    const transformedData = Opr_Items.map((item) => ({
      opr_item_id: item.opr_item_id,
      item_id: item.item_id,
      opr_id: item.opr_id,
      opr_num: item.OprMaster.opr_num,
      qty: item.qty,
      stock_in_transit: item.stock_in_transit,
      stock_in_hand: item.stock_in_hand,
      monthly_consumption: item.monthly_consumption,
      item_description: item.item_description,
      status: item.status,
      item_type: item.ItemsMaster.item_type,
      item_code: item.ItemsMaster.item_code,
      item_name: item.ItemsMaster.item_name,
      quantity_in_stock: item.ItemsMaster.quantity_in_stock,
      quantity_on_order: item.ItemsMaster.quantity_on_order,
      nafdac_category: item.ItemsMaster.nafdac_category,
      sub_group: item.ItemsMaster.sub_group,
      uom: item.ItemsMaster.UomMaster.uom_name || "null",
    }));
    res.status(200).json(Opr_Items);
  } catch (err) {
    next(err);
  }
};

//GET OPR ITEM BY opr id
const getOprItembyOprId = async (req, res, next) => {
  console.log("******second**********************");
  const opr_id = req.query.opr_id;
  try {
    const result = await OprItems.findAll({
      where: {
        opr_id: opr_id,
        status: { [Op.ne]: 0 },
      },
    });

    let temp_itemdetails = {
      id: 1,
      item_type: "Raw Material",
      sub_group: "Pharmaceuticals",
      item_code: "RM-001",
      item_name: "Paracetamol",
      item_description: "500mg Tablets",
      quantity_in_stock: 1000,
      quantity_on_order: 500,
      nafdac_category: "A1",
      quantity: 1500,
      uom: "Tablets",
      stock_in_transit: 200,
      stock_in_hand: 1300,
      monthly_consumption: 500,
    };

    await result.forEach((item) => (item.dataValues = { ...temp_itemdetails }));

    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Opr Controller to delete by id
const deleteOprdraftItem = async (req, res, next) => {
  try {
    await OprItems.update(
      { status: 0 },
      {
        where: {
          opr_item_id: req.query.opr_item_id,
        },
      }
    );
    res.status(204).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Opr Controller to create
const createOprItem = async (req, res, next) => {
  try {
    const {
      opr_id,
      company_id,
      item_id,
      address_id,
      shipment_type_name,
      uom_name,
      qty,
      stock_in_transit,
      stock_in_hand,
      monthly_consumption,
      item_description,
    } = req.body;
    console.log(req.body);

    if (req.body.opr_item_id) {
      console.log("req.body.opr_item_id", req.body.opr_item_id);
      // const result2 = await db.UomMaster.findAll({
      //   where: {
      //     uom_name: uom_name,
      //     status: { [Op.ne]: 0 },
      //   },
      // });
      // console.log("result2", result2);
      // const convertedUom =
      //   uom_name === result2[0].mimimun_uom ? uom_name : result2[0].mimimun_uom;
      // const convertedQty =
      //   uom_name === result2[0].mimimun_uom
      //     ? qty
      //     : qty * result2[0].conversion_rate;

      // console.log("convertedUom", convertedUom);
      // console.log("convertedQty", convertedQty);
      const result = await OprItems.update(
        {
          opr_id,
          company_id,
          item_id,
          address_id,
          // uom_name: convertedUom,
          // qty: convertedQty,
          uom_name: uom_name,
          qty: qty,
          stock_in_transit,
          stock_in_hand,
          shipment_type_name,
          monthly_consumption,
          item_description,
          selected_qty: qty,
          selected_uom: uom_name,
        },
        {
          where: {
            opr_item_id: req.body.opr_item_id,
          },
        }
      );
      res.status(201).json({ message: "Updated Successfully" });
    } else {
      // console.log("result4");
      // const result2 = await db.UomMaster.findAll({
      //   where: {
      //     uom_name: uom_name,
      //     status: { [Op.ne]: 0 },
      //   },
      // });
      // const convertedUom =
      //   uom_name === result2[0].mimimun_uom ? uom_name : result2[0].mimimun_uom;
      // const convertedQty =
      //   uom_name === result2[0].mimimun_uom
      //     ? qty
      //     : qty * result2[0].conversion_rate;

      // console.log("convertedUom", convertedUom);
      // console.log("convertedQty", convertedQty);
      const result = await OprItems.create({
        opr_id,
        company_id,
        item_id,
        address_id,
        // uom_name: convertedUom,
        // qty: convertedQty,
        uom_name: uom_name,
          qty: qty,
        stock_in_transit,
        shipment_type_name,
        stock_in_hand,
        monthly_consumption,
        item_description,
        selected_qty: qty,
        selected_uom: uom_name,
        status: 2,
      });
      res.status(201).json({ message: "Submit Successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// Opr Controller to create
const createOprItem2 = async (req, res, next) => {
  try {
    const {
      address_id,
      opr_id,
      company_id,
      item_id,
      qty,
      stock_in_transit,
      stock_in_hand,
      monthly_consumption,
      item_description,
    } = req.body;
    console.log(req.body);
    req.body.status = 1;
    const result = await OprItems.create(req.body);
    res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    next(err);
  }
};

// Opr Controller to update by id
const updateOprItemById = async (req, res, next) => {
  const opr_item_id = req.query.opr_item_id;
  try {
    const {
      opr_id,
      item_id,
      qty,
      stock_in_transit,
      stock_in_hand,
      monthly_consumption,
      item_description,
      updated_by,
    } = req.body;
    await OprItems.update(
      {
        opr_id,
        item_id,
        qty,
        stock_in_transit,
        stock_in_hand,
        monthly_consumption,
        item_description,
        updated_by,
        updated_on: formattedDateTime,
      },
      {
        where: {
          opr_item_id: opr_item_id,
        },
      }
    );
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

const getCombinedItemsByOprItemIds = async (req, res, next) => {
  const opr_item_id = req.body.opr_item_ids;
  try {
    let query = `SELECT item_id AS item_name,item_id AS avl_qty,item_id AS item_description , item_id, SUM(qty) AS qty 
            FROM opr_items
            WHERE opr_item_id IN (${opr_item_id.join(",")})
            GROUP BY item_id`;

    const items = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    await items.forEach(
      (item) => ((item.item_code = "code"), (item.quantity_in_stock = 2))
    ); //changed

    res.status(201).json(items);
  } catch (err) {
    next(err);
  }
};

// get opr item list by po no for pfi genratation
const getOprListbyPoNumber = async (req, res, next) => {
  try {
    let { po_id, company_id } = req.query;
    let query = `   select
                        po_items.item_id as item_id,
                        dbo.fn_itemCode(po_items.item_id) as item_code,
                        dbo.fn_itemName(po_items.item_id) as item_name,
                        po_items.po_item_description as item_descripion,
                        opr_items.qty,
                        opr_items.company_id as company_id,
                        po_items.rate
                        from po_items
                        inner join  opr_items
                        on opr_items.rfq_id = po_items.rfq_id
                        where opr_items.company_id = ${company_id} and po_items.po_id= ${po_id}
                        and opr_items.item_id = po_items.item_id  
                        `;
    let [result, metadata] = await db.sequelize.query(query);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// get opr item company list by po no
const getcompanylistPoNumber = async (req, res, next) => {
  try {
    let { po_id } = req.query;
    console.log("po_id", po_id);
    // let query = `
    //     select * from opr_items
    //     where rfq_id in
    //     ( select quotations_master.rfq_id as rfq_id from po_master
    //     inner join quotations_master
    //     on quotations_master.quo_id = po_master.quo_id  where po_master.po_id=${po_id})`
    // let [result, metadata] = await db.sequelize.query(query);

    let query = `select  distinct  opr_items.company_id ,dbo.fn_companyname(opr_items.company_id)  as comp_name
            from opr_items            
			inner join po_items
			on opr_items.rfq_id =  po_items.rfq_id
			where  po_items.po_id=${po_id}`;

    let [result, metadata] = await db.sequelize.query(query);
    await result.forEach(
      (item, index) => (item.status = index % 2 == 0 ? 1 : 0)
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// this funcation will give company dorp down for create rfq,
const getOprCompanyDropdown = async (req, res, next) => {
  try {
    let oprCompanyList = await OprItems.findAll({
      distinct: true,
      where: { status: { [Op.e]: 2 } },
      include: [
        {
          model: db.CompanyMaster,
          where: { status: 1 },
          attributes: ["company_id", "company_name"],
        },
      ],
      attributes: [],
    });
    res.status(200).json(oprCompanyList);
  } catch (err) {
    next(err);
  }
};

const getOprItemsforQuoteCompare = async (req, res, next) => {
  let { opr_id, company_id } = req.query;

  //     let query = `select
  // opr_items.item_id,
  // opr_items.company_id,
  // opr_items.qty,
  // opr_items.address_id,
  // address_master.city,
  // quotations_master.vendor_id,
  // vendors_master.vendor_name,
  // quotation_items.rate
  // from opr_items
  // inner join quotations_master
  // on quotations_master.rfq_id = opr_items.rfq_id
  // inner join quotation_items
  // on quotation_items.quo_id = quotations_master.quo_id
  // inner join address_master
  // on address_master.address_id = opr_items.address_id
  // inner join vendors_master
  // on vendors_master.vendor_id = quotations_master.vendor_id
  // where company_id = ${company_id} and opr_id = ${opr_id}
  // `

  let query = `
            select 
            opr_items.item_id,
            opr_items.company_id,
            opr_items.qty,
            opr_items.address_id,
            quotation_items.rate as rate,
            quotation_items.vendor_id as vendor_id,
            vendors_master.vendor_name,
            address_master.city,
            quotation_items.quo_id,
            quotation_items.rfq_id
            from opr_items
            inner join quotation_items
            on quotation_items.rfq_id =opr_items.rfq_id
            and quotation_items.item_id = opr_items.item_id
            inner join address_master
            on address_master.address_id = opr_items.address_id
            inner join vendors_master
            on vendors_master.vendor_id= quotation_items.vendor_id
            where company_id = ${company_id} and opr_id = ${opr_id}`;

  console.log("************auery");
  console.log(query);

  let data = await db.sequelize.query(query, {
    // replacements: { opr_id: opr_id || null }, // Safe parameter binding
    type: db.sequelize.QueryTypes.SELECT,
  });
  // transform data
  res.status(200).json(data);
};

// this middle
const oprItemsController = {
  getOprItem,
  deleteOprdraftItem,
  createOprItem,
  updateOprItemById,
  getCombinedItemsByOprItemIds,
  getOprItembyOprId,
  getOprListbyPoNumber,
  getcompanylistPoNumber,
  getOprItemForRfq,
  createOprItem2,
  getOprItemForRfq2,
  getOprCompanyDropdown,
  getOprItemsforQuoteCompare,
};
module.exports = oprItemsController;
