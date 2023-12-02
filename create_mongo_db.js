const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var conn = mongoose.createConnection('mongodb://root:example@mongo:27017',{useNewUrlParser:true,dbName:'mindswiss'}); //create connection to mindswiss db
var SitesSchema = new Schema({
  name: String,
  url: String,
  statuscode: Number,
  date: { type: Date, default: Date.now },
}); // define schema
var SitesModel = conn.model('Sites', SitesSchema); // create model using schema defined
module.exports = {SitesModel}; //export sitesmodel
