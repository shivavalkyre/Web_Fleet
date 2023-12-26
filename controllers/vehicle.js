
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
    var createdby = req.body.createdby;
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
            offset:offset,
            createdby:createdby
        },
      }

    var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE VEHICLE ] | INFO ' + util.inspect(response.data)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE VEHICLE RAW ] | INFO ' + util.inspect(response.data.data)); 
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

var readbyvehicleuid = async function(req,res){
    var data = {"total":"0","rows": []}
    // var page = req.body.page;
    // var rows =  req.body.rows;
    var vehicleid = req.params.vehicleuid
    // var offset = (page - 1) * rows

    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page)); 
    
    var url = process.env.URL_READ_VEHICLE_INIT_ODOMETER
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL INIT ODOMETER] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ VEHICLE ID ] | INFO ' + util.inspect(vehicleid));

    const config = {
        headers:{
            token : token,
            vehicleid:vehicleid
        },
      }

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER ODOMETER] | INFO ' + util.inspect(config)); 
    var result
    var postData = {}
    result = await axios.post(url,postData,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY STATUS ODOMETER ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA ODOMETER] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data.data)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
   return result
}



var ReadOdometer = async function(req,res){

    var url = process.env.URL_READ_VEHICLE_KM_DRIVEN
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL READ VEHICLE KM ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY KMDRIVEN ] | INFO ' + util.inspect(req.body));

    
    const config = {
        headers:{
            token : token,
        },
      }

    var result
    var postData = req.body

    futil.logger.debug('\n' + futil.shtm() + '- [ POST DATA KMDRIVEN ] | INFO ' + util.inspect(postData));

    result = await axios.post(url,postData,config) 
    .then(function (response) {

        var data = JSON.stringify(response.data.data)
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY STATUS KMDRIVEN] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA KMDRIVEN] | INFO ' + util.inspect((data))); 
        var dt = JSON.parse(data)
        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA KMDRIVEN TRIPS ] | INFO ' + util.inspect(dt[0].trips[0].totalKmDriven)); 
        // var dt = JSON.parse(data)
        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA KMDRIVEN ROWS ] | INFO ' + util.inspect(dt.rows)); 

        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY DATA KMDRIVEN LENGTH ] | INFO ' + util.inspect(data));
        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA KMDRIVEN] | INFO ' + util.inspect(data));
        
        var  total_km_driven = 0
        futil.logger.debug('\n' + futil.shtm() + '- [ DATA LENGTH ] | INFO ' + util.inspect(dt.length));
        for (i=0;i<=dt.length-1;i++){
            futil.logger.debug('\n' + futil.shtm() + '- [ TOTAL KM DRIVEN ] | INFO ' + util.inspect(dt[i].trips[0].totalKmDriven));
            total_km_driven = total_km_driven +  dt[i].trips[0].totalKmDriven;
        }

        futil.logger.debug('\n' + futil.shtm() + '- [ TOTAL KM DRIVEN ] | INFO ' + util.inspect(parseInt(total_km_driven)));
        
        if(parseInt(total_km_driven)>0){
            var distance = parseInt(dt[dt.length-1].trips[0].totalKmDriven)
            var resp = {"total":1,"distance":distance,"totalKmDriven": parseInt(total_km_driven)}
        }else{
            var distance = 0
            var resp = {"total":1,"distance":distance,"totalKmDriven": parseInt(total_km_driven)}
        }


        // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY KMDRIVEN ] | INFO ' + util.inspect(JSON.stringify (resp))); 

        return resp

    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
   return result

}

