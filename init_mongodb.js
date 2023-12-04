const mongoose = require('mongoose');
const Schema = mongoose.Schema;

conn = mongoose.createConnection('mongodb+srv://root:example@atlascluster.jhntkyq.mongodb.net/?retryWrites=true&w=majority',{dbName:'merimen'});
var SitesSchema = new Schema({
  name: String,
  url: String,
  statuscode: Number,
  date: { type: Date, default: Date.now },
});
var site_docs = [{ name: 'google', url: 'https://www.google.com/', statuscode: 200, date: new Date(Date.now())},{ name: 'wikipedia', url: 'https://www.wikipedia.org/', statuscode: 200, date: new Date(Date.now()) },{ name: 'merimen', url: 'https://www.merimen.com.my/', statuscode: 200, date: new Date(Date.now()) }]
var SitesModel = conn.model('Sites', SitesSchema);
var create_doc = async (doc) => {
  await SitesModel.findOne({name: doc.name}).then(async (data) => {
    if (!data) {
      await SitesModel.create(doc).then(console.log(JSON.stringify(doc)+" created!")).catch((e) => console.log(e));
    } else {
      await SitesModel.updateOne({name: doc.name},doc).then(console.log(JSON.stringify(doc)+" updated!")).catch((e) => console.log(e));
    }
  })
  .catch((err) => console.log(err));
}
for (doc of site_docs) {
  create_doc(doc);
}

module.exports = {SitesModel}; //export sitesmodel
