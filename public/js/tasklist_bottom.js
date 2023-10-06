
var dlg
var selectedId
var store_status




Tasklist()



 
function Dashboard(){
    location.replace("dashboard")
}
function Device(){
    window.location='device';
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
    window.location='device';
}

function Vehicle(){
    window.location='vehicle';
}
function Petugas (){
    window.location = 'petugas'
}
function Tasklist(){
    //alert('tasklist')

    var width_monitor = $('#monitor').css('width')
    var width_tasklist = $('#tasklist').css('width')

    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });

    $('#monitor').linkbutton({
        iconCls: 'icon-monitor-black',
        selected:false
    });
    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist',
        selected:true
    });
    $('#chat').linkbutton({
        iconCls: 'icon-chat-black',
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
        iconCls: 'icon-setting-black',
        selected:false
    });
      
    if (width_monitor=='40px' && width_tasklist == '40px'){
        $('#monitor').css('width','20%')
        $('#tasklist').css('width','20%')
    }else{
        $('#monitor').css('width','100%')
        $('#tasklist').css('width','100%')
    }

    $('#title_page').text('Penugasan')

}

function Chat(){
    window.location ='chat'
}

function Notifikasi(){
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
        iconCls: 'icon-bell',
        selected:true
    });
    
    $('#report').linkbutton({
        iconCls: 'icon-document-black',
        selected:false
    });

    $('#setting').linkbutton({
        iconCls: 'icon-setting-black',
        selected:false
    });
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

function cbformatItem(row){
    var s
    if (row.text.trim()=='In Progress'){
        s = '<span style="color:#F4AA36">' + row.text + '</span><br/>'
    }else if (row.text.trim()=='Overdue'){
        s = '<span style="color:#DD6969">' + row.text + '</span><br/>'
    }else if(row.text.trim()=='In Complete'){
        s = '<span style="color:#47A3FF">' + row.text + '</span><br/>'
    }else{
        s = '<span style="color:#76BD79">' + row.text + '</span><br/>'
    }
   
    return s;
}

function formatField(value){
    var img_src=''
    var font_color=''

    if (value== 'In Complete'){
        img_src = '/themes/icons/incomplete.png'
        font_color = '#47A3FF'
    }else if (value=='Overdue'){
        img_src = '/themes/icons/overdue.png'
        font_color = '#DD6969'
    }else if(value == 'In Progress'){
        img_src = '/themes/icons/inprogress.png'
        font_color = '#F4AA36'
    }else if (value == 'Complete'){
        img_src = '/themes/icons/complete.png'
        font_color = '#76BD79'
    }

    return '<span style="font-size:12px;font-weight:bold;color:'+ font_color +'">'+ '<img src="'+ img_src + '" width=16 height=16 /> ' + value+'</span>';
}

function formatAction(value){
   
    // console.log (value)
    if (value==1 || value == 3){
            var style = `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;"><a href="#" onclick="view_data()"><img src="/img/view.png" width=28 height=28 /></div>`
            style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:30px;"><a href="#" onclick="edit_data()"><img src="/img/edit1.png" width=28 height=28 /></div>`
            style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:60px;"><a href="#" onclick="ask_delete(`+ value +`)"><img src="/img/delete1.png" width=28 height=28 /></div>`
    
    }else{
        var style = `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;"><a href="#" onclick="view_data()"><img src="/img/view.png" width=28 height=28 /></div>`
        style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:30px;"><a href="#" onclick="edit_data()"><img src="/img/edit1.png" width=28 height=28 /></div>`
        style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:60px;"><a href="#" onclick="ask_delete(`+value+`)"><img src="/img/delete1.png" width=28 height=28 /></div>`
    }
     
    
    return style
}

