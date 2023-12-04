const express = require("express");
const path = require("path");
const bp = require("body-parser");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const port = process.env.PORT || 3001; // set port

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () => { //
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();


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
  var site_doc = new SitesModel(doc);
  await site_doc.save().then(console.log(JSON.stringify(doc)+" done!")).catch((e) => console.log(e));
}
for (doc of site_docs) {
  create_doc(doc);
}
//if ( typeof SitesModel !== 'undefined' && SitesModel )
//{
//  console.log("model created!");
////  for (doc of site_docs) { // iterate docs
////    create_doc(doc);
////    console.log("doc done!");
////  }
//}
//else
//{
//  console.log("something went wrong!");
//}




//if ( typeof SitesModel !== 'undefined' && SitesModel )
//{
//  console.log("model created!");
//  for (doc of site_docs) { // iterate docs
//    create_doc(doc);
//    console.log("doc done!");
//  }
//}
//else
//{
//  console.log("something went wrong!");
//}

// User Register API
app.post("/users/", async (request, response) => {
  const { username, name, password, gender, location } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createUserQuery = `
      INSERT INTO 
        user (username, name, password, gender, location) 
      VALUES 
        (
          '${username}', 
          '${name}',
          '${hashedPassword}', 
          '${gender}',
          '${location}'
        )`;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new user with ${newUserId}`);
  } else {
    response.status = 400;
    response.send("User already exists");
  }
});


app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid User");
  } else {
    console.log(password);
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      response.send("Login Success!");
    } else {
      response.status(400);
      response.send("Invalid Password");
    }
  }
});

module.exports = app;