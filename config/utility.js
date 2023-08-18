var moment = require('moment');
var util = require('util');
var momenttz = require('moment-timezone');
var crypto = require('crypto');
var winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
var fs = require('fs');
const os = require("os");
require('dotenv').config()

var timezone = process.env.TIMEZONE

var shtm = function () {
    return momenttz().tz(timezone).format('DD MMM YYYY HH:mm:ss') + ' ';
    // return moment().format('DD MMM YYYY HH:mm:ss') + ' ';
};
module.exports.shtm = shtm;

/*LOGGER*/
var options = {
    file: {
        level: 'debug',
        name: 'file.info',
        filename: process.env.LOGFILE_FOLDER,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        // maxFiles: 100,
        colorize: true,
    },
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: process.env.LOGFILE_FOLDER,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
    dailyfile: {
        prepend: true,
        level: 'debug',
        colorize: false,
        timestamp: false,
        filename: process.env.LOGFILE_FOLDER,
        maxSize: 5242880,
        json: false,
        prettyPrint: true
    }
};

// your centralized logger object
const logger = winston.createLogger({
    transports: [
        new (winston.transports.Console)(options.console),
        new (winston.transports.File)(options.errorFile),
        // new (winston.transports.File)(options.file),
        // new (winston.transports.File)(options.file),
        new DailyRotateFile(options.file)
    ],
    exitOnError: false, // do not exit on handled exceptions
});
module.exports.logger = logger

function setEnvValue(key, value) {

    // read file from hdd & split if from a linebreak to a array
    const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

    // find the env we want based on the key
    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));

    // replace the key/value with the new value
    ENV_VARS.splice(target, 1, `${key}=${value}`);

    // write everything back to the file system
    fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));

}

module.exports.setEnvValue = setEnvValue


function substring(str,index,length){
    let substring = str.substr(index, length)
    return substring
}
module.exports.substring = substring