function view_data(){
   
    var row = $('#dg').datagrid('getSelected');
    //alert(row.id)
    var judul_task = row.task
    var waktu = row.task_time
    var tanggal = row.task_date
    var lokasi = row.task_address
    var status = row.task_status
    var dokumentasi = row.filename
    var keterangan = row.desc
    var font_color=''
    var height = ''

    $('#edit_view_task').css("visibility","visible")
    $('#close_view_task').css("margin-left","80px")

    if (status == 'In Progress'){
        font_color = '#F4AA36'
        height =  '320px'
        $('#parent_view_task6').css("visibility","hidden")
        $('#parent_view_task7').css("visibility","hidden")
        $('#parent_view_task6').css("margin-top","-80px")
        $('#hr_parent').css("visibility","hidden")
        $('#hr_parent').css("margin-top","-10px")
        $('#hr_bottom').css("margin-top","-30px")

    }else if (status == 'In Complete'){
        font_color = '#47A3FF'
        height =  '320px'
        $('#parent_view_task6').css("visibility","hidden")
        $('#parent_view_task7').css("visibility","hidden")
        $('#parent_view_task6').css("margin-top","-80px")
        $('#hr_parent').css("visibility","hidden")
        $('#hr_parent').css("margin-top","-10px")
        $('#hr_bottom').css("margin-top","-30px")
    }else if (status == 'Overdue'){
        font_color = '#DD6969'
        height =  '320px'

        $('#parent_view_task6').css("visibility","hidden")
        $('#parent_view_task7').css("visibility","hidden")
        $('#parent_view_task6').css("margin-top","-80px")
        $('#hr_parent').css("visibility","hidden")
        $('#hr_parent').css("margin-top","-10px")
        $('#hr_bottom').css("margin-top","-30px")
        
    }else if (status == 'Complete'){
        font_color = '#76BD79'
        height =  '400px'
        
        $('#parent_view_task6').css("visibility","visible")
        $('#parent_view_task7').css("visibility","visible")
        $('#parent_view_task6').css("margin-top","0px")
        // alert($('#parent_view_task6').css("margin-top"))
        // alert($('#hr_bottom').css("margin-top"))
        $('#hr_parent').css("visibility","visible")
        $('#hr_parent').css("margin-top","10px")
        $('#hr_bottom').css("margin-top","10px")
        $('#edit_view_task').css("visibility","hidden")
        $('#close_view_task').css("margin-left","500px")
    }

    $('#view_task1').text(judul_task)
    $('#view_task2').text(waktu)
    $('#view_task3').text(lokasi)
    $('#view_task4').text(tanggal)
    $('#view_task5').text(status)
    $('#view_task5').css("color",font_color)
    $('#view_task6').text(dokumentasi)
    $('#view_task7').text(keterangan)

    $('#w').css("height",height)
    $('#w').window('open')
    $('#w').window('center');
}

function edit_data(){
    InitializeMap
    $('#form_title').text('Edit Penugasan')
    

    
    var url = '/vehicle/read/all/'+ userid

    $('#t_vehicleid').combogrid({
        panelWidth: 250,
        idField: 'vehicleid',
        textField: 'vehicleid',
        url: url,
        method: 'post',
        columns: [[
            {field:'vehicleid',title:'Vehicle ID',width:80},
        ]],
        fitColumns: true,
        label: 'Vehicle ID:',
        labelPosition: 'left'
    })
   
    var url = '/petugas/read/all/' + userid
    $('#t_user').combobox({
            url:url,
            method:'post',
            valueField:'id',
            textField:'username',
            label: 'User'
    })
    $('#t_user').combobox('enable')

    var row = $('#dg').datagrid('getSelected');
    //alert(row.id)
    
    selectedId = row.id
    $('#w_tambah').window('open')
    $('#pac-input').text('')
    $('#tt').tabs('select', 0);
    store_status = 1
    $('#ff').form('load',{
        id: row.id,
        task: row.task,
        task_address:row.task_address,
        task_lat:row.task_lat,
        task_lon:row.task_lon,
        task_date:row.task_date,
        task_time:row.task_time,
        task_status:row.task_status,
        vehicleid:row.vehicleid,
        userid: row.userid,
        desc: row.desc,
        createdBy:row.createdBy
    });


    //alert(row.filename)
    if(row.filename){
        $('#upload_content').text(row.filename)
    }else{
        $('#upload_content').text('')
    }
   

    for (var i = 0; i <=gmarker.length-1 ; i++) {
        gmarker[i].setMap(null);
    }
    gmarker = []

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(row.task_lat,row.task_lon),
        map: map
    });

    gmarker.push(marker)
    var latLng = new google.maps.LatLng(row.task_lat,row.task_lon);
    map.panTo(latLng);
    
    $('#w').window('close')
}

function logout(){
    sessionStorage.clear();
    window.history.forward();
    window.location ='/'
}

