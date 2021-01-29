import express from 'express';
import mongoose from 'mongoose';
//import dotenv from 'dotenv'; 
//import path from 'path';
//import bodyParser from 'body-parser';
//import morgan from 'morgan';
import cors from 'cors';
import Axios from 'axios';
var Schema = mongoose.Schema;




  
//import data from '../data.js';


const router=express.Router();

//User Data Seed


const mongodbUrl= process.env.MONGODB_URL;

var db=mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useCreateIndex:true
}).catch(error => console.log(error.reason));
 
 console.log("dbbbbbbbbbbbb",db,error);

var newdata="";var newdata1=""; 
var newdata2="";var datacon="";
const navcams = new Schema({
    SchemeCode: { type: String },
    ISINDivPayoutISINGrowth: { type: String },
    ISINDivReinvestment: { type: String },
    SchemeName: { type: String ,required: true},
    NetAssetValue: { type: String },
    Date: { type: String },
}, { versionKey: false });

var i='';

const foliocams = new Schema({
    AMC_CODE: { type: String },
    FOLIOCHK: { type: String },
    INV_NAME: { type: String },
    SCH_NAME: { type: String },
    JNT_NAME1: { type: String },
    JNT_NAME2: { type: String },
    HOLDING_NATURE: { type: String },
    PAN_NO: { type: String },
    JOINT1_PAN: { type: String },
    BANK_NAME: { type: String },
    AC_NO: { type: String },
    NOM_NAME: { type: String },
    NOM2_NAME: { type: String },
    NOM3_NAME: { type: String },
    IFSC_CODE: { type: String },
    PRODUCT: {type: String},
}, { versionKey: false });

const foliokarvy = new Schema({
    Folio: { type: String },
    City: { type: String },
    Email: { type: String },
    BankAccno: { type: String },
    InvestorName: { type: String },
    PANNumber: { type: String },
}, { versionKey: false });

const foliofranklin = new Schema({
    BRANCH_N12: { type: String },
    BANK_CODE: { type: String },
    IFSC_CODE: { type: String },
    NEFT_CODE: { type: String },
    NOMINEE1: { type: String },
    FOLIO_NO: { type: String },
    INV_NAME: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    ADDRESS2: { type: String },
    ADDRESS3: { type: String },
    D_BIRTH: { type: String },
    F_NAME: { type: String },
    PHONE_RES: { type: String },
    PANNO1: { type: String },
}, { versionKey: false });

const transcams = new Schema({
    AMC_CODE: { type: String },
    FOLIO_NO: { type: String },
    PRODCODE: { type: String },
    SCHEME: { type: String },
    INV_NAME: { type: String }, 
    TRXNNO: {type: String },
    TRADDATE: { type: Date },
    POSTDATE: { type: String },
    UNITS: { type: String },
    AMOUNT: { type: Number },
    TRXN_NATURE: { type: String },
    SCHEME_TYPE: { type: String },
    PAN: { type: String },
    TRXN_TYPE_FLAG: { type: String },    
}, { versionKey: false });

const transkarvy = new Schema({
    FMCODE: { type: String },
    TD_ACNO: { type: String },
    FUNDDESC: { type: String },
    TD_TRNO: { type: String },
    SMCODE: { type: String },
    INVNAME: { type: String },
    TD_TRDT: { type: Date },
    TD_POP: { type: String },
    TD_AMT: { type: Number },
    TD_APPNO: { type: String },
    UNQNO: { type: String },
    TD_NAV: { type: String },
    IHNO: { type: String },
    BRANCHCODE: { type: String },
    TRDESC: { type: String },
    PAN1: { type: String },
    ASSETTYPE:{ type: String},
    TD_UNITS: { type: Number},
    SCHEMEISIN:{ type: String},
}, { versionKey: false });

const transfranklin = new Schema({
    COMP_CODE: { type: String },
    SCHEME_CO0: { type: String },
    SCHEME_NA1: { type: String },
    FOLIO_NO: { type: String },
    TRXN_TYPE: { type: String },
    TRXN_NO: { type: String },
    INVESTOR_2: { type: String },
    TRXN_DATE: { type: Date },
    NAV: { type: String },
    POP: { type: String },
    UNITS: { type: String },
    AMOUNT: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    IT_PAN_NO1: { type: String },
    IT_PAN_NO2: { type: String },
}, { versionKey: false });

var cams_navSchema = new Schema({
    trxnno: {type: String },
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    traddate: { type: String },
    units: { type: String },
    amount: { type: String },
    trxn_nature: { type: String },
    scheme_type: { type: String },
    pan: { type: String },
    trxn_type_flag: { type: String },
}, { versionKey: false });

const cams_transSchema = new Schema({
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    ac_no: { type: String },
    bank_name: { type: String },
}, { versionKey: false });



router.get("/", async(req, res)=>{
 //const users= await User.find({});
  console.log("i am backend ")
  res.send("asdfasd PTTT");
})


