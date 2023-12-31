var Model = require('../models/user.js')
var User = Model.User
var axios = require('axios');
var util = require('util');
var futil = require('../config/utility.js');

var Create = async function(req,res){
    // try {
    //     const user = await User.create(req.body);
    //     futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
    //     res.send(user);
    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    // }
    var url = process.env.URL_CREATE_USER
    var token = process.env.TOKEN_APP

    req.headers.token = token

   

    
    const config = {
        headers: {
            token : token
        }
      }

   
    

    var postData = req.body
    // delete postData.id
    
      
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

var Read = async function(req,res){
    // try {
    //     // const user = await User.findAll();
    //     // futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
    //     // res.send(user);



    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    // }

    var data = {"total":"0","rows": []}
    var page = req.body.page;
    var rows =  req.body.rows;
    var createdby = req.body.createdby;
    var offset = (page - 1) * rows
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page))

    var url = process.env.URL_READ_USER
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL USER ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
            page:page,
            rows:rows,
            offset:offset,
            createdby:createdby
        },
      }

   
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        response.data.data.status = response.status
        var data = JSON.stringify(response.data.data)
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
    return result
}

var read_all = async function(req,res){
    var data = {"total":"0","rows": []}
    // var page = req.body.page;
    // var rows =  req.body.rows;
    // var offset = (page - 1) * rows
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page)); 
    
    var url = process.env.URL_READ_USER_ALL
    var token = process.env.TOKEN_APP
    var createdby = req.params.createdby

    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
            createdby: createdby
            // page:page,
            // rows:rows,
            // offset:offset
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

var ReadAdmin = async function(req,res){

    var data = {"total":"0","rows": []}
    // var page = req.body.page;
    // var rows =  req.body.rows;
    // var createdby = req.body.createdby;
    // var offset = (page - 1) * rows
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page))

    var url = process.env.URL_READ_USER_ADMIN
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL USER ADMIN ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
        },
      }

   
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER ADMIN] | INFO ' + util.inspect(config)); 
    var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ADMIN ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ADMIN ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        response.data.data.status = response.status
        var data = JSON.stringify(response.data.data)
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
    return result
}

var ReadAdminSelected = async function(req,res){

    var data = {"total":"0","rows": []}
    // var page = req.body.page;
    // var rows =  req.body.rows;
    var createdby = req.body.createdby;
    // var offset = (page - 1) * rows
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page))

    var url = process.env.URL_READ_USER_ADMIN_SELECTED
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL USER ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
            createdby : createdby
        },
      }

   
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER USER ADMIN] | INFO ' + util.inspect(config)); 
    var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY USER ADMIN] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY USER ADMIN] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        response.data.data.status = response.status
        var data = JSON.stringify(response.data.data)
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
    return result
}

var Update = async function (req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));

    var url = process.env.URL_UPDATE_USER +'/' + req.body.id
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
    var url = process.env.URL_DELETE_USER +'/' + req.body.id
    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));

    var token = process.env.TOKEN_APP

    req.headers.token = token


    
    const config = {
        headers: {
            token : token
        }
        
      }
    var postData = {}

      
    // futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
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

module.exports = {
    Create,
    Read,
    ReadAdmin,
    ReadAdminSelected,
    read_all,
    Update,
    Delete
}