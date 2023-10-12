var t1 = null
var t1_all = null
var t1_moving = null
var t1_stop = null
var t1_offline = null



var t2 = null
var t3 = null
var t4 = null
var tout = null

var read_speed_data= 500

var drivingPlanCoordinates = []
var arr_drivingPath =[]

var is_play = false

function processing_data (current_section,sclId,mode,search_mode,search_param,userid){
    console.log('current section: '+ current_section)
    if (current_section == 'pantau'){

        ReInitializeMap(map,gmarkers)
        // map.setZoom(10)



        // $('#geofence_box').css("visibility","visible")
        $('#geofence_box').show()
        
        if (!search_mode){
            // alert('null')
            clearInterval(t2)
            clearInterval(t3)
            clearInterval(t4)

            console.log('modenya:'+ mode)
            prev_mode = mode

            if (mode == 'bergerak'){

                    // console.log('bergerak')
                    clearTimeout(t1_all)
                    clearTimeout(t1_offline)
                    clearTimeout(t1_stop)

                    $('#toggle_place').linkbutton({
                        selected:false
                    })

                    // deleteMarkers()
                    AssetStatusCount(mode,search_mode,null)  
                
                    t1_moving = setInterval(function(){
                        // console.log('Interval reached')
                        // console.log('start delete markers')
                        deleteMarkers()
                        // console.log('markers deleted')
                        // console.log('markers: '  + gmarkers.length)
                        // console.log('search mode', search_mode)
                        console.log('asset status count')
                        AssetStatusCount(mode,search_mode,null)
                    },30000)
               

            }else if (mode == 'diam'){
                // console.log('diam')
                //alert('diam')
                    // deleteMarkers()
                    clearTimeout(t1_moving)
                    clearTimeout(t1_offline)
                    clearTimeout(t1_all)
                    
                    $('#toggle_place').linkbutton({
                        selected:false
                    })

                    AssetStatusCount(mode,search_mode,null)  
                    
                    
                    t1_stop = setInterval(function(){
                        // console.log('Interval reached')
                        // console.log('start delete markers')
                        deleteMarkers()
                        // console.log('markers deleted')
                        // console.log('markers: '  + gmarkers.length)
                        AssetStatusCount(mode,search_mode,null)
                        
                        // var markerCluster = new MarkerClusterer(map, gmarkers);
                    },30000)
               

            }else if (mode == 'offline'){

                    // deleteMarkers()
                    clearTimeout(t1_moving)
                    clearTimeout(t1_stop)
                    AssetStatusCount(mode,search_mode,null)  

                    $('#toggle_place').linkbutton({
                        selected:false
                    })

                    t1_offline = setInterval(function(){
                        // console.log('Interval reached')
                        // console.log('start delete markers')
                        deleteMarkers()
                        // console.log('markers deleted')
                        // console.log('markers: '  + gmarkers.length)
                        AssetStatusCount(mode,search_mode,null)
                    },30000)
                
            }else if (mode == 'semua'){
                //alert('semua')
                    console.log('semua')
                    // deleteMarkers()
                    clearTimeout(t1_moving)
                    clearTimeout(t1_offline)
                    clearTimeout(t1_stop)

                    $('#toggle_place').linkbutton({
                        selected:false
                    })

                    AssetStatusCount(mode,search_mode,null,userid)  
                    // var markerCluster = new MarkerClusterer(map, gmarkers);
                    t1_all = setInterval(function(){
                        // console.log('Interval reached')
                        // console.log('start delete markers')
                        deleteMarkers()
                        // console.log('markers deleted')
                        // console.log('markers: '  + gmarkers.length)
                        AssetStatusCount(mode,search_mode,null,userid)
                    },30000)
              
            }
           
            
        }else{
            //alert('search')
            clearInterval(t1_moving)
            clearInterval(t1_offline)
            clearInterval(t1_stop)
            clearInterval(t1_all)
            clearInterval(t3)
            clearInterval(t4)

            $('#toggle_place').linkbutton({
                selected:false
            })

            deleteMarkers()
            AssetStatusCount(mode,search_mode,search_param)

            t2 = setInterval(function(){
                deleteMarkers()
                AssetStatusCount(mode,search_mode,search_param)
            },30000) 
        }
       

    }else if (current_section == 'live_tracking'){
        ReInitializeMap(map,gmarkers)
     //    alert(2)
         clearInterval(t1_moving)
         clearInterval(t1_offline)
         clearInterval(t1_stop)
         clearInterval(t1_all)
 
         clearInterval(t2)
         clearInterval(t4)
 
         deleteMarkers()
 
         // $('#geofence_box').css("visibility","hidden")
         $('#geofence_box').hide()
 
         process_live_tracking(sclId)
 
        t3 = setInterval(function() {
         process_live_tracking(sclId)
        }, 5000); 
 
     }else if (current_section == 'riwayat'){
         ReInitializeMap(map,gmarkers)
         clearInterval(t1_moving)
         clearInterval(t1_offline)
         clearInterval(t1_stop)
         clearInterval(t1_all)
 
         clearInterval(t2)
         clearInterval(t3)
         clearInterval(t4)
 
         // $('#geofence_box').css("visibility","hidden")
         $('#geofence_box').hide()
 
         deleteMarkers()
         process_riwayat(sclId)
 
     }
}