function tambah_data(){

    InitializeMap
    $('#form_title').text('Tambah Penugasan')
    // $('#t_task').textbox('setValue','')
    // $('#t_address').textbox('setValue','')
    // $('#t_tanggal').datebox('setValue','')
    // $('#t_time').textbox('setValue','')
    // $('#t_status').combobox('setValue','')
    // $('#t_vehicle').combobox('setValue','')
    // $('#t_user').combobox('setValue','')
    store_status = 0

    $('#ff').form('clear');
    $('#pac-input').text('')
    $('#w_tambah').window('open') 
    $('#tt').tabs('select', 0);
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    $('#t_time').textbox('setValue',time)

    var url = '/vehicle/read/all/'+ userid

    $('#t_vehicleid').combogrid({
        panelWidth: 250,
        idField: 'vehicleid',
        textField: 'vehicleid',
        url: url,
        method: 'post',
        columns: [[
            {field:'vehicleid',title:'Vehicle ID',width:80},
        ]],
        fitColumns: true,
        label: 'Vehicle ID:',
        labelPosition: 'left'
    })
   
    var url = '/petugas/read/all/' + userid
    $('#t_user').combobox({
            url:url,
            method:'post',
            valueField:'id',
            textField:'username',
            label: 'User'
    })

    $('#t_user').combobox('disable')

    // data-options="
    //                     url:'/user',
    //                     method:'get',
    //                     valueField:'id',
    //                     textField:'username',
    //                     label: 'User'
    //                     "

    $('#t_createdby').textbox('setValue',userid)
    // alert(userid)
    gmarker.setMap(null)
    gmarker = []
    $('#w_tambah').window('center');
}



