import express from 'express';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import morgan from 'morgan'; 
import cors from 'cors';
import Axios from 'axios';
var Schema = mongoose.Schema;

dotenv.config();
const mongodbUrl= config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useCreateIndex:true
}).catch(error => console.log(error.reason));


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
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
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
