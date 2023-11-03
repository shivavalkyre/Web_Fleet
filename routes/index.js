// Import express
var express = require ('express');
 // Init express router
var router = express.Router();
var User = require('../controllers/user.js')
var Notifikasi = require('../controllers/notifikasi.js')
var Chat = require ('../controllers/chat.js')
var Tasklist = require('../controllers/tasklist.js')
var Device = require('../controllers/device.js')
var Vehicle = require('../controllers/vehicle.js')
var Geofence = require('../controllers/geofence.js')
var Assets = require('../controllers/asset.js')
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


router.get('/notifikasi',function(req,res){
    res.render('notifikasi',{apikey:process.env.APIKEY,latitude:process.env.LATITUDE,longitude:process.env.LONGITUDE})
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


router.post('/user/admin', async function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    var resp = await User.ReadAdmin(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/user/admin/selected/:createdby', async function(req,res){
    var createdby = req.params.createdby
    req.body.createdby = createdby

    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER USER ADMIN] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY USER ADMIN] | INFO ' + util.inspect(req.body));
    User.ReadAdminSelected(req,res)
})


router.post('/petugas/create', async function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    User.Create(req,res)
})

router.post('/petugas/read/selected/:createdby',async function(req,res){
    var createdby = req.params.createdby
    req.body.createdby = createdby
    var resp = await User.Read(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/petugas/read/all/:createdby',function(req,res){
    var createdby = req.params.createdby
    req.body.createdby = createdby
    
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER READ ALL] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    var resp = User.read_all(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
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


router.post('/tasklist/read/selected/:createdby',async function(req,res){
    var createdby = req.params.createdby
    req.body.createdby = createdby
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

router.post('/device/read/selected/:createdby',async function(req,res){
    var createdby = req.params.createdby
    req.body.createdby = createdby
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ READ BODY ] | INFO ' + util.inspect(req.body));
    var resp = await Device.read(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
   
})

router.post('/device/read/all/:createdby',async function(req,res){
    var resp = await Device.read_all(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP DEVICE ] | INFO ' + util.inspect(resp)); 
})
router.post('/device/read/all_data',async function(req,res){
    var resp = await Device.read_all_data(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/device/read/all',async function(req,res){
    var resp = await Device.read_all_device(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP DEVICE ] | INFO ' + util.inspect(resp)); 
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


router.post('/vehicle/read/selected/:createdby',async function(req,res){
    var createdby = req.params.createdby
    req.body.createdby = createdby
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ READ BODY ] | INFO ' + util.inspect(req.body));
    var resp = await Vehicle.read(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/vehicle/read/selected/vehicleuid/:vehicleuid',async function(req,res){
    var vehicleid = req.params.vehicleuid
    req.body.vehicleid = vehicleid
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ READ BODY VEHICLEUID ] | INFO ' + util.inspect(req.body));
    var resp = await Vehicle.readbyvehicleuid(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/vehicle/read/odometer',async function(req,res){

    req.body.accountId = process.env.ACCOUNTID
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ READ BODY ODOMETER ] | INFO ' + util.inspect(req.body));
    var resp = await Vehicle.ReadOdometer(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/vehicle/read/all',async function(req,res){
    // var createdby = req.params.createdby
    // req.body.createdby = createdby
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ READ BODY ] | INFO ' + util.inspect(req.body));
    var resp = await Vehicle.read_all_data(req,res)
    futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 
    res.send(resp)
})

router.post('/vehicle/read/all/:createdby',function(req,res){
    Vehicle.read_all(req,res)
})

router.post('/vehicle/read/km_driven',function(req,res){
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


router.post('/vehicle/delete_all',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ DELETE BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.DeleteAll(req,res)
})


router.post('/vehicle/history',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER HISTORY ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HISTORY BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.History(req,res)
})

// Geofence ==================================================================================================

router.post('/geofence/create',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER GEOFENCE ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ GEOFENCE BODY ] | INFO ' + util.inspect(req.body));
    Geofence.create(req,res)
})

router.post('/geofence/read',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER GEOFENCE ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ GEOFENCE BODY ] | INFO ' + util.inspect(req.body));

    Geofence.read(req,res)
})

router.post('/geofence/list/read',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER GEOFENCE ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ GEOFENCE BODY ] | INFO ' + util.inspect(req.body));

    Geofence.read_list(req,res)
})

router.post('/geofence/update',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER GEOFENCE ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ GEOFENCE UPDATE BODY ] | INFO ' + util.inspect(req.body));
    Geofence.update(req,res)
})

router.post('/geofence/delete',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER GEOFENCE ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ GEOFENCE BODY ] | INFO ' + util.inspect(req.body));
    Geofence.Delete(req,res)
})

// Notifikasi ===================================================================================================

router.post('/notifikasi/read',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER NOTIFIKASI ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ GEOFENCE READ BODY ] | INFO ' + util.inspect(req.body));
    Notifikasi.read(req,res)
})

// Asset =========================================================================================================

router.post('/asset/read/:sclId',function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADER ASSET] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ ASSET READ BODY ] | INFO ' + util.inspect(req.body));
    Assets.read(req,res)
})

// auth =========================================================================================================

router.post('/auth',function (req, res, next) {
    Auth.Login(req,res)
})

module.exports.router = router

