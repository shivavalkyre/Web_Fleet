var Model = require('../models/user.js')
var User = Model.User
var axios = require('axios');
var util = require('util');
var futil = require('../config/utility.js');
require('dotenv').config()

var read = async function(req,res){

    // var data = {"total":"0","rows": []}
    // var page = req.body.page;
    // var rows =  req.body.rows;
    // var createdby = req.body.createdby;
    // var offset = (page - 1) * rows
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page)); 
    
    var url = process.env.URL_READ_ALERTS
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
        },
      }

    var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ALERTS ] | INFO ' + util.inspect(response.data)); 
        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ALERTS RAW ] | INFO ' + util.inspect(response.data.data)); 
        response.data.data.status = response.status
        var data = JSON.stringify(response.data)
        return data

    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
        var data = {  
            "status":false,
            "message":"token is expired"
         }

         return data
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT STATUS ] | INFO ' + util.inspect(result.status)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    // res.send(result)
    res.send(result)
}

var detail = async function(req,res){

    var url = "http://147.139.144.120:3002/api/patern/latest_status"
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
        },
      }

      var postData = {

      }

    var result
    result = await axios.post(url,postData,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA DETAILS LENGTH ] | INFO ' + util.inspect(response.data.data.length)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA DETAILS ] | INFO ' + util.inspect(response.data)); 
        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ALERTS RAW ] | INFO ' + util.inspect(response.data.data)); 
        response.data.data.status = response.status
        var data = JSON.stringify(response.data)
        
        return data

    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
        var data = {  
            "status":false,
            "message":"token is expired"
         }

         return data
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT STATUS ] | INFO ' + util.inspect(result.status)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    // res.send(result)
    res.send(result)
}

module.exports = {
    read,
    detail
}