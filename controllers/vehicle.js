
var util = require('util');
var futil = require('../config/utility.js');
var axios = require('axios');


var create = async function(req,res){

    var url = process.env.URL_CREATE_VEHICLE
    var token = process.env.TOKEN_APP

    req.headers.token = token

   

    
    const config = {
        headers: {
            token : token
        }
        
      }

   
    

    var postData = req.body
    delete postData.id
    
      
    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));
 

    var result
    // result = await axios.post(url,postData,config) 
    result = await axios.post(url,postData,config) 
    .then(function (response) {

        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data.code)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    res.send(result)
}

var read = async function(req,res){

    var data = {"total":"0","rows": []}
    var page = req.body.page;
    var rows =  req.body.rows;
    var offset = (page - 1) * rows
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page)); 
    
    var url = process.env.URL_READ_VEHICLE
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
            page:page,
            rows:rows,
            offset:offset
        },
      }

    var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE VEHICLE ] | INFO ' + util.inspect(response.data)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE VEHICLE RAW ] | INFO ' + util.inspect(response.data.data)); 
        var data = JSON.stringify(response.data.data)
        return data

    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    res.send(result)
}


var read_all = async function(req,res){
    var data = {"total":"0","rows": []}
    var page = req.body.page;
    var rows =  req.body.rows;
    var offset = (page - 1) * rows
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page)); 
    
    var url = process.env.URL_READ_VEHICLE_ALL
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
            page:page,
            rows:rows,
            offset:offset
        },
      }

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data.data)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    res.send(result)
}

var update = async function(req,res){

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));

    var url = process.env.URL_UPDATE_VEHICLE +'/' + req.body.id
    var token = process.env.TOKEN_APP

    req.headers.token = token

    futil.logger.debug('\n' + futil.shtm() + '- [ PUT URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    
    const config = {
        headers: {
            token : token
        }
        
      }
    var postData = req.body 

  
    
 

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));


    var result
    result = await axios.put(url,postData,config) 
    .then(function (response) {

        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data.code)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    res.send(result)

}


var Delete = async function (req,res){
    
    

    var url = process.env.URL_DELETE_VEHICLE +'/' + req.body.id
    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));

    var token = process.env.TOKEN_APP

    req.headers.token = token


    
    const config = {
        headers: {
            token : token
        }
        
      }
    var postData = {}

      
    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config))
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(req.headers))
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));
    // futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));


    var result
    result = await axios.delete(url,config) 
    .then(function (response) {

        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data.code)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    res.send(result)
}

var History = async function (req,res){

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY HISTORY ] | INFO ' + util.inspect(req.body));

    var url = process.env.URL_VEHICLE_HISTORY 
    var token = process.env.TOKEN_APP

    req.headers.token = token

    futil.logger.debug('\n' + futil.shtm() + '- [ HISTORY URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    
    const config = {
        headers: {
            token : token
        }
        
      }
    var postData = req.body 
 

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER ] | INFO ' + util.inspect(config)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY HISTORY ] | INFO ' + util.inspect(req.body));

    var result
    result = await axios.post(url,postData,config) 
    .then(function (response) {

        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data.data)
        
        res.send(data)
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })


}

module.exports = {
    create,
    read,
    read_all,
    update,
    Delete,
    History
}