router.get("/gettranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("data="+data);
            res.send(data);
        }
    });
})


router.get("/getcamstransdata", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})

router.get("/getsipstpuserwise", function (req, res) {
    var mon = parseInt(req.query.dt);
    var yer = parseInt(req.query.yr);
    var name = req.query.name;
    const pipeline=[
         {$project: {_id:0,FOLIO_NO:1,SCHEME:1,AMOUNT:1,POSTDATE:1,TRXN_NATURE:1,INV_NAME:1,TRADDATE:"$TRADDATE", month:{$month:('$TRADDATE')} , year:{$year:('$TRADDATE')} }},
         {$match : { $and: [  { month: mon }, { year: yer },{INV_NAME:name} , {TRXN_NATURE:/Systematic/}, {TRXN_NATURE:{ $not: /^Systematic - From.*/ }} ] }}
]
                // const pipeline1 = [
                //     {"$match" : {PAN1:pan}}, ///trans_karvy
                //     {"$group" : {_id : {TRDESC:"$TRDESC"}}}, 
                //     {"$project" : {_id:0, trxn_nature:"$_id.TRDESC"}}
                // ]
                // const pipeline2 = [
                //     {"$match" : {IT_PAN_NO1:pan}}, ///trans_franklin
                //     {"$group" : {_id : {TRXN_TYPE:"$TRXN_TYPE"}}}, 
                //     {"$project" : {_id:0, trxn_nature:"$_id.TRXN_TYPE"}}
                // ]
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                // var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                // var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                transc.aggregate(pipeline, (err, newdata) => {
                    // transk.aggregate(pipeline1, (err, newdata1) => {
                    //     transf.aggregate(pipeline2, (err, newdata2) => {
                    //         if(newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){  
                        if(newdata.length != 0 ){    
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata 
                                      }
                                    }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                      //var datacon = (newdata2).concat(newdata1.concat(newdata))
                                      //datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                     //.filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                     //.reverse().map(JSON.parse) ;
                                    //  resdata.data = datacon
                                    //console.log("reshhh=",resdata)
                                     res.json(resdata)
                                     return resdata
                                    });
                             //   });
                           //  });
                       //  }      
       // }
//});
})

router.get("/getsipstpall", function (req, res) {
    var mon = parseInt(req.query.dt);
    var yer = parseInt(req.query.yr);
    // const pipeline = [  ///trans_cams
    //     {$match : { $and: [  { year: yer } ,{TRXN_NATURE:/Systematic/}, {TRXN_NATURE:{ $not: /^Systematic - From.*/ }} ] }}, 
    //     {$group : {_id : {FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRXN_NATURE:"$TRXN_NATURE",TRADDATE:"$TRADDATE",year:{$year:('$TRADDATE')}}}}, 
    //     {$project : {_id:0,FOLIO_NO:"$_id.FOLIO_NO", SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRXN_NATURE:"$_id.TRXN_NATURE",TRADDATE:"$_id.TRADDATE",year:{$year:('$_id.TRADDATE')}}}
    // ]
    const pipeline=[
             {$project: {_id:0,FOLIO_NO:1,SCHEME:1,AMOUNT:1,TRXN_NATURE:1,TRADDATE:"$TRADDATE", month:{$month:('$TRADDATE')} , year:{$year:('$TRADDATE')} }},
             {$match : { $and: [  { month: mon }, { year: yer } , {TRXN_NATURE:/Systematic/}, {TRXN_NATURE:{ $not: /^Systematic - From.*/ }} ] }}
    ]
              var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
              transc.aggregate(pipeline, (err, newdata) => {
                if(newdata.length != 0){
                    resdata= {
                        status:200,
                        message:'Successfull',
                        data:  newdata
                      }
                    }else{
                        resdata= {
                        status:400,
                        message:'Data not found',            
                      }
                    }
                    //console.log(newdata.length)
                   // console.log(JSON.stringify("gg=",resdata))
                    res.json(resdata)
                    
                    //return resdata
            });
    })

