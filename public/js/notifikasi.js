// var find_type;
var t1;
$(function(){

        loadData()
      

        $('#cbtype').combobox({
            onChange:function(newValue, oldValue){
                if (newValue == ''){
                    loadData()
                }
            },
            onSelect:function(record){
                
                loadDataSelected(record.text)
            }
        })

        $('#cari').bind('click', function(){
           alert('cari')
           var tgl = $('#tanggal').datebox('getValue');
          
           if (tgl){
            loadDataSearch()
           }
          
        });

        $('#export').bind('click', function(){
            alert('export')
         });

})




function formatStatus(val,row){
	// alert(val)
	if (val=='Warning'){
		return`<div style="align='center';border-radius:5px;color:black;background:#F4CE14;font-size:12px;">`+ val +`<div>`;
	}else if(val=='Information'){
		return`<div style="align='center';border-radius:5px;color:white;background:#00308F;font-size:12px;">Info<div>`;
	}else {
		return`<div style="align='center';border-radius:5px;color:white;background:#FF0000;font-size:12px;">Critical<div>`;
	}
}





async function loadData(){
   t1 = setInterval(async () => {processData()},2000)
}

async function processData(){
    console.log('test')
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
            var critical_ctr = 0
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
                    }else if (severity == 'Information'){
                        info_ctr++
                        console.log('info_type',info_ctr)
                    }else{
                        critical_ctr++
                        console.log('critical_type',critical_ctr)
                    }

                    
                    
                    const unixSeconds = data[key][i].creationTime;
                    const myDate = new Date(0);
                    myDate.setUTCSeconds(unixSeconds);

                    console.log(myDate.toLocaleString());     // "18/04/2022, 10:26:57"

                    var date = myDate.toLocaleString()
                    
                    if (data[key][i].type=='speeding'){
                        console.log(data[key][i].speed[0].value)
                        value = parseFloat(data[key][i].speed[0].value).toFixed(2) + ' ' + data[key][i].speed[0].unit
                    } else{
                        console.log(data[key][i].actualEventValue[0].value)
                        value = data[key][i].actualEventValue[0].value + ' ' + data[key][i].actualEventValue[0].unit
                    }

                    var speed = parseFloat(data[key][i].speed[0].value).toFixed(2) + ' ' + data[key][i].speed[0].unit
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
            
            var critical = critical_ctr + ' Critical'
            console.log('danger',critical)
            $('#danger_type').text(critical)

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

async function loadDataSearch(){
    var tgl = $('#tanggal').datebox('getValue')
    clearInterval(t1)

    var tgl = $('#tanggal').datebox('getValue')

    alert(tgl)

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    var url =  '/notifikasi/read/'+ tgl
    await fetch(url,requestOptions)
        .then(response => response.json()) 
        .then(json => {
            console.log('json',json)
            var raw_data = json
            var data = raw_data.data

            var j = 0
            
            var rows = []
            var total = 0

            for (var key in data) {
                // console.log(key);
                // console.log(data[key].length); //  rows ?
                var current_type;
                var prev_type;

                for (i=0;i<=data[key].length-1;i++){

                    // console.log('x',x)
                    console.log(' data[key][i].type', data[key][i].type)
                    

                    // if(x == data[key][i].type){

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
                    // }
                    


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




async function loadDataSelected(x){
    clearInterval(t1)
    console.log('x',x)

    var tanggal =  $('#tanggal').datebox('getValue')

    if (x=='Exessive Idle'){
        x = 'idleThreshold'
    }
    
    if (!tanggal){
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
    }else{
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
        };
    
        var url =  '/notifikasi/read/'+ tanggal
        await fetch(url,requestOptions)
            .then(response => response.json()) 
            .then(json => {
                console.log('json',json)
                var raw_data = json
                var data = raw_data.data
    
                var j = 0
                
                var rows = []
                var total = 0
    
                for (var key in data) {
                    // console.log(key);
                    // console.log(data[key].length); //  rows ?
                    var current_type;
                    var prev_type;
    
                    for (i=0;i<=data[key].length-1;i++){
    
                        // console.log('x',x)
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
   return  hours+":"+minutes+":"+seconds;
}
