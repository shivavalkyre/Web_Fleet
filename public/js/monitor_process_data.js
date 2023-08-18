var t1 = null
var t1_all = null
var t1_moving = null
var t1_stop = null
var t1_offline = null

var t2 = null
var t3 = null
var t4 = null
var tout = null

var read_speed_data= 1000

var drivingPlanCoordinates = []
var arr_drivingPath =[]

// Processing Data ============================================================================
function processing_data (current_section,sclId,mode,search_mode,search_param){


    // alert(search_mode)
    // alert(current_section)
    console.log('current section: '+current_section)

    // clearInterval(t)

    if(directionsRenderer){
        console.log('direction renderer')
        // directionsRenderer.setMap(null);
        directionsRenderer = new google.maps.DirectionsRenderer;
        directionsService = new google.maps.DirectionsService;
        // directionsRenderer = null
        // directionsRenderer = null
        route = null
    }

    removeMarkerWaypointAll(gmarkers_waypoint,gmarkers_waypoint.length)

    console.log('gmarkerswaypoint length',gmarkers_waypoint.length)
    
    if (current_section == 'pantau'){

        ReInitializeMap(map,gmarkers)
        // map.setZoom(10)
        
        if (!search_mode){
            // alert('null')
            clearInterval(t2)
            clearInterval(t3)
            clearInterval(t4)

            // console.log('modenya:'+ mode)
            prev_mode = mode

            if (mode == 'bergerak'){

                    console.log('bergerak')
                
                    deleteMarkers()
                    AssetStatusCount(mode,search_mode,null)  
                
                    t1_moving = setInterval(function(){
                        console.log('Interval reached')
                        console.log('start delete markers')
                        deleteMarkers()
                        console.log('markers deleted')
                        console.log('markers: '  + gmarkers.length)
                        AssetStatusCount(mode,search_mode,null)
                    },30000)
               

            }else if (mode == 'diam'){
                console.log('diam')
                //alert('diam')
                    deleteMarkers()
                    AssetStatusCount(mode,search_mode,null)  
                    
                    t1_stop = setInterval(function(){
                        console.log('Interval reached')
                        console.log('start delete markers')
                        deleteMarkers()
                        console.log('markers deleted')
                        console.log('markers: '  + gmarkers.length)
                        AssetStatusCount(mode,search_mode,null)
                        
                        // var markerCluster = new MarkerClusterer(map, gmarkers);
                    },30000)
               

            }else if (mode == 'offline'){

                    deleteMarkers()
                    AssetStatusCount(mode,search_mode,null)  
               
                    t1_offline = setInterval(function(){
                        console.log('Interval reached')
                        console.log('start delete markers')
                        deleteMarkers()
                        console.log('markers deleted')
                        console.log('markers: '  + gmarkers.length)
                        AssetStatusCount(mode,search_mode,null)
                    },30000)
                
            }else if (mode == 'semua'){
                //alert('semua')
                // console.log('semua')
                    deleteMarkers()
                    AssetStatusCount(mode,search_mode,null)  
                    // var markerCluster = new MarkerClusterer(map, gmarkers);
                    t1_all = setInterval(function(){
                        console.log('Interval reached')
                        console.log('start delete markers')
                        deleteMarkers()
                        console.log('markers deleted')
                        console.log('markers: '  + gmarkers.length)
                        AssetStatusCount(mode,search_mode,null)
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

        deleteMarkers()
        process_riwayat(sclId)

    }else if (current_section == 'detail'){ 
        ReInitializeMap(map,gmarkers)
        
        clearInterval(t1_moving)
        clearInterval(t1_offline)
        clearInterval(t1_stop)
        clearInterval(t1_all)

        clearInterval(t2)
        clearInterval(t3)

        deleteMarkers()
        process_live_detail(sclId)

        t4 = setInterval(function() {
            process_live_detail(sclId)
           }, 5000); 
        // process_detail(sclId)
    }
}


// Asset Status Count =================================================================================================

function AssetStatusCount(mode,search_mode,search_param){

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

    axios.post("http://147.139.144.120:3002/api/patern/status_count",postData,config)
    .then((response) => {


        if (response.data.status == true){
            var res = response.data.data
            var moving = res.moving
            var stopped = res.stopped
            var offline = res.offline
            var all = moving + stopped + offline
            $('#bergerak_value').text(moving)
            $('#diam_value').text(stopped)
            $('#offline_value').text(offline)
            $('#semua_value').text(all)
            // console.log(response)
            // console.log(asset_req_counter)
            // asset_req_counter++
            // alert(search_mode)

            if (search_mode == false){

                

                if (mode == 'semua'){
                    console.log('create data')
                    CreateData()
                    // var markerCluster = new MarkerClusterer(map, gmarkers);
                    
                    console.log('mode:' + mode)
                } else{
                    // alert(mode)
                    console.log('start create data selected')
                    CreateDataSelected(mode)
                    // var markerCluster = new MarkerClusterer(map, gmarkers);
                    console.log('mode:' + mode)
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

async function CreateData(){

 
    var token = sessionStorage.getItem("token")
    var pnl=''
    
    // console.log(token)

    const config = {
        headers:{
          'token': token
        },
        timeout: 10000
      };

      var postData = {
       
      };

    let res1 = await axios.post("http://localhost:3002/api/patern/latest_status",postData,config)
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

    // RemoveMarker(gmarkers)
    // deleteMarkers()
    

    for (i=0;i<= data.length-1;i++){

        var sclId = data[i].vehicleSclId
        var deviceStatus = data[i].deviceStatus
        var img
        var status
        if (deviceStatus == 'offline'){
            img = "/img/moving_offline.png"
            status = 'offline'
        }else if (deviceStatus == 'stopped'){
            img = "/img/moving_stop.png"
            status = 'diam'
        }else if (deviceStatus == 'moving'){
            img = "/img/moving.png"
            status = 'bergerak'
        }

        var licensePlate = data[i].vehicleLicensePlate
        var vehicleUid = data[i].vehicleUid
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
              pnl += `
              <div id="pnl`+ i +`" name="`+ sclId +`" style="margin-bottom:10px;margin-left:5px;margin-top:0px;width:280px;height: 40px;background-color: white;border-color: transparent;border: 0px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius:5px;font-family:'Poppins'" > 
                   
                        <table border="0" width="100%" style="border-collapse: collapse;font-size:10px;">
                        <tbody>
                        <tr>
                        <td style="height:30px;width:24px;vertical-align: center;"><img id="img_pantau`+ i +`" src="`+ img +`" width="24" height="24"></td>
                        <td style="height:30px;width:80%;font-weight:bold">`+ vehicleUid +`</td>
                        <td style="height:30px;width:24px;vertical-align: center;"><div id="angle`+ i +`" name="`+ sclId +`" style="cursor:pointer" onclick="getClicked(this)"><i  class="fa fa-angle-down fa-2x" aria-hidden="true" style="cursor:pointer;"></i></div></td>
                        </tr>
                        </tbody>
                        </table>

                <div id="img_location`+ i +`" style="margin-top:10px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/location.png" width="18" height="18"/></div>
                <div id="location`+ i +`" style="margin-top:-20px;margin-left:50px;width:200px;height:50px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + address + `</div>
                <div id="img_time`+ i +`" style="margin-top:50px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/clock.png" width="18" height="18"/></div>
                <div id="time`+ i +`" style="margin-top:-17px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + strDate + ` </div>

                <div id="options`+ i +`" style="margin-top:0px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;font-weight:900;text-align:justify; text-justify: inter-word;visibility:hidden;"><a href="#" id="live`+ i +`" style="text-decoration: none;" onclick="live_tracking(this)">Live Tracking</a> | <a href="#" id="riwayat`+ i +`" style="text-decoration: none;" onclick="riwayat(this)">Riwayat</a> | <a href="#" id="detail`+ i +`" style="text-decoration: none;"onclick="detail(this)">Detail</a></div>
                <div id="lat` + i + `" style="visibility:hidden">` + validLatitude + `</div>
                <div id="lon` + i + `" style="visibility:hidden">` + validLongitude + `</div>
                <div id="deviceStatus` + i + `" style="visibility:hidden">` + status + `</div>
                <div id="heading` + i + `" style="visibility:hidden">` + heading + `</div>
                <div id="speed` + i + `" style="visibility:hidden">` + speed + `</div>
              </div>
              `

           

                var cars_info = {
                    licensePlate : licensePlate,
                    vehicleUid: vehicleUid,
                    deviceStatus : status,
                    speed: speed,
                    heading:heading
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

    var markerCluster = new MarkerClusterer(map, gmarkers);
    console.log(gmarkers.length)
   
    // new MarkerClusterer(map, gmarkers);
    $('#live_monitor').html(pnl);
    
}

// create Data Selected =====================================================================

function CreateDataSelected(mode){

    var token = sessionStorage.getItem("token")
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

      axios.post("http://localhost:3002/api/patern/latest_status",postData,config)
      .then((response) => {
          // console.log(response.data)
          var status = response.data.status
          var data = response.data.data
          if (status == true){
              
                console.log('start create data selected prosess')
                        
                if (mode == 'bergerak'){
                    selected_mode ='moving'
                }else if( mode == 'diam'){
                selected_mode = 'stopped'
                }else if (mode == 'offline'){
                selected_mode = 'offline'
                }

                for (i=0;i<= data.length-1;i++){
                
            
                        var sclId = data[i].vehicleSclId
                        var deviceStatus = data[i].deviceStatus
                        var img
                        var status
                        if (deviceStatus == 'offline'){
                            img = "/img/moving_offline.png"
                            status = 'offline'
                        }else if (deviceStatus == 'stopped'){
                            img = "/img/moving_stop.png"
                            status = 'diam'
                        }else if (deviceStatus == 'moving'){
                            img = "/img/moving.png"
                            status = 'bergerak'
                        }

                        var licensePlate = data[i].vehicleLicensePlate
                        var vehicleUid = data[i].vehicleUid
                        var accountId = data[i].accountId
                        var validLatitude = data[i].validLatitude
                        var validLongitude = data[i].validLongitude
                        var heading = data[i].heading
                        var speed = data[i].vehicleSpeed[0].value + ' ' + data[i].vehicleSpeed[0].unit
                        var utcSeconds = data[0].updateTime;
                        // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                        // d.setUTCSeconds(utcSeconds);
                        var strDate = FormatedDate(epoch_to_datetime(utcSeconds))

                        // console.log('deviceStatus: ' + deviceStatus)
                        // console.log('selectedMode: ' + selected_mode)

                        if (deviceStatus == selected_mode){

                        if(!validLatitude && !validLongitude){
                            // console.log('Null')
                        } else{
                            
                            var address= ''
                                pnl += `
                                <div id="pnl`+ i +`" name="`+ sclId +`" style="margin-bottom:10px;margin-left:5px;margin-top:0px;width:280px;height: 40px;background-color: white;border-color: transparent;border: 0px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius:5px;font-family:'Poppins'" > 
                                    
                                        <table border="0" width="100%" style="border-collapse: collapse;font-size:10px;">
                                        <tbody>
                                        <tr>
                                        <td style="height:30px;width:24px;vertical-align: center;"><img id="img_pantau`+ i +`" src="`+ img +`" width="24" height="24"></td>
                                        <td style="height:30px;width:80%;font-weight:bold">`+ vehicleUid +`</td>
                                        <td style="height:30px;width:24px;vertical-align: center;"><div id="angle`+ i +`" name="`+ sclId +`" style="cursor:pointer" onclick="getClicked(this)"><i  class="fa fa-angle-down fa-2x" aria-hidden="true" style="cursor:pointer;"></i></div></td>
                                        </tr>
                                        </tbody>
                                        </table>
                
                                <div id="img_location`+ i +`" style="margin-top:10px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/location.png" width="18" height="18"/></div>
                                <div id="location`+ i +`" style="margin-top:-20px;margin-left:50px;width:200px;height:50px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + address + `</div>
                                <div id="img_time`+ i +`" style="margin-top:50px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/clock.png" width="18" height="18"/></div>
                                <div id="time`+ i +`" style="margin-top:-17px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + strDate + ` </div>
                
                                <div id="options`+ i +`" style="margin-top:0px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;font-weight:900;text-align:justify; text-justify: inter-word;visibility:hidden;"><a href="#" id="live`+ i +`" style="text-decoration: none;" onclick="live_tracking(this)">Live Tracking</a> | <a href="#" id="riwayat`+ i +`" style="text-decoration: none;" onclick="riwayat(this)">Riwayat</a> | <a href="#" id="detail`+ i +`" style="text-decoration: none;"onclick="detail(this)">Detail</a></div>
                                <div id="lat` + i + `" style="visibility:hidden">` + validLatitude + `</div>
                                <div id="lon` + i + `" style="visibility:hidden">` + validLongitude + `</div>
                                <div id="deviceStatus` + i + `" style="visibility:hidden">` + status + `</div>
                                <div id="heading` + i + `" style="visibility:hidden">` + heading + `</div>
                                <div id="speed` + i + `" style="visibility:hidden">` + speed + `</div>
                                </div>
                                `
                
                            
                
                                var cars_info = {
                                    licensePlate : licensePlate,
                                    vehicleUid : vehicleUid,
                                    deviceStatus : status,
                                    speed: speed,
                                    heading:heading
                                }

                                CentralPark = new google.maps.LatLng(validLatitude,validLongitude);
                                var resp = addMarker(CentralPark,heading,cars_info)
                                // map.setZoom(10)
                                // console.log(resp[0])
                                // var infowindow = resp[1]
                                // infowindow.close()
                                // markerCluster.addMarker(resp[0]);
                                console.log('marker:' + resp[0])
                                gmarkers.push(resp[0]);
                        }

                    }
                }

                    console.log('finish create data selected process')
                    console.log(gmarkers.length)

                    var markerCluster = new MarkerClusterer(map, gmarkers);

                    $('#live_monitor').html(pnl);



          }
  
      }).catch((error) => {
          // $.messager.alert('Error','Error Loading Data Timeout','info');
          console.error(error)
          // AssetStatusCount()
      });




}

// create Data Search


async function CreateDataSearch(param){
    var token = sessionStorage.getItem("token")
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

      let res1 = await axios.post("http://localhost:3002/api/patern/latest_status",postData,config)
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

    //   ClearAllMarker(gmarkers)

      for (i=0;i<= data.length-1;i++){
        var sclId = data[i].vehicleSclId
        var deviceStatus = data[i].deviceStatus
        var img
        var status
        if (deviceStatus == 'offline'){
            img = "/img/moving_offline.png"
            status = 'offline'
        }else if (deviceStatus == 'stopped'){
            img = "/img/moving_stop.png"
            status = 'diam'
        }else if (deviceStatus == 'moving'){
            img = "/img/moving.png"
            status = 'bergerak'
        }

        var licensePlate = data[i].vehicleLicensePlate
        var vehicleUid = data[i].vehicleUid
        var accountId = data[i].accountId
        var validLatitude = data[i].validLatitude
        var validLongitude = data[i].validLongitude
        var heading = data[i].heading
        var speed = data[i].vehicleSpeed[0].value + ' ' + data[i].vehicleSpeed[0].unit
        var utcSeconds = data[0].updateTime;
        // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        // d.setUTCSeconds(utcSeconds);
        var strDate = FormatedDate(epoch_to_datetime(utcSeconds))

        if(param == vehicleUid){
            if(!validLatitude && !validLongitude){
                // console.log('Null')
            } else{
               
                var address= ''
                  pnl += `
                  <div id="pnl`+ i +`" name="`+ sclId +`" style="margin-bottom:10px;margin-left:5px;margin-top:0px;width:280px;height: 40px;background-color: white;border-color: transparent;border: 0px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius:5px;font-family:'Poppins'" > 
                       
                            <table border="0" width="100%" style="border-collapse: collapse;font-size:10px;">
                            <tbody>
                            <tr>
                            <td style="height:30px;width:24px;vertical-align: center;"><img id="img_pantau`+ i +`" src="`+ img +`" width="24" height="24"></td>
                            <td style="height:30px;width:80%;font-weight:bold">`+ vehicleUid +`</td>
                            <td style="height:30px;width:24px;vertical-align: center;"><div id="angle`+ i +`" name="`+ sclId +`" style="cursor:pointer" onclick="getClicked(this)"><i  class="fa fa-angle-down fa-2x" aria-hidden="true" style="cursor:pointer;"></i></div></td>
                            </tr>
                            </tbody>
                            </table>
    
                    <div id="img_location`+ i +`" style="margin-top:10px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/location.png" width="18" height="18"/></div>
                    <div id="location`+ i +`" style="margin-top:-20px;margin-left:50px;width:200px;height:50px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + address + `</div>
                    <div id="img_time`+ i +`" style="margin-top:50px;margin-left:26px;width:18;height:18;visibility:hidden;"><img src="/img/clock.png" width="18" height="18"/></div>
                    <div id="time`+ i +`" style="margin-top:-17px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;text-align:justify; text-justify: inter-word;visibility:hidden;font-family: 'Poppins';">` + strDate + ` </div>
    
                    <div id="options`+ i +`" style="margin-top:0px;margin-left:50px;width:200px;height:20px; border: 0px solid red;font-size:10px;font-weight:900;text-align:justify; text-justify: inter-word;visibility:hidden;"><a href="#" id="live`+ i +`" style="text-decoration: none;" onclick="live_tracking(this)">Live Tracking</a> | <a href="#" id="riwayat`+ i +`" style="text-decoration: none;" onclick="riwayat(this)">Riwayat</a> | <a href="#" id="detail`+ i +`" style="text-decoration: none;"onclick="detail(this)">Detail</a></div>
                    <div id="lat` + i + `" style="visibility:hidden">` + validLatitude + `</div>
                    <div id="lon` + i + `" style="visibility:hidden">` + validLongitude + `</div>
                    <div id="deviceStatus` + i + `" style="visibility:hidden">` + status + `</div>
                    <div id="heading` + i + `" style="visibility:hidden">` + heading + `</div>
                    <div id="speed` + i + `" style="visibility:hidden">` + speed + `</div>
                  </div>
                  `
    
               
    
                    var cars_info = {
                        vehicleUid : vehicleUid,
                        // licensePlate : licensePlate,
                        deviceStatus : status,
                        speed: speed,
                        heading:heading
                    }
                    CentralPark = new google.maps.LatLng(validLatitude,validLongitude);
                    var resp = addMarker(CentralPark,heading,cars_info)
                    // map.setZoom(10)
                    // console.log(resp[0])
                    // var infowindow = resp[1]
                    // infowindow.close()
                    gmarkers.push(resp[0]);
            }
        }



      }

      console.log(gmarkers.length)
    //   var markerCluster = new MarkerClusterer(map, gmarkers,{ 
    //       imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m',
    //       ignoreHidden: true
    //      })
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


      
  var url = "http://localhost:3002/api/patern/asset_address/"+lat +"/" + lng
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
          
        var url = "http://localhost:3002/api/patern/latest_status/"+ sclId
        // console.log(url)
        axios.get(url,config)
        .then((response) => {
            var status = response.data.status
            // alert(status)
            var data = response.data.data

            if (status == true){
                // console.log(data[0])
                // console.log('gmarkers pre live: ' + gmarkers.length)
                // console.log('gmarkerswaypoint pre live: ' + gmarkers_waypoint.length)
                
                if (gmarkers.length == 2) {
                    // var position = [gm, -73.985763];
                    // console.log('marker lat' + gmarkers[0].getPosition().lat())
                    // console.log('marker lng' + gmarkers[0].getPosition().lng())
                    var prev_latitude = gmarkers[0].getPosition().lat()
                    var prev_longitude = gmarkers[0].getPosition().lng()
                    position = [prev_latitude,prev_longitude]

                    // var cars_info = {
                    //     licensePlate : licensePlate,
                    //     deviceStatus : deviceStatus,
                    //     speed: speed,
                    //     heading:heading,
                    //     updateTime:strDate
                    //  }

                   
                
                } else{
                    //RemoveMarker(gmarkers)
                    // console.log('gmarkers after live: ' + gmarkers.length)
                    removeMarkerWaypointAll(gmarkers_waypoint,gmarkers_waypoint.length) 
                }

                

                
               
                // ReInitializeMap(lat,lon)

                var validLatitude = data[0].validLatitude
                var validLongitude = data[0].validLongitude



                // RemoveMarker(gmarkers)
                // console.log('gmarkers after live: ' + gmarkers.length)

                var licensePlate = data[0].vehicleLicensePlate
                var vehicleUid = data[0].vehicleUid
                var speed = data[0].vehicleSpeed[0].value + ' ' + data[0].vehicleSpeed[0].unit
                var deviceStatus = ''
                var heading = data[0].heading
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

                
                prevSpeed =  $('#vehicle_speed_live').text()
                prevStatus = $('#vehicle_status').text()

                // console.log('deviceStatus: '+ deviceStatus)
                var location = {lat:validLatitude,lng:validLongitude}
                getAddress(location).then( result => {
                    $('#vehicle_address_live').text(result)  
                    $('#vehicle_address_detail').text(result)
                    // console.log('update address')  
                })
                
                var dms_lat = deg_to_dms(validLatitude)
                var dms_lon = deg_to_dms(validLongitude)
                var koordinat = dms_lat + ' , ' + dms_lon

                // console.log('update speed:' + speed)
                $('#vehicle_status').text(deviceStatus)
                $('#vehicle_status_detail').text(deviceStatus)
                $('#vehicle_speed_live').text(speed)
                $('#vehicle_heading').text(heading + ' degree')
                $('#img_status').attr("src",img)
                $('#koordinat').text(koordinat)
                var utcSeconds = data[0].updateTime;
                var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                d.setUTCSeconds(utcSeconds);
                var strDate = FormatedDate(d)
                var strTime = FormatedTime(d)

                $('#vehicle_time_live').text(strDate)

                
                if (prevSpeed == speed ){

                }
                
                var cars_info = {
                                licensePlate : licensePlate,
                                vehicleUid : vehicleUid,
                                deviceStatus : deviceStatus,
                                speed: speed,
                                heading:heading,
                                updateTime:strDate,
                                updateJam: strTime      
                }
                //     console.log(cars_info)
                    
                // var resp = addMarkerTracking(latlng,heading,cars_info)
                if (gmarkers.length == 2){
                        // console.log('translation')
                        // if (validLatitude!= prev_latitude && validLongitude != prev_longitude){
                            // ClearAllMarker()
                            // var resp = addMarkerTracking(latlng,heading,cars_info)
                            var result = [validLatitude,validLongitude]
                            var locs = {
                                prevLatitude: prev_latitude,
                                prevLongitude: prev_longitude,
                                currLatitude: validLatitude,
                                currLongitude: validLongitude
                            }
                            // console.log(1,locs)

                            // if (prev_latitude != validLatitude || prev_longitude != validLongitude){
                                var range = distance(prev_latitude,prev_longitude,validLatitude,validLongitude)
                               
                                if (range>0){

                                    // directionsService = new google.maps.DirectionsService()
                                    directionsRenderer.setOptions({
                                        suppressMarkers:true
                                    })

                                    waypts.push({location:  new google.maps.LatLng(prev_latitude, prev_longitude),stopover:true})
                                    waypts.push({location:  new google.maps.LatLng(validLatitude, validLongitude),stopover:true})

                                    // console.log('speed: '+ cars_info.speed)

                                    
                                    historyMarker.push({location : new google.maps.LatLng(validLatitude, validLongitude),cars_info:cars_info})

                                    // console.log('gmw0:' , waypts.length)

                                    if (waypts.length>22){
                                        while(waypts.length>22){
                                            waypts.splice(0,1)
                                           
                                        }
                                    }

                                    // console.log('gmw1:',gmarkers_waypoint.length)

                                    if (gmarkers_waypoint.length>7){
                                        while(gmarkers_waypoint.length>7){
                                            removeMarkerWaypoint(gmarkers_waypoint)
                                            break;
                                        }
                                    }

                                    // console.log('waypts length:' + waypts.length)
                                    // console.log('waypts: ' + waypts[0])
                                    // console.log('waypts: ' + waypts[1])
                                    // console.log('waypts: ' + waypts[2])
                                    // console.log('waypts start'+ waypts[0].location)
                                    // console.log('waypts end'+ waypts[waypts.length-1].location)
                                    
                                    var request = {
                                        origin: waypts[0].location,
                                        destination: waypts[waypts.length-1].location,
                                        waypoints: waypts,
                                        optimizeWaypoints: true,
                                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                                    };

                                    // console.log('request: ' + request)

                                    directionsService
                                    .route({
                                      origin: waypts[0].location,
                                      destination: waypts[waypts.length-1].location,
                                      waypoints: waypts,
                                      optimizeWaypoints: true,
                                      travelMode: google.maps.TravelMode.DRIVING,
                                    })
                                    .then((response) => {
                                      directionsRenderer.setDirections(response);
                                      route = response.routes[0];
                                      var legs = response.routes[0].legs;
                                    //   console.log('legs length:' + legs.length)
                                      var path = response.routes[0].overview_path;
                                      var legs = response.routes[0].legs;
                                      
                                      startLocation = new Object();
                                      endLocation = new Object();
                                     

                                    //   console.log('Marker Length: ' + historyMarker.length)
                                      
                                    if (historyMarker.length>0){

                                        historyMarker.push({location : new google.maps.LatLng(prev_latitude, prev_longitude),cars_info:cars_info})
                                        var marker_waypoint = addMarkerWaypoint(new google.maps.LatLng(validLatitude, validLongitude),cars_info)
                                        
                                        // console.log('Marker Length Data: ' + historyMarker[historyMarker.length-1].cars_info)
                                    }

                                      
                                      

                                    }).catch((e) => console.log("Error " + status));
                                    

                                    transition(result,heading,cars_info,locs)
                                    
                                   

                                    

                                }else{
                                    console.log('History Marker Length: ' + historyMarker.length)

                                    if (historyMarker.length==0){

                                           console.log(1,'prev latitude'+ prev_latitude)
                                           console.log(1,'prev longitude :' + prev_latitude)

                                           historyMarker.push({location : new google.maps.LatLng(prev_latitude, prev_longitude),cars_info:cars_info})
                                   
                                        }else{
                                        if (historyMarker[historyMarker.length-1].location != new google.maps.LatLng(prev_latitude, prev_longitude)){
                                            
                                            console.log(2,'prev latitude'+ prev_latitude)
                                            console.log(2,'prev longitude :' + prev_latitude)

                                            historyMarker.push({location : new google.maps.LatLng(prev_latitude, prev_longitude),cars_info:cars_info})
                                        }
                                    }
                                    setMarkerAnchor(heading,cars_info,locs)
                                }
                               
                            // }
                        // }
                }else if (gmarkers.length == 0){
                    var latlng = new google.maps.LatLng(validLatitude,validLongitude);
                    var resp = addMarkerTracking(latlng,heading,cars_info)
                    
                    if(current_section == 'live_tracking' || current_section == 'detail'){
                        addMarkerWaypoint(latlng,cars_info)
                    }
                   
                    // console.log(resp[0])
                    
                    map.panTo(latlng);
                }
                           
                            // gmarkers.push(resp[0]);
                           
                            // map.setZoom(16)
                            // var infowindow = resp[1]
                            // infowindow.open(map, resp[0]);
                            // console.log('selectedsclId: ' + selected_sclId)
                            // processing_data(current_section,selected_sclId)
                           
                            
            }
        }).catch((error) => {
            
            console.error(error)
            // AssetStatusCount()
        });

    },1000)
   
}


// live detail
function process_live_detail (sclId){
    setTimeout(function(){
        var token = sessionStorage.getItem("token")
        const config = {
            headers:{
              'token': token
            },
            timeout: 10000
          };
          
        var url = "http://localhost:3002/api/patern/latest_status/"+ sclId
        axios.get(url,config)
        .then((response) => {
            var status = response.data.status
            var data = response.data.data
            console.log(status)
            if (status == true){
                // console.log(data[0])
                // console.log('gmarkers pre live: ' + gmarkers.length)
                // console.log('gmarkerswaypoint pre live: ' + gmarkers_waypoint.length)

                if (gmarkers.length == 2) {
                    var prev_latitude = gmarkers[0].getPosition().lat()
                    var prev_longitude = gmarkers[0].getPosition().lng()
                    position = [prev_latitude,prev_longitude]
                }else{
                    //RemoveMarker(gmarkers)
                    // console.log('gmarkers after live: ' + gmarkers.length)
                    removeMarkerWaypointAll(gmarkers_waypoint,gmarkers_waypoint.length) 
                }

                var validLatitude = data[0].validLatitude
                var validLongitude = data[0].validLongitude
                var vehicleUid = data[0].vehicleUid
                var licensePlate = data[0].vehicleLicensePlate
                var speed = data[0].vehicleSpeed[0].value + ' ' + data[0].vehicleSpeed[0].unit
                var operating_time = secondsToHms (data[0].operatingTime[0].value)
                $('#lama_waktu_operasi').text(operating_time)
                var deviceStatus = ''
                var heading = data[0].heading
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

                prevSpeed =  $('#vehicle_speed_live').text()
                prevStatus = $('#vehicle_status').text()

                // console.log('deviceStatus: '+ deviceStatus)
                var location = {lat:validLatitude,lng:validLongitude}
                getAddress(location).then( result => {
                    $('#vehicle_address_live').text(result)  
                    $('#vehicle_address_detail').text(result)
                    // console.log('update address')  
                })

                var dms_lat = deg_to_dms(validLatitude)
                var dms_lon = deg_to_dms(validLongitude)
                var koordinat = dms_lat + ' , ' + dms_lon
                var lokasi_terakhir = validLatitude +',' + validLongitude

                // console.log('update speed:' + speed)
                $('#vehicle_status').text(deviceStatus)
                $('#vehicle_status_detail').text(deviceStatus)
                $('#vehicle_speed_live').text(speed)
                $('#kecepatan_kendaraan').text(speed)
                $('#vehicle_heading').text(heading + ' degree')
                $('#img_status').attr("src",img)
                $('#img_status_detail').attr("src",img)
                $('#lokasi_terakhir').text(lokasi_terakhir);
                $('#koordinat').text(koordinat)
                var utcSeconds = data[0].updateTime;
                var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                d.setUTCSeconds(utcSeconds);
                var strDate = FormatedDate(d)
                var strTime = FormatedTime(d)

                $('#waktu_terakhir_update').text(strTime)

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


                if (gmarkers.length == 2){
                    // console.log('translation')
                    // if (validLatitude!= prev_latitude && validLongitude != prev_longitude){
                        // ClearAllMarker()
                        // var resp = addMarkerTracking(latlng,heading,cars_info)
                        var result = [validLatitude,validLongitude]
                        var locs = {
                            prevLatitude: prev_latitude,
                            prevLongitude: prev_longitude,
                            currLatitude: validLatitude,
                            currLongitude: validLongitude
                        }

                        // console.log(1,locs)

                        // if (prev_latitude != validLatitude || prev_longitude != validLongitude){
                            var range = distance(prev_latitude,prev_longitude,validLatitude,validLongitude)
                           
                            if (range>0){
                                transition(result,heading,cars_info,locs)
                            }else{
                                setMarkerAnchor(heading,cars_info,locs)
                            }
                           
                        // }
                    // }
            }else if (gmarkers.length == 0){
                var latlng = new google.maps.LatLng(validLatitude,validLongitude);
                var resp = addMarkerTracking(latlng,heading,cars_info)
                map.panTo(latlng);
            }
                                


            }
        }).catch((error) => {
            
            console.error(error)
            // AssetStatusCount()
        });

    },1000)
}

// function cari_riwayat
async function cari_riwayat(){
    // alert('cari')
    // alert('play')
    var dateToday1 = $('#dt1').datetimebox('getValue')
    // alert(dateToday1)
    const timestamp1 = datetime_to_epoch(dateToday1)
    var dateToday2 = $('#dt2').datetimebox('getValue')
    // alert(dateToday2)
    const timestamp2 = datetime_to_epoch(dateToday2)
    // alert(selected_sclId)
    // alert('after:' + timestamp1)
    // alert('before:' + timestamp2)

    var win = $.messager.progress({
        border: 'thin',
        msg:'<div style="margin-top:5px;margin-left:5px;"><img src="/img/loader.gif" style="height:50px;width:50px;"></div>',
        width:100,
        height:100
    });
    $.messager.progress('bar').hide();
    win.dialog('resize');
    win.window('window').addClass('bg1');

    var postdata = {
        createdBefore:timestamp2,
        createdAfter:timestamp1,
        sclId:selected_sclId
    }

    console.log(JSON.stringify(postdata))

    var url='/vehicle/history'
    var response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
      })
    
      const data = await response.json();
    //   console.log(data)
    //  for (i=0; i<= data.length-1;i++){
    //     var dt = FormatedDate1(epoch_to_datetime(data[i].updateTime))
    //     data[i].tanggal = dt
    //  }

     data.sort(GetSortOrder("updateTime"))
     var j=1

     for (i=0; i<= data.length-1;i++){
        var dt = FormatedDate1(epoch_to_datetime(data[i].updateTime))
        data[i].tanggal = dt
        data[i].no = j
        data[i].speed = data[i].speed /10
        j++
     }

    $('#dg').datagrid({
        data: data
    })

    data_riwayat =  $('#dg').datagrid('getRows')

    $.messager.progress('close');
}

function GetSortOrder(prop) {    
return function(a, b) {    
    if (a[prop] > b[prop]) {    
        return 1;    
    } else if (a[prop] < b[prop]) {    
        return -1;    
    }    
    return 0;    
}    
}

// function process_riwayat
function process_riwayat(sclId){
$('#dg').datagrid({
    data:[]
})
selected_sclId = sclId
// alert(sclId)
}

// play riwayat

function play(){
    // alert('play')
    paused_history = false
    stopped_history = false
   

    var data_length = data_riwayat.length

    if (data_length>0){
        console.log('data_length:' + data_length)
        // alert(prev_row_index_selected)
        console.log('row_index_selected:'+ row_index_selected)
        console.log('data.length: ' + data_length)
    
        if (row_index_selected!= data_length-1){
            select_history(data_riwayat,row_index_selected)
        }else{
            ReInitializeMap(map,gmarkers)
            arr_tout = []
            arr_drivingPath = []
            row_index_selected = 0
            select_history(data_riwayat,row_index_selected)
            
        }
    }
    else
    {
                    var img = "/img/red_close.png"
                    var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
                    msg+= `<div style="width:100%;height:40px;text-align:center"> Data Kosong </div>`
                    msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
                                <hr style="width: 280px;margin-top:10px;margin-left:0px;">
                            </div>
                            <div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
                                OK
                            </div>
                            `
                dlg = $.messager.show({
                    msg: msg,
                    showType:'fade',
                    border:'thin',
                    timeout:500,
                    cls: 'cls1',
                    height:180,
                    style:{
                        right:'',
                        bottom:''
                    }
                });
    }
    
    
    
}


function pause(){
    // alert('here')
    paused_history = true
    for(i=0;i<=arr_tout.length-1;i++){
        clearTimeout(arr_tout[i])
    }
    
    arr_tout = []

    $('#dg').datagrid('unselectAll')
    $('#dg').datagrid('scrollTo',row_index_selected)
    $('#dg').datagrid('selectRow',row_index_selected)
}

function stop(){
    for(i=0;i<=arr_tout.length-1;i++){
        clearTimeout(arr_tout[i])
    }
    arr_tout = []
    row_index_selected = 0
    console.log('driving path: '+ arr_drivingPath.length)

    for (i=0; i<= arr_drivingPath.length-1;i++){
        arr_drivingPath[i].setMap(null)
    }
    arr_drivingPath=[]

    drivingPlanCoordinates =[]

    ReInitializeMap(map,gmarkers)
    $('#dg').datagrid('unselectAll')
    $('#dg').datagrid('scrollTo',0)
    // clearInterval(tout)
    

  
    stopped_history = true
}

async function select_history(data,start,paused,stopped){
    // alert(data.length)
    // ReInitializeMap(map,gmarkers)

    for(i=0;i<=arr_tout.length-1;i++){
        clearTimeout(arr_tout[i])
    }
    arr_tout = []

    for (i=start;i<=data.length-1;i++)
    {
       
            var result = await doSetTimeout(i)
            // if (result){
            //     clearTimeout(result)
            // }
       
    }
    
    
}

function doSetTimeout(i) {
    console.log('read speed data:' + read_speed_data)
    tout = setTimeout(function() {
        $('#dg').datagrid('selectRow',i)
        var row = $('#dg').datagrid('getSelected')
        row_index_selected = i

        if (row.speed == 0){
            var deviceStatus = 'diam'
        }else if(row.speed>0){
            var deviceStatus = 'bergerak'
        }

        var raw_tanggal = row.tanggal
        var tanggal = raw_tanggal.substr(0,10)
        var jam = raw_tanggal.substr(10,19)
        // console.log(tanggal)
        // console.log(jam)

        var cars_info = {
            no:row.no,
            licensePlate : '',
            vehicleUid : '',
            sclId:selected_sclId,
            deviceStatus : deviceStatus,
            latitude: row.latitude,
            longitude:row.longitude,
            speed: row.speed,
            heading:row.heading,  
            tanggal:tanggal,
            jam:jam
        }
        
        // console.log(paused)

        if (i==0){
            draw_history(cars_info)
        }else{
            if (paused_history == false){
                prev_row_index_selected = row_index_selected - 1
                draw_history(cars_info)
            }else{
                draw_history(cars_info)
                 paused_history = false
            }

        }
        
        // console.log(i)
    }, read_speed_data * i,i)
    arr_tout.push(tout)
    // return tout
  }

 async function draw_history(cars_info){
    // alert(row.latitude)
    // alert(row.longitude)
        // console.log(cars_info.no)

        $('#track_date').text(cars_info.tanggal)
        $('#track_time').text(cars_info.jam)

        if (cars_info.no == 1){
            // draw marker
            var latlng = new google.maps.LatLng(cars_info.latitude,cars_info.longitude);
            var resp = addMarkerTracking(latlng,cars_info.heading,cars_info)
            map.panTo(latlng);
            prev_history_latitude = cars_info.latitude
            prev_history_longitude = cars_info.longitude
            position = [cars_info.latitude,cars_info.longitude]
        }else{
        
        position = [prev_history_latitude,prev_history_longitude]
        var result = [cars_info.latitude,cars_info.longitude]

        var locs = {
            prevLatitude: prev_history_latitude,
            prevLongitude: prev_history_longitude,
            currLatitude: cars_info.latitude,
            currLongitude: cars_info.longitude
        }

        // console.log('locs:' + JSON.stringify(locs))
        var range = await distance(prev_history_latitude,prev_history_longitude,cars_info.latitude,cars_info.longitude)                  
        // console.log('range:'+ range)

        if (range>0){
            transition(result,cars_info.heading,cars_info,locs)
            var latlng = new google.maps.LatLng(cars_info.latitude,cars_info.longitude);
            map.panTo(latlng)

            console.log('draw polylines')
            var loc_prev = { lat: prev_history_latitude, lng: prev_history_longitude }
            drivingPlanCoordinates.push(loc_prev)
            var loc_current = {lat: cars_info.latitude, lng: cars_info.longitude}
            drivingPlanCoordinates.push(loc_current)
            

            var drivingPath = new google.maps.Polyline({
                path: drivingPlanCoordinates,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              });
              
              drivingPath.setMap(map);
              arr_drivingPath.push(drivingPath)

            prev_history_latitude = cars_info.latitude
            prev_history_longitude = cars_info.longitude
            
            
            
            // var loc = { lat: cars_info.latitude, lng: cars_info.longitude }
            // drivingPlanCoordinates.push(loc)

            // var drivingPath = new google.maps.Polyline({
            //     path: drivingPlanCoordinates,
            //     geodesic: true,
            //     strokeColor: "#FF0000",
            //     strokeOpacity: 1.0,
            //     strokeWeight: 2,
            //   });

            //   drivingPath.setMap(map);

        }else{
            setMarkerAnchor(cars_info.heading,cars_info,locs)
                
            prev_history_latitude = cars_info.latitude
            prev_history_longitude = cars_info.longitude
        }

    }

    // var range = distance(prev_latitude,prev_longitude,validLatitude,validLongitude)                  
    // if (range>0){
    //     transition(result,heading,cars_info,locs)
    // }else{
    //     setMarkerAnchor(heading,cars_info,locs)
    // }

 }