router.get("/gettransactionall", function (req, res) {
    var mon = parseInt(req.query.dt);
    var yer = parseInt(req.query.yr);
              const pipeline = [  ///trans_cams
                {$project: {_id:0,SCHEME:1,AMOUNT:1,FOLIO_NO:1,TRXN_NATURE:1,TRADDATE:"$TRADDATE", month:{$month:('$TRADDATE')} , year:{$year:('$TRADDATE')} }},
                {$match : { $and: [  { month: mon }, { year: yer } ] }}
                ]
                // const pipeline1 = [ ///trans_karvy
                //     {$project: {_id:0,FUNDDESC:1,TD_AMT:1,TRDESC:1,TD_TRDT:"$TD_TRDT", month:{$month:('$TD_TRDT')} , year:{$year:('$TD_TRDT')} }},
                //     {$match : { $and: [  { month: mon }, { year: yer } ] }}
                // ]
                // const pipeline2 = [ ///trans_franklin
                //     {$project: {_id:0,SCHEME_NA1:1,AMOUNT:1,TRDESC:1,TRXN_DATE:"$TRXN_DATE", month:{$month:('$TRXN_DATE')} , year:{$year:('$TRXN_DATE')} }},
                //     {$match : { $and: [  { month: mon }, { year: yer } ] }}
                // ]
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                // var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                // var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                transc.aggregate(pipeline, (err, newdata) => {
                    //  transk.aggregate(pipeline1, (err, newdata1) => {
                    //      transf.aggregate(pipeline2, (err, newdata2) => {
                    //          if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                        if( newdata.length != 0){
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata 
                                      }
                                    }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                    // var datacon = (newdata2).concat(newdata1.concat(newdata))
                                    //   datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                    //  .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                    //  .reverse().map(JSON.parse) ;
                                    //   resdata.data = datacon
                                     res.json(resdata)
                                     //return resdata
                                    //});
                               // });
                             });
                       
})

router.get("/gettransactionuserwise", function (req, res) {
    var mon = parseInt(req.query.dt);
    var yer = parseInt(req.query.yr);
    var name = req.query.name;
              const pipeline = [  ///trans_cams
                {$project: {_id:0,SCHEME:1,AMOUNT:1,FOLIO_NO:1,TRXN_NATURE:1,INV_NAME:1,TRADDATE:"$TRADDATE", month:{$month:('$TRADDATE')} , year:{$year:('$TRADDATE')} }},
                {$match : { $and: [  { month: mon }, { year: yer } ,{INV_NAME:name} ] }}
                ]
                // const pipeline1 = [ ///trans_karvy
                //     {$project: {_id:0,FUNDDESC:1,TD_AMT:1,TRDESC:1,TD_TRDT:"$TD_TRDT", month:{$month:('$TD_TRDT')} , year:{$year:('$TD_TRDT')} }},
                //     {$match : { $and: [  { month: mon }, { year: yer } ] }}
                // ]
                // const pipeline2 = [ ///trans_franklin
                //     {$project: {_id:0,SCHEME_NA1:1,AMOUNT:1,TRDESC:1,TRXN_DATE:"$TRXN_DATE", month:{$month:('$TRXN_DATE')} , year:{$year:('$TRXN_DATE')} }},
                //     {$match : { $and: [  { month: mon }, { year: yer } ] }}
                // ]
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                transc.aggregate(pipeline, (err, newdata) => {
                       if( newdata.length != 0){
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata 
                                      }
                                    }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                   res.json(resdata)
                                     //return resdata
                                    //});
                               // });
                             });
                       
})

