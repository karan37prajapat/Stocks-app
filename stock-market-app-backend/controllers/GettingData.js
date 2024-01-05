require("dotenv").config();
const fs = require("fs/promises");
const apiKey = process.env.POLYGON_API_KEY;
const axios = require("axios");
const path = require("path");
const stocksFilePath = path.join(__dirname, "../data/stock.json");

// I have to initilize the symbols of all 20 because  stock name and open price details were in 2 different api version so if i tried to apply loop that first i get the stock name and then the deails of that stock  it will be a long procedure and some of the stock also did not have opening price  so i have to get valid sybmols and get their details

exports.getDetailsOfEachSymbolViaLoop = async (req, res) => {
  try {
    const allStocksData = []; // Array to store data for all symbols
    const symbols = [
      "AAPL",
      "GOOG",
      "TSLA",
      "MSFT",
      "AMZN",
      "ACCO",
      "NFLX",
      "NVDA",
      "AMD",
      "INTC",
      "QCOM",
      "CSCO",
      "ORCL",
      "IBM",
      "UBER",
      "LYFT",
      "ACHR",
      "SNAP",
      "PINS",
      "ZM",
    ];
    const requestsPerMinute = 4; // free api of polygon only allow 5 request per minute
    const interval = (60 * 1000) / requestsPerMinute;

    for (const symbol of symbols) {
      //loop to get details of each symbol
      try {
        const url = `https://api.polygon.io/v1/open-close/${symbol}/2023-01-09?adjusted=true&apiKey=${apiKey}`;
        const response = await axios.get(url);

        if (response.status === 200) {
          const data = response.data;
          console.log(
            `Open Price for ${symbol}:`,
            data.open,
            " And wait for getting open price for next symbol "
          );
          allStocksData.push({ symbol, data });
        } else {
          console.error(
            `Error fetching data for ${symbol}. Status Code: ${response.status}`,
            error
          );
        }
        await new Promise((resolve) => setTimeout(resolve, interval)); //introduced a timeout till the data is fetched
      } catch (error) {
        console.error("Error fetching stocks data:", error);
      }
    }
    allStocksData.forEach((stock) => {
      stock.refreshInterval = Math.floor(Math.random() * 5) + 1; //assign refreshInterval to each stock
    });

    fs.writeFile(stocksFilePath, JSON.stringify(allStocksData, null, 2)); //pushing all stocks data to the stock.jsonfile
    console.log("All stocks data has been written to the file.");
    return res.status(200).json({
      success: true,
      message: "Everything gone well",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//this is a controller which give 20 stocks as this api used in this controller does not give open price with id

exports.detailsOf20Stock = async (req, res) => {
  const numberOfStocksNeeded = 10;
  const url = `https://api.polygon.io/v3/reference/tickers?limit=${numberOfStocksNeeded}&market=stocks&active=true&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);

    for (let i = 0; i < numberOfStocksNeeded; i++) {
      console.log("Symbol:", response.data.results[i].ticker);
      console.log("Company Name :", response.data.results[i].name);
    }
    console.log("Count:", response.data.count);

    return res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: response.data.results,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//as you can see this api gives this open price which is diffeent

exports.gettingEachStockDetails = async (req, res) => {
  const STOCK_SYMBOL = "IBM";
  const url = `https://api.polygon.io/v1/open-close/${STOCK_SYMBOL}/2023-01-09?adjusted=true&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(`Open Price for ${STOCK_SYMBOL}`, response.data.open);
    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully",
      data: response.data.open,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// this first get stock name and find the open price for it but most of the companies does'nt have open price and also i can make only 5 request per minute so this code will generated too many request to the server

exports.gettingStockAndOpenPrice = async (req, res) => {
  const url = `https://api.polygon.io/v3/reference/tickers?limit=20&market=stocks&active=true&apiKey=${apiKey}`;
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const tickers = data.results;
        tickers.forEach((ticker) => {
          const url2 = `https://api.polygon.io/v1/open-close/${ticker.ticker}/2023-01-09?adjusted=true&apiKey=NOuipZpd_nUg6r7M7rzXpQhIV2tBvJIJ`;
          fetch(url2)
            .then((response) => response.json())
            .then((data) => {
              console.log("Data ->", data);
              console.log(
                `The opening price for ${ticker.ticker} is ${data.open}`
              );
            })
            .catch((error) => console.error("Error:", error));
        });
      })
      .catch((error) => console.error("Error:", error));

    return res.status(200).json({
      success: true,
      message: "Data fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
