// Import express
var express = require ('express');
 // Init express router
var router = express.Router();
var User = require('../controllers/user.js')
var Chat = require ('../controllers/chat.js')
var Tasklist = require('../controllers/tasklist.js')
var Device = require('../controllers/device.js')
var Vehicle = require('../controllers/vehicle.js')
var Auth = require('../controllers/auth.js')
var util = require('util');
const fs = require('fs');
var futil = require('../config/utility.js');
var multer = require('multer')
require('dotenv').config()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
  })
  var upload = multer({ storage: storage })

router.get('/',function (req, res, next) {
    res.render('index')
})

router.get('/dashboard',function (req, res, next) {
    res.render('dashboard')
})


router.get('/monitor',function (req, res, next) {
    res.render('monitor',{apikey:process.env.APIKEY,latitude:process.env.LATITUDE,longitude:process.env.LONGITUDE})
})


router.get('/device',function (req, res, next) {
    res.render('device',{apikey:process.env.APIKEY,latitude:process.env.LATITUDE,longitude:process.env.LONGITUDE})
})

router.get('/vehicle',function (req, res, next) {
    res.render('vehicle',{apikey:process.env.APIKEY,latitude:process.env.LATITUDE,longitude:process.env.LONGITUDE})
})

router.get('/petugas',function (req, res, next) {
    res.render('petugas')
})

router.get('/overview',function (req, res, next) {
    res.render('overview')
})

router.get('/tasklist',function (req, res, next) {
    res.render('tasklist',{apikey:process.env.APIKEY,latitude:process.env.LATITUDE,longitude:process.env.LONGITUDE})
    // Tasklist.index(req,res)
})

router.get('/chat',function(req,res){
    Chat.index(req,res)
    // res.render('chat',{apikey:process.env.APIKEY})
})

router.get('/map',function (req, res, next) {
    res.render('map',{apikey:process.env.APIKEY,latitude:process.env.LATITUDE,longitude:process.env.LONGITUDE})
})

router.get('/vehicle',function(req,res){
    Vehicle.read(req,res)
})

router.get('/user',function(req,res){
    User.Read(req,res)
})

router.post('/petugas/create', async function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    User.Create(req,res)
})

router.post('/petugas/read',async function(req,res){
    var resp = await User.Read(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/petugas/update', async function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    User.Update(req,res)
})

router.post('/petugas/delete', async function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    User.Delete(req,res)
})

router.post('/tasklist/create',upload.single('myFile'),function(req,res){
    // Tasklist.

    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ FILE ] | INFO ' + util.inspect(req.file));
    Tasklist.create(req,res)
})


router.post('/tasklist/read',async function(req,res){
    var resp = await Tasklist.read(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/tasklist/read/:status',function(req,res){
    Tasklist.read_by_status(req,res)
})

router.post('/tasklist/update',upload.single('myFile'), function(req,res){
    // Tasklist.
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ FILE ] | INFO ' + util.inspect(req.file));
    Tasklist.update(req,res)
})

router.post('/tasklist/delete',function(req,res){
    // futil.logger.debug('\n' + futil.shtm() + '- ============================= [ REQ ROUTER ] | INFO ===============================');
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS ] | INFO ' + util.inspect(req.params));
    Tasklist.Delete(req,res)
})


router.post('/device/create',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Device.create(req,res)
})

router.post('/device/read',async function(req,res){
    var resp = await Device.read(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
   
})

router.post('/device/read/all',function(req,res){
    var resp = Device.read_all(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
})

router.post('/device/update',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Device.update(req,res)
})

router.post('/device/delete',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Device.Delete(req,res)
})

router.post('/vehicle/create',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER VEHICLE ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY VEHICLE ] | INFO ' + util.inspect(req.body));
    Vehicle.create(req,res)
})

router.post('/vehicle/read',async function(req,res){
    var resp = await Vehicle.read(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/vehicle/read/all',function(req,res){
    Vehicle.read_all(req,res)
})

router.post('/vehicle/update',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ UPDATE BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.update(req,res)
})

router.post('/vehicle/delete',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ DELETE BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.Delete(req,res)
})

router.post('/vehicle/history',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER HISTORY ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HISTORY BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.History(req,res)
})

router.post('/auth',function (req, res, next) {
    Auth.Login(req,res)
})

module.exports.router = router

