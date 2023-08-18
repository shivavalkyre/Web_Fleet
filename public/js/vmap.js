var arr_assets = [];
var page = 0;
var prev_token = ''
var total_page = 0;
var total_row = 0;
var limit = 10;
var counter = 0
var pnl = ''
var temp_arr = []
var arr_data1 = []
var map 

var markers = L.markerClusterGroup();

var markerIcon = L.icon({
    iconUrl: '/img/police_car.png',
    iconSize:     [38, 38], // size of the icon
})


$(document).ready(function(){

    var win = $.messager.progress({
            border: 'thin',
            msg:'<div style="margin-top:5px;margin-left:5px;"><img src="/img/loader.gif" style="height:50px;width:50px;"></div>',
            width:100,
            height:100
        });
    $.messager.progress('bar').hide();
    win.dialog('resize');
    win.window('window').addClass('bg1');

        var token = get_token(function(res){
        // console.log({'res':res})
        var token = res
        prev_token = token
        // console.log('token:' + token);

        var assets = get_assets(token,function(res){
            // console.log({'assets:': res})
            // console.log(res.assets.length)
            arr_assets = res.assets
            total_page = Math.ceil(res.assets.length/limit)
            total_row = res.assets.length - 1
            // console.log(total_page)
            
            // draw 1st page
            draw_list(0,total_page,limit,token,arr_assets)

        })
    })
    
    
})

    // get token

     function get_token(res){
        let dataset = {};

       return fetch('/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({a: '7@5m3r4h'})
        }).then(response => response.json()) //converts request from fetch to json
        .then(data => {

        dataset = data;
            // console.log(dataset)
            res(dataset);
        }).catch(error => console.warn(error));
    }

     // get assets

     function get_assets(arg,res){
        let dataset = {};
        var token = arg;

        // console.log('token:' + token)

        return fetch('/assets', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'token' : token
        },
        body: JSON.stringify({a: '7@5m3r4h'})
        }).then(response => response.json()) //converts request from fetch to json
        .then(data => {

            dataset = data;
            // console.log('dataset: ' + dataset);
            res(dataset);
        }).catch(error => console.warn(error));;
    }

   async function draw_list(page,total_page,limit,token,data){
       
        

        var start_row = 0
        // var pnl= '';
        

        temp_arr = []

        if (page==0){
            start_row = 0
        }else if (page==1){
            start_row = page * limit;
            limit = (page+1) * limit;
            
        }else{
            start_row = page * limit;
            limit = (page+1) * limit
            // limit = limit-1;
        }
        
        console.log('start row:'+ start_row)
        console.log('limit:'+ limit)
        if (limit<= total_row){
            limit = limit
        }else{
            limit = total_row+1
        }
        
        // console.log(token)
        var arr_data ={}
        var row_resp ={}
        arr_data1 =[]

        for (var i=start_row;i<=limit-1;i++)
        {
           
                    var id = data[i].name;
                    var uid = data[i].assetUid;
                    // console.log(i,id,uid)
                    //get latest location by device id

                    var res = await getData(token,uid,id,i).then(data => {
                        // console.log('i:'+i)
                        // console.log(data.data[0])
                        return data
                    });
                    // console.log(res.data[0])
                   arr_data1.push(res.data[0])
                    // arr_data[i] = res.data[0]

                    

        }

       
  


        // console.log('arr_data1.length',arr_data1.length)
        // console.log('arr_data1',arr_data1)
        pnl=''
        // layerGroup.clearLayers();
        markers.clearLayers();
        for (i=0;i<=arr_data1.length-1;i++){
            var data = arr_data1
            var ab = data[i].ab
            var SclId = data[i].vehicleSclId;
            var vehicle_name = data[i].vehicleName;
            var vehicle_speed = data[i].vehicleSpeed[0].value
            var latitude = data[i].validLatitude
            var longitude = data[i].validLongitude
            var engine_hour = Math.ceil(data[i].operatingTime[1].value)
            var device_status = data[i].deviceStatus
            var heading = data[i].heading
            var url_img = ''

            if(device_status=='moving'){
                url_img = '/img/running.png'
            } else if (device_status == 'stopped'){
                url_img = '/img/stop.png'
            } else if ( device_status == 'pending'){
                url_img = '/img/idle.png'
            } else if (device_status=='offline') {
                url_img = '/img/offline.png'
            }else{
                url_img = '/img/unknown_location.png'
            }
            // console.log(SclId,vehicle_name)

            //reverse to address
            var location = { 
                latitude:latitude,
                longitude:longitude
            }
            // var address = await  getAddress(location).then(data => {
            //         return data
            // })

            // console.log('address',address)
            // draw marker on map

            if (latitude && longitude){
            //    markers = L.marker([latitude, longitude]).addTo(map)
            //    markers[i] =  L.marker([latitude,longitude]).addTo(markerGroup)
            //     .bindPopup('<b>'+vehicle_name +'</b>')
            //    .openPopup();

            var customPopup = '<b>' +vehicle_name + '</b>'+"<br/><img src='/img/mazda6.png' alt='maptime logo gif' width='50px'/>";
    
            // specify popup options 
            var customOptions =
                {
                'maxWidth': '200',
                'className' : 'custom'
                }
               
                var marker = L.marker([latitude, longitude], {
                    rotationAngle: heading,icon: markerIcon
                  }).bindPopup(customPopup,customOptions).openPopup();
                // layerGroup.addLayer(marker);
                markers.addLayer(marker)
            }
           
            map.addLayer(markers);

            // pnl += `<div id="`+ SclId +`" name="pnl" class="easyui-panel" style="margin-bottom:10px;width:100%;max-width:400px;height: auto;padding: 10px 10px;background-color: white;border-color: lightgrey;border: 1px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)">
            //                     <div id="name_`+ ab +`" style="font-weight: bold;width: 100%;border:0px solid red;width:80%">`+ vehicle_name +`</div>
            //                     <div id="image_`+ ab +`"  style="margin-top:-20px;margin-left: 90%;width:30px;height:30px;border:0px solid red; text-align:center"><img id="img_`+ ab +`" src="`+ url_img +`" width="20" height="20"/></div>
            //                     <div id="odometer_`+ ab +`" style="border:0px solid red;width:200px;font-size:12px;">Odometer Reading : 18000 KM</div>
            //                     <div id="enginehour_`+ ab +`" style="border:0px solid red;width:200px;font-size:12px;">Total Engine Hour :`+ engine_hour +`</div>
            //                     <div id="speed_`+ ab +`" style="border:0px solid red;width:200px;font-size:12px;">Speed :` + vehicle_speed + ` km/hr</div>
            //                     <div style="font-size: 18px;"><i class="fa fa-map-marker"></i></div>
            //                     <div id="address_`+ ab  +`" style="font-size: 12px;margin-left: 15px;margin-top: -25px;margin-bottom: 10px;border:0px solid red;">`+ address +`</div>
            //                     <div id="job_`+ ab +`" style="margin-left: -5px;font-size: 12px;margin-bottom: 10px;width:200px;border:0px solid red;"><img src="/img/on_job.png" width="20" height="20"/>  On Job</div>
            //                     <button name="submit" id ="history_`+ ab + `" class="w3-button w3-red-police" style="width:25%;font-size:10px;">History</button>
            //                     <button name="submit" id ="detail_`+ ab +`" class="w3-button w3-green" style="width:25%;font-size:10px;">Detail</button>
            //                     </div>`
            
            pnl += `<div id="`+ SclId +`" name="pnl" class="easyui-panel" style="margin-bottom:10px;width:100%;max-width:400px;height: auto;padding: 10px 10px;background-color: white;border-color: lightgrey;border: 1px solid lightgrey;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)">
                                <div id="name_`+ ab +`" style="font-weight: bold;width: 100%;border:0px solid red;width:80%">`+ vehicle_name +`</div>
                                <div id="image_`+ ab +`"  style="margin-top:-20px;margin-left: 90%;width:30px;height:30px;border:0px solid red; text-align:center"><img id="img_`+ ab +`" src="`+ url_img +`" width="20" height="20"/></div>
                                <div class="easyui-panel" style="padding:5px;">
                                    <a href="#" class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true"><i class="fa fa-eye" aria-hidden="true"></i></a>
                                    <a href="#" class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true"><i class="fas fa-route" aria-hidden="true"></i></a>
                                    <a href="#" class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true"><i class="fa fa-tasks" aria-hidden="true"></i></a>
                                </div>
                               
                                </div>`
        }

       
        var current_page = page + 1
       

        pnl+= `<div id="floatingNav">  
        <div id="container_nav">
            <div><i class="fa fa-angle-left" style="cursor: pointer;" onClick="prev_page()"></i></div>
            <div><small>` + current_page + ' of ' + total_page + `</small></div>
            <div> <i class="fa fa-angle-right" style="cursor: pointer;" onClick="next_page()"></i></div>
         </div>
        </div>`

        $('#live_data').html(pnl);
        $.messager.progress('close');
    }

   

    async function getData(token,uid,id,i){
        // console.log('i:'+ i)
        const response = await fetch('/live_data', {
            method: 'POST',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'token' : token
            },
            body: JSON.stringify({a: '7@5m3r4h',b:uid,c:id,d:i})
        })
    
        const data = await response.json();
        // arr_data1.push(data)
        return data;
   
    }


    async function getAddress(location) {

        // console.log(data)
        var latitude = location.latitude
        var longitude = location.longitude
      

        var api = "https://nominatim.openstreetmap.org/reverse?format=json&lat="+ latitude +"&lon="+ longitude +"&zoom=18&addressdetails=1"
        
        try{
            const response = await fetch(api,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    }
                });

            const adds = await response.json();
            // adds.i= data.i
            var address= adds.display_name;
            
            return address
            // list_data(data)
            // console.log(i)
            
           }catch(err){
             console.error(err); 
             data.address = 'Undifined'
             list_data(data)
             
           }
       
        // console.log(address)
    }

  
   
   function prev_page(){
        // console.log('prev_page: '+ page)
       
        // console.log(page)
        // console.log("prev_token: "+prev_token)
       
            if (page>0){
                page = page - 1
                var win = $.messager.progress({
                    border: 'thin',
                    msg:'<div style="margin-top:5px;margin-left:5px;"><img src="/img/loader.gif" style="height:50px;width:50px;"></div>',
                    width:100,
                    height:100
                });
            $.messager.progress('bar').hide();
            win.dialog('resize');
            win.window('window').addClass('bg1');
               
                draw_list(page,total_page,limit,prev_token,arr_assets)
            }
           
       
   }

   function next_page(){
        console.log('prev_page: '+ page)
       
        if (page < total_page-1){
            page = page + 1
            console.log('page: '+ page)
        }
       
        // console.log("prev_token: "+prev_token)
        // console.log(total_page,limit,arr_assets)
        // console.log('total_page: '+ (total_page-1))

            

            if (page<=total_page-1){
                var win = $.messager.progress({
                    border: 'thin',
                    msg:'<div style="margin-top:5px;margin-left:5px;"><img src="/img/loader.gif" style="height:50px;width:50px;"></div>',
                    width:100,
                    height:100
                });
            $.messager.progress('bar').hide();
            win.dialog('resize');
            win.window('window').addClass('bg1');
             
            draw_list(page,total_page,limit,prev_token,arr_assets)
            }else{
                page = total_page-1
            }

       
        
   }

        $(document.body).click(function(evt){
            var clicked = evt.target;
            var currentID = clicked.id || "No ID!";
            // $(clicked).html(currentID);
            var x = document.getElementById(currentID).parentElement.id;
            // alert(currentID)
            
            if (x!== 'live_data'){
                if(x.length>10){
                    // alert(x)
                    console.log(x)
                    // console.log($(x).css("background-color"))
                }else{
                    // alert('lain')
                    // x= document.getElementById(x).parentElement.id
                    // alert(x)
                }
                
            }else{
                // alert(currentID)
                // console.log(x)
            }
        })



    map = L.map('map').setView([-6.200000, 106.816666], 10);
    // var markerGroup = L.layerGroup().addTo(map);
    var layerGroup = L.layerGroup().addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    function multiSort(array, sortObject = {}) {
        const sortKeys = Object.keys(sortObject);

        // Return array if no sort object is supplied.
        if (!sortKeys.length) {
            return array;
        }

        // Change the values of the sortObject keys to -1, 0, or 1.
        for (let key in sortObject) {
            sortObject[key] = sortObject[key] === 'desc' || sortObject[key] === -1 ? -1 : (sortObject[key] === 'skip' || sortObject[key] === 0 ? 0 : 1);
        }

        const keySort = (a, b, direction) => {
            direction = direction !== null ? direction : 1;

            if (a === b) { // If the values are the same, do not switch positions.
                return 0;
            }

            // If b > a, multiply by -1 to get the reverse direction.
            return a > b ? direction : -1 * direction;
        };

        return array.sort((a, b) => {
            let sorted = 0;
            let index = 0;

            // Loop until sorted (-1 or 1) or until the sort keys have been processed.
            while (sorted === 0 && index < sortKeys.length) {
                const key = sortKeys[index];

                if (key) {
                    const direction = sortObject[key];

                    sorted = keySort(a[key], b[key], direction);
                    index++;
                }
            }

            return sorted;
        });
    }