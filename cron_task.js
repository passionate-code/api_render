const cron = require('node-cron');
var {get_status} = require('./check_sites.js'); //import async function get_status and promise array names_urls

var model_doc_update = async (data,model) => { // define async function model_doc_update that accept two arguments: model object and promise object that contain data to update the docs in model
  names_statuscodes =  await data; // get data to update from promise object
  for (name_statuscode of names_statuscodes) { // iterate over data
    await model.findOneAndUpdate({name:name_statuscode[0]},{date:new Date(),statuscode:name_statuscode[1]},{returnNewDocument:true,new:true,strict:false}); //find doc in model and update
    console.log("done updating!"); // print done update
  }
}

function check_sites_scheduler (data,model) {
  cron.schedule('*/30 * * * * *', () => {
    var sites_status = get_status(data); // execute get_status that return a promise and saved it to a variable
    model_doc_update(sites_status,model); // execute model_doc_update to update documents in model with data from sites_status variable
  },{
    scheduled: true, // define option to start schedule automatically
    timezone: "Asia/Singapore" // define option timezone that schedule follows
  });
}

module.exports = {check_sites_scheduler}; // export function check_sites_scheduler