async function simpan_data(){

    // alert('store status: '+ store_status)
    // var form = $('#ff')[0];
    // var data = new FormData(form);

    
    if (store_status==0)
    {

        $('#t_user').combobox('disable')

        let  url = '/tasklist/create'
        var vehicles = $('#t_vehicleid').combogrid('getValues')
        var reccuring_type = $('#t_recurrent_type').combobox('getValue')
        // alert (reccuring_type)

        if (reccuring_type == ''){

            for (i=0;i<=vehicles.length-1;i++)
            {
                var id = $('#t_task_id').textbox('getValue')
                var task = $('#t_task').textbox('getValue')
                var address = $('#t_address').textbox('getValue')
                var lat = $('#t_lat').textbox('getValue')
                var lng = $('#t_lon').textbox('getValue')
                var tanggal = $('#t_tanggal').datebox('getValue')
                var time = $('#t_time').textbox('getValue')
                var status = $('#t_status').combobox('getValue')
                
                var createdBy  = $('#t_createdby').textbox('getValue')
                var desc = $('#desc').textbox('getValue')
    
                // alert(vehicles[i])
                // var users = $('#t_user').combobox('getValues')
                
                // for(j=0;j<= users.length-1;j++){
                //     alert (users[j])
                    const formData = new FormData();
                    formData.append("id","")
                    formData.append("task",task)
                    formData.append("task_address",address)
                    formData.append("task_lat",lat)
                    formData.append("task_lon",lng)
                    formData.append("task_date",tanggal)
                    formData.append("task_time",time)
                    formData.append("task_status",status)
                    formData.append("vehicleid",vehicles[i])
                    // formData.append("userid",users[j])
                    formData.append("createdBy",createdBy)
                    formData.append("desc",desc)
    
                    
                
                    console.log(Array.from(formData));
    
                    const response = await fetch(url, {
                        method: "POST",
                        body: formData
                      })
            
                    console.log(response.status)
                    var img 
                    if (parseInt(response.status) == 200){
                        img = "/img/success.png"
                    }else{
                        img = "/img/red_close.png"
                    }
                    
                    if (parseInt(response.status) == 200){
                                var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
                                msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data sukses</div>`
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
                            
                            $('#dg').datagrid('reload')
                            $('#w_tambah').window('close')
                    } else{
                                var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
                                msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data gagal</div>`
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
                            
                            $('#dg').datagrid('reload')
                            $('#w_tambah').window('close')
                    }
                    
    
                // }
                
            
               
                
            }
        }else{

            if (vehicles.length == 1){
                if (reccuring_type == 'daily'){
                    // alert(reccuring_type)
                    var start_reccurent = $('#t_start_recurrent').datebox('getValue')
                    var end_recurrent = $('#t_end_reccurent').datebox('getValue')
    
                    console.log('start', start_reccurent)
                    console.log('end',end_recurrent)
    
                    if (start_reccurent!='' && end_recurrent!=''){
                        var result = CompareDate(end_recurrent, start_reccurent)
                        if(result=='equal' || result=='greater'){
                            // buat jadwal sesuai range tanggal per hari
                            var jumlah_hari = SelisihHari(end_recurrent,start_reccurent)
                            console.log(jumlah_hari)
                            var tgl;
                            var res;
                            for (k=0;k<= jumlah_hari;k++){
                                 if (k==0){
                                    console.log('Start here =====================')
                                    tgl = new Date(start_reccurent)
                                    tgl.setHours(0, 0, 0, 0);
                                    tgl.setDate (tgl.getDate())
                                    res = tgl.getFullYear() +'-' + String(tgl.getMonth() + 1).padStart(2, '0') + '-' + String(tgl.getDate()).padStart(2, '0')
                                    console.log('tgl',tgl)
                                    console.log('res',res)
                                 }else{
                                    console.log('Next here =====================')
                                    console.log('res awal',res)
                                    tgl = new Date(res)
                                    tgl.setHours(0, 0, 0, 0);
                                    tgl.setDate (tgl.getDate() + 1)
                                    res = tgl.getFullYear() +'-' + String(tgl.getMonth() + 1).padStart(2, '0') + '-' + String(tgl.getDate()).padStart(2, '0')
                                    console.log('tgl',tgl)
                                    console.log('res baru',res)
                                 }
    
                                 for (i=0;i<=vehicles.length-1;i++)
                                 {
                                     var id = $('#t_task_id').textbox('getValue')
                                     var task = $('#t_task').textbox('getValue')
                                     var address = $('#t_address').textbox('getValue')
                                     var lat = $('#t_lat').textbox('getValue')
                                     var lng = $('#t_lon').textbox('getValue')
                                     var tanggal = $('#t_tanggal').datebox('getValue')
                                     var time = $('#t_time').textbox('getValue')
                                     var status = $('#t_status').combobox('getValue')
                                     
                                     var createdBy  = $('#t_createdby').textbox('getValue')
                                     var desc = $('#desc').textbox('getValue')
                         
                                     // alert(vehicles[i])
                                     // var users = $('#t_user').combobox('getValues')
                                     
                                     // for(j=0;j<= users.length-1;j++){
                                     //     alert (users[j])
                                         const formData = new FormData();
                                         formData.append("id","")
                                         formData.append("task",task)
                                         formData.append("task_address",address)
                                         formData.append("task_lat",lat)
                                         formData.append("task_lon",lng)
                                         formData.append("task_date",res)
                                         formData.append("task_time",time)
                                         formData.append("task_status",status)
                                         formData.append("vehicleid",vehicles[i])
                                         // formData.append("userid",users[j])
                                         formData.append("createdBy",createdBy)
                                         formData.append("desc",desc)
                         
                                         
                                     
                                         console.log(Array.from(formData));
                         
                                         const response = await fetch(url, {
                                             method: "POST",
                                             body: formData
                                           })
                                 
                                         console.log(response.status)
                                         var img 
                                         if (parseInt(response.status) == 200){
                                             img = "/img/success.png"
                                         }else{
                                             img = "/img/red_close.png"
                                         }
                                         
                                         if (parseInt(response.status) == 200){
                                                     var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
                                                     msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data sukses</div>`
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
                                                 
                                                 $('#dg').datagrid('reload')
                                                 $('#w_tambah').window('close')
                                         } else{
                                                     var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
                                                     msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data gagal</div>`
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
                                                 
                                                 $('#dg').datagrid('reload')
                                                 $('#w_tambah').window('close')
                                         }
                                         
                         
                                     // }
                                     
                                 
                                    
                                     
                                 }
                                 
                            }
                        }
                    }else{
                        alert('Harap Isi tanggal dengan lengkap')
                    }
                }else if (reccuring_type == 'monthly'){
                    // alert(reccuring_type)
                    var start_reccurent = new Date()
                    var end_recurrent = $('#t_end_month_reccurent').numberbox('getValue')
    
                    for (k=0;k<end_recurrent;k++){
                        if (k==0){
                            console.log('Start here =====================')
                            tgl = new Date(start_reccurent)
                            tgl.setHours(0, 0, 0, 0);
                            tgl.setDate (tgl.getDate())
                            res = tgl.getFullYear() +'-' + String(tgl.getMonth() + 1).padStart(2, '0') + '-' + String(tgl.getDate()).padStart(2, '0')
                            console.log('tgl',tgl)
                            console.log('res',res)
                         }else{
                            console.log('Next here =====================')
                            console.log('res awal',res)
                            tgl = new Date(res)
                            tgl.setHours(0, 0, 0, 0);
                            tgl.setDate (tgl.getDate() + 30)
                            res = tgl.getFullYear() +'-' + String(tgl.getMonth() + 1).padStart(2, '0') + '-' + String(tgl.getDate()).padStart(2, '0')
                            console.log('tgl',tgl)
                            console.log('res baru',res)
                         }

                         for (i=0;i<=vehicles.length-1;i++)
                         {
                             var id = $('#t_task_id').textbox('getValue')
                             var task = $('#t_task').textbox('getValue')
                             var address = $('#t_address').textbox('getValue')
                             var lat = $('#t_lat').textbox('getValue')
                             var lng = $('#t_lon').textbox('getValue')
                             var tanggal = $('#t_tanggal').datebox('getValue')
                             var time = $('#t_time').textbox('getValue')
                             var status = $('#t_status').combobox('getValue')
                             
                             var createdBy  = $('#t_createdby').textbox('getValue')
                             var desc = $('#desc').textbox('getValue')
                 
                             // alert(vehicles[i])
                             // var users = $('#t_user').combobox('getValues')
                             
                             // for(j=0;j<= users.length-1;j++){
                             //     alert (users[j])
                                 const formData = new FormData();
                                 formData.append("id","")
                                 formData.append("task",task)
                                 formData.append("task_address",address)
                                 formData.append("task_lat",lat)
                                 formData.append("task_lon",lng)
                                 formData.append("task_date",res)
                                 formData.append("task_time",time)
                                 formData.append("task_status",status)
                                 formData.append("vehicleid",vehicles[i])
                                 // formData.append("userid",users[j])
                                 formData.append("createdBy",createdBy)
                                 formData.append("desc",desc)
                 
                                 
                             
                                 console.log(Array.from(formData));
                 
                                 const response = await fetch(url, {
                                     method: "POST",
                                     body: formData
                                   })
                         
                                 console.log(response.status)
                                 var img 
                                 if (parseInt(response.status) == 200){
                                     img = "/img/success.png"
                                 }else{
                                     img = "/img/red_close.png"
                                 }
                                 
                                 if (parseInt(response.status) == 200){
                                             var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
                                             msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data sukses</div>`
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
                                         
                                         $('#dg').datagrid('reload')
                                         $('#w_tambah').window('close')
                                 } else{
                                             var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
                                             msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data gagal</div>`
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
                                         
                                         $('#dg').datagrid('reload')
                                         $('#w_tambah').window('close')
                                 }
                                 
                 
                             // }
                             
                         
                            
                             
                         }
                    }
    

                }
            }else{
                alert('Recurring hanya untuk 1 kendaraan')
            }

        }


    }else{

                      // update
        $('#ff').form('submit',{
            url:'/tasklist/update',
            onSubmit:function(data){
                // return $(this).form('enableValidation').form('validate');
                // $.messager.alert('Info', data, 'info');
            },
            success:function(data){
                var img 
                if (data == 200)
                {
                    img = "/img/success.png"
                }
                else
                {
                    img = "/img/red_close.png"
                }
               
                
                var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
                    msg+= `<div style="width:100%;height:40px;text-align:center"> Update data sukses</div>`
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
                $('#dg').datagrid('reload')
                $('#w_tambah').window('close')
            }
        });
    }
   
}

