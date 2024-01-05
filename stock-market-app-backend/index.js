const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
const Data = require("./routes/Data");
require("dotenv").config();
const path = require("path");
const stocksFilePath = path.join(__dirname, "./data/stock.json");

const PORT = process.env.PORT || 3000;
let stocksData;
try {
  stocksData = JSON.parse(fs.readFileSync(stocksFilePath, "utf8"));
} catch (error) {
  console.error("Error reading stocks data:", error);
}

app.use("/showData", Data);
app.use("/stocks/:value", (req, res) => {
  const value = req.params.value;
  const dataToSend = value
    ? stocksData.slice(0, parseInt(value, 10))
    : stocksData;
  const final = dataToSend.map(({ symbol, data: { open } }) => ({
    symbol,
    open,
  }));
  res.json(final);
});

app.listen(PORT, () => {
  console.log(`App is Running at ${PORT}`);
});
