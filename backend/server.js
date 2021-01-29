//mongodb+srv://123:<password>@cluster-wms.0uh3j.mongodb.net/test
//var express = require("express");
//var path = require("path");
//var bodyParser = require('body-parser');
//var morgan = require("morgan");
//var db = require("./config.js");
//var cors = require('cors');
//var mongoose = require('mongoose');
//const joinQuery = require("mongo-join-query");

//const CircularJSON = require('circular-json');
//const Axios = require("axios");
//const db = require("./config.js");
//const { json } = require("express");
//const foliokarvy = require("./route.js");



import express from 'express';
//import data from './data.js';
import dotenv from 'dotenv';
 //import config from './config.js';
 import mongoose from 'mongoose';
 import path from 'path';
 //import userRoute from './routes/userRoute.js';
 //import productRoute from './routes/productRoute.js';
 //import uploadRouter from './routes/uploadRouter.js';
import bodyParser from 'body-parser';
//import orderRouter from './routes/orderRouter.js';

import morgan from 'morgan';
//import db from './config.js';
//import config from './config.js';
import cors from 'cors';
import Axios from 'axios';
var Schema = mongoose.Schema;
 import userRoute from './routes/userRoute.js';



dotenv.config();
//const mongodbUrl= config.MONGODB_URL;

//const mongodbUrl= process.env.MONGODB_URL || 'mongodb+srv://ankesh123:ankesh123@bookcluster.lqj7y.mongodb.net/wmsdb?authSource=admin&replicaSet=atlas-j3drm8-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';

//const mongodbUrl= `mongodb+srv://ankesh123:ankesh123@bookcluster.lqj7y.mongodb.net/wmsdb?authSource=admin&replicaSet=atlas-j3drm8-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;


const mongodbUrl= process.env.MONGODB_URL;

var db=mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useCreateIndex:true
}).catch(error => console.log(error.reason));


console.log("dbgggggggggggg",db,"ddddssssssssssssssddddddddvb");


var app = express();
const __dirname = path.resolve();
//var port = process.env.port || 3001;
var srcpath = path.join(__dirname, '/public');
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


 

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoute);


//var getschema = require("../backend/route.js");//ravi line

//const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));




// import MongoClient from 'mongodb';
// //import Axios from 'axios';
// var url = process.env.MONGODB_URL || 'mongodb+srv://Saurabh:Saurabh@123@cluster0.xavdk.mongodb.net/wms?retryWrites=true&w=majority';

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.collection("customers").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });



app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port= process.env.PORT || 3000;


// call by default index.html page


//server stat on given port
app.listen(port, function () {
    console.log("server start on port" + port);
})
