// import sequelize
var sequelize = require('sequelize');
var util = require('util');
var futil = require('./utility.js');
require('dotenv').config();
var db
try{
    // create connection
    db = new sequelize(process.env.DATABASE, process.env.DB_USER,process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    });
 }catch (error){
    futil.logger.debug('\n' + futil.shtm() + '- [ DATABASE ERROR] | STARTING ' + util.inspect(error));
 }

 
// export connection
module.exports.db = db