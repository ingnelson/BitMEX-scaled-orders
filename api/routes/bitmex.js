const express = require("express");
const apiController = require("../controllers/rangeToolAPI");

const Router = express.Router();

//Router.post('/getPrice', apiController.displayPrice);
Router.post("/postOrder", apiController.postOrder);
// Router.get('/getInstruments', apiController.getInstruments);
module.exports = Router;
