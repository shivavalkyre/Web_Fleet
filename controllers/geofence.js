const fs = require('fs');
var util = require('util');
var futil = require('../config/utility.js');
var axios = require('axios');
require('dotenv').config();

var create = async function (req,res){

    var url = process.env.URL_GEOFENCE
    var token = process.env.TOKEN_APP
    var mode = req.body.mode
    var coordinates = req.body.coordinates

    futil.logger.debug('\n' + futil.shtm() + '- [ URL CREATE GEOFENCE ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY GEOFENCE ] | INFO ' + util.inspect(req.body));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY COORDINATES ] | INFO ' + util.inspect(coordinates));

    const config = {
        headers:{
            token : token,
        },
      }
      
    if (mode == 'circle'){

        var lat = coordinates[0]
        var lng = coordinates[1]

        futil.logger.debug('\n' + futil.shtm() + '- [ LAT] | INFO ' + util.inspect(lat));
        futil.logger.debug('\n' + futil.shtm() + '- [ LNG ] | INFO ' + util.inspect(lng));

        var data =   {
            "mode" :"circle",
            "placeId": req.body.placeId,
            "address": req.body.address,
            "coordinate_type":"Radius", 
            "geometry_type":"Point", 
            "coordinates":[lat,lng],
            "radius":req.body.radius,
            "customerId":"22437"
        
        }

        futil.logger.debug('\n' + futil.shtm() + '- [ REQ DATA ] | INFO ' + util.inspect(data));

    }else if (mode == 'polygon'){
        var data =   {
            "mode" :"polygon",
            "placeId": req.body.placeId,
            "address": req.body.address,
            "coordinate_type":"Feature", 
            "geometry_type":"Polygon", 
            "coordinates":JSON.parse(coordinates),
            "customerId":"22437"
        
        }

        futil.logger.debug('\n' + futil.shtm() + '- [ REQ DATA ] | INFO ' + util.inspect(data));
    }
  

    var postData = data

    var result
    result = await axios.post(url,postData,config) 
    .then(function (response) {
        var data = JSON.stringify(response.data.data)
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY STATUS GEOFENCE] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA GEOFENCE] | INFO ' + util.inspect((data))); 
        var dt = JSON.parse(data)
        return dt
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
        var dt = JSON.parse('{"success":"failed"}')
        return dt
    })
    res.send(result)
}


var read = async function(req,res){
    var url = process.env.URL_GEOFENCE
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL READ GEOFENCE ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY GEOFENCE ] | INFO ' + util.inspect(req.body));

    const config = {
        headers:{
            token : token,
        },
      }

    var result

    result = await axios.get(url,config) 
    .then(function (response) {
        var data = JSON.stringify(response.data.data)
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY STATUS GEOFENCE] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA GEOFENCE] | INFO ' + util.inspect((data))); 
        var dt = JSON.parse(data)
        return dt
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })
    res.send(result)
}

var read_list = async function(req,res){
    var url = process.env.URL_GEOFENCE
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL READ GEOFENCE ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY GEOFENCE ] | INFO ' + util.inspect(req.body));

    const config = {
        headers:{
            token : token,
        },
      }

    var result

    result = await axios.get(url,config) 
    .then(function (response) {
        var data = JSON.stringify(response.data.data)
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY STATUS GEOFENCE LIST ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA GEOFENCE LIST] | INFO ' + util.inspect((data))); 
        var dt = JSON.parse(data)
        futil.logger.debug('\n' + futil.shtm() + '- [ RESP DT ] | INFO ' + util.inspect(dt)); 
        var rows = []
        for (i=0;i<= dt.places.length-1;i++){
            
            var coordinates = JSON.parse(dt.places[i].coordinates)
            var coordinate = coordinates.geometry.coordinates
            var formatted_coordinate

            if(coordinates.type == 'Radius'){
                var radius = coordinates.properties.radius.value
                formatted_coordinate = {"lat": coordinate[1],"lng":coordinate[0]}
                temp_coordinate = formatted_coordinate
                futil.logger.debug('\n' + futil.shtm() + '- [ TEMP COORDINATE ] | INFO ' + util.inspect(temp_coordinate));
            }else{
                var radius = ''
                var loc_coordinate = coordinate[0]
                var temp_coordinate = []
                for (k=0;k<=loc_coordinate.length-1;k++){
                    var lng = loc_coordinate[k][0]
                    var lat = loc_coordinate[k][1]
                    var lat_lng = {"lat":lat,"lng":lng}
                    temp_coordinate.push(lat_lng)
                }
                futil.logger.debug('\n' + futil.shtm() + '- [ TEMP COORDINATE ] | INFO ' + util.inspect(temp_coordinate)); 
            }
            

            var row = {"placeUid": dt.places[i].placeUid,"placeId":dt.places[i].placeId,"address": dt.places[i].address,"type":coordinates.type,"coordinates":JSON.stringify(temp_coordinate),"radius":radius}
            rows.push(row)
        }
        var resp = {"total": dt.places.length,"rows":rows}
        futil.logger.debug('\n' + futil.shtm() + '- [ RESP LIST ] | INFO ' + util.inspect(resp)); 

        return resp
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    res.send(result)
}

