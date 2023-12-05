var username = sessionStorage.getItem("username")
var level = sessionStorage.getItem("level")
var selected_phone = ''
$('#username').text(username)
$('#level').text(level)

Laporan()
 
function Dashboard(){
  window.location ="dashboard"
}

function Monitor(){
    //alert('dashboard')
     
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });
    window.location='monitor';
    
    
}

function Device(){
    //alert('dashboard')
     
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });
    window.location='device';
    
    
}

function Petugas(){
    window.location='petugas';
}

function Tasklist(){


    window.location='tasklist';
}

function Vehicle(){
    window.location ='vehicle'
}

function Chat(){
    
   window.location ='chat'
}

function Notifikasi(){
    // $('#dashboard').linkbutton({
    //     iconCls: 'icon-dashboard-black',
    //     selected:false
    // });

    // $('#monitor').linkbutton({
    //     iconCls: 'icon-monitor-black',
    //     selected:false
    // });
    // $('#tasklist').linkbutton({
    //     iconCls: 'icon-tasklist-black',
    //     selected:false
    // });

    // $('#alert').linkbutton({
    //     iconCls: 'icon-bell',
    //     selected:true
    // });
    
    // $('#report').linkbutton({
    //     iconCls: 'icon-document-black',
    //     selected:false
    // });

    // $('#setting').linkbutton({
    //     iconCls: 'icon-setting-black',
    //     selected:false
    // });
    window.location='notifikasi'
}


function Laporan(){
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });

    $('#monitor').linkbutton({
        iconCls: 'icon-monitor-black',
        selected:false
    });
    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist-black',
        selected:false
    });

    $('#alert').linkbutton({
        iconCls: 'icon-bell-black',
        selected:false
    });
    
    $('#report').linkbutton({
        iconCls: 'icon-document',
        selected:true
    });

    $('#setting').linkbutton({
        iconCls: 'icon-setting-black',
        selected:false
    });
}

function Setting(){
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });

    $('#monitor').linkbutton({
        iconCls: 'icon-monitor-black',
        selected:false
    });
    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist-black',
        selected:false
    });

    $('#alert').linkbutton({
        iconCls: 'icon-bell-black',
        selected:false
    });

    
    $('#report').linkbutton({
        iconCls: 'icon-document-black',
        selected:false
    });

    $('#setting').linkbutton({
        iconCls: 'icon-setting1',
        selected:true
    });
}

function logout(){
    sessionStorage.clear();
    window.history.forward();
    window.location ='/'
}

function formatAction(){
   
    // console.log (value)

        var style = `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-left:20px;"><a href="#" onclick="view_distance_detail()"><img src="/img/view.png" width=28 height=28 /></div>`

     
    
    return style
}

function formatAction1(){
   
    // console.log (value)

        var style = `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-left:50px;"><a href="#" onclick="view_geofence_detail()"><img src="/img/view.png" width=28 height=28 /></div>`

     
    
    return style
}


async function view_distance_detail(){
    $('#div_distance').hide()
    $('#distance_detail').show()
    $('#kembali1').show()

    var start_date = $('#dari1').datebox('getValue')
    var end_date = $('#sampai1').datebox('getValue')
    var vehicleuid = $('#vehicle1').combogrid('getValue')
    // var token = sessionStorage.getItem("token")

    var url ="/vehicle/read/segments/" + start_date +"/" + end_date +"/" + vehicleuid
    // alert (url)

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };  

    const result = await fetch(url,requestOptions)
    .then(function (response)
    
        {
            return response.json()
        })

        console.log(result)
        var resp = result.message
        var data = result.data

            if (resp=="success"){
                console.log('data.length',data.length)
                var rows = []
                for (i=0;i<= data.length-1;i++){
                    var totalVehicleMovingSec = data[i].totalTimeVehicleMovingSec
                    var totalTimeVehicleIdleSec= data[i].totalTimeVehicleIdleSec
                    var totalKm = data[i].totalKm
                    var firstTime = data[i].firstTime
                    var lastTime = data[i].lastTime
                    var startLat = data[i].startLat
                    var startLong = data[i].startLong
                    var endLat = data[i].endLat
                    var endLong = data[i].endLong
                    var fuelEfficiencyKPL = data[i].fuelEfficiencyKPL
                    var fuelConsumedL = data[i].fuelConsumedL
                    var totalTimeSegmentSec = data[i].totalTimeSegmentSec
                    var idlePercent = data[i].idlePercent
                    var runningPercent = data[i].runningPercent
                    var nightTimeDrive = data[i].nightTimeDrive
                    rows.push({"totalVehicleMovingSec":totalVehicleMovingSec,"totalTimeVehicleIdleSec":totalTimeVehicleIdleSec,"totalKm":parseInt(totalKm),"firstTime":firstTime,"lastTime":lastTime,"startLat":startLat,"startLong":startLong,"endLat":endLat,"endLong":endLong,"fuelEfficiencyKPL":fuelEfficiencyKPL,"fuelConsumedL":fuelConsumedL,"totalTimeSegmentSec": totalTimeSegmentSec,"idlePercent":idlePercent,"runningPercent":runningPercent,"nightTimeDrive":nightTimeDrive})
                }
                console.log("rows",rows)
                $('#dgDistanceDetail').datagrid('loadData',rows)
            }

}


async function view_geofence_detail(){
    $('#div_geofence').hide()
    $('#div_geofence_detail').show()
    $('#kembali2').show()

    var start_date = $('#dari3').datebox('getValue')
    var end_date = $('#sampai3').datebox('getValue')
    var row = $('#dgGeofence').datagrid('getSelected')
    var sclId = row.geofenceScldId
    // var token = sessionStorage.getItem("token")
    var url ="/geofence/history/detail/" + start_date +"/" + end_date +"/" + sclId
    // alert (url)

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }
    };  

    const result = await fetch(url,requestOptions)
    .then(function (response)
    
        {
            return response.json()
        })

        console.log(result)
     
        var data = result


                var rows = []
                for (i=0;i<= data.length-1;i++){
                    var startTime  = data[i].startTime
                    var geofenceId = data[i].geofenceId
                    var vehicleSclId = data[i].vehicleSclId
                    var vehicleUid = data[i].vehicleUid
                    var duration = data[i].duration

                   
                    rows.push({"startTime":startTime,"geofenceId": geofenceId,"vehicleSclId": vehicleSclId,"vehicleUid":vehicleUid,"duration":duration})
                }
                console.log("rows",rows)
                $('#dgGeofenceDetail').datagrid('loadData',rows)
           
}