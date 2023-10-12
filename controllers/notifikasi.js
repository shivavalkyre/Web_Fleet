var Model = require('../models/user.js')
var User = Model.User
var axios = require('axios');
var util = require('util');
var futil = require('../config/utility.js');
require('dotenv').config()

async function index(req,res){
    var url = process.env.URL_READ_USER_CHAT
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL USER CHAT ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token
        },
      }

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 

    var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE USER ] | INFO ' + util.inspect(response.data)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE USER RAW ] | INFO ' + util.inspect(response.data.data)); 
        var resp = response.data.data
        var data = []

        for (i=0;i<=resp.length-1;i++){
            if (resp[i].level != 'administrator'){
                data.push(resp[i])
            }
        }
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA RAW ] | INFO ' + util.inspect(data));
        return data

    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    // res.send(result)
    var json_data = result

    res.render('notifikasi',{apikey:process.env.APIKEY,data:json_data})

}

module.exports = {
    index,

}