// Asset Status Count =================================================================================================

function AssetStatusCount(mode,search_mode,search_param,userid){

    var token = sessionStorage.getItem("token")
    // console.log(token)

    const config = {
        headers:{
          'token': token
        },
        timeout: 10000
      };

      var postData = {
       
      };

      var url = "http://147.139.144.120:3002/api/patern/status_count"
    // var url = "http://localhost:3002/api/patern/status_count"

    axios.post(url,postData,config)
    .then((response) => {


        if (response.data.status == true){
            var res = response.data.data
            var moving = res.moving
            var stopped = res.stopped
            var offline = res.offline
            var all = moving + stopped + offline
            // $('#bergerak_value').text(moving)
            // $('#diam_value').text(stopped)
            // $('#offline_value').text(offline)
            // $('#semua_value').text(all)
            // console.log(response)
            // console.log(asset_req_counter)
            // asset_req_counter++
            // alert(search_mode)

            if (search_mode == false){

                

                if (mode == 'semua'){
                    // console.log('create data')
                    CreateData(userid)
                    // var markerCluster = new MarkerClusterer(map, gmarkers);
                    
                    // console.log('mode:' + mode)
                } else{
                    // alert(mode)
                    // console.log('start create data selected')
      
                    CreateDataSelected(mode)
                    // var markerCluster = new MarkerClusterer(map, gmarkers);
                    // console.log('mode:' + mode)
                }
            }else{
                CreateDataSearch(search_param)
            }
           
           
            // processing_data(current_section)
        }
        // console.log(response)
        
    }).catch((error) => {
        // $.messager.alert('Error','Error Loading Data Timeout','info');
        console.error(error)
        // AssetStatusCount()
    });
}


// Create Data ============================================================================================================

