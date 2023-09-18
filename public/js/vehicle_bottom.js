


// alert(userid)

// $('#username').text(username)
// $('#level').text(level)

Vehicle()
 
function Dashboard(){
    window.location='dashboard';
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
     
    window.location ='device'
   
    
}

function Vehicle(){
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
    
    $('#device').linkbutton({
        iconCls: 'icon-tasklist-black',
        selected:false
    });

    $('#vehicle').linkbutton({
        iconCls: 'icon-tasklist',
        selected:true
    });

    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist-black',
        selected:false
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

    
   
    $('#title_page').text('Kendaraan')
}
function Petugas (){
    window.location='petugas';  
}

function Tasklist(){
    //alert('tasklist')

    // var width_monitor = $('#monitor').css('width')
    // var width_tasklist = $('#tasklist').css('width')

    // $('#dashboard').linkbutton({
    //     iconCls: 'icon-dashboard-black',
    //     selected:false
    // });

    // $('#monitor').linkbutton({
    //     iconCls: 'icon-monitor-black',
    //     selected:false
    // });
    // $('#tasklist').linkbutton({
    //     iconCls: 'icon-tasklist',
    //     selected:true
    // });

    // $('#alert').linkbutton({
    //     iconCls: 'icon-bell-black',
    //     selected:false
    // });
    
    // $('#report').linkbutton({
    //     iconCls: 'icon-document-black',
    //     selected:false
    // });
    
    // $('#setting').linkbutton({
    //     iconCls: 'icon-setting-black',
    //     selected:false
    // });
      
    // if (width_monitor=='40px' && width_tasklist == '40px'){
    //     $('#monitor').css('width','20%')
    //     $('#tasklist').css('width','20%')
    // }else{
    //     $('#monitor').css('width','100%')
    //     $('#tasklist').css('width','100%')
    // }

    // $('#title_page').text('Penugasan')

    window.location='tasklist';
}
function Chat(){
    window.location='chat'
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

function formatAction(){
   
    // console.log (value)

        var style = `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;"><a href="#" onclick="view_data()"><img src="/img/view.png" width=28 height=28 /></div>`
        style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:30px;"><a href="#" onclick="edit_data()"><img src="/img/edit1.png" width=28 height=28 /></div>`
        style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:60px;"><a href="#" onclick="ask_delete()"><img src="/img/delete1.png" width=28 height=28 /></div>`

     
    
    return style
}

function view_data(){
   
    var row = $('#dg').datagrid('getSelected');
    //alert(row.id)
    var vehicleid = row.vehicleid
    var vehicle_brand = row.vehicle_brand
    var vehicle_type = row.vehicle_type
    var name = row.name
    var vin = row.vin
    var deviceId = row.deviceId

    // $('#edit_view_task').css("visibility","visible")
    // $('#close_view_task').css("margin-left","80px")

  

    $('#view_device1').text(vehicleid)
    $('#view_device2').text(vehicle_brand)
    $('#view_device3').text(vehicle_type)
    $('#view_device4').text(name)
    $('#view_device5').text(vin)
    $('#view_device6').text(deviceId)

    $('#w').window('open')
    $('#w').window('center');
}

function edit_data(){
    
    var row = $('#dg').datagrid('getSelected');
    // alert(row.tagging)
    $('#form_title').text('Edit Kendaraan')
    selectedId = row.id
    $('#w').window('close')
    $('#w_tambah').window('open')
    
    
    store_status = 1
    $('#ff').form('load',{
        id: row.id,
        vehicleid: row.vehicleid,
        vehicle_brand:row.vehicle_brand,
        vehicle_type:row.vehicle_type,
        name:row.name,
        vin:row.vin,
        deviceId:row.deviceId,
        tagging:row.tagging,
        assignment:row.assignment,
        init_odometer:row.init_odometer,
        createdBy:row.createdBy
    });

    $('#t_odometer').textbox({
        editable:false
    })

    //alert(row.filename)
   
   

}

function logout(){
    sessionStorage.clear();
    window.history.forward();
    window.location ='/'
}

function tambah_data(){

    // $('#t_task').textbox('setValue','')
    // $('#t_address').textbox('setValue','')
    // $('#t_tanggal').datebox('setValue','')
    // $('#t_time').textbox('setValue','')
    // $('#t_status').combobox('setValue','')
    // $('#t_vehicle').combobox('setValue','')
    // $('#t_user').combobox('setValue','')

    

    store_status = 0
    $('#form_title').text('Tambah Kendaraan')
    $('#ff').form('clear');
    $('#pac-input').text('')
    $('#w_tambah').window('open') 
    $('#t_createdby').textbox('setValue',userid)
    $('#t_tagging').textbox('setValue',area)
    // $('#tt').tabs('select', 0);
    // var today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // $('#t_time').textbox('setValue',time)
    // // gmarker.setMap(null)
    // gmarker = []

    $('#t_odometer').textbox({
        editable:true
    })

    $('#t_odometer').textbox('setValue',0)

    $('#w_tambah').window('center');
}

async function simpan_data(){

    // alert('store status: '+ store_status)
    
    if (store_status==0){

        // var inputElement = document.querySelector("input[type='file']");
        // var fileSize = inputElement.files[0].size;
        // alert(fileSize)
        // insert
        
        // event.preventDefault();
        // var form = $('#ff')[0];
        // var data = new FormData(form);

        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        var vehicleid = $('#t_vehicleid').textbox('getValue')
        var brand = $('#t_brand').textbox('getValue')
        var type = $('#t_type').textbox('getValue')
        var name = $('#t_name').textbox('getValue')
        var vin = $('#t_vin').textbox('getValue')
        var deviceId = $('#t_deviceid').combogrid('getValue')

        

        // const data = {
        //     vehicleid: vehicleid,
        //     brand: brand,
        //     type:type,
        //     name:name,
        //     vin:vin,
        //     deviceId:deviceId,
        //     createdBy:userid
        // };
        // alert(JSON.stringify(data))
        let  url = '/vehicle/create'

        // const response = await fetch(url, {
        //     method: "POST",
        //     body: JSON.stringify(data)
        //   })

        $('#ff').form('submit', {
            url:url,
            success: function(data){
                // alert(data)
                var data = eval('(' + data + ')');  // change the JSON string to javascript object
                //alert(data)
                if (parseInt(data) == 200){
                    // alert(data.message)
                    var img = "/img/success.png"
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

                }
            }
        });


   
    }
    else
    {
        // update
        $('#ff').form('submit',{
            url:'/vehicle/update',
            onSubmit:function(data){
                // return $(this).form('enableValidation').form('validate');
                // $.messager.alert('Info', data, 'info');
            },
            success:function(data){
                var img 
                if (parseInt(data) == 200)
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

function ask_delete(){

    var img = "/img/info.png"
    var msg =  `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
        msg += `<div style="width:100%;height:40px;text-align:center;font-size:18px;font-weight:900;margin-top:-10px;"> Hapus File ? </div>`
        msg += `<div style="color:#353736;text-align:center;margin-top:-10px;">Apakah kamu sudah yakin ingin menghapus file ini?</div>`
        msg += `<div style="width:100%;height:40px;text-align:center;margin-top:0px;"> `
        msg += `<hr style="width: 280px;margin-top:10px;margin-left:0px;">`
        msg += `</div>`
        msg += `<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#E93426;cursor:pointer;float:left;width:100px;border:0px solid red;margin-left:20px;" onclick="javascript:dlg.dialog('close');">Cancel</div>`
        msg += `<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;float:right;width:100px;border:0px solid red;margin-right:20px;" onclick="delete_data()" >Yakin</div>`
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

async function delete_data(){
    // alert(value)
    dlg.dialog('close');

    var img
     

    
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
    var url = "/vehicle/delete"
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