var update = async function (req,res){

    var url = process.env.URL_GEOFENCE
    var token = process.env.TOKEN_APP
    var mode = req.body.mode
    var coordinates = req.body.coordinates

    futil.logger.debug('\n' + futil.shtm() + '- [ URL UPDATE GEOFENCE ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY GEOFENCE ] | INFO ' + util.inspect(req.body));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY COORDINATES ] | INFO ' + util.inspect(coordinates));

    const config = {
        headers:{
            token : token,
        },
      }
      
    if (mode == 'circle'){

        var lat = coordinates[0]
        var lng = coordinates[1]

        futil.logger.debug('\n' + futil.shtm() + '- [ LAT UPDATE ] | INFO ' + util.inspect(lat));
        futil.logger.debug('\n' + futil.shtm() + '- [ LNG UPDATE ] | INFO ' + util.inspect(lng));

        var data =   {
            "placeUid": req.body.placeUid,
            "mode" :"circle",
            "placeId": req.body.placeId,
            "address": req.body.address,
            "coordinate_type":"Radius", 
            "geometry_type":"Point", 
            "coordinates":[lat,lng],
            "radius":req.body.radius,
            "customerId":"22437"
        
        }

        futil.logger.debug('\n' + futil.shtm() + '- [ REQ DATA UPDATE ] | INFO ' + util.inspect(data));

    }else if (mode == 'polygon'){
        
        var data =   {
            "placeUid": req.body.placeUid,
            "name": req.body.placeId,
            "mode" :"polygon",
            "placeId": req.body.placeId,
            "address": req.body.address,
            "coordinate_type":"Feature", 
            "geometry_type":"Polygon", 
            "coordinates":JSON.parse(coordinates),
            "customerId":"22437"
        
        }

        futil.logger.debug('\n' + futil.shtm() + '- [ REQ DATA UPDATE POLYGON ] | INFO ' + util.inspect(data));
    }
  

    var postData = data

    var result
    result = await axios.put(url,postData,config) 
    .then(function (response) {
        var data = JSON.stringify(response.data.data)
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY STATUS UPDATE GEOFENCE] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA UPDATE GEOFENCE] | INFO ' + util.inspect((data))); 
        var dt = JSON.parse(data)
        return dt
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR UPDATE GEOFENCE ] | INFO ' + util.inspect(error));
        var dt = JSON.parse('{"success":"failed"}')
        return dt
    })
    res.send(result)
}

var Delete = async function(req,res){
    var url = process.env.URL_GEOFENCE
    var token = process.env.TOKEN_APP

    
    futil.logger.debug('\n' + futil.shtm() + '- [ URL DELETE GEOFENCE ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY GEOFENCE ] | INFO ' + util.inspect(req.body));

    const config = {
        headers:{
            token : token,
        },
      }


          
   var data =   {
    "placeUid": req.body.placeUid,
    }

var postData = data

var result
// result = await axios.delete(url,postData,config) 
// .then(function (response) {
//         var data = JSON.stringify(response.data.data)
//         futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DELETE GEOFENCE] | INFO ' + util.inspect(response.status)); 
//         futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DELETE DATA GEOFENCE] | INFO ' + util.inspect((data))); 
//         var dt = JSON.parse(data)
//         return dt
// })
// .catch(function(error){
//     futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
//     var dt = JSON.parse('{"success":"failed"}')
//     return dt
// })

result = await axios.delete(url, {
    headers: {
      token: token
    },
    data: {
        placeUid : req.body.placeUid,
    }
  })
  .then(function (response) {
        var data = JSON.stringify(response.data.data)
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DELETE GEOFENCE] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DELETE DATA GEOFENCE] | INFO ' + util.inspect((data))); 
        var dt = JSON.parse(data)
        return dt
  })
  .catch(function(error){
    futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    var dt = JSON.parse('{"success":"failed"}')
    return dt
})

res.send(result)



}

module.exports = {
    create,
    read,
    read_list,
    update,
    Delete
}