router.get("/gettaxsavingall", function (req, res) {
    var firstyer = parseInt(req.query.fry);
    var secyer = parseInt(req.query.sry);;
    const pipeline = [  ///trans_cams
      {"$match" :  { $and: [  { $or:[{year:firstyer},{year:secyer}]  },{ SCHEME_TYPE: "ELSS" },{SCHEME:/Tax/}] }},  
      {"$group" : {_id : {TRXN_NATURE:"$TRXN_NATURE",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE", year:{$year:('$TRADDATE')}  }}}, 
      {"$project" : {_id:0,trxn_nature:"$_id.TRXN_NATURE", FOLIO_NO:"$_id.FOLIO_NO",scheme:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", year:{$year:('$TRADDATE')} }}
  ]
    //   const pipeline1 = [ ///trans_karvy
    //       {"$match" :  { $or: [ {FUNDDESC:/TAX/  }, {FUNDDESC:/Long Term Equity/} ]}}, 
    //       {"$group" :  {_id : {TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT", }}}, 
    //       {"$project" :{_id:0,trxn_nature:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",scheme:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT"}}
    //  ]
    //   const pipeline2 = [ ///trans_franklin
    //      {"$match" : {SCHEME_NA1:/TAX/}}, 
    //       {"$group" : {_id : {TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE" }}}, 
    //       {"$project" : {_id:0,trxn_nature:"$_id.TRXN_TYPE", FOLIO_NO:"$_id.FOLIO_NO",scheme:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE"}}
    //  ]
      var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    //   var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    //   var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
      transc.aggregate(pipeline, (err, newdata2) => {
        //    transk.aggregate(pipeline1, (err, newdata1) => {
        //        transf.aggregate(pipeline2, (err, newdata2) => {
        //           if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                    if( newdata2.length != 0 ){
                          resdata= {
                              status:200,
                              message:'Successfull',
                              data:  newdata2 
                            }
                          }else{
                              resdata= {
                              status:400,
                              message:'Data not found',            
                            }
                          }
                        //   var datacon = (newdata2).concat(newdata1.concat(newdata))
                        //     datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        //    .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        //    .reverse().map(JSON.parse) ;
                        //     resdata.data = datacon
                           res.json(resdata)
                           return resdata
                         // });
                    //  });
                  });
             
})

router.get("/getdividendall", function (req, res) {
    var name = req.query.name;
    var firstyer = parseInt(req.query.fry);
    var secyer = parseInt(req.query.sry);;
    const pipeline = [  ///trans_camms
        {$project : {_id:0,SCHEME:1,AMOUNT:1,INV_NAME:1,TRADDATE:"$TRADDATE", year:{$year:('$TRADDATE')}   }},
        {$match : { $and: [ { $or:[{year:firstyer},{year:secyer}]  } ,{INV_NAME:name} ] }}
     ]
    //   const pipeline1 = [ ///trans_karvy
    //      {"$match" : {  INVNAME:name }}, 
    //       {"$group" : {_id : {FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT", }}}, 
    //       {"$project" : {_id:0,scheme:"$_id.FUNDDESC",amount:"$_id.TD_AMT"}}
    //  ]
    //   const pipeline2 = [ ///trans_franklin
    //       {"$match" : {INVESTOR_2:name}}, 
    //       {"$group" : {_id : {SCHEME_NA1:"$SCHEME_NA1",NAV:"$NAV", }}}, 
    //       {"$project" : {_id:0,scheme:"$_id.SCHEME_NA1",amount:"$_id.NAV"}}
    //  ]
      var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    //   var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    //   var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
      transc.aggregate(pipeline, (err, newdata) => {
        //    transk.aggregate(pipeline1, (err, newdata1) => {
        //        transf.aggregate(pipeline2, (err, newdata2) => {
        //            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
            if( newdata.length != 0){
                          resdata= {
                              status:200,
                              message:'Successfull',
                              data:  newdata 
                            }
                          }else{
                              resdata= {
                              status:400,
                              message:'Data not found',            
                            }
                          }
                        //   var datacon = (newdata2).concat(newdata1.concat(newdata))
                        //     datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        //    .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        //    .reverse().map(JSON.parse) ;
                        //     resdata.data = datacon
                           res.json(resdata)
                           return resdata
                    //       });
                    //   });
                   });
             
})

router.get("/getamclist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    //{data:{ email:req.body.email}}
    {data:{ email:"sunilguptabfc@gmail.com"}}
      ).then(function(result) {
        if(result.data.data  === undefined || req.body.email == ''){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{          
       if(result.data.data === undefined && result.data.data == '' && result.data.message == "Bank details not found "){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{
        var pan =  result.data.data.User[0].pan_card;
        var folio = mongoose.model('folio_cams', foliocams, 'folio_cams');
        var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
        const pipeline = [
            {"$match" : {pan_no:pan}}, 
             {"$group" : {_id : {foliochk:"$foliochk", amc_code:"$amc_code", product:"$product"}}}, 
             {"$project" : {_id:0, folio:"$_id.foliochk", amc_code:"$_id.amc_code", product_code:"$_id.product"}}
        ]
        const pipeline1 = [
            {"$match" : {PAN:pan}}, 
             {"$group" : {_id : {FOLIO_NO:"$FOLIO_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE"}}}, 
             {"$project" : {_id:0, folio:"$_id.FOLIO_NO", amc_code:"$_id.AMC_CODE", product_code:"$_id.PRODCODE"}}
        ]
        folio.aggregate(pipeline, (err, newdata) => {
          trans.aggregate(pipeline1, (err, newdata1) => {
            if(newdata1.length != 0 || newdata.length != 0){     
                             resdata= {
                                status:200,
                                message:'Successfull',
                                data:  newdata1 
                              }
                            }else{
                                resdata= {
                                status:400,
                                message:'Data not found',            
                           }
                            }
                            var datacon = newdata.concat(newdata1)
                            datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse) ;
                             resdata.data = datacon
                            //console.log("res="+JSON.stringify(resdata))
                            res.json(resdata)  
                            return resdata                    
                        });
                    });
              }
            }      
    });    
    })


router.get("/getfoliolist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    {data:{ email:req.body.email}}
      ).then(function(result) {
        if(result.data.data  === undefined || req.body.email == ''){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{          
       if(result.data.data === undefined && result.data.data == '' && result.data.message == "Bank details not found "){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{
        var pan =  result.data.data.User[0].pan_card;
        var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');
        var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
        var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        folioc.find({"pan_no":pan}).distinct("foliochk", function (err, newdata) { 
            foliok.find({"PANNumber":pan}).distinct("Folio", function (err, newdata1) { 
                foliof.find({"PANNO1":pan}).distinct("FOLIO_NO", function (err, newdata2) {
                    transc.find({"PAN":pan}).distinct("FOLIO_NO", function (err, newdata3) { 
                        transf.find({"IT_PAN_NO1":pan}).distinct("FOLIO_NO", function (err, newdata4) {
                    if(newdata4 != 0 || newdata3 != 0 || newdata2 != 0 || newdata1 != 0 || newdata != 0){    
                             resdata= {
                                status:200,
                                message:'Successfull',
                                data:  newdata4
                              }
                            }else{
                                resdata= {
                                status:400,
                                message:'Data not found',            
                           }
                            }
                            var datacon = newdata4.concat(newdata3.concat(newdata2.concat(newdata1.concat(newdata))))
                            var removeduplicates = Array.from(new Set(datacon));
                            resdata.data = removeduplicates
                            res.json(resdata)  
                            return resdata                    
                        });
                    });
                    });
                });
            });
        }
            }      
    });
    })

    router.get("/getapplicant", function (req, res) {
     var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
     var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
     var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        transc.find().distinct("INV_NAME", function (err, newdata) { 
            transk.find().distinct("INVNAME", function (err, newdata2) { 
                    transf.find().distinct("INVESTOR_2", function (err, newdata3) {
                            if(newdata3.length != 0 || newdata2.length != 0 || newdata.length != 0 ){ 
                                var datacon = newdata3.concat(newdata2.concat(newdata))
                                var removeduplicates = Array.from(new Set(datacon));
                            // resdata.data = removeduplicates
                                res.json(removeduplicates)    
                            }
                     });
                });
             });
    })
    router.get("/getapplicantCAMS", function (req, res) {
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
       // var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
       // var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
           transc.find().distinct("INV_NAME", function (err, newdata) { 
          //     transk.find().distinct("INVNAME", function (err, newdata2) { 
          //             transf.find().distinct("INVESTOR_2", function (err, newdata3) {
                           //    if(newdata.length != 0 ){ 
                                  // var datacon = newdata3.concat(newdata2.concat(newdata))
                                 //  var removeduplicates = Array.from(new Set(datacon));
                               // resdata.data = removeduplicates
                                   res.json(newdata)    
                            //   }
                      //  });
                   //});
                });
       })

    router.get("/getschemetype", function (req, res) {
     var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
          var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
            var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
            transc.find().distinct("SCHEME_TYPE", function (err, newdata) { 
               // foliok.find({"PANNumber":pan}).distinct("Folio", function (err, newdata1) { 
               //     foliof.find({"PANNO1":pan}).distinct("FOLIO_NO", function (err, newdata2) {
                       transk.find().distinct("ASSETTYPE", function (err, newdata3) { 
               //             transf.find({"IT_PAN_NO1":pan}).distinct("FOLIO_NO", function (err, newdata4) {
                      // if(newdata4 != 0 || newdata3 != 0 || newdata2 != 0 || newdata1 != 0 || newdata != 0){ 
                     
                               //var datacon = newdata4.concat(newdata3.concat(newdata2.concat(newdata1.concat(newdata))))
                               var datacon = newdata3.concat(newdata)
                             // var removeduplicates = Array.from(new Set(datacon));
                             //  resdata.data = removeduplicates
                               res.json(datacon)    
                           });
                       });
                     //  });
                 //  });
             //  });
       //     }
       //         }      
       // });
       })
    
    router.get("/getportfolio", function (req, res) {
        var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');    
        
        const pipeline1 = [  ///trans_karvy
            {"$match" : { INVNAME:req.query.name}},
            {"$group" : {_id :{FUNDDESC:"$FUNDDESC",TD_ACNO:"$TD_ACNO",ASSETTYPE:"$ASSETTYPE",SCHEMEISIN:"$SCHEMEISIN"},TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"}}}, 
            {"$group" : {_id :{SCHEME:"$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",SCHEMEISIN:"$_id.SCHEMEISIN"},UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"}}},
           ]   
        
           const pipeline = [  ///cams_nav
            {"$match" : { ISINDivPayoutISINGrowth:req.query.num}},
            {"$group" : {_id :{NetAssetValue:"$NetAssetValue"}}}, 
            {"$group" : {_id :{NetAssetValue:"$_id.NetAssetValue"}}}
           ]    

        // const pipeline2 = [  ///trans_franklin
        //     {"$match" : { INVESTOR_2:req.body.name}}, 
        //     {"$group" : {_id : {SCHEME_NA1:"$SCHEME_NA1",UNITS:"$UNITS",AMOUNT:"$AMOUNT",FOLIO_NO:"$FOLIO_NO",TRXN_TYPE:"$TRXN_TYPE"}}}, 
        //     {"$project" : {_id:0,SCHEME:"$_id.SCHEME_NA1",UNITS:"$_id.UNITS", AMOUNT:"$_id.AMOUNT",FOLIO_NO:"$_id.FOLIO_NO",SCHEME_TYPE:"$_id.TRXN_TYPE"}}
        // ]     
              
        //var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');    
        //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');  
         //   transc.aggregate(pipeline, (err, data) => {
                transk.aggregate(pipeline1,  (err, data1) => {
                    camsn.aggregate(pipeline, (err, data2) => {
                    //transc.find({"inv_name":req.query.name},{_id:0,scheme:1,units:1,amount:1,folio_no:1,scheme_type:1}, function (err, data) {
                     //   if(data2.length != 0 || data1.length != 0 || data.length != 0 ){
                        if(data2 != 0 ){
                            if (err) {
                                res.send(err);
                            }
                            else {
                                 var datacon = data2.concat(data1)
                                // var removeduplicates = Array.from(new Set(datacon));
                                // console.log("cams=",data)
                                // console.log("karvy=",data1)
                                // console.log("DATA=",data1)
                                 //console.log("DATA2=",data2)
                                res.send(datacon);
                                return datacon;
                            }
                         }
                });
           // });
  });
})
   
  router.get("/getpan", function (req, res) {  
    const pipeline = [  //trans_cams
        {"$match" : {INV_NAME:req.query.name}}, 
         {"$group" : {_id : {PAN:"$PAN", INV_NAME:"$INV_NAME"}}}, 
         {"$project" : {_id:0, PAN:"$_id.PAN", INV_NAME:"$_id.INV_NAME"}}
    ]   
    const pipeline1 = [  //trans_karvy
        {"$match" : {INVNAME:req.query.name}}, 
         {"$group" : {_id : {PAN1:"$PAN1", INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN"}}}, 
         {"$project" : {_id:0, PAN:"$_id.PAN1", INV_NAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN"}}
    ]   
    const pipeline2 = [   //trans_franklin
        {"$match" : {INVESTOR_2:req.query.name}}, 
         {"$group" : {_id : {IT_PAN_NO1:"$IT_PAN_NO1", INVESTOR_2:"$INVESTOR_2"}}}, 
         {"$project" : {_id:0, PAN:"$_id.IT_PAN_NO1", INV_NAME:"$_id.INVESTOR_2"}}
    ]    
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');    
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
         transc.aggregate(pipeline, (err, data) => {
            transk.aggregate(pipeline1, (err, data1) => {
                transf.aggregate(pipeline2, (err, data2) => {
                    if(data2.length != 0 || data1.length != 0 || data.length != 0 ){
                        if (err) {
                            res.send(err);
                        }
                        else {
                            var datacon = data2.concat(data1.concat(data))
                            var removeduplicates = Array.from(new Set(datacon));
                            console.log("nn=",removeduplicates)
                            res.send(removeduplicates);
                            return removeduplicates;
                        }
                     }
                });
            });
        });
})
// router.get("/getisin", function (req, res) {
//     var folioc = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');               
//          folioc.find({"INVNAME":req.body.name}).distinct("SCHEMEISIN", function (err, data) {
//           if (err) {
//               res.send(err);
//           }
//           else {
//               res.send(data);
//               return data;
//           }
//       });
// })
    router.get("/getfolio", function (req, res) {
          var transc = mongoose.model('trans_cams', transcams, 'trans_cams'); 
         // var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');               
               transc.find({"INV_NAME":req.query.name}).distinct("FOLIO_NO", function (err, data) {
           //     transk.find({"INVNAME":req.query.name}).distinct("TD_ACNO", function (err, data1) {
                if (err) {
                    res.send(err);
                }
                else {
                    // res.send(data);
                    // return data;
                  //         var datacon = data1.concat(data)
                  //          var removeduplicates = Array.from(new Set(datacon));
                            //console.log("nn=",removeduplicates)
                            res.send(data);
                            return data;
                }
           // });
        });
    })


    router.get("/getscheme", function (req, res) {
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');             
        //var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');               
        transc.find({"FOLIO_NO":req.query.folio}).distinct("SCHEME", function (err, data) {  
        //    transk.find({"TD_ACNO":req.query.folio}).distinct("FUNDDESC", function (err, data1) {
              if (err) {
                  res.send(err);
              }
              else {
                //   res.send(data);
                //   return data;
                           // var datacon = data1.concat(data)
                           // var removeduplicates = Array.from(new Set(datacon));
                            //console.log("nn=",removeduplicates)
                            res.send(data);
                            return data;
              }
        //  });
        });
  })

  router.get("/getfoliodetail", function (req, res) {
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams'); 
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
    var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');   
    //console.log("folio",req.query.folio)   
    //console.log("scheme",req.query.scheme)            
        transc.find({"FOLIO_NO":req.query.folio,"SCHEME":req.query.scheme},{_id:0,UNITS:1,AMOUNT:1}, function (err, transdata) {
            folioc.find({"foliochk":req.query.folio,"sch_name":req.query.scheme},{_id:0,ac_no:1,bank_name:1,jnt_name1:1,jnt_name2:1,nom_name:1}, function (err, foliodata) {
          if (err) {
              res.send(err);
          }
          else {
              //res.send(data);
             // return data;
                               var datacon = transdata.concat(foliodata)
                               // var  newArray = transdata.insertAt(2,foliodata) 
                                //var myNewArray = [].concat.apply([], datacon);
                              //  let cm =JSON.stringify(datacon.toString().replace(/},{/g,','))\

                               
                                //  console.log();
                                  //console.log(datacon[0]._doc.nom_name);

                                 // cdd=datacon[0]._doc.concat(datacon[1]._doc)
                               //   console.log(cdd);

                                   let cm=[{"units":datacon[0]._doc.units,"amount":datacon[0]._doc.amount,"bank_name":datacon[1]._doc.bank_name,"ac_no":datacon[1]._doc.ac_no,"jnt_name1":datacon[1]._doc.jnt_name1,"jnt_name2":datacon[1]._doc.jnt_name2,"nom_name":datacon[1]._doc.nom_name}]

                                   console.log(cm)
                               
                                
                               // var datacon1 = transdata.push(foliodata)
                                //var newArray = [];
                                //newArray.pushValues(transdata);
                               // newArray.pushValues(foliodata);
                                //var newArray = transdata.slice();
                                //newArray.push.apply(newArray,foliodata);

                                // var newArray = [ ];
                                // Array.prototype.push.apply(newArray, transdata); // newArray = [1, 2]
                                // Array.prototype.push.apply(newArray, foliodata); // newArray = [1, 2, 3, 4, 5]
                                //console.log(JSON.stringify(datacon)); 
                                // Array.prototype.push.apply(newArray, newArray);
                                // console.log("res1=",JSON.stringify(datacon))
                                res.json(cm)  
                                return cm         
          }
      });
    });
})

       
    router.get("/getschemelist", function (req, res) {
        Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
        {data:{ email:req.body.email}}
          ).then(function(result) {
            if(result.data.data  === undefined || req.body.email == ''){
                resdata= {
                    status:400,
                    message:'Data not found',            
               }
               res.json(resdata) 
               return resdata;
            }else{          
           if(result.data.data === undefined || result.data.data == '' || result.data.message == "Bank details not found "){
                resdata= {
                    status:400,
                    message:'Data not found',            
               }
               res.json(resdata) 
               return resdata;
            }else{
            var pan =  result.data.data.User[0].pan_card;
            var folio = mongoose.model('folio_cams', foliocams, 'folio_cams');
            const pipeline = [
                {"$match" : {pan_no:pan}}, 
                 {"$group" : {_id : {sch_name:"$sch_name", amc_code:"$amc_code", product:"$product"}}}, 
                 {"$project" : {_id:0, scheme:"$_id.sch_name", amc_code:"$_id.amc_code", sch_id:"$_id.product"}}
            ]
            const pipeline1 = [
                {"$match" : {pan:pan}}, 
                 {"$group" : {_id : {scheme:"$scheme", amc_code:"$amc_code", prodcode:"$prodcode"}}}, 
                 {"$project" : {_id:0, scheme:"$_id.scheme", amc_code:"$_id.amc_code", sch_id:"$_id.prodcode"}}
            ]
            folio.aggregate(pipeline, (err, newdata) => {
                if(newdata != 0){    
                         resdata= {
                            status:200,
                            message:'Successfull',
                            data:  newdata 
                          }
                        }else{
                         resdata= {
                            status:400,
                            message:'Data not found',            
                       }
                        }
                    });
                    var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
                    trans.aggregate(pipeline1, (err, newdata) => {
                        if(newdata != 0){    
                                 resdata1= {
                                    status:200,
                                    message:'Successfull',
                                    data:  newdata 
                                  }
                                }else{
                                    resdata1= {
                                    status:400,
                                    message:'Data not found',            
                               }
                                }
                                var datacon = resdata.data.concat(resdata1.data)
                                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                .reverse().map(JSON.parse) ;
                                 resdata.data = datacon
                                console.log("res="+JSON.stringify(resdata))
                                res.json(resdata)  
                                return resdata                  
                            });
                  }
                }      
        });
        })

router.get("/getfoliocams", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})



router.post("/savecamsnav", function (req, res) {
    var model = mongoose.model('cams_nav', navcams, 'cams_nav');
    try{
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
            }
        });
    }
}catch(err){
console.log(e)
}
})

router.post("/savecamstrans", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log(data);
            }
        });
    }
})

router.post("/savefoliocams", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log(data);
            }
        });
    }
})

