var Model = require('../models/user.js')
var User = Model.User
var axios = require('axios');
var util = require('util');
var futil = require('../config/utility.js');

var Create = async function(req,res){
    try {
        const user = await User.create(req.body);
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
        res.send(user);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    }
}

var Read = async function(req,res){
    // try {
    //     // const user = await User.findAll();
    //     // futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
    //     // res.send(user);



    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    // }
    var url = process.env.URL_READ_USER
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL USER ] | INFO ' + util.inspect(url));
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
        return JSON.stringify(data)

    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    res.send(result)

}

var Update = async function (req,res){
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Updated"
        });
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    }
}

var Delete = async function (req,res){
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    }
}

module.exports = {
    Create,
    Read,
    Update,
    Delete
}