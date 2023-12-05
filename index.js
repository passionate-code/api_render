const express = require("express");
const path = require("path");
const bp = require("body-parser");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
var {SitesModel} = require('./init_mongodb.js'); //import sitesmodel stored in mongodb
var {check_sites_scheduler} = require('./cron_task.js'); //import promise array names_urls
var {names_urls} = require('./check_sites.js'); //import promise array names_urls

const app = express();
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body

app.use(
  cors({
    origin: "*", //server accessible to any domain that requests a resource from your server via a browser
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"], // allowable methods
  })
);

app.use(bp.json()); // returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
app.use(bp.urlencoded({ extended: true })); // "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded

const port = process.env.PORT || 3001; // set port

app.listen(port, () => { //
  console.log("Server Running at http://localhost:3001/");
});

var get_updated_data = async (Model) => {
  var docs = await Model.find({}) // get documents from sitesmodel
  var json_docs = [];// array to store json objects that contains data for all sites
  for (doc of docs) { // iterate docs
    json_doc = {"id":doc._id,"name":doc.name,"url":doc.url,"statuscode":doc.statuscode,"date":doc.date} // define json object that contains data from each doc
    json_docs.push(json_doc); // append array to array that store json objects that contains data for all sites
  }
  return json_docs; // return promise
}

app.get("/", async (request, response) => {
  var json_docs = await get_updated_data(SitesModel); // execute get_updated_data func and assign array of json objects that contain updated data from mongo db
  response.json(json_docs); // send array of json objects as a response
});

check_sites_scheduler(names_urls,SitesModel); 

module.exports = app;