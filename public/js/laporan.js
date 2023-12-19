var detail_rows = []
var vehicle_rows= []

$(function(){

    loadDataDetail()

    $('#cari').bind('click', function(){
        filter_detail_rows()
    });

    $('#export').bind('click', function(){
        $('#dgDetail').datagrid('toExcel','detail.xls');
    });

    $('#cari1').bind('click', function(){
        $('#div_distance').show()
        find_data_distance()
        
    });

    $('#export1').bind('click', function(){
        var hidden = $('#div_distance').is(':hidden')
        // alert(hidden)
        if (hidden == false){
            $('#dgDistance').datagrid('toExcel','distance.xls');
        }else{
            $('#dgDistanceDetail').datagrid('toExcel','distance_detail.xls');
        }
        
    });

    $('#cari2').bind('click', function(){
        // find_data_vehicle_usage()
        alert_agregat()
    });

    $('#export2').bind('click', function(){
        $('#dgAlert').datagrid('toExcel','alert.xls');
    });

    $('#cari3').bind('click', function(){
        // find_data_vehicle_usage()
        find_data_geofence()
    });

    $('#export3').bind('click', function(){
        var hidden = $('#div_geofence').is(':hidden')
        if (hidden==false){
            $('#dgGeofence').datagrid('toExcel','geofence.xls');
        }else{
            $('#dgGeofenceDetail').datagrid('toExcel','geofence_detail.xls');
        }
       
    });

    $('#kembali1').bind('click',function(){
        $('#div_distance').show()
        $('#distance_detail').hide()
        $('#kembali1').hide()
    })

    $('#kembali2').bind('click',function(){
        $('#div_geofence').show()
        $('#div_geofence_detail').hide()
        $('#kembali2').hide()
    })

    $('#distance_detail').hide()
    $('#kembali1').hide()
    $('#kembali2').hide()

    $('#div_geofence_detail').hide()



    // setInterval(loadDataDetail(),1000)
})



async function loadDataDetail(){


    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    var url =  '/laporan/detail'
    await fetch(url,requestOptions)
        .then(response => response.json()) 
        .then(json => {
            console.log('data detail',json)
            var raw_data = json
            var data = raw_data.data
            console.log(raw_data.message)
            var resp = raw_data.message

            if (resp=="success"){
                console.log('data.length',data.length)
                
                var total = 0 
                for (i=0;i<=data.length-1;i++){
                    var updateTime = FormatedDate1(epoch_to_datetime(data[i].updateTime))
                    var updateDate = FormatedDate2(epoch_to_datetime(data[i].updateTime))
                    var batteryVoltage = parseInt(parseInt(data[i].batteryVoltage[1].value)/1000) + ' ' + data[i].batteryVoltage[1].unit;
                    var vehicleName = data[i].vehicleName;
                    var vehicleUid = data[i].vehicleUid;
                    var vehicleSclId = data[i].vehicleSclId;
                    var heading = data[i].heading;
                    var location = data[i].validLatitude + ',' +  data[i].validLongitude;
                    var speed = data[i].vehicleSpeed[0].value + ' ' + data[i].vehicleSpeed[0].unit;
                    // console.log(updateTime,batteryVoltage,vehicleName,vehicleUid,heading,location)
                    
                    // if(data[i].validLatitude!='null' && data[i].validLongitude!='null'){
                    //     var location={
                    //         lat: data[i].validLatitude,
                    //         lng: data[i].validLongitude
                    //     }
                        
                    //     var address = getAddress1(location)
                    //     console.log('address',address)
                    // }
                    
                    detail_rows.push({"updateTime":updateTime,"tgl":updateDate,"vehicleName":vehicleName,"vehicleUid":vehicleUid,"vehicleSclId":vehicleSclId,"batteryVoltage":batteryVoltage,"location":location,"speed":speed})
                    vehicle_rows.push({"vehicleSclId":vehicleSclId,"vehicleUid":vehicleUid,"vehicleName":vehicleName})
                    total++
                }
            }

            console.log('total',total)
            console.log('rows',detail_rows)
            var dg_data = {"total" : total,"rows" : detail_rows}
            
            vehicle_rows.sort(function(a, b) {
                return compareStrings(a.vehicleUid, b.vehicleUid);
              })

            var cbg_data = {"total": vehicle_rows.length,"rows":vehicle_rows}
            console.log('cbg_data: ',cbg_data)


            var g = $('#vehicle1').combogrid('grid');	// get datagrid object
            g.datagrid('loadData',cbg_data);	// get the selected row

            $('#dgDetail').datagrid('loadData',dg_data)
            $('#dgAsset').datagrid('loadData',dg_data)
            
        }).catch (function (error) {
            console.log('Request failed', error);
        });
}

