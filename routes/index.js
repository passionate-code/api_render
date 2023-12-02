var express = require('express');
var router = express.Router();
//var {SitesModel} = require('../create_mongo_db.js'); //import sitesmodel stored in mongodb

//var get_updated_data = async (Model) => {
//  var docs = await Model.find({}) // get documents from sitesmodel
//  var json_docs = [];// array to store json objects that contains data for all sites
//  for (doc of docs) { // iterate docs
//    json_doc = {"id":doc._id,"name":doc.name,"url":doc.url,"statuscode":doc.statuscode,"date":doc.date} // define json object that contains data from each doc
//    json_docs.push(json_doc); // append array to array that store json objects that contains data for all sites
//  }
//  return json_docs; // return promise
//}

/* GET home page. */
router.get('/', async (req, res) => { // router to handle api call for index page (/) and async callback function
  //var json_docs = await get_updated_data(SitesModel); // execute get_updated_data func and assign array of json objects that contain updated data from mongo db
  res.json({"text":"test ok"}); // send array of json objects as a response
});

module.exports = router;
