// var Model = require('../models/user.js')
// var User = Model.User
var axios = require('axios')
var util = require('util');
var futil = require('../config/utility.js');
require('dotenv').config();

var Login = async function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST ] | INFO ' + util.inspect(req.body));
    
    // try {
    //     const user = await User.findAll({
    //         where: {
    //             username: req.body.username,
    //             password: req.body.password
    //           }
    //     });
    //     var response = [{}]
    //     futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
    //     res.send(user);
    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    // }

    var data = req.body
    var url = process.env.URL_LOGIN
    axios.post(url,data)
    .then((response) => {
        // console.log(response.headers.token)
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | TOKEN ' + util.inspect(response.headers.token));
        var token = response.headers.token
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | BODY ' + util.inspect(response.data.data));
        var body = response.data.data

        futil.setEnvValue("TOKEN_APP",token)

        var result ={
            status:true,
            message:'success',
            data:{
            token:token,
            body:body
            }
        }

        
        res.send(result)
    }).catch(function (error) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | ERROR' + util.inspect(error));
        var result = {
            status: false,
            message: 'failed'
        }
        res.send(result)
    });

}



module.exports = {
    Login
}