async function filter_detail_rows(){

    
  let startDate = $('#dari').datebox('getValue')
  let endDate = $('#sampai').datebox('getValue')
  let result = detail_rows.filter(data => {
    return (
      // Convert all date values to javascript dates using new Date(value)
      // Get the number of milliseconds using getTime()
      // Compare the milliseconds values
      new Date(data.tgl).getTime() >= new Date(startDate).getTime() &&
      new Date(data.tgl).getTime() <= new Date(endDate).getTime()
    )
  })
  console.log(result)
  var dg_data = {"total" : result.length,"rows" : result}
  $('#dgDetail').datagrid('loadData',dg_data)
}



async function find_data_distance(){
    // var AssetUid = $('#vehicle1').combogrid('getValue')
    var g = $('#vehicle1').combogrid('grid');	// get datagrid object
    var r = g.datagrid('getSelected');	// get the selected row
    var vehicleUid = r.vehicleUid
    var AssetUid = r.vehicleSclId
    
    console.log('vehicleUid',r.vehicleUid)
    console.log('AssetUid',AssetUid)

    var start_date = $('#dari1').datebox('getValue')
    var end_date = $('#sampai1').datebox('getValue')



    getKMDriven(AssetUid,vehicleUid,start_date,end_date)
}

async function alert_agregat(){

    var start_date = $('#dari2').datebox('getValue')
    var end_date = $('#sampai2').datebox('getValue')
    var token = sessionStorage.getItem("token")

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };  

    var url1= '/vehicle/read/alerts/agregat/'+start_date +'/'+end_date

    const result = await fetch(url1,requestOptions)
    .then(function (response)
    
        {
            return response.json()
        })

        console.log(result)
        if (result){
            var datas = result
            var rows = []
            for (i=0;i<=datas.data.length-1;i++){
                rows.push({"severity":datas.data[i].severity,"count":datas.data[i].count})
                console.log(rows)
            }
            var dg_data = {"total" : datas.data.length,"rows" : rows}
            $('#dgAlert').datagrid('loadData',dg_data)
        }

}

async function find_data_vehicle_usage(){

    var start_date = $('#dari2').datebox('getValue')
    var end_date = $('#sampai2').datebox('getValue')
    var token = sessionStorage.getItem("token")


    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };  

    var url1= '/vehicle/read/usage/'+start_date +'/'+end_date

    const result = await fetch(url1,requestOptions)
    .then(function (response)
    
        {
            return response.json()
        })

        console.log(result)
        if (result){
            var datas = result
            var rows = []
            for (i=0;i<=datas.data.length-1;i++){
                rows.push({"year":datas.data[i].year,"month":datas.data[i].month,"date":datas.data[i].date,"accountId":datas.data[i].accountId,"eventTime":datas.data[i].eventTime,"totalTimeVehicleMovingSec":datas.data[i].totalTimeVehicleMovingSec,"vehicleMovingPercentage":parseInt(datas.data[i].vehicleMovingPercentage) + " %","totalTimeVehicleUsedSec":datas.data[i].totalTimeVehicleUsedSec,"totalTimeVehicleIdleSec":datas.data[i].totalTimeVehicleIdleSec,"vehicleIdlePercentage":parseInt(datas.data[i].vehicleIdlePercentage) +' %',"vehicleUtilizationPercentage":parseInt(datas.data[i].vehicleUtilizationPercentage) + ' %',"vehicleRemainingUtilizationPercentage":parseInt(datas.data[i].vehicleRemainingUtilizationPercentage) + ' %',"totalKm":parseInt(datas.data[i].totalKm),"totalKmDriven":parseInt(datas.data[i].totalKmDriven),"criticalCount":datas.data[i].criticalCount,"warningCount":datas.data[i].warningCount,"infoCount":datas.data[i].infoCount,"countDailyReports":datas.data[i].countDailyReports,"countSegments":datas.data[i].countSegments,"totalCount":datas.data[i].totalCount})
                console.log(rows)
            }
            
            var dg_data = {"total" : 7,"rows" : rows}
            $('#dgUtilisation').datagrid('loadData',dg_data)
        }

}


