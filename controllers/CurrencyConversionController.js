// controllers/criaController.js
const { Op } = require("sequelize");
const { CurrencyConversion } = require("../models");

const GetCurrencyConversion = async (req, res, next) => {
  try {
    const criaEntries = await CurrencyConversion.findAll({
      where: {
        currency_to: "USD",
      }
    });
    res.json(criaEntries);
  } catch (error) {
    next(error);
  }
};

const GetCurrencyConversionRate = async (req, res, next) => {
  try {
    // Example usage
    const result = await convertCurrency(1, 'USD', 'CNY');
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const convertCurrency = async (cost, from, to) => {
  if (from === to) {
    return Number(cost);
  } else {
    const data = await CurrencyConversion.findAll();
    const ratesObject = {};
    data?.forEach((item) => {
      ratesObject[item?.currency_from] = Number((1 / item?.conversion_rate).toFixed(2));
    });
    rates = {
      USD: 1.0,
      ...ratesObject
    };
    const costInUSD = cost / (rates[from] || 0);
    const convertedCost = costInUSD * (rates[to] || 0);
    // return Number(convertedCost);
    return data;
  }
};

// Export the functions for use in routes or other controllers
module.exports = {
  GetCurrencyConversion,
  GetCurrencyConversionRate
};
