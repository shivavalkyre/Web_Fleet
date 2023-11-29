// var find_type;

$(function(){


        loadData()

        $('#cbtype').combobox({
            onSelect:function(record){
                
                loadDataSelected(record.text)
            }
        })

})




function formatStatus(val,row){
	// alert(val)
	if (val=='Warning'){
		return`<div style="align='center';border-radius:5px;color:black;background:#F4CE14;font-size:12px;">`+ val +`<div>`;
	}else if(val=='Info'){
		return`<div style="align='center';border-radius:5px;color:black;background:#00308F;font-size:12px;">Info<div>`;
	}else {
		return`<div style="align='center';border-radius:5px;color:white;background:#00308F;font-size:12px;">Info<div>`;
	}
}


async function loadData(){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    var url =  '/notifikasi/read'
    await fetch(url,requestOptions)
        .then(response => response.json()) 
        .then(json => {
            // console.log(json)
            var raw_data = json
            var data = raw_data.data
            // console.log('STATUSNYA',raw_data.status)
            // console.log('RAW DATANYA',data)
            // console.log('DATANYA',JSON.stringify(data.data))
            var j = 0
            var types = []
            var rows = []
            var total = 0
            var danger_ctr = 0
            var warning_ctr = 0
            var info_ctr = 0

            for (var key in data) {
                // console.log(key);
                // console.log(data[key].length); //  rows ?
                var current_type;
                var prev_type;

                for (i=0;i<=data[key].length-1;i++){
                    console.log(data[key][i]);
                    console.log(data[key][i].severity);
                    console.log(data[key][i].type)
                    console.log(data[key][i].vehicleUId)

            

                    var severity = data[key][i].severity
                    var type = data[key][i].type

                    if (type=='idleThreshold'){
                        type = 'Exessive Idle'
                    }

                    var value="";
                    var vehicleid = data[key][i].vehicleUId;
                    var account = data[key][i].accountName;

                    if (severity == 'Warning'){
                        warning_ctr++
                        console.log('warning_type',warning_ctr)
                    }else if (severity == 'Info'){
                        info_ctr++
                        console.log('info_type',info_ctr)
                    }else{
                        info_ctr++
                        console.log('danger_type',info_ctr)
                    }

                    
                    
                    const unixSeconds = data[key][i].creationTime;
                    const myDate = new Date(0);
                    myDate.setUTCSeconds(unixSeconds);

                    console.log(myDate.toLocaleString());     // "18/04/2022, 10:26:57"

                    var date = myDate.toLocaleString()
                    
                    if (data[key][i].type=='speeding'){
                        console.log(data[key][i].speed[0].value)
                        value = data[key][i].speed[0].value + ' ' + data[key][i].speed[0].unit
                    } else{
                        console.log(data[key][i].actualEventValue[0].value)
                        value = data[key][i].actualEventValue[0].value + ' ' + data[key][i].actualEventValue[0].unit
                    }

                    var speed = data[key][i].speed[0].value + ' ' + data[key][i].speed[0].unit
                    // console.log(data[key][i].gpsLocation)
                    var latlng = {lat:data[key][i].gpsLocation.latitude,lng:data[key][i].gpsLocation.longitude}
                    console.log(latlng)
                    // var address = getAddress(latlng)
                    // console.log(address)
                    

                    rows.push({"severity":severity,"type":type,"value":value,"vehicleId":vehicleid,"date":date,"location":JSON.stringify(latlng),"account":account,"speed":speed})

                    j++;

                    if(j==1){
                        prev_type = type
                        types.push({"id":type,"text":type})

                    }else{
                       var ctr=0;
                       for (k=0;k<=types.length-1;k++){
                          if(types[k].id == type){
                                ctr++
                          }
                       }
                       if (ctr==0){
                            types.push({"id":type,"text":type})
                       }
                    }
                }
            }

            total = j
            
            var danger = danger_ctr + ' Danger'
            console.log('danger',danger)
            $('#danger_type').text(danger)

            var warning = warning_ctr + ' Warning'
            console.log('warning',warning)
            $('#warning_type').text(warning)

            var info = info_ctr + ' Info'
            console.log('inf',info)
            $('#info_type').text(info)
            
            console.log('types',types)
            $('#cbtype').combobox('loadData',types)
            console.log('total',total)
            console.log('rows',rows)
            var dg_data = {"total" : total,"rows" : rows}
            console.log('dg_data',dg_data)
            $('#dgNotif').datagrid('loadData',dg_data)
            
        }).catch (function (error) {
            console.log('Request failed', error);
        });
}


async function loadDataSelected(x){

    console.log('x',x)

    if (x=='Exessive Idle'){

        x = 'idleThreshold'
    }

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    var url =  '/notifikasi/read'
    await fetch(url,requestOptions)
        .then(response => response.json()) 
        .then(json => {
            // console.log(json)
            var raw_data = json
            var data = raw_data.data
            // console.log('STATUSNYA',raw_data.status)
            // console.log('RAW DATANYA',data)
            // console.log('DATANYA',JSON.stringify(data.data))
            var j = 0
            
            var rows = []
            var total = 0

            for (var key in data) {
                // console.log(key);
                // console.log(data[key].length); //  rows ?
                var current_type;
                var prev_type;

                for (i=0;i<=data[key].length-1;i++){

                    console.log('x',x)
                    console.log(' data[key][i].type', data[key][i].type)
                    

                    if(x == data[key][i].type){

                                console.log(data[key][i]);
                                console.log(data[key][i].severity);
                                console.log(data[key][i].type)
                                console.log(data[key][i].vehicleUId)

                                var severity = data[key][i].severity
                                var type = data[key][i].type
                                var value="";
                                var vehicleid = data[key][i].vehicleUId;
                                var account = data[key][i].accountName;

                                
                                if (type=='idleThreshold'){
                                    type = 'Exessive Idle'
                                }
                                
                                const unixSeconds = data[key][i].creationTime;
                                const myDate = new Date(0);
                                myDate.setUTCSeconds(unixSeconds);

                                console.log(myDate.toLocaleString());     // "18/04/2022, 10:26:57"

                                var date = myDate.toLocaleString()
                                
                                if (data[key][i].type=='speeding'){
                                    console.log(data[key][i].speed[0].value)
                                    value = data[key][i].speed[0].value + ' ' + data[key][i].speed[0].unit
                                }

                                var speed = data[key][i].speed[0].value + ' ' + data[key][i].speed[0].unit
                                // console.log(data[key][i].gpsLocation)
                                var latlng = {lat:data[key][i].gpsLocation.latitude,lng:data[key][i].gpsLocation.longitude}
                                console.log(latlng)
                                // var address = getAddress(latlng)
                                // console.log(address)
                                

                                rows.push({"severity":severity,"type":type,"value":value,"vehicleId":vehicleid,"date":date,"location":JSON.stringify(latlng),"account":account,"speed":speed})

                                j++;
                    }
                    


                }
            }
            

            total = j
           
            
           
            console.log('total',total)
            console.log('rows',rows)
            var dg_data = {"total" : total,"rows" : rows}
            console.log('dg_data',dg_data)
            $('#dgNotif').datagrid('loadData',dg_data)
            
        }).catch (function (error) {
            console.log('Request failed', error);
        });

    
}