async function find_data_geofence(){
 

    var startDate = $('#dari3').datebox('getValue')
    var endDate = $('#sampai3').datebox('getValue')

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };  

    var url1= '/geofence/history/'+startDate +'/'+endDate

    const result = await fetch(url1,requestOptions)
    .then(function (response)
    
        {
            return response.json()
        })

        console.log(result)
        if (result){
            var datas = result
            var rows = []
            for (i=0;i<=datas.length-1;i++){
                // rows.push({"year":datas[i].year,"month":datas.data[i].month,"date":datas.data[i].date,"accountId":datas.data[i].accountId,"eventTime":datas.data[i].eventTime,"totalTimeVehicleMovingSec":datas.data[i].totalTimeVehicleMovingSec,"vehicleMovingPercentage":parseInt(datas.data[i].vehicleMovingPercentage) + " %","totalTimeVehicleUsedSec":datas.data[i].totalTimeVehicleUsedSec,"totalTimeVehicleIdleSec":datas.data[i].totalTimeVehicleIdleSec,"vehicleIdlePercentage":parseInt(datas.data[i].vehicleIdlePercentage) +' %',"vehicleUtilizationPercentage":parseInt(datas.data[i].vehicleUtilizationPercentage) + ' %',"vehicleRemainingUtilizationPercentage":parseInt(datas.data[i].vehicleRemainingUtilizationPercentage) + ' %',"totalKm":parseInt(datas.data[i].totalKm),"totalKmDriven":parseInt(datas.data[i].totalKmDriven),"criticalCount":datas.data[i].criticalCount,"warningCount":datas.data[i].warningCount,"infoCount":datas.data[i].infoCount,"countDailyReports":datas.data[i].countDailyReports,"countSegments":datas.data[i].countSegments,"totalCount":datas.data[i].totalCount})
                // console.log(rows)
                rows.push({"geofenceScldId":datas[i].geofenceScldId,"geofenceId":datas[i].geofenceId,"geofenceAddress":datas[i].geofenceAddress,"occurrences":datas[i].occurrences,"avgWaitTime":datas[i].avgWaitTime,"vehicles":datas[i].vehicles})
            }
            
            console.log('rows',rows)

            var dg_data = {"total" : rows.length,"rows" : rows}
            $('#dgGeofence').datagrid('loadData',dg_data)
        }
}



