const path = require("path")
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes =  require("./routes/posts");
const userRoutes  = require("./routes/user");

const app = express();

const passwordForMongoDB = process.env.MONGO_ATLAS_PW 
const jwtKey = process.env.JWT_KEY


mongoose.connect(process.env.MONGODB_URI ||
  "mongodb+srv://gwhyte2021:"+ passwordForMongoDB +"@cluster0.ipz87.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database')
  })
  .catch(()=>{
    console.log('Connection failed!!')
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Access-Control-Allow-Headers, X-Requested-With, Accept, Authorization"
  );
  res.setHeader(
   "Access-Control-Allow-Methods",
   "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})


app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
