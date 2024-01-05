//*************************USING WEB SOKET*************** */

const path = require("path");
const fs = require("fs/promises");
const WebSocket = require("ws");
const stocksFilePath = path.join(__dirname, "../data/stock.json");

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
let updateInterval = 1000;

const updateStockPrices = async () => {
  try {
    let stocksData = JSON.parse(await fs.readFile(stocksFilePath));

    // Updated: Set a single interval for all stock updates
    // Adjust as needed

    // Updated: Use for...of loop to iterate directly over stocksData
    for (const stock of stocksData) {
      updateInterval = stock.refreshInterval * 1000;
      const newPrice = stock.data.open * Math.floor(Math.random() * 4) + 1;
      stock.data.open = newPrice;
      console.log(`Updated price for ${stock.symbol}: ${newPrice}`);
    }
    await fs.writeFile(stocksFilePath, JSON.stringify(stocksData, null, 2));

    // Send updated data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(stocksData));
      }
    });
    setInterval(updateStockPrices, updateInterval);
  } catch (error) {
    console.error(error);
  }
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });
});

module.exports = { updateStockPrices };

//******************THIS IS THE FUNCTIONALITY IN WHICK STOCK PRICES ARE UPDATED EVERY REFERESHITNTERVAL FROM THE BACKEND AND SEDIND THE DATA TO THE FRONTEND BUT THERE IS A PROBLEM THIS CONTROLLER STARTED SHOWING UNEVEN BEHAVIOUR WHILE SENDING DATA TO THE FRONTEND SO I HAVE TO USE WEBSOKETS INSTEAD OF THIS CONTROLLERs************/

// exports.updateStockPrices = async (req, res) => {
//   try {
//     let stocksData = JSON.parse(await fs.readFile(stocksFilePath));

//     // Updated: Set a single interval for all stock updates
//     let updateInterval; // Adjust as needed
//     setInterval(async () => {
//       // Updated: Use for...of loop to iterate directly over stocksData
//       for (const stock of stocksData) {
//         updateInterval = stock.refreshInterval * 1000;
//         const newPrice = stock.data.open * Math.floor(Math.random() * 4) + 1;
//         stock.data.open = newPrice;
//         console.log(`Updated price for ${stock.symbol}: ${newPrice}`);
//       }
//       await fs.writeFile(stocksFilePath, JSON.stringify(stocksData, null, 2));
//     }, updateInterval);

//     return res.status(200).json({
//       success: true,
//       message: "Stock prices update process started",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