async function getKMDriven(AssetUid,vehicleUid,start_date,end_date) {
    console.log('start_date',start_date,'end_date',end_date)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };

    console.log('requestOptions', requestOptions)

    var total_odometer = '0 Km'
    var url1= '/vehicle/read/selected/vehicleuid/'+ vehicleUid

    const result = await fetch(url1,requestOptions)
    .then(function (response)
    
        {
            return response.json()
        })

       console.log(result)
       if (result){
        if (result.rows.length>0){
            init_odometer = result.rows[0].init_odometer
            var brand =  result.rows[0].vehicle_brand
            var vehicle_type =  result.rows[0].vehicle_type
            var vin =  result.rows[0].vin
            var license_plate =  result.rows[0].license_plate
            var deviceId =  result.rows[0].deviceId
    
            var token = sessionStorage.getItem("token")
    
            var url2 = '/vehicle/read/km_driven'
            const requestOptions1 = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    token: token
                },
                body: JSON.stringify({"startDate": start_date, "endDate": end_date,"assetUid":AssetUid})
            };
    
            console.log(requestOptions1)
    
    
    
            const result1 = await fetch(url2,requestOptions1)
            .then(function (response){
                return response.json()
            })
    
            console.log('result1.status',result1.status)
    
            if (result1.status==true){
                var rows = []
                console.log('result1.data.length',result1.data.length)
                console.log('result1.data',result1.data)
    
                var datas = result1.data

    
                for(i=0;i<=datas.length-1;i++){
                    var period  = datas[i].period
                    console.log('period',period)
                    for (j=0;j<=datas[i].trips.length-1;j++){
                        var assetId = datas[i].trips[j].assetId
                        var num_of_trip = datas[i].trips[j].segments
                        var timespan = msToHMS(datas[i].trips[j].totalTimeVehicleUsedMSec)
                        var start_latlng =  datas[i].trips[j].startLat + ',' + datas[i].trips[j].startLong
                        var end_latlng =  datas[i].trips[j].endLat +',' +  datas[i].trips[j].endLong
                        var totalKmDriven = datas[i].trips[j].totalKmDriven
                        var fuelConsumedL = parseInt(datas[i].trips[j].fuelConsumedL)/1000
                        var idle_percent = parseInt(datas[i].trips[j].idlePercent)
                        var moving_percent =  parseInt(datas[i].trips[j].movingPercent)
                        var stoppedPercent = parseInt(datas[i].trips[j].stoppedPercent)
    
                        rows.push({"period": period,"assetId": assetId,"vehicle_type":vehicle_type,"num_of_trip":num_of_trip,"trip_duration": timespan,"start_latlng":start_latlng,"end_latlng":end_latlng,"totalKmDriven":totalKmDriven,"fuelConsumedL":fuelConsumedL,"idlePercent":idle_percent,"movingPercent":moving_percent,"stoppedPercent":stoppedPercent})
                    }
                }
    
                console.log('rows',rows)
    
                $('#dgDistance').datagrid({
                    data :rows,
                  
                })
            }
        }
        

       }

}

// getAddress

async function getAddress1(location)  {

    var lat = location.lat
    var lng = location.lng
    console.log(lat,lng)
    var token = sessionStorage.getItem("token")
    // console.log(token)

    const config = {
        headers:{
          'token': token
        },
        timeout: 20000
      };


      
  var url = "http://147.139.144.120:3002/api/patern/asset_address/"+lat +"/" + lng
//   var url = "http://localhost:3002/api/patern/asset_address/"+lat +"/" + lng
    // console.log(url)
//   var resp =  await axios.get(url,config)
//     .then((response) => { 
//         // var status = response.data.status
//         // var data = response.data.data
//         // if (status == true){
//         //     return data
//         // }
//         // // console.log(response)
//         // // $('#location'+ no).text(address)
        

//     }).catch((error) => {
//     // $.messager.alert('Error','Error Loading Data Timeout','info');
//         console.error(error)
//     // AssetStatusCount()
// });
    var resp =  await axios.get(url,config)
    .then((response) => {
        var status = response.data.status
        var data = response.data.data
        if (status == true){
            return data
        }else{
            return data 
        }
    })
    .catch((error) => {
        console.error(error)
    });

    return await resp

}





// epoch ======================================================================================

function datetime_to_epoch (date) {
    return Date.parse(date)
}

function epoch_to_datetime(epoch){
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(epoch);
    return d
}


function FormatedDate(d){
    var  tahun = d.getFullYear()
    var bulan = d.getMonth()+1
    var tanggal = d.getDate()
    var jam = d.getHours()
    var menit = d.getMinutes()
    var detik = d.getSeconds()

    if (jam< 10){
        jam = "0" + jam 
    }
    if (menit<10){
        menit = "0" + menit 
    }
    if(detik<10){
        detik = "0" + detik
    }

    var bln_text = ''

    if (bulan == 1){
        bln_text = 'Januari'
    }else if (bulan == 2) {
        bln_text = 'Februari'
    }else if(bulan == 3) {
        bln_text = 'Maret'
    }else if (bulan == 4) {
        bln_text = 'April'
    }else if(bulan == 5) {
        bln_text ='Mei'
    }else if (bulan == 6){
        bln_text = 'Juni'
    }else if( bulan == 7) {
        bln_text = 'Juli'
    }else if (bulan ==8){
        bln_text = 'Agustus'
    } else if (bulan ==9){
        bln_text = 'September'
    }else if (bulan == 10){
        bln_text = 'Oktober'
    }else if ( bulan == 11) {
        bln_text ='November'
    }else{
        bln_text = 'Desember'
    }

    var tgl_baru = tanggal + ' ' + bln_text + ' ' + tahun + ' ' + jam + ':' + menit + ':' + detik + ' WIB'
    return tgl_baru
}


