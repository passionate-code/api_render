const axios = require('axios');
var {SitesModel} = require('./init_mongodb.js'); //import sitesmodel stored in mongodb

var get_sites = async (Model) => {
  var docs = await Model.find({}) // get documents from sitesmodel
  return docs
} // define async function get_sites

var names_urls = get_sites(SitesModel).then( docs => {
  var names_urls = [];// array to store name and url values of all sites
  for (doc of docs) { // iterate docs
    var site_name = doc.name; // get doc name attribute
    var site_url = doc.url; // get doc url attribute
    var name_url = [site_name,site_url]; // array to store name and url values of site
    names_urls.push(name_url); // append array to array that store name and url values of all sites
  }
  return names_urls; // return promise
});// execute get_sites func and define then method to handle on success

var get_status = async (data) => {
  var names_urls = await data; // get array of name and url values of all sites from promise object
  var sites_status = []; // array that store sites status code
  for (name_url of names_urls) {
    var site_name = name_url[0]; // define site name
    var site_url = name_url[1]; // define site url
    var status_code = await axios.get(site_url).then(response => {return response.status}); // check site response for its status code
    if (status_code == 200) {
      console.log(site_name+" site ok:"+status_code); // print ok
    } else {
      console.log(site_name+" site not ok:"+status_code); // print not ok
    }
    sites_status.push([site_name,status_code]); // push into main array that store sites status
  }
  return sites_status
} // define async function get_status

module.exports = {names_urls, get_status}; // export promise object and async function get_status