async function CreateData(userid){



 
    var token = sessionStorage.getItem("token")
    var pnl=''
    
    var status_bergerak=0
    var status_diam=0
    var status_offline=0
    var status_total=0
    // console.log(token)

    const config = {
        headers:{
          'token': token
        },
        timeout: 10000
      };

      var postData = {
       
      };

    var url = "http://147.139.144.120:3002/api/patern/latest_status"
    // var url = "http://localhost:3002/api/patern/latest_status"
    let res1 = await axios.post(url,postData,config)
    .then((response) => {
        // console.log(response.data)
        var status = response.data.status
        var data = response.data.data
        if (status == true){
            return data
        }

    }).catch((error) => {
        // $.messager.alert('Error','Error Loading Data Timeout','info');
        console.error(error)
        // AssetStatusCount()
    });

    var data = res1

    var url1 = '/vehicle/read/all/'+ userid
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    const res_vehicle = await fetch(url1,requestOptions)
    .then(response => response.json()) 
    .then(json => {
        // alert (json)
    return json
    })

    // alert(area)

    if (area == 'pusat'){
        for (i=0;i<= data.length-1;i++){

            var sclId = data[i].vehicleSclId
            var deviceStatus = data[i].deviceStatus
            var img
            var status
    
            if (deviceStatus == 'offline'){
                img = "/img/moving_offline.png"
                status = 'offline'
                status_offline++
            }else if (deviceStatus == 'stopped'){
                img = "/img/moving_stop.png"
                status = 'diam'
                status_diam++
            }else if (deviceStatus == 'moving'){
                img = "/img/moving.png"
                status = 'bergerak'
                status_bergerak++
            }
    
            var licensePlate = data[i].vehicleLicensePlate
            var vehicleUid = data[i].vehicleUid
            var accountId = data[i].accountId
            var validLatitude = data[i].validLatitude
            var validLongitude = data[i].validLongitude
            var heading = data[i].heading
            var speed = data[i].vehicleSpeed[0].value + ' ' + data[i].vehicleSpeed[0].unit
            var utcSeconds = data[i].updateTime;
            // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            // d.setUTCSeconds(utcSeconds);
            var strDate = FormatedDate(epoch_to_datetime(utcSeconds))
            
            // var geocoder = new google.maps.Geocoder()
            // console.log('validLatitude:' + validLatitude)
            // console.log('validLongitude:' + validLongitude)
    
    
            if(!validLatitude && !validLongitude){
                // console.log('Null')
            } else{
               
                var address= ''
                  pnl += `
                  <div id="pnl`+ i +`" name="`+ sclId +`" class="pnl" style="margin-bottom:10px;margin-left:5px;margin-top:0px;width:280px;height: 30px;background-color: white;border-color: transparent;border: 0px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius:5px;font-family:'Poppins'" > 
                            
                            <table class="info1" width="100%" style="border-collapse: collapse;font-size:10px;border-radius:5px;">
                            <tbody>
                            <tr id="title_row`+ i + `" onmouseover="changeColor(this)" onmouseout="restoreColor(this)" style="color:black;border-top-left-radius: 5px;border-top-right-radius: 5px;">
                            <td style="border-top-left-radius: 5px;height:30px;width:24px;vertical-align: center;horizontal-align:center;align:center"><div style="margin-top:-3px;margin-left:3px;"><img id="img_pantau`+ i +`" src="`+ img +`" width="24" height="24"></div></td>
                            <td style="height:30px;width:80%;font-weight:bold"><div id="v_uid`+ i +`"  style="margin-left:10px;cursor:pointer;" onClick="getClickedTitle(this)">`+ vehicleUid +`</div></td>
                            <td id="td_arrow`+  i  +`" style="height:30px;width:24px;vertical-align: center;border-top-right-radius: 5px;border-bottom-right-radius: 5px;"><div id="angle`+ i +`" name="`+ sclId +`" style="cursor:pointer;margin-left:5px;" onclick="getClicked(this)"><i  class="fa fa-angle-down fa-2x" aria-hidden="true" style="cursor:pointer;"></i></div></td>
                            </tr>
                            </tbody>
                            </table>
                            
    
                    <div id="img_location`+ i +`" style="margin-top:10px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/location.png" width="18" height="18"/></div>
                    <div id="location`+ i +`" style="margin-top:-20px;margin-left:50px;width:200px;height:50px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + address + `</div>
                    <div id="img_time`+ i +`" style="margin-top:20px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/clock.png" width="18" height="18"/></div>
                    <div id="time`+ i +`" style="margin-top:-17px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + strDate + ` </div>
    
                    <div id="options`+ i +`" style="color:#436AAC;margin-top:0px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;font-weight:900;text-align:justify; text-justify: inter-word;visibility:hidden;"><a href="#" id="live`+ i +`" class="info" style="text-decoration: none;" onclick="live_tracking(this)">Live Tracking</a> &nbsp; | &nbsp;  <a href="#" id="riwayat`+ i +`" style="text-decoration: none;" class="info" onclick="riwayat(this)">Riwayat</a>  &nbsp; | &nbsp;  <a href="#" id="chat`+ i +`" style="text-decoration: none;" class="info">Chat</a></div>
                    <div id="lat` + i + `" style="visibility:hidden">` + validLatitude + `</div>
                    <div id="lon` + i + `" style="visibility:hidden">` + validLongitude + `</div>
                    <div id="deviceStatus` + i + `" style="visibility:hidden">` + status + `</div>
                    <div id="heading` + i + `" style="visibility:hidden">` + heading + `</div>
                    <div id="speed` + i + `" style="visibility:hidden">` + speed + `</div>
                  </div>
                  `
    
               
    
                    var cars_info = {
                        no:i,
                        sclId:sclId,
                        licensePlate : licensePlate,
                        vehicleUid: vehicleUid,
                        deviceStatus : status,
                        speed: speed,
                        heading:heading,
                        last_update:strDate
                    }
    
                    // console.log('validLatitude1:' + validLatitude)
                    // console.log('validLongitude1:' + validLongitude)
    
                    CentralPark = new google.maps.LatLng(validLatitude,validLongitude);
                    var resp = await addMarker(CentralPark,heading,cars_info)
    
                    // console.log('resp: '+ resp)
                    // map.setZoom(10)
                    // console.log(resp[0])
                    // var infowindow = resp[1]
                    // infowindow.close()
                    gmarkers.push(resp[0]);
            }
    
        }
    }else{
        // alert('semua,filtered')

        // get list kendaraan
        // alert('userid: ' + userid)
      

        var data_vehicle = await res_vehicle.rows
        console.log('data_vehicle',data_vehicle)

        for (l=0;l<=data_vehicle.length-1;l++){

            var vehicleid = data_vehicle[l].vehicleid

            for (i=0;i<= data.length-1;i++){

                var vehicleUid = data[i].vehicleUid

                if (vehicleid == vehicleUid){

                    var sclId = data[i].vehicleSclId
                    var deviceStatus = data[i].deviceStatus
                    var img
                    var status
            
                    if (deviceStatus == 'offline'){
                        img = "/img/moving_offline.png"
                        status = 'offline'
                        status_offline++
                    }else if (deviceStatus == 'stopped'){
                        img = "/img/moving_stop.png"
                        status = 'diam'
                        status_diam++
                    }else if (deviceStatus == 'moving'){
                        img = "/img/moving.png"
                        status = 'bergerak'
                        status_bergerak++
                    }
            
                    var licensePlate = data[i].vehicleLicensePlate
                    var accountId = data[i].accountId
                    var validLatitude = data[i].validLatitude
                    var validLongitude = data[i].validLongitude
                    var heading = data[i].heading
                    var speed = data[i].vehicleSpeed[0].value + ' ' + data[i].vehicleSpeed[0].unit
                    var utcSeconds = data[0].updateTime;
                    // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                    // d.setUTCSeconds(utcSeconds);
                    var strDate = FormatedDate(epoch_to_datetime(utcSeconds))
                    
                    // var geocoder = new google.maps.Geocoder()
                    // console.log('validLatitude:' + validLatitude)
                    // console.log('validLongitude:' + validLongitude)
            
            
                    if(!validLatitude && !validLongitude){
                        // console.log('Null')
                    } else{
                       
                        var address= ''
                        //   pnl += `
                        //   <div id="pnl`+ i +`" name="`+ sclId +`" style="margin-bottom:10px;margin-left:5px;margin-top:0px;width:280px;height: 40px;background-color: white;border-color: transparent;border: 0px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius:5px;font-family:'Poppins'" > 
                               
                        //             <table border="1" width="100%" style="border-collapse: collapse;font-size:10px;">
                        //             <tbody>
                        //             <tr>
                        //             <td style="height:30px;width:24px;vertical-align: center;horizontal-align:center"><img id="img_pantau`+ i +`" src="`+ img +`" width="24" height="24"></td>
                        //             <td style="height:30px;width:80%;font-weight:bold">`+ vehicleUid +`</td>
                        //             <td style="height:30px;width:24px;vertical-align: center;"><div id="angle`+ i +`" name="`+ sclId +`" style="cursor:pointer" onclick="getClicked(this)"><i  class="fa fa-angle-down fa-2x" aria-hidden="true" style="cursor:pointer;"></i></div></td>
                        //             </tr>
                        //             </tbody>
                        //             </table>
            
                        //     <div id="img_location`+ i +`" style="margin-top:10px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/location.png" width="18" height="18"/></div>
                        //     <div id="location`+ i +`" style="margin-top:-20px;margin-left:50px;width:200px;height:50px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + address + `</div>
                        //     <div id="img_time`+ i +`" style="margin-top:50px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/clock.png" width="18" height="18"/></div>
                        //     <div id="time`+ i +`" style="margin-top:-17px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + strDate + ` </div>
            
                        //     <div id="options`+ i +`" style="margin-top:0px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;font-weight:900;text-align:justify; text-justify: inter-word;visibility:hidden;"><a href="#" id="live`+ i +`" style="text-decoration: none;" onclick="live_tracking(this)">Live Tracking</a> | <a href="#" id="riwayat`+ i +`" style="text-decoration: none;" onclick="riwayat(this)">Riwayat</a> | <a href="#" id="chat`+ i +`" style="text-decoration: none;">Chat</a></div>
                        //     <div id="lat` + i + `" style="visibility:hidden">` + validLatitude + `</div>
                        //     <div id="lon` + i + `" style="visibility:hidden">` + validLongitude + `</div>
                        //     <div id="deviceStatus` + i + `" style="visibility:hidden">` + status + `</div>
                        //     <div id="heading` + i + `" style="visibility:hidden">` + heading + `</div>
                        //     <div id="speed` + i + `" style="visibility:hidden">` + speed + `</div>
                        //   </div>
                        //   `
                        
                        pnl += `
                        <div id="pnl`+ i +`" name="`+ sclId +`" class="pnl" style="margin-bottom:10px;margin-left:5px;margin-top:0px;width:280px;height: 30px;background-color: white;border-color: transparent;border: 0px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius:5px;font-family:'Poppins'" > 
                                  
                            <table class="info1" width="100%" style="border-collapse: collapse;font-size:10px;border-radius:5px;">
                            <tbody>
                            <tr id="title_row`+ i + `" onmouseover="changeColor(this)" onmouseout="restoreColor(this)" style="color:black;border-top-left-radius: 5px;border-top-right-radius: 5px;">
                            <td style="border-top-left-radius: 5px;height:30px;width:24px;vertical-align: center;horizontal-align:center;align:center"><div style="margin-top:-3px;margin-left:3px;"><img id="img_pantau`+ i +`" src="`+ img +`" width="24" height="24"></div></td>
                            <td style="height:30px;width:80%;font-weight:bold"><div id="v_uid`+ i +`"  style="margin-left:10px;cursor:pointer;" onClick="getClickedTitle(this)">`+ vehicleUid +`</div></td>
                            <td id="td_arrow`+  i  +`" style="height:30px;width:24px;vertical-align: center;border-top-right-radius: 5px;border-bottom-right-radius: 5px;"><div id="angle`+ i +`" name="`+ sclId +`" style="cursor:pointer;margin-left:5px;" onclick="getClicked(this)"><i  class="fa fa-angle-down fa-2x" aria-hidden="true" style="cursor:pointer;"></i></div></td>
                            </tr>
                            </tbody>
                            </table>
                                    
          
                          <div id="img_location`+ i +`" style="margin-top:10px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/location.png" width="18" height="18"/></div>
                          <div id="location`+ i +`" style="margin-top:-20px;margin-left:50px;width:200px;height:50px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + address + `</div>
                          <div id="img_time`+ i +`" style="margin-top:20px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/clock.png" width="18" height="18"/></div>
                          <div id="time`+ i +`" style="margin-top:-17px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + strDate + ` </div>
          
                          <div id="options`+ i +`" style="color:#436AAC;margin-top:0px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;font-weight:900;text-align:justify; text-justify: inter-word;visibility:hidden;"><a href="#" id="live`+ i +`" class="info" style="text-decoration: none;" onclick="live_tracking(this)">Live Tracking</a> &nbsp; | &nbsp;  <a href="#" id="riwayat`+ i +`" style="text-decoration: none;" class="info" onclick="riwayat(this)">Riwayat</a>  &nbsp; | &nbsp;  <a href="#" id="chat`+ i +`" style="text-decoration: none;" class="info">Chat</a></div>
                          <div id="lat` + i + `" style="visibility:hidden">` + validLatitude + `</div>
                          <div id="lon` + i + `" style="visibility:hidden">` + validLongitude + `</div>
                          <div id="deviceStatus` + i + `" style="visibility:hidden">` + status + `</div>
                          <div id="heading` + i + `" style="visibility:hidden">` + heading + `</div>
                          <div id="speed` + i + `" style="visibility:hidden">` + speed + `</div>
                        </div>
                        `
                       
            
                            var cars_info = {
                                no:i,
                                sclId:sclId,
                                licensePlate : licensePlate,
                                vehicleUid: vehicleUid,
                                deviceStatus : status,
                                speed: speed,
                                heading:heading,
                                last_update:strDate
                            }
            
                            // console.log('validLatitude1:' + validLatitude)
                            // console.log('validLongitude1:' + validLongitude)
            
                            CentralPark = new google.maps.LatLng(validLatitude,validLongitude);
                            var resp = await addMarker(CentralPark,heading,cars_info)
            
                            // console.log('resp: '+ resp)
                            // map.setZoom(10)
                            // console.log(resp[0])
                            // var infowindow = resp[1]
                            // infowindow.close()
                            gmarkers.push(resp[0]);
                    }

                }

        
            }
        }
    }



    // var markerCluster = new MarkerClusterer(map, gmarkers);
    // console.log(gmarkers.length)
    status_total = status_bergerak + status_diam + status_offline
    // alert(status_total)

    $('#bergerak_value').text(status_bergerak)
    $('#diam_value').text(status_diam)
    $('#offline_value').text(status_offline)
    $('#semua_value').text(status_total)

    // new MarkerClusterer(map, gmarkers);
    $('#live_monitor').html(pnl);
    
}


// create Data Selected =====================================================================

async function CreateDataSelected(mode){

    var token = sessionStorage.getItem("token")
    
    // alert('selected')
    // console.log('selected')
    // deleteMarkers()

    var status_bergerak=0
    var status_diam=0
    var status_offline=0
    var status_total=0

    var pnl=''
    var selected_mode
    
    // console.log(token)

    

    const config = {
        headers:{
          'token': token
        },
        timeout: 10000
      };

      var postData = {
       
      };

    var url = "http://147.139.144.120:3002/api/patern/latest_status"
    //   var url = "http://localhost:3002/api/patern/latest_status"
    var resp = await axios.post(url,postData,config)
      .then((response) => {
            return response
      }).catch((error) => {
          // $.messager.alert('Error','Error Loading Data Timeout','info');
          console.error(error)
          // AssetStatusCount()
      });


                // console.log(response.data)
                var response = resp

                var status = response.data.status
                // console.log('status',status)
                var data = response.data.data
                // console.log('data',data)
                
                // ReInitializeMap

                console.log('gmarkers awal length:', gmarkers.length)
                console.log('status',status)

                if (status == true){

                    if (mode == 'bergerak'){
                        selected_mode ='moving'
                    }else if( mode == 'diam'){
                        selected_mode = 'stopped'
                    }else if (mode == 'offline'){
                        selected_mode = 'offline'
                    }

                      // get list kendaraan
                      var url1 = '/vehicle/read/all/'+ userid
                      const requestOptions = {
                          method: 'POST',
                          headers: { 
                              'Content-Type': 'application/json'
                          },
                      };
      
                      const res_vehicle = await fetch(url1,requestOptions)
                      .then(response => response.json()) 
                      .then(json => {
                          // alert (json)
                        return json
                      })

                      if (area == 'pusat')
                      {
                            var ctr_vehicle_moving = 0;
                            var ctr_vehicle_stop = 0;
                            var ctr_vehicle_offline = 0;
                            var ctr_vehicle_all = 0;

                            for (i=0;i<= data.length-1;i++)
                            {
                                var vehicleUid = data[i].vehicleUid
                                var sclId = data[i].vehicleSclId
                                var deviceStatus = data[i].deviceStatus
                                var img
                                var status
                                if (deviceStatus == 'offline'){
                                    img = "/img/moving_offline.png"
                                    status = 'offline'
                                    status_offline++
                                }else if (deviceStatus == 'stopped'){
                                    img = "/img/moving_stop.png"
                                    status = 'diam'
                                    status_diam++
                                }else if (deviceStatus == 'moving'){
                                    img = "/img/moving.png"
                                    status = 'bergerak'
                                    status_bergerak++
                                }

                                var licensePlate = data[i].vehicleLicensePlate
                                var accountId = data[i].accountId
                                var validLatitude = data[i].validLatitude
                                var validLongitude = data[i].validLongitude
                                var heading = data[i].heading
                                var speed = data[i].vehicleSpeed[0].value + ' ' + data[i].vehicleSpeed[0].unit
                                var utcSeconds = data[i].updateTime;
                                var strDate = FormatedDate(epoch_to_datetime(utcSeconds))

                                if (deviceStatus == selected_mode)
                                {
                                    if(!validLatitude && !validLongitude)
                                    {
                                                // console.log('Null')
                                    }else
                                    {
                                        var address= ''
                                                   
                                        pnl += `<div id="pnl`+ i +`" name="`+ sclId +`" class="pnl" style="margin-bottom:10px;margin-left:5px;margin-top:0px;width:280px;height: 30px;background-color: white;border-color: transparent;border: 0px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius:5px;font-family:'Poppins'" >     
                                            <table class="info1" width="100%" style="border-collapse: collapse;font-size:10px;border-radius:5px;">
                                            <tbody>
                                            <tr id="title_row`+ i + `" onmouseover="changeColor(this)" onmouseout="restoreColor(this)" style="color:black;border-top-left-radius: 5px;border-top-right-radius: 5px;">
                                            <td style="border-top-left-radius: 5px;height:30px;width:24px;vertical-align: center;horizontal-align:center;align:center"><div style="margin-top:-3px;margin-left:3px;"><img id="img_pantau`+ i +`" src="`+ img +`" width="24" height="24"></div></td>
                                            <td style="height:30px;width:80%;font-weight:bold"><div id="v_uid`+ i +`"  style="margin-left:10px;cursor:pointer;" onClick="getClickedTitle(this)">`+ vehicleUid +`</div></td>
                                            <td id="td_arrow`+  i  +`" style="height:30px;width:24px;vertical-align: center;border-top-right-radius: 5px;border-bottom-right-radius: 5px;"><div id="angle`+ i +`" name="`+ sclId +`" style="cursor:pointer;margin-left:5px;" onclick="getClicked(this)"><i  class="fa fa-angle-down fa-2x" aria-hidden="true" style="cursor:pointer;"></i></div></td>
                                            </tr>
                                            </tbody>
                                            </table>
                                                  
                          
                                            <div id="img_location`+ i +`" style="margin-top:10px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/location.png" width="18" height="18"/></div>
                                            <div id="location`+ i +`" style="margin-top:-20px;margin-left:50px;width:200px;height:50px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + address + `</div>
                                            <div id="img_time`+ i +`" style="margin-top:20px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/clock.png" width="18" height="18"/></div>
                                            <div id="time`+ i +`" style="margin-top:-17px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + strDate + ` </div>
                            
                                            <div id="options`+ i +`" style="color:#436AAC;margin-top:0px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;font-weight:900;text-align:justify; text-justify: inter-word;visibility:hidden;"><a href="#" id="live`+ i +`" class="info" style="text-decoration: none;" onclick="live_tracking(this)">Live Tracking</a> &nbsp; | &nbsp;  <a href="#" id="riwayat`+ i +`" style="text-decoration: none;" class="info" onclick="riwayat(this)">Riwayat</a>  &nbsp; | &nbsp;  <a href="#" id="chat`+ i +`" style="text-decoration: none;" class="info">Chat</a></div>
                                            <div id="lat` + i + `" style="visibility:hidden">` + validLatitude + `</div>
                                            <div id="lon` + i + `" style="visibility:hidden">` + validLongitude + `</div>
                                            <div id="deviceStatus` + i + `" style="visibility:hidden">` + status + `</div>
                                            <div id="heading` + i + `" style="visibility:hidden">` + heading + `</div>
                                            <div id="speed` + i + `" style="visibility:hidden">` + speed + `</div>
                                            </div>`

                                            var cars_info = {
                                                no: i,
                                                sclId:sclId,
                                                licensePlate : licensePlate,
                                                vehicleUid : vehicleUid,
                                                deviceStatus : status,
                                                last_update:strDate,
                                                speed: speed,
                                                heading:heading
                                            }

                                            CentralPark = new google.maps.LatLng(validLatitude,validLongitude);
                                            
                                            if (deviceStatus == 'moving'){
                                                ctr_vehicle_moving++
                                                // console.log('cars info '+ ctr_vehicle_moving ,cars_info)
                                            }
        
                                            if (deviceStatus == 'stopped'){
                                                ctr_vehicle_stop++
                                                // console.log('cars info '+ ctr_vehicle_stop ,cars_info)
                                            }
        
                                            if(deviceStatus == 'offline'){
                                                ctr_vehicle_offline++
                                                // console.log('cars info '+ ctr_vehicle_offline ,cars_info)
                                            }

                                            
                                            var resp = await addMarker(CentralPark,heading,cars_info)
                                            // console.log ('resp marker', resp[0])
                                            gmarkers.push(resp[0]);

                                    }
                                }
                                else
                                {
                                    if (deviceStatus == 'moving'){
                                        ctr_vehicle_moving++
                                    }

                                    if (deviceStatus == 'stopped'){
                                        ctr_vehicle_stop++
                                    }

                                    if(deviceStatus == 'offline'){
                                        ctr_vehicle_offline++
                                    }

                                }

                            }

                            ctr_vehicle_all = ctr_vehicle_moving + ctr_vehicle_stop + ctr_vehicle_offline
                            // console.log('ctr_vehicle_moving', ctr_vehicle_moving)
                            // console.log('ctr_vehicle_stoped', ctr_vehicle_stop)
                            // console.log('ctr_vehicle_offline', ctr_vehicle_offline)
                            // console.log('ctr_vehicle_all', ctr_vehicle_all)

                            $('#bergerak_value').text(ctr_vehicle_moving)
                            $('#diam_value').text(ctr_vehicle_stop)
                            $('#offline_value').text(ctr_vehicle_offline)
                            $('#semua_value').text(ctr_vehicle_all)

                            // AssetStatusCount(selected_mode,false,null,userid)

                      }
                }

                console.log('gmarkers akhir length:', gmarkers.length)

                $('#live_monitor').html(pnl);
}


// get addresss ===============================================================================

var getAddress = async (location) => {

    var lat = location.lat
    var lng = location.lng
    // console.log(lat,lng)
    var token = sessionStorage.getItem("token")
    // console.log(token)

    const config = {
        headers:{
          'token': token
        },
        timeout: 10000
      };


      
  var url = "http://147.139.144.120:3002/api/patern/asset_address/"+lat +"/" + lng
//   var url = "http://localhost:3002/api/patern/asset_address/"+lat +"/" + lng
    // console.log(url)
  var resp =  await axios.get(url,config)
    .then((response) => { 
        var status = response.data.status
        var data = response.data.data
        if (status == true){
            return data
        }
        // console.log(response)
        // $('#location'+ no).text(address)

    }).catch((error) => {
    // $.messager.alert('Error','Error Loading Data Timeout','info');
        console.error(error)
    // AssetStatusCount()
});


return resp

}


// get Trips

var getKMDriven =  (AssetUid,vehicleUid) => {

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };

    console.log('requestOptions' + requestOptions)

    var total_odometer = '0 Km'
    $('#odometer').text(total_odometer)

    // get odometer awal
    var url1= '/vehicle/read/selected/vehicleuid/'+ vehicleUid
    console.log('url1',url1)
    const result = fetch(url1,requestOptions)
    .then(response => response.json()) 
    .then(json => {
        console.log('json',json)
        var init_odometer = json.rows[0].init_odometer
        console.log('init odometer',init_odometer)
        var createdAt = json.rows[0].createdAt
        var start_date = createdAt.substr(0,10)
        console.log('start date', start_date)       

        var token = sessionStorage.getItem("token")
        // console.log(token)
        var url2 = '/vehicle/read/odometer'
        console.log('url2',url2)

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (month<10){
            month = '0' + month
        }

        var end_date = year + '-' + month + '-' + day

        const requestOptions1 = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({"startDate": start_date, "endDate": end_date,"assetUid":AssetUid})
        };

        return fetch(url2,requestOptions1).then(response => response.json()).then(json => {
            console.log('json',json)
            return json
        })


    
    }).catch (function (error) {
        console.log('Request failed', error);
    });

return result

}

// live tracking

function process_live_tracking(sclId){

    // console.log(isreinitializeMap)

    // if (isreinitializeMap == false){
    //     isreinitializeMap = true
    //     var lat = -6.200000;
    //     var lon = 106.816666;
    //     ReInitializeMap(map,gmarkers)
    // }


    setTimeout(function(){

        var token = sessionStorage.getItem("token")
        const config = {
            headers:{
              'token': token
            },
            timeout: 10000
          };
          
        var url = "http://147.139.144.120:3002/api/patern/latest_status/"+ sclId
        // var url = "http://localhost:3002/api/patern/latest_status/"+ sclId
        // console.log(url)
        axios.get(url,config)
        .then((response) => {
            var status = response.data.status
            // alert(status)
            var data = response.data.data

            if (status == true)
            {
                var validLatitude = data[0].validLatitude
                var validLongitude = data[0].validLongitude    
                
                var licensePlate = data[0].vehicleLicensePlate
                var vehicleUid = data[0].vehicleUid
                var speed = data[0].vehicleSpeed[0].value + ' ' + data[0].vehicleSpeed[0].unit
                var deviceStatus = ''
                var heading = data[0].heading
                var vehicle_voltage = parseFloat(data[0].batteryVoltage[1].value/1000).toFixed(1) + ' V' 

                var operating_time = parseFloat(data[0].operatingTime[1].value).toFixed(0) + ' Jam';
                var fuel_level = data[0].fuelLevel[0].value + ' %'

                $('#title_detail').text(vehicleUid);
                $('#fuel_level').text(fuel_level)
                // console.log(vehicle_voltage)
                var img = ''

                if(data[0].deviceStatus == 'moving'){
                    img = "/img/moving.png"
                    deviceStatus ='bergerak'
                }else if(data[0].deviceStatus == 'stopped'){
                    img = "/img/moving_stop.png"
                    deviceStatus = 'diam'
                }else if (data[0].deviceStatus == 'offline'){
                    img = "/img/moving_offline.png"
                    deviceStatus='offline'
                }

                
                prevSpeed  =  $('#vehicle_speed_live').text()
                prevStatus =  $('#vehicle_status').text()

                // console.log('prev gmarkers length:'  + gmarkers.length)
                if (gmarkers.length== 2){
                    
                    var prev_latitude = gmarkers[0].getPosition().lat()
                    var prev_longitude = gmarkers[0].getPosition().lng()
                    
                }


                var location = {lat:validLatitude,lng:validLongitude}
                // $('#vehicle_distance').text('0 Km');
                getKMDriven(sclId,vehicleUid).then(result => {
                    if (!result){
                        var km_driven = '0 Km'
                        var distance = '0 Km'
                        // $('#t_odometer').text(km_driven)
                        $('#odometer').text(km_driven)
                        $('#vehicle_distance').text(distance)
                    }else{
                        console.log('result',result) 
                        console.log('result',result.total)  
                        console.log('distance',result.distance)
                        console.log('KmDriven',result.totalKmDriven) 
    
    
                        if (result.total>0){
                            var km_driven = result.totalKmDriven + ' Km'
                            var distance = result.distance + ' Km'
                            // $('#t_odometer').text(km_driven)
                            // var raw_km_driven = result.totalKmDriven
                            $('#odometer').text(km_driven)
                            $('#vehicle_distance').text(distance)
                        }else{
                            var km_driven = '0 Km'
                            var distance = '0 Km'
                            // $('#t_odometer').text(km_driven)
                            $('#odometer').text(km_driven)
                            $('#vehicle_distance').text(distance)
                        }                 
                    }
                   
                })

                getAddress(location).then( result => {
                    $('#vehicle_address_live').text(result)  
                    $('#vehicle_address_detail').text(result)
                    // console.log('update address')  
                })

                var dms_lat = deg_to_dms(validLatitude)
                var dms_lon = deg_to_dms(validLongitude)
                var koordinat = dms_lat + ' , ' + dms_lon

                $('#vehicle_status').text(deviceStatus)
                $('#vehicle_status_detail').text(deviceStatus)
                $('#vehicle_speed_live').text(speed)
                $('#vehicle_heading').text(heading)
                $('#img_status').attr("src",img)
                $('#koordinat').text(koordinat)
                $('#vehicle_voltage').text(vehicle_voltage)
                $('#operating_time').text(operating_time)
                var utcSeconds = data[0].updateTime;
                var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                d.setUTCSeconds(utcSeconds);
                var strDate = FormatedDate(d)
                var strTime = FormatedTime(d)

                $('#vehicle_time_live').text(strDate)

                var cars_info = {
                    licensePlate : licensePlate,
                    vehicleUid : vehicleUid,
                    deviceStatus : deviceStatus,
                    speed: speed,
                    heading:heading,
                    updateTime:strDate,
                    updateJam: strTime      
                }

                // console.log('gmarkers length: ' + gmarkers.length)

                if (gmarkers.length == 2){
                            // console.log('transition')
                            position = [prev_latitude,prev_longitude]
                            var result = [validLatitude,validLongitude]
                            var locs = {
                                prevLatitude: prev_latitude,
                                prevLongitude: prev_longitude,
                                currLatitude: validLatitude,
                                currLongitude: validLongitude
                            }

                        var range = distance(prev_latitude,prev_longitude,validLatitude,validLongitude)
                    
                        // console.log('range: '+ range)

                        if (range >0){
                            // console.log(range)
                            // console.log('result:' + result)
                            // console.log('result0: '+ result[0])
                            // console.log('result1: '+ result[1])

                            transition(result,heading,cars_info,locs)
                            setMarkerAnchor(heading,cars_info,locs)

                            var latlng = new google.maps.LatLng(validLatitude,validLongitude);
                            addMarkerWaypoint(latlng,cars_info)

                            drivingPlanCoordinates = []

                            // console.log('draw polylines')
                            var loc_prev = { lat: prev_latitude, lng: prev_longitude }
                            // console.log('loc_prev',loc_prev)
                            drivingPlanCoordinates.push(loc_prev)
                            var loc_current = {lat: Number(validLatitude), lng: Number(validLongitude)}
                            // console.log('loc_current',loc_current)
                            drivingPlanCoordinates.push(loc_current)

                            // console.log('driving path coordinates:' + drivingPlanCoordinates.length)
                            // console.log('driving path coordinates:' + drivingPlanCoordinates.length)

                            var drivingPath = new google.maps.Polyline({
                                path: drivingPlanCoordinates,
                                geodesic: true,
                                strokeColor: "#FF0000",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                              });

                              drivingPath.setMap(map);

                        }else{
                            //setMarkerAnchor(heading,cars_info,locs)
                        }

                }else{

                    // console.log('gmarkers length: ' + gmarkers.length)
                    prev_latitude = validLatitude
                    prev_longitude = validLongitude
                    var latlng = new google.maps.LatLng(validLatitude,validLongitude);
                    var resp = addMarkerTracking(latlng,heading,cars_info)
                    setMarkerAnchor(heading,cars_info,locs)
                    addMarkerWaypoint(latlng,cars_info)
                    map.panTo(latlng);
                    // console.log('gmarkers length: ' + gmarkers.length)
                }

            }
        }).catch((error) => {
            
            console.error(error)
            // AssetStatusCount()
        });

    },500)
   
}

// RIWAYAT ==============================================================================================

// function process_riwayat
function process_riwayat(sclId){
    $('#dg').datagrid({
        data:[]
    })
    selected_sclId = sclId
    // alert(sclId)
    }