function FormatedDate1(d){

    var  tahun = d.getFullYear()
    var bulan = d.getMonth()+1
    var tanggal = d.getDate()
    var jam = d.getHours()
    var menit = d.getMinutes()
    var detik = d.getSeconds()

    if (jam< 10){
        jam = "0" + jam 
    }
    if (menit<10){
        menit = "0" + menit 
    }
    if(detik<10){
        detik = "0" + detik
    }

    // var bln_text = ''

    // if (bulan == 1){
    //     bln_text = 'Januari'
    // }else if (bulan == 2) {
    //     bln_text = 'Februari'
    // }else if(bulan == 3) {
    //     bln_text = 'Maret'
    // }else if (bulan == 4) {
    //     bln_text = 'April'
    // }else if(bulan == 5) {
    //     bln_text ='Mei'
    // }else if (bulan == 6){
    //     bln_text = 'Juni'
    // }else if( bulan == 7) {
    //     bln_text = 'Juli'
    // }else if (bulan ==8){
    //     bln_text = 'Agustus'
    // } else if (bulan ==9){
    //     bln_text = 'September'
    // }else if (bulan == 10){
    //     bln_text = 'Oktober'
    // }else if ( bulan == 11) {
    //     bln_text ='November'
    // }else{
    //     bln_text = 'Desember'
    // }

    var tgl_baru = tanggal + '-' + bulan + '-' + tahun + ' ' + jam + ':' + menit + ':' + detik
    return tgl_baru
}



function FormatedDate2(d){

    var  tahun = d.getFullYear()
    var bulan = d.getMonth()+1
    var tanggal = d.getDate()
    var jam = d.getHours()
    var menit = d.getMinutes()
    var detik = d.getSeconds()

    if (jam< 10){
        jam = "0" + jam 
    }
    if (menit<10){
        menit = "0" + menit 
    }
    if(detik<10){
        detik = "0" + detik
    }

    // var bln_text = ''

    // if (bulan == 1){
    //     bln_text = 'Januari'
    // }else if (bulan == 2) {
    //     bln_text = 'Februari'
    // }else if(bulan == 3) {
    //     bln_text = 'Maret'
    // }else if (bulan == 4) {
    //     bln_text = 'April'
    // }else if(bulan == 5) {
    //     bln_text ='Mei'
    // }else if (bulan == 6){
    //     bln_text = 'Juni'
    // }else if( bulan == 7) {
    //     bln_text = 'Juli'
    // }else if (bulan ==8){
    //     bln_text = 'Agustus'
    // } else if (bulan ==9){
    //     bln_text = 'September'
    // }else if (bulan == 10){
    //     bln_text = 'Oktober'
    // }else if ( bulan == 11) {
    //     bln_text ='November'
    // }else{
    //     bln_text = 'Desember'
    // }

    var tgl_baru = tahun + '-' + bulan + '-' + tanggal
    return tgl_baru
}

function formatepoch(val,row){
    var epoch_dt = String(epoch_to_datetime(val))
    var GMT_pos = epoch_dt.indexOf('GMT+')
    var dt = epoch_dt.substr(0,GMT_pos)
    console.log('dt',dt)
    return dt
}



function formathms(val,row){
   return msToHMS(val) 
}

function myformatter(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function myparser(s){
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d);
    } else {
        return new Date();
    }
}

// compare

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

  function msToHMS( ms ) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
//    return  hours+":"+minutes+":"+seconds;
return  hours+" jam "+minutes+" menit "+seconds+ " detik";
}
