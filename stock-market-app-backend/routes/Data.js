const express = require("express");
const router = express.Router();
const {
  detailsOf20Stock,
  gettingEachStockDetails,
  gettingStockAndOpenPrice,
  getDetailsOfEachSymbolViaLoop,
} = require("../controllers/GettingData");
const { updateStockPrices } = require("../controllers/UpdateStockPrices");

//*****THIS ROUTER FETCH DETAILS OF 20 STOCKS WITH OPEN PRICES AND STORE IT INTO BACKEND */
router.get("/gettingDeailsOfSymbols", getDetailsOfEachSymbolViaLoop);

//*****THIS ROUTER UPDATE THE  PRICES WITH RANDOM VALUE EVERY REFRESHINTERVAL SECONDS IN THE BACKEND USING WEBSOKET AND SEND IT TO FRONTEND  ****/
router.get("/updateStockPricesUsingWebSokets", updateStockPrices);

//*****THIS ROUTER FETCH THE NAME OF THE COMPANY THAT USER WANT *********/
router.get("/fetchingStockNames", detailsOf20Stock);

router.get("/stockDetails", gettingEachStockDetails);

//**** THIS ROUTER CANNOT WORK AS I AM USING FREE API FROM POLYGON WHICH DOES NOT ALLOW ME MORE THAN 5 REQUEST PER MINUTE */
router.get("/gettinStockAndOpenPriceFromApi", gettingStockAndOpenPrice);

module.exports = router;
