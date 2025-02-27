const { BuyingHouse } = require("../models"); // Import the BuyingHouse model
const { generateSeries } = require("../utilites/genrateSeries");
const { Op, where } = require("sequelize");

// Create a new BuyingHouse
exports.createBuyingHouse = async (req, res) => {
  try {
    let {
      buying_house_name,
      contact_number,
      contact_email,
      address_line1,
      address_line2,
      city,
      state,
      country,
      postal_code,
      status
    } = req.body;
    console.log("req.body", req.body)
    const code = await generateSeries("BH");
    const buyingHouse = await BuyingHouse.create({
      buying_house_code: code,
      buying_house_name: buying_house_name,
      status: status,
      address_line1: address_line1,
      address_line2: address_line2,
      city: city,
      contact_email: contact_email,
      contact_number: contact_number,
      country: country,
      postal_code: postal_code,
      state: state,
    });
    res.status(201).json(buyingHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all BuyingHouses
exports.getAllBuyingHouses = async (req, res) => {
  try {
    const buyingHouses = await BuyingHouse.findAll({
      order: [["updatedAt", "DESC"]],
      where: {
        status: { [Op.ne]: 0 },
      },
    });
    res.status(200).json(buyingHouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all BuyingHouses for drop down
exports.getBhdropDown = async (req, res) => {
  try {
    const buyingHouses = await BuyingHouse.findAll({
      attributes: ["buying_house_id", "buying_house_name", "country"],
    });
    res.status(200).json(buyingHouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single BuyingHouse by ID
exports.getBuyingHouseById = async (req, res) => {
  console.log("id", req.query.buying_house_id)
  try {
    const buyingHouse = await BuyingHouse.findByPk(req.query.buying_house_id);
    if (buyingHouse) {
      res.status(200).json(buyingHouse);
    } else {
      res.status(404).json({ message: "BuyingHouse not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a BuyingHouse by ID
exports.updateBuyingHouse = async (req, res, next) => {
  const itemId = req.query.buying_house_id;
  const updatedData = req.body;

  try {
    const item = await BuyingHouse.findByPk(itemId, {
      where: { status: { [Op.ne]: 0 } },
    });

    if (!item) {
      return res.status(404).json({ error: "BuyingHouse not found" });
    }

    await item.update(updatedData);

    res
      .status(200)
      .json({ msg: "BuyingHouse updated successfully", data: item });
  } catch (error) {
    console.error(`Error updating BuyingHouse with id ${itemId}:`, error);
    next(error);
  }
};

// Soft delete a BuyingHouse by ID
exports.deleteBuyingHouse = async (req, res) => {
  try {
    const buyingHouse = await BuyingHouse.findByPk(req.query.buying_house_id);

    if (!buyingHouse) {
      return res.status(404).json({ message: "BuyingHouse not found" });
    }

    // Perform the soft delete by updating the status
    await buyingHouse.update({ status: 0 });

    res
      .status(200)
      .json({ message: "BuyingHouse deleted successfully", data: buyingHouse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