router.post("/savefoliocamsold", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('folio_cams').updateMany(
                    { pan_no: req.body[i].pan_no , product: req.body[i].product }, 
                      {$set: 
                        { amc_code : req.body[i].amc_code ,
                          foliochk : req.body[i].foliochk ,
                          inv_name: req.body[i].inv_name ,
                          sch_name : req.body[i].sch_name ,
                          jnt_name1 : req.body[i].jnt_name1 ,
                          jnt_name2 : req.body[i].jnt_name2 ,
                          holding_nature : req.body[i].holding_nature ,
                          joint1_pan : req.body[i].joint1_pan ,
                          bank_name : req.body[i].bank_name ,
                          ac_no : req.body[i].ac_no ,
                          nom_name : req.body[i].nom_name ,
                          nom2_name : req.body[i].nom2_name ,
                          nom3_name : req.body[i].addres ,
                          ifsc_code : req.body[i].ifsc_code ,
                          product : req.body[i].product ,
                          pan_no : req.body[i].pan_no ,
                    }}, 
                    {
                        "upsert":true
                     }, 
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                           // console.dir("successfully");
                        }
                    })
}

 })

 router.post("/savetranscams1", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('trans_cams').updateMany(
                    { trxnno: req.body[i].trxnno }, 
                      {$set: 
                        { folio_no : req.body[i].folio_no ,
                          scheme : req.body[i].scheme ,
                          inv_name: req.body[i].inv_name ,
                          traddate : req.body[i].traddate ,
                          units : req.body[i].units ,
                          amount : req.body[i].amount ,
                          trxn_nature : req.body[i].trxn_nature ,
                          scheme_type : req.body[i].scheme_type ,
                          pan : req.body[i].pan ,
                          trxn_type_flag : req.body[i].trxn_type_flag ,
                          amc_code : req.body[i].amc_code ,
                          prodcode : req.body[i].prodcode ,
                          trxnno : req.body[i].trxnno ,
                    }}, 
                    {
                        "upsert":true
                     }, 
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                           // console.dir("successfully");
                        }
                    })
}

 })
 router.post("/savetranscams", function (req, res) {
	  console.log("savetranscams---hhhhfff");
	 
	 var fmodel = mongoose.model('folio_cams', foliocams, 'folio_cams');
	 
	 console.log("FFFF");
	 
	  fmodel.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("ssss saurabh data="+data);
            res.send(data);
        }
    });
	  
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
	 
    for (i = 0; i < req.body.length; i++) {
         var mod = new model(req.body[i]);
	    //console.log(mod);
         mod.save(function (err, data) {
             if (err) {
                res.send(err);
             }
             else {
                console.log(data);
             }
         });
    }
})

