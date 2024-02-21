var t1 = null
var t1_all = null
var t1_all_category = null
var t1_moving = null
var t1_moving_category = null
var t1_stop = null
var t1_stop_category = null
var t1_offline = null
var t1_offline_category = null


var init_odometer

var pnl_vehicles_data_length

var t2 = null
var t3 = null
var t4 = null
var tout = null

var ctr_mux =0
var ctr_max=0
var ctr_mazda6_sedan=0
var ctr_mazda6_wagon=0

var read_speed_data= 500

var drivingPlanCoordinates = []
var arr_drivingPath =[]

var is_play = false

function processing_data (current_section,sclId,mode,search_mode,search_param,userid,vehicleUid,vehicle_category){
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

            // console.log('modenya:'+ mode)
            prev_mode = mode

            if (mode == 'bergerak'){

                    // console.log('bergerak')
                   

                    clearTimeout(t1_all)
                    clearTimeout(t1_offline)
                    clearTimeout(t1_stop)

                    clearInterval(t1_all)
                    clearInterval(t1_moving)
                    clearInterval(t1_stop)
                    clearInterval(t1_offline)

                    clearTimeout(t1_all_category)
                    clearTimeout(t1_offline_category)
                    clearTimeout(t1_stop_category)
    
                    clearInterval(t1_all_category)
                    clearInterval(t1_moving_category)
                    clearInterval(t1_stop_category)
                    clearInterval(t1_offline_category)


                    $('#toggle_place').linkbutton({
                        selected:false
                    })

                    // deleteMarkers()
                    
                    // alert('selected_vehicle_category: '+selected_vehicle_category)

                    if (selected_vehicle_category == 'All'){
                        AssetStatusCount(mode,search_mode,null)  
                
                        t1_moving = setInterval(function(){
                            // console.log('Interval reached')
                            // console.log('start delete markers')
                            deleteMarkers()
                            // console.log('markers deleted')
                            // console.log('markers: '  + gmarkers.length)
                            // console.log('search mode', search_mode)
                            // console.log('asset status count')
                            AssetStatusCount(mode,search_mode,null)
                        },30000)
                    }else{

                        if (selected_vehicle_category == 'Sedan'){
                            var category = 'Mazda 6 Sedan'
                        }else if(selected_vehicle_category == 'Wagon'){
                            var category = 'Mazda 6 Wagon'
                        }

                        // alert('Category Terpilih: '+ category)

                        // AssetStatusCountCategory(mode,search_mode,null,userid,category)
                        t1_moving_category = setInterval(function(){
                            // console.log('Interval reached')
                            // console.log('start delete markers')
                            deleteMarkers()
                            // console.log('markers deleted')
                            // console.log('markers: '  + gmarkers.length)
                            // console.log('search mode', search_mode)
                            // console.log('asset status count')
                            // AssetStatusCountCategory(mode,search_mode,null,userid,category)
                        },30000)
                    }
                   
               

            }else if (mode == 'diam'){
                // console.log('diam')
                //alert('diam')
                    // deleteMarkers()
                    clearTimeout(t1_moving)
                    clearTimeout(t1_offline)
                    clearTimeout(t1_all)

                    clearInterval(t1_all)
                    clearInterval(t1_moving)
                    clearInterval(t1_stop)
                    clearInterval(t1_offline)

                    clearTimeout(t1_all_category)
                    clearTimeout(t1_offline_category)
                    clearTimeout(t1_stop_category)
    
                    clearInterval(t1_all_category)
                    clearInterval(t1_moving_category)
                    clearInterval(t1_stop_category)
                    clearInterval(t1_offline_category)
                    
                    $('#toggle_place').linkbutton({
                        selected:false
                    })

                    if (selected_vehicle_category == 'All'){
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
                    }else{
                        if (selected_vehicle_category == 'Sedan'){
                            var category = 'Mazda 6 Sedan'
                        }else if(selected_vehicle_category == 'Wagon'){
                            var category = 'Mazda 6 Wagon'
                        }

                        // alert('Category Terpilih: '+ category)

                        // AssetStatusCountCategory(mode,search_mode,null,userid,category)
                        t1_moving_category = setInterval(function(){
                            // console.log('Interval reached')
                            // console.log('start delete markers')
                            deleteMarkers()
                            // console.log('markers deleted')
                            // console.log('markers: '  + gmarkers.length)
                            // console.log('search mode', search_mode)
                            // console.log('asset status count')
                            // AssetStatusCountCategory(mode,search_mode,null,userid,category)
                        },30000)
                    }

                    
               

            }else if (mode == 'offline'){

                    // deleteMarkers()
                    clearTimeout(t1_moving)
                    clearTimeout(t1_stop)

                    clearInterval(t1_all)
                    clearInterval(t1_moving)
                    clearInterval(t1_stop)
                    clearInterval(t1_offline)

                    clearTimeout(t1_all_category)
                    clearTimeout(t1_offline_category)
                    clearTimeout(t1_stop_category)
    
                    clearInterval(t1_all_category)
                    clearInterval(t1_moving_category)
                    clearInterval(t1_stop_category)
                    clearInterval(t1_offline_category)

                     

                    $('#toggle_place').linkbutton({
                        selected:false
                    })

                    if (selected_vehicle_category == 'All'){
                        AssetStatusCount(mode,search_mode,null)

                        t1_offline = setInterval(function(){
                            // console.log('Interval reached')
                            // console.log('start delete markers')
                            deleteMarkers()
                            // console.log('markers deleted')
                            // console.log('markers: '  + gmarkers.length)
                            AssetStatusCount(mode,search_mode,null)
                        },30000)
                    }else{
                        if (selected_vehicle_category == 'Sedan'){
                            var category = 'Mazda 6 Sedan'
                        }else if(selected_vehicle_category == 'Wagon'){
                            var category = 'Mazda 6 Wagon'
                        }

                        // alert('Category Terpilih: '+ category)

                        // AssetStatusCountCategory(mode,search_mode,null,userid,category)
                        t1_moving_category = setInterval(function(){
                            // console.log('Interval reached')
                            // console.log('start delete markers')
                            deleteMarkers()
                            // console.log('markers deleted')
                            // console.log('markers: '  + gmarkers.length)
                            // console.log('search mode', search_mode)
                            // console.log('asset status count')
                            // AssetStatusCountCategory(mode,search_mode,null,userid,category)
                        },30000)
                    }
                   
                
            }else if (mode == 'semua'){
                    // alert('semua')
                    // console.log('semua')
                    // deleteMarkers()
                    clearTimeout(t1_moving)
                    clearTimeout(t1_offline)
                    clearTimeout(t1_stop)

                    clearInterval(t1_all)
                    clearInterval(t1_moving)
                    clearInterval(t1_stop)
                    clearInterval(t1_offline)

                    clearTimeout(t1_all_category)
                    clearTimeout(t1_offline_category)
                    clearTimeout(t1_stop_category)
    
                    clearInterval(t1_all_category)
                    clearInterval(t1_moving_category)
                    clearInterval(t1_stop_category)
                    clearInterval(t1_offline_category)

                    $('#toggle_place').linkbutton({
                        selected:false
                    })

                    if(selected_vehicle_category === undefined || selected_vehicle_category =='All'){
                        AssetStatusCount(mode,search_mode,null,userid)  
                        // var markerCluster = new MarkerClusterer(map, gmarkers);
                        t1_all = setInterval(function(){
                            // console.log('Interval reached')
                            // console.log('start delete markers')
                            // deleteMarkers()
                            deleteMarkersMoving()
                            // console.log('markers deleted')
                            // console.log('markers: '  + gmarkers.length)
                            AssetStatusCount(mode,search_mode,null,userid)
                        },30000)
                    }else{
                        // AssetStatusCountCategory(mode,search_mode,null,userid,selected_vehicle_category)  
                        // var markerCluster = new MarkerClusterer(map, gmarkers);
                        // t1_all_category = setInterval(function(){
                        //     // console.log('Interval reached')
                        //     // console.log('start delete markers')
                        //     // deleteMarkers()
                        //     deleteMarkersMoving()
                        //     // console.log('markers deleted')
                        //     // console.log('markers: '  + gmarkers.length)
                        //     // AssetStatusCountCategory(mode,search_mode,null,userid,selected_vehicle_category)
                        // },30000)
                    }

                    
              
            }else if (mode== 'category'){

                clearTimeout(t1_moving)
                clearTimeout(t1_offline)
                clearTimeout(t1_stop)

                clearInterval(t1_all)
                clearInterval(t1_moving)
                clearInterval(t1_stop)
                clearInterval(t1_offline)

                clearTimeout(t1_all_category)
                clearTimeout(t1_offline_category)
                clearTimeout(t1_stop_category)

                clearInterval(t1_all_category)
                clearInterval(t1_moving_category)
                clearInterval(t1_stop_category)
                clearInterval(t1_offline_category)

                AssetStatusCount(mode,search_mode,null,userid)
            }
           
            
        }else{
            //alert('search')
            clearInterval(t1_moving)
            clearInterval(t1_offline)
            clearInterval(t1_stop)
            clearInterval(t1_all)
            clearInterval(t3)
            clearInterval(t4)

            clearTimeout(t1_all_category)
            clearTimeout(t1_offline_category)
            clearTimeout(t1_stop_category)

            clearInterval(t1_all_category)
            clearInterval(t1_moving_category)
            clearInterval(t1_stop_category)
            clearInterval(t1_offline_category)

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

         clearTimeout(t1_all_category)
         clearTimeout(t1_offline_category)
         clearTimeout(t1_stop_category)

         clearInterval(t1_all_category)
         clearInterval(t1_moving_category)
         clearInterval(t1_stop_category)
         clearInterval(t1_offline_category)
 
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

         clearTimeout(t1_all_category)
         clearTimeout(t1_offline_category)
         clearTimeout(t1_stop_category)

         clearInterval(t1_all_category)
         clearInterval(t1_moving_category)
         clearInterval(t1_stop_category)
         clearInterval(t1_offline_category)
 
         // $('#geofence_box').css("visibility","hidden")
         $('#geofence_box').hide()
 
         deleteMarkers()
         process_riwayat(sclId)
 
     }else if (current_section == 'category'){
        // alert('here')

        ReInitializeMap(map,gmarkers)

        clearInterval(t2)
        clearInterval(t3)
        clearInterval(t4)

        // console.log('modenya:'+ mode)
        prev_mode = mode

        if (mode == 'bergerak'){

                // console.log('bergerak')
                clearTimeout(t1_all)
                clearTimeout(t1_offline)
                clearTimeout(t1_stop)

                clearInterval(t1_all)
                clearInterval(t1_moving)
                clearInterval(t1_stop)
                clearInterval(t1_offline)

                clearTimeout(t1_all_category)
                clearTimeout(t1_offline_category)
                clearTimeout(t1_stop_category)

                clearInterval(t1_all_category)
                clearInterval(t1_moving_category)
                clearInterval(t1_stop_category)
                clearInterval(t1_offline_category)


                $('#toggle_place').linkbutton({
                    selected:false
                })

                // deleteMarkers()
                // AssetStatusCountCategory(mode,search_mode,null)  
            
                t1_moving_category = setInterval(function(){
                    // console.log('Interval reached')
                    // console.log('start delete markers')
                    deleteMarkers()
                    // console.log('markers deleted')
                    // console.log('markers: '  + gmarkers.length)
                    // console.log('search mode', search_mode)
                    // console.log('asset status count')
                    // AssetStatusCountCategory(mode,search_mode,null)
                },30000)
           

        }else if (mode == 'diam'){
            // console.log('diam')
            //alert('diam')
                // deleteMarkers()
                clearTimeout(t1_moving)
                clearTimeout(t1_offline)
                clearTimeout(t1_all)

                clearInterval(t1_all)
                clearInterval(t1_moving)
                clearInterval(t1_stop)
                clearInterval(t1_offline)

                clearTimeout(t1_all_category)
                clearTimeout(t1_offline_category)
                clearTimeout(t1_stop_category)

                clearInterval(t1_all_category)
                clearInterval(t1_moving_category)
                clearInterval(t1_stop_category)
                clearInterval(t1_offline_category)
                
                $('#toggle_place').linkbutton({
                    selected:false
                })

                // AssetStatusCountCategory(mode,search_mode,null)  
                
                
                t1_stop_category = setInterval(function(){
                    // console.log('Interval reached')
                    // console.log('start delete markers')
                    deleteMarkers()
                    // console.log('markers deleted')
                    // console.log('markers: '  + gmarkers.length)
                    // AssetStatusCountCategory(mode,search_mode,null)
                    
                    // var markerCluster = new MarkerClusterer(map, gmarkers);
                },30000)
           

        }else if (mode == 'offline'){

                // deleteMarkers()
                clearTimeout(t1_moving)
                clearTimeout(t1_stop)

                clearInterval(t1_all)
                clearInterval(t1_moving)
                clearInterval(t1_stop)
                clearInterval(t1_offline)

                clearTimeout(t1_all_category)
                clearTimeout(t1_offline_category)
                clearTimeout(t1_stop_category)

                clearInterval(t1_all_category)
                clearInterval(t1_moving_category)
                clearInterval(t1_stop_category)
                clearInterval(t1_offline_category)

                // AssetStatusCountCategory(mode,search_mode,null)  

                $('#toggle_place').linkbutton({
                    selected:false
                })

                t1_offline_category = setInterval(function(){
                    // console.log('Interval reached')
                    // console.log('start delete markers')
                    deleteMarkers()
                    // console.log('markers deleted')
                    // console.log('markers: '  + gmarkers.length)
                    // AssetStatusCountCategory(mode,search_mode,null)
                },30000)
            
        }else if (mode == 'semua'){
                
                // console.log('semua')
                // deleteMarkers()
                clearTimeout(t1_moving)
                clearTimeout(t1_offline)
                clearTimeout(t1_stop)

                clearInterval(t1_all)
                clearInterval(t1_moving)
                clearInterval(t1_stop)
                clearInterval(t1_offline)

                clearTimeout(t1_all_category)
                clearTimeout(t1_offline_category)
                clearTimeout(t1_stop_category)

                clearInterval(t1_all_category)
                clearInterval(t1_moving_category)
                clearInterval(t1_stop_category)
                clearInterval(t1_offline_category)

                $('#toggle_place').linkbutton({
                    selected:false
                })

                console.log('vehicle_category',vehicle_category)
                // alert(vehicle_category)

                if(vehicle_category == 'All'){
                    
                    
                    // AssetStatusCountCategory(mode,search_mode,null,userid,vehicle_category)  
                    // var markerCluster = new MarkerClusterer(map, gmarkers);
                    t1_all_category = setInterval(function(){
                        // console.log('Interval reached')
                        // console.log('start delete markers')
                        // deleteMarkers()
                        deleteMarkersMoving()
                        // console.log('markers deleted')
                        // console.log('markers: '  + gmarkers.length)
                        // AssetStatusCountCategory(mode,search_mode,null,userid,vehicle_category)
                    },30000)
                }else {

                    if(vehicle_category == 'Sedan'){
                        var category = 'Mazda 6 Sedan'
                    }else if(vehicle_category == 'Wagon'){
                        var category = 'Mazda 6 Wagon'
                    }else if(vehicle_category =='D-max'){
                        var category = 'D-Max'
                    }else if(vehicle_category == 'Mux'){
                        var category = 'Mux'
                    }

                    // AssetStatusCountCategory(mode,search_mode,null,userid,category) 
                    t1_all_category = setInterval(function(){
                        // console.log('Interval reached')
                        // console.log('start delete markers')
                        // deleteMarkers()
                        deleteMarkersMoving()
                        // console.log('markers deleted')
                        // console.log('markers: '  + gmarkers.length)
                        // AssetStatusCountCategory(mode,search_mode,null,userid,category)
                    },30000)
                }

               
          
        }
        

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
            $('#dl').datalist('updateRow',{
                index: 0,
                row: {
                    value: 'All',
                    text: 'ALL (' + all +')'
                }
            })

            if (search_mode == false){

                

                if (mode == 'semua'){
                   
                        CreateData(userid)
                   
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


function AssetStatusCountCategory(mode,search_mode,search_param,userid,vehicle_category){

    console.log('vehicle_category',vehicle_category)
    console.log('mode',mode)
    // alert('vehicle category: ' + vehicle_category)
    // alert('mode: ' + mode)
    if (vehicle_category === undefined){
        vehicle_category = selected_vehicle_category
    }
    
    if (mode == 'semua'){
        CreateDataCategory(userid,vehicle_category)
    }else{
        // CreateDataSelected
        CreateDataSelectedCategory(mode)
    }
    
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
    console.log('url1',url1)
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

            //  var url2 = '/vehicle/read/categories'
            //  const requestOptions = {
            //     method: 'POST',
            //     headers: { 
            //         'Content-Type': 'application/json'
            //     },
            // };
            //  const res_vehicle_category = await fetch(url2,requestOptions)
            // .then(response => response.json()) 
            // .then(json => {
            //     // alert (json)
            //     return json
            // })
           
            // console.log('res_vehicle_category',res_vehicle_category)

            // $('#dl').datalist('updateRow',{
            //     index: 0,
            //     row: {
            //         value: 'All',
            //         text: 'ALL (' + res_vehicle_category.all +')'
            //     },
               
            // })

            // $('#dl').datalist('updateRow',{
            //     index: 1,
            //     row: {
            //         value: 'Sedan',
            //         text: 'Mazda 6 Sedan (' + res_vehicle_category.sedan +')'
            //     }
            //  })
           
            // $('#dl').datalist('updateRow',{
            //     index: 2,
            //     row: {
            //         value: 'Wagon',
            //         text: 'Mazda 6 Wagon (' + res_vehicle_category.wagon +')'
            //     }
            // })
        
            // $('#dl').datalist('updateRow',{
            //     index: 3,
            //     row: {
            //         value: 'D-Max',
            //         text: 'Isuzu D-Max (' + res_vehicle_category.dmax +')'
            //     }
            // })
        
            // $('#dl').datalist('updateRow',{
            //     index: 4,
            //     row: {
            //         value: 'Mux',
            //         text: 'Isuzu D-Mux (' + res_vehicle_category.dmux +')'
            //     }
            // })

          
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
                    // var vehicleUid = data[i].vehicleUid
                    // var vehicle_category = data_vehicle[l].vehicle_type
                    // console.log('vehicle_category',vehicle_category)
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
        
                          const requestOptions = {
                            method: 'POST',
                            headers: { 
                                'Content-Type': 'application/json'
                            }
                        };
        
                        //   var url1= '/vehicle/read/selected/vehicleuid/'+ vehicleUid
                        //     //   console.log('url1',url1)
                        //   var result = await fetch(url1,requestOptions)
                        //   .then(response => response.json()) 
                        //   .then(json => {
                        //         // console.log('json',json)
                        //         return json
                        //   })
                        //   .catch (function (error) {
                        //     // console.log('Request failed', error);
                        // });
        
                        //     console.log('result',result)
                            var vehicle_type 
                            // console.log('vehicleUid',vehicleUid.substr(0,2))
        
                            
        
                            // if (vehicleUid.substr(0,2)=='JM'){
                            //     vehicle_type = 'sedan'
                            // }
        
                            var x_def = vehicleUid.substr(0,2)
                            var x_def1 = vehicleUid.substr(0,4)
        
                            // console.log('x_def',x_def)
                            // console.log('x_def1',x_def1)
        
                            if (x_def == 'MP'){
        
                                if (x_def1 == 'MPAT'){
                                    vehicle_type = 'cabin'
                                }
            
                                if (x_def1 == 'MPAU'){
                                    vehicle_type = 'wagon'
                                }
                            }else{
                                vehicle_type = 'sedan'
                            }
        
        
        
        
        
                            var cars_info = {
                                no:i,
                                sclId:sclId,
                                licensePlate : licensePlate,
                                vehicleUid: vehicleUid,
                                deviceStatus : status,
                                speed: speed,
                                heading:heading,
                                last_update:strDate,
                                type_kendaraan:vehicle_type
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
        // console.log('data_vehicle',data_vehicle)

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
                    var res_vehicle_type = data_vehicle[l].vehicle_type
                    console.log('res_vehicle_type',res_vehicle_type)
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
                          <div id="v_type` + i + `" style="visibility:hidden">` + vehicle_category + `</div>
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
    pnl_vehicles_data_length = data.length
    console.log('pnl_vehicles_data_length', pnl_vehicles_data_length)
    // counter_vehicle_category()
    console.log('selected_vehicle_category',selected_vehicle_category)
    // if (selected_vehicle_category!= '' && typeof selected_vehicle_category != 'undefined'){
    //     filter_vehicle_by_category(selected_vehicle_category)
    // }else{
    //     filter_vehicle_by_category('All')
    // }
}


async function CreateDataCategory(userid,category){

    // alert('here1')
    // alert('category: '+ category)
    console.log('category',category)
 
    var token = sessionStorage.getItem("token")
    var pnl=''
    
    var status_bergerak=0
    var status_diam=0
    var status_offline=0
    var status_total=0
    var data
    // console.log(token)

    const config = {
        headers:{
          'token': token
        },
        timeout: 10000
      };

      var postData = {
       
      };

    if (category == 'All'){
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

        data = res1

    }else{

        if (category == 'Sedan'){
            category = 'Mazda 6 Sedan'
        }else if(category == 'Wagon'){
            category = 'Mazda 6 Wagon'
        }else if(category == 'D-max'){
            category = 'D-max'
        }else if(category =='Mux'){
            category = 'Mux'
        }

        var url = "http://147.139.144.120:3002/api/patern/vehicles/selected/category/" + category
        console.log('url category',url)
        // var url = "http://localhost:3002/api/patern/latest_status"
        let res1 = await axios.get(url,config)
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

        data = res1
        
    }


    var url1 = '/vehicle/read/all/'+ userid
    console.log('url1',url1)
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
                    var vehicleUid = data[i].vehicleUid
                    var accountId = data[i].accountId
                    var validLatitude = data[i].validLatitude
                    var validLongitude = data[i].validLongitude
                    var heading = data[i].heading
                    var speed = data[i].vehicleSpeed[0].value + ' ' + data[i].vehicleSpeed[0].unit
                    var vehicle_category = data_vehicle[l].vehicle_type
                    // console.log('vehicle_category',vehicle_category)
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
                            <div id="v_type` + i + `" style="visibility:hidden">` + vehicle_category + `</div>
                          </div>
                          `
        
                          const requestOptions = {
                            method: 'POST',
                            headers: { 
                                'Content-Type': 'application/json'
                            }
                        };
        
                        //   var url1= '/vehicle/read/selected/vehicleuid/'+ vehicleUid
                        //     //   console.log('url1',url1)
                        //   var result = await fetch(url1,requestOptions)
                        //   .then(response => response.json()) 
                        //   .then(json => {
                        //         // console.log('json',json)
                        //         return json
                        //   })
                        //   .catch (function (error) {
                        //     // console.log('Request failed', error);
                        // });
        
                        //     console.log('result',result)
                            var vehicle_type 
                            // console.log('vehicleUid',vehicleUid.substr(0,2))
        
                            
        
                            // if (vehicleUid.substr(0,2)=='JM'){
                            //     vehicle_type = 'sedan'
                            // }
        
                            var x_def = vehicleUid.substr(0,2)
                            var x_def1 = vehicleUid.substr(0,4)
        
                            // console.log('x_def',x_def)
                            // console.log('x_def1',x_def1)
        
                            if (x_def == 'MP'){
        
                                if (x_def1 == 'MPAT'){
                                    vehicle_type = 'cabin'
                                }
            
                                if (x_def1 == 'MPAU'){
                                    vehicle_type = 'wagon'
                                }
                            }else{
                                vehicle_type = 'sedan'
                            }
        
        
        
        
        
                            var cars_info = {
                                no:i,
                                sclId:sclId,
                                licensePlate : licensePlate,
                                vehicleUid: vehicleUid,
                                deviceStatus : status,
                                speed: speed,
                                heading:heading,
                                last_update:strDate,
                                type_kendaraan:vehicle_type,
                                category_kendaraan: vehicle_category
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

    }else{
        // alert('semua,filtered')

        // get list kendaraan
        // alert('userid: ' + userid)
      

        var data_vehicle = await res_vehicle.rows
        // console.log('data_vehicle',data_vehicle)

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
                    var res_vehicle_type = data_vehicle[l].vehicle_type
                    console.log('res_vehicle_type',res_vehicle_type)
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
                          <div id="v_type` + i + `" style="visibility:hidden">` + vehicle_category + `</div>
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
    pnl_vehicles_data_length = data.length
    // console.log(' pnl_vehicles_data_length', pnl_vehicles_data_length)
    // counter_vehicle_category()
    console.log('selected_vehicle_category',selected_vehicle_category)

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

                // console.log('gmarkers awal length:', gmarkers.length)
                // console.log('status',status)

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

                                            var vehicle_type 
                                            // console.log('vehicleUid',vehicleUid.substr(0,2))

                                             
                                            if (vehicleUid.substr(0,2)=='JM'){
                                                vehicle_type = 'sedan'
                                            }
                        
                                            if (vehicleUid.substr(0,4)== 'MPAT'){
                                                vehicle_type = 'cabin'
                                            }
                        
                                            if (vehicleUid.substr(0,4)== 'MPAU'){
                                                vehicle_type = 'wagon'
                                            }
                        

                                            var cars_info = {
                                                no: i,
                                                sclId:sclId,
                                                licensePlate : licensePlate,
                                                vehicleUid : vehicleUid,
                                                deviceStatus : status,
                                                last_update:strDate,
                                                speed: speed,
                                                heading:heading,
                                                type_kendaraan: vehicle_type
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

                // console.log('gmarkers akhir length:', gmarkers.length)

                $('#live_monitor').html(pnl);
}

async function CreateDataSelectedCategory(mode){

    var token = sessionStorage.getItem("token")
    var category = selected_vehicle_category
    
    // alert('selected')
    // console.log('selected')
    // deleteMarkers()

    var status_bergerak=0
    var status_diam=0
    var status_offline=0
    var status_total=0

    var pnl=''
    var selected_mode
    var resp
    // console.log(token)

    

    const config = {
        headers:{
          'token': token
        },
        timeout: 10000
      };

      var postData = {
       
      };

    // var url = "http://147.139.144.120:3002/api/patern/latest_status"
    // //   var url = "http://localhost:3002/api/patern/latest_status"
    // var resp = await axios.post(url,postData,config)
    //   .then((response) => {
    //         return response
    //   }).catch((error) => {
    //       // $.messager.alert('Error','Error Loading Data Timeout','info');
    //       console.error(error)
    //       // AssetStatusCount()
    //   });

    if (category == 'All'){
        var url = "http://147.139.144.120:3002/api/patern/latest_status"
        // var url = "http://localhost:3002/api/patern/latest_status"
        resp = await axios.post(url,postData,config)
        .then((response) => {
            // console.log(response.data)
            return response
    
        }).catch((error) => {
            // $.messager.alert('Error','Error Loading Data Timeout','info');
            console.error(error)
            // AssetStatusCount()
        });

        // data = res1

    }else{
        if (category == 'Sedan'){
            category = 'Mazda 6 Sedan'
        }else if(category == 'Wagon'){
            category = 'Mazda 6 Wagon'
        }else if(category == ' D-Max'){
            category = 'D-Max'
        }else if(category == 'Mux'){
            category = 'Mux'
        }

        var url = "http://147.139.144.120:3002/api/patern/vehicles/selected/category/" + category
        console.log('url category',url)
        // var url = "http://localhost:3002/api/patern/latest_status"
        resp = await axios.get(url,config)
        .then((response) => {
            // console.log(response.data)
            // var status = response.data.status
            // var data = response.data.data
            // if (status == true){
            //     return data
            // }
            return response;
    
        }).catch((error) => {
            // $.messager.alert('Error','Error Loading Data Timeout','info');
            console.error(error)
            // AssetStatusCount()
        });

        // data = res1
        
    }



                console.log('resp',resp)
                var response = resp

                var status = response.data.status
                console.log('status',status)
                var data = response.data.data
                // console.log('data',data)
                
                // ReInitializeMap

                // console.log('gmarkers awal length:', gmarkers.length)
                // console.log('status',status)

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

                                            var vehicle_type 
                                            // console.log('vehicleUid',vehicleUid.substr(0,2))

                                             
                                            if (vehicleUid.substr(0,2)=='JM'){
                                                vehicle_type = 'sedan'
                                            }
                        
                                            if (vehicleUid.substr(0,4)== 'MPAT'){
                                                vehicle_type = 'cabin'
                                            }
                        
                                            if (vehicleUid.substr(0,4)== 'MPAU'){
                                                vehicle_type = 'wagon'
                                            }
                        

                                            var cars_info = {
                                                no: i,
                                                sclId:sclId,
                                                licensePlate : licensePlate,
                                                vehicleUid : vehicleUid,
                                                deviceStatus : status,
                                                last_update:strDate,
                                                speed: speed,
                                                heading:heading,
                                                type_kendaraan: vehicle_type
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

                // console.log('gmarkers akhir length:', gmarkers.length)

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
  console.log('url',url)
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

    // console.log('requestOptions' + requestOptions)

    var total_odometer = '0 Km'
    $('#odometer').text(total_odometer)

    // get odometer awal
    var url1= '/vehicle/read/selected/vehicleuid/'+ vehicleUid
    // console.log('url1',url1)
    const result = fetch(url1,requestOptions)
    .then(response => response.json()) 
    .then(json => {
        console.log('json',json)
        init_odometer = json.rows[0].init_odometer
        // console.log('init odometer',init_odometer)

        // vehicle_detail
        var brand = json.rows[0].vehicle_brand
        console.log('brand',brand)
        var vehicle_type = json.rows[0].vehicle_type
        // console.log('vehicle type',vehicle_type)
        var vin = json.rows[0].vin
        // console.log('vin',vin)

        var license_plate = json.rows[0].license_plate

        if (license_plate !== undefined){
            // console.log('license_plate',license_plate)
        }else{
            var license_plate = '-'
            // console.log('license_plate',license_plate)
        }
        
        var deviceId = json.rows[0].deviceId
        if (deviceId !== undefined){
            // console.log('deviceId',deviceId)
        }else{
            var deviceId =''
            // console.log('deviceId',deviceId)
        }
                // alert(vehicleUid)


                var x_def = vehicleUid.substr(0,2)
                var x_def1 = vehicleUid.substr(0,4)
                console.log('x_def',x_def)
                console.log('x_def1',x_def1)

                if (x_def == 'MP'){

                    if (x_def1 == 'MPAT'){
                        $('#img_kendaraan').attr('src','/img/hilux.png')
                        $('#img_kendaraan').attr('width','120')
                        $('#img_kendaraan').attr('height','120')
                    }

                    if (x_def1 == 'MPAU'){
                        $('#img_kendaraan').attr('src','/img/honda.png')
                        $('#img_kendaraan').attr('width','120')
                        $('#img_kendaraan').attr('height','120')
                    }
                }else{
                    $('#img_kendaraan').attr('src','/img/Clean2.png')
                    $('#img_kendaraan').attr('width','120')
                    $('#img_kendaraan').attr('height','120')
                }

                // if (vehicleUid.substr(0,2)=='JM'){
                //     alert('JM')
                //     $('#img_kendaraan').attr('src','/img/Clean2.png')
                //     $('#img_kendaraan').attr('width','189')
                //     $('#img_kendaraan').attr('height','159')
                // }

                // if (vehicleUid.substr(0,4)== 'MPAT'){
                //     alert('MPAT')
                //     $('#img_kendaraan').attr('src','/img/hilux.png')
                //     $('#img_kendaraan').attr('width','200')
                //     $('#img_kendaraan').attr('height','200')
  
                // }

                // if (vehicleUid.substr(0,4)== 'MPAU'){
                //     alert('MPAU')
                //     $('#img_kendaraan').attr('src','/img/honda.png')
                //     $('#img_kendaraan').attr('width','200')
                //     $('#img_kendaraan').attr('height','200')
                // }
        
        // var mazda = brand.indexOf('Mazda')
        // // console.log('mazda',mazda)
        // if(mazda>=0){
        //     $('#img_kendaraan').attr('src','/img/Clean2.png')
        //     $('#img_kendaraan').attr('width','189')
        //     $('#img_kendaraan').attr('height','159')
        // }
        

        // var honda = brand.indexOf('Honda')
        // // console.log('honda',honda)

        // if(honda>=0){
        //     // console.log('here honda')
        //     $('#img_kendaraan').attr('src','/img/honda.png')
        //     $('#img_kendaraan').attr('width','200')
        //     $('#img_kendaraan').attr('height','200')

        // }

        // var toyota = brand.indexOf('Toyota')

        // if(toyota>=0){
        //     $('#img_kendaraan').attr('src','/img/hilux.png')
        //     $('#img_kendaraan').attr('width','200')
        //     $('#img_kendaraan').attr('height','200')
        // }


        $('#merk_kendaraan').text(brand)
        $('#tipe_kendaraan').text(vehicle_type)
        $('#vin').text(vin)
        $('#license_plate').text(license_plate)
        $('#deviceid').text(deviceId)

        


        var createdAt = json.rows[0].createdAt
        var start_date = createdAt.substr(0,10)
        // console.log('start date', start_date)       

        var token = sessionStorage.getItem("token")
        // console.log(token)
        var url2 = '/vehicle/read/odometer'
        // console.log('url2',url2)

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

        // console.log('km_driven',km_driven)



    
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
                var vehicle_engine = data[0].engineState 

                var operating_time = parseFloat(data[0].operatingTime[1].value).toFixed(0) + ' Jam';
                var fuel_level = data[0].fuelPercent[0].value + ' %'

                $('#vehicle_engine').text(vehicle_engine)

                if (vehicle_engine == "OFF"){
                    document.getElementById("vehicle_engine").style.color="white";
                    document.getElementById("vehicle_engine_shape").style.background="red";
                    // $('#vehicle_engine').attr('color','white')
                    // $('#vehicle_engine_shape').attr('background','red')
                }else{
                    document.getElementById("vehicle_engine").style.color="#28A138";
                    document.getElementById("vehicle_engine_shape").style.background="#C1F1C8";
                }

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

                    // get detail kendaraan


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
                        // console.log('result',result) 
                        // console.log('result',result.total)  
                        // console.log('distance',result.distance)
                        // console.log('KmDriven',result.totalKmDriven) 
    
    
                        if (result.total>0){
                            var km_driven = parseInt(result.totalKmDriven) + parseInt(init_odometer) + ' Km'
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

                var vehicle_type 
                console.log(vehicleUid.substr(0,2))

                if (vehicleUid.substr(0,2)=='JM'){
                    vehicle_type = 'sedan'
                }

                if (vehicleUid.substr(0,4)== 'MPAT'){
                    vehicle_type = 'cabin'
                }

                if (vehicleUid.substr(0,4)== 'MPAU'){
                    vehicle_type = 'wagon'
                }

                var cars_info = {
                    licensePlate : licensePlate,
                    vehicleUid : vehicleUid,
                    deviceStatus : deviceStatus,
                    speed: speed,
                    heading:heading,
                    updateTime:strDate,
                    updateJam: strTime,
                    type_kendaraan: vehicle_type   
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

    // console.log(JSON.stringify(postdata))

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
    //  console.log('data riwayat',data)
     data.sort(GetSortOrder("updateTime"))
     var j=1

     for (i=0; i<= data.length-1;i++){
        var dt = FormatedDate1(epoch_to_datetime(data[i].updateTime))
        data[i].tanggal = dt
        data[i].no = j
        data[i].speed = data[i].speed /10
        j++
     }

     var new_data = []
     var k=1

     for (i=0;i<= data.length-1;i++){
        if (data[i].speed>0){
            data[i].no = k
            new_data.push(data[i])
            k++
        }
     }

    $('#dg').datagrid({
        data: new_data
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


// play riwayat

function play(){
    // alert('play')
   
    paused_history = false
    stopped_history = false
    
    var data_length = data_riwayat.length

    



    if (data_length>0){
        // console.log('data_length:' + data_length)
        // draw polylines
        for (i=0;i<=data_length-1;i++){
            // console.log(data_riwayat[i])
            var location = {lat:data_riwayat[i].latitude,lng:data_riwayat[i].longitude}
            drivingPlanCoordinates.push(location)
        }
        
        if (is_play == false){
         var drivingPath = new google.maps.Polyline({
                path: drivingPlanCoordinates,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              });
            drivingPath.setMap(map);
            arr_drivingPath.push(drivingPath)
        
        }else{
            if(row_index_selected == data_length-1){

            }else{
                alert('already play')
            }
            
        }

        // alert(prev_row_index_selected)
        // console.log('row_index_selected:'+ row_index_selected)
        // console.log('data.length: ' + data_length)
        
    
        if (row_index_selected!= data_length-1){
            if (is_play == false){
                is_play = true
                select_history(data_riwayat,row_index_selected)
            }
           
        }else{
            is_play = false
            ReInitializeMap(map,gmarkers)
            arr_tout = []
            arr_drivingPath = []
            row_index_selected = 0

                for (i=0; i<= arr_drivingPath.length-1;i++){
                    arr_drivingPath[i].setMap(null)
                }
                arr_drivingPath=[]
            
                // drivingPlanCoordinates =[]

                var drivingPath = new google.maps.Polyline({
                    path: drivingPlanCoordinates,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                  });
                drivingPath.setMap(map);
                arr_drivingPath.push(drivingPath)

            select_history(data_riwayat,row_index_selected)
            is_play = true
            
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
    is_play = false
    for(i=0;i<=arr_tout.length-1;i++){
        clearTimeout(arr_tout[i])
    }
    
    arr_tout = []

    for (i=0; i<= arr_drivingPath.length-1;i++){
        arr_drivingPath[i].setMap(null)
    }
    arr_drivingPath=[]

    drivingPlanCoordinates =[]

    $('#dg').datagrid('unselectAll')
    $('#dg').datagrid('scrollTo',row_index_selected)
    $('#dg').datagrid('selectRow',row_index_selected)
    

}

function stop(){
    is_play = false
    for(i=0;i<=arr_tout.length-1;i++){
        clearTimeout(arr_tout[i])
    }
    arr_tout = []
    row_index_selected = 0
    // console.log('driving path: '+ arr_drivingPath.length)

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
    // console.log('read speed data:' + read_speed_data)
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
        // alert(selected_vehicleUid)
        // console.log('selectedVehicleUid',selected_vehicleUid)

        var x_def = selected_vehicleUid.substr(0,2)
        var x_def1 = selected_vehicleUid.substr(0,4)
        var vehicle_type
        // console.log('x_def',x_def)
        // console.log('x_def1',x_def1)

        if (x_def == 'MP'){

            if (x_def1 == 'MPAT'){
                vehicle_type = 'cabin'
            }

            if (x_def1 == 'MPAU'){
                vehicle_type = 'wagon'
            }
        }else{
            vehicle_type = 'sedan'
        }

        var cars_info = {
            no:row.no,
            licensePlate : '',
            vehicleUid : selected_vehicleUid,
            sclId:selected_sclId,
            deviceStatus : deviceStatus,
            type_kendaraan:vehicle_type,
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

            // console.log('draw polylines')
            // var loc_prev = { lat: prev_history_latitude, lng: prev_history_longitude }
            // drivingPlanCoordinates.push(loc_prev)
            // var loc_current = {lat: cars_info.latitude, lng: cars_info.longitude}
            // drivingPlanCoordinates.push(loc_current)
            

            // var drivingPath = new google.maps.Polyline({
            //     path: drivingPlanCoordinates,
            //     geodesic: true,
            //     strokeColor: "#FF0000",
            //     strokeOpacity: 1.0,
            //     strokeWeight: 2,
            //   });
              
            //   drivingPath.setMap(map);
            //   arr_drivingPath.push(drivingPath)

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

//  function title_row_change(e){
   
//     $(e).addClass("selected").siblings().removeClass("selected")

//  }


async function filter_vehicle_by_category(category){
//    var j =1
//    alert(category)

    console.log('category',category)

   for (i=0;i<=pnl_vehicles_data_length-1;i++){
        var pnl = $('#pnl'+i).attr('id')
        if(typeof pnl !== "undefined"){
            console.log('pnl',pnl) 
            var obj_v_type = $('#v_type' + i)
            console.log('v_type',obj_v_type.text())
            var car_category = obj_v_type.text()
            if (category!= 'All'){
                if(car_category.indexOf(category)>=0){
                    console.log('ada')
                    $('#pnl'+i).show()
                    gmarkers[i].setVisible(true)
                }else{
                    $('#pnl'+i).hide()
                    gmarkers[i].setVisible(false)
                }
            }else{
                $('#pnl'+i).show()
                gmarkers[i].setVisible(true)
            }
           
        }
   }
}