function ask_delete(value){

    var img = "/img/info.png"
    var msg =  `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
        msg += `<div style="width:100%;height:40px;text-align:center;font-size:18px;font-weight:900;margin-top:-10px;"> Hapus File ? </div>`
        msg += `<div style="color:#353736;text-align:center;margin-top:-10px;">Apakah kamu sudah yakin ingin menghapus file ini?</div>`
        msg += `<div style="width:100%;height:40px;text-align:center;margin-top:0px;"> `
        msg += `<hr style="width: 280px;margin-top:10px;margin-left:0px;">`
        msg += `</div>`
        msg += `<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#E93426;cursor:pointer;float:left;width:100px;border:0px solid red;margin-left:20px;" onclick="javascript:dlg.dialog('close');">Cancel</div>`
        msg += `<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;float:right;width:100px;border:0px solid red;margin-right:20px;" onclick="delete_data(`+ value +`)" >Yakin</div>`
        msg += `<div class="vl"></div>`

      dlg= $.messager.show({
                    
        msg: msg,
        showType:'fade',
        border:'thin',
        cls: 'cls1',
        height:180,
        style:{
            right:'',
            bottom:''
        }
    });
}

async function delete_data(value){
    // alert(value)
    dlg.dialog('close');

    var img
     

    if (value != 4){
        var row = $('#dg').datagrid('getSelected');
        var id = row.id
        // alert(row.id)
        var result = await proccess_delete(id)
        // alert (result)

        if (parseInt(result) == 200){

            img = "/img/success.png"
            var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
            msg+= `<div style="width:100%;height:40px;text-align:center"> Data berhasil dihapus </div>`
            msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
                                    <hr style="width: 280px;margin-top:10px;margin-left:0px;">
                                </div>
                                <div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
                                    OK
                                </div>
                                `

        }else{
            img = "/img/red_close.png"
            var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
            msg+= `<div style="width:100%;height:40px;text-align:center"> Hapus data tidak diijinkan </div>`
            msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
                                    <hr style="width: 280px;margin-top:10px;margin-left:0px;">
                                </div>
                                <div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
                                    OK
                                </div>
                                `
        }

    }else{
        img = "/img/red_close.png"
        var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
        msg+= `<div style="width:100%;height:40px;text-align:center"> Hapus data tidak diijinkan </div>`
        msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
                                <hr style="width: 280px;margin-top:10px;margin-left:0px;">
                            </div>
                            <div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
                                OK
                            </div>
                            `
                            
    }

    dlg = $.messager.show({
                    
        msg: msg,
        showType:'fade',
        border:'thin',
        timeout:1000,
        cls: 'cls1',
        height:180,
        style:{
            right:'',
            bottom:''
        }
    });

    $('#dg').datagrid('reload')
}

async function  proccess_delete(id){
    //alert(id)
    var url = "/tasklist/delete"
    var data = {id:id}

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    };
    // console.log('DATA' + data)
    const response = await fetch(url,requestOptions)
    .then(response => response.json()) 
    .then(json => {
        // alert (json)
       return json
    })

    return response
   
    // console.log(JSON.stringify(response))
}

function close_msg(){
    dlg.dialog('close');
    $('#dg').datagrid('reload')
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


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function myFile()
 {
 document.getElementById('myFile').click();
 }


 $('#status_filter').combobox({
	
    onChange: function(value){
        // var dg = $('#dg').datagrid();
        if (value ==''){
            // dg.datagrid('removeFilterRule', 'task_status');
            var url = '/tasklist/read' 
            $('#dg').datagrid({
                url: url
            })
        }else{
            var url = '/tasklist/read/' + value
            $('#dg').datagrid({
                url: url
            })
        }
    }
});
//  $(":file").change(function(){
//     alert($(":file").val());
//  });


function CompareDate(d1,d2){
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    var res= ''

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`);
    res = 'less'

  } else if (date1 > date2) {
    console.log(`${d1} is greater than ${d2}`);
    res = 'greater'
  } else {
    console.log(`Both dates are equal`);
    res = 'equal'
  }
  return res
}

function SelisihHari(d1,d2){
var tanggal1 = new Date(d1); // new Date() saja akan menghasilkan tanggal sekarang
var tanggal2 = new Date(d2); // format tanggal YYYY-MM-DD, tahun-bulan-hari
 
// set jam menjadi jam 12 malam, atau 00
tanggal1.setHours(0, 0, 0, 0);
tanggal2.setHours(0, 0, 0, 0);
 
var selisih = Math.abs(tanggal1 - tanggal2);
// Selisih akan dalam millisecond atau mili detik
 
var hariDalamMillisecond = 1000 * 60 * 60 * 24; // 1000 * 1 menit * 1 jam * 1 hari
 
var selisihTanggal = Math.round(selisih / hariDalamMillisecond);
return selisihTanggal
}