router.post("/savefoliokarvy", function (req, res) {
    var model = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log("foliokarvy="+foliokarvy)
                console.log(data);
            }
        });
    }
})

router.post("/savefoliofranklin", function (req, res) {
    var model = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

router.post("/savetranscamsold", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

router.post("/savetranskarvy", function (req, res) {
    var model = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
              //  res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

router.post("/savetransfranklin", function (req, res) {
    var model = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

router.post("/Updatecamsnav", function(req, res) {
    var model = mongoose.model('cams_nav', cams_navSchema, 'cams_nav');  
    var i;
for (i = 0; i < req.body.length; i++) {   
  // model.find({trxnno : req.body[i].trxnno}).exec(function(err, newdata) {
  //  if (!newdata.length){   
        //console.log("length="+newdata.length);  
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                console.log(data);
                //res.send({data:"Record has been Inserted..!!"});
            }
        });

/*    } else {

        let folio_no="";
        var data = { $set:{ "folio_no" : req.body[i].folio_no ,
            "scheme" : req.body[i].scheme , inv_name : req.body[i].inv_name ,
            traddate: req.body[i].traddate ,
            units: req.body[i].units,
            amount: req.body[i].amount ,
             trxn_nature: req.body[i].trxn_nature,
            scheme_type: req.body[i].scheme_type,
            pan: req.body[i].pan,
            trxn_type_flag: req.body[i].trxn_type_flag }  }
            
        db.cams_nav.update({}, data,{multi:true}, (err , collection) => {
          if (err) throw err;
           console.log('Name exists already3='+collection);
        });
        
    }  */
 // });
}

})


//api for Update data from database
router.post("/Updatedata", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('cams_nav').findAndModify(
                    {trxnno: req.body[i].trxnno}, // query
                    [['_id','asc']],  // sort order
                    {$set: { folio_no : req.body[i].folio_no ,
                        scheme : req.body[i].scheme ,
                        inv_name : req.body[i].inv_name ,
                        traddate: req.body[i].traddate ,
                        units: req.body[i].units,
                        amount: req.body[i].amount ,
                        trxn_nature: req.body[i].trxn_nature ,
                        scheme_type: req.body[i].scheme_type ,
                        pan: req.body[i].pan ,
                        trxn_type_flag: req.body[i].trxn_type_flag 
                        }}, // replacement, replaces only the field "hi"
                    {}, // options
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                            console.dir("successfully");
                            //console.dir(object);
                        }
                    })
}

 })


router.get("/emp", function (req, res){
res.send("Namsstey Saurabh");
console.log("Namstey Rajesh");
  })


 router.post("/Updateinsertdata", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('cams_nav').updateMany(
                    { name : req.body[i].name}, 
                      {$set: { name : req.body[i].name ,
                        pin : req.body[i].pin ,
                        ages: req.body[i].ages ,
                        addres : req.body[i].addres ,
                    }}, 
                    {
                        "upsert":true
                     }, // options
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                            console.dir("successfully");
                            //console.dir(object);
                        }
                    })
                  //  console.dir("qry="+gg)
}

 }) 
 
 

export default router;