var read_km_driven = async function (req,res){
    
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));
    var url = process.env.URL_READ_VEHICLE_KM_DRIVEN
    var token = process.env.TOKEN_APP
    req.headers.token = token
    futil.logger.debug('\n' + futil.shtm() + '- [ GET URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers: {
            token : token
        }
        
      }
    var postData = req.body 

    futil.logger.debug('\n' + futil.shtm() + '- [ POST DATA ] | INFO ' + util.inspect(postData)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));


    var result
    result = await axios.post(url,postData,config).then(function (response) {

        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    res.send(result)

} 


var read_usage = async function (req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));
    var url = process.env.URL_READ_VEHICLE_USAGE
    var token = process.env.TOKEN_APP
    req.headers.token = token
    futil.logger.debug('\n' + futil.shtm() + '- [ GET URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers: {
            token : token
        }
        
      }
    var postData = req.body 
    
    var result
    result = await axios.post(url,postData,config).then(function (response) {

        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    res.send(result)

}

var read_alert_agregat = async function(req,res){

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));
    var url = process.env.URL_READ_VEHICLE_ALERTS_AGREGAT
    var token = process.env.TOKEN_APP
    req.headers.token = token
    futil.logger.debug('\n' + futil.shtm() + '- [ GET URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers: {
            token : token
        }
        
      }
    var postData = req.body 
    
    var result
    result = await axios.post(url,postData,config).then(function (response) {

        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    res.send(result)

}


var read_segments = async function (req,res){

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));
    var url = process.env.URL_READ_VEHICLE_SEGMENTS
    var token = process.env.TOKEN_APP
    req.headers.token = token
    futil.logger.debug('\n' + futil.shtm() + '- [ GET URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers: {
            token : token
        }
        
      }
    var postData = req.body 

    futil.logger.debug('\n' + futil.shtm() + '- [ POST DATA ] | INFO ' + util.inspect(postData)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));


    var result
    result = await axios.post(url,postData,config).then(function (response) {

        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.status)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(JSON.stringify (response.data.data))); 
        var data = JSON.stringify(response.data)
        return data
    }).catch(function(error){
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE ERROR] | INFO ' + util.inspect(error));
    })

    futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | INFO ' + util.inspect(result)); 
    res.send(result)
}


var read_all_data = async function(req,res){

    var data = {"total":"0","rows": []}
    var page = req.body.page;
    var rows =  req.body.rows;
    var createdby = req.body.createdby;
    var offset = (page - 1) * rows
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page)); 
    
    var url = process.env.URL_READ_VEHICLE_ALL_DATA
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
    var createdby = req.params.createdby
    // var offset = (page - 1) * rows

    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PAGE ] | INFO ' + util.inspect(page)); 
    
    var url = process.env.URL_READ_VEHICLE_ALL
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));

    const config = {
        headers:{
            token : token,
            // page:page,
            // rows:rows,
            // offset:offset,
            createdby:createdby
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

    futil.logger.debug('\n' + futil.shtm() + '- [ POST DATA ] | INFO ' + util.inspect(postData)); 
    
 

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


var DeleteAll = async function (req,res){
    
    

    var url = process.env.URL_DELETE_VEHICLE;
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

var read_categories = async function(req,res){

    var url = process.env.URL_READ_VEHICLE_CATEGORIES
    var token = process.env.TOKEN_APP

    futil.logger.debug('\n' + futil.shtm() + '- [ URL READ CATEGORIES ] | INFO ' + util.inspect(url));
    futil.logger.debug('\n' + futil.shtm() + '- [ TOKEN ] | INFO ' + util.inspect(token));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODYREAD CATEGORIES ] | INFO ' + util.inspect(req.body));

    
    const config = {
        headers:{
            token : token,
        },
      }

      var result
    result = await axios.get(url,config) 
    .then(function (response) {
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE READ CATEGORIES ] | INFO ' + util.inspect(response.data)); 
        futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE READ CATEGORIES RAW ] | INFO ' + util.inspect(response.data.data)); 
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



module.exports = {
    create,
    read,
    read_all,
    read_all_data,
    read_km_driven,
    readbyvehicleuid,
    ReadOdometer,
    read_usage,
    read_alert_agregat,
    read_segments,
    update,
    Delete,
    DeleteAll,
    History,
    read_categories,
}