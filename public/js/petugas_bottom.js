
var username = sessionStorage.getItem("username")
var level = sessionStorage.getItem("level")
$('#username').text(username)
$('#level').text(level)

Petugas()
 
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
     
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });
    window.location='device';
    
    
}

function Petugas(){
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
    
    $('#petugas').linkbutton({
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

    
   
    $('#title_page').text('Petugas')
}


function Tasklist(){
    window.location='tasklist';
}
function Vehicle(){
    window.location ='vehicle'
}

function Chat(){
    window.location="chat"
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

    $('#tasklist').linkbutton({
        iconCls: 'icon-chat-black',
        selected:false
    });

    $('#chat').linkbutton({
        iconCls: 'icon-chat-black',
        selected:false
    });

    $('#chat').linkbutton({
        iconCls: 'icon-chat-black',
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



function formatAction(){
   
    // console.log (value)

        var style = `<div style="margin-left:25%;text-align:center"><div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;"><a href="#" onclick="view_data()"><img src="/img/view.png" width=28 height=28 /></div>`
        style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:30px;"><a href="#" onclick="edit_data()"><img src="/img/edit1.png" width=28 height=28 /></div>`
        style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:60px;"><a href="#" onclick="ask_delete()"><img src="/img/delete1.png" width=28 height=28 /></div></div>`

     
    
    return style
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


  function tambah_data(){

    // $('#t_task').textbox('setValue','')
    // $('#t_address').textbox('setValue','')
    // $('#t_tanggal').datebox('setValue','')
    // $('#t_time').textbox('setValue','')
    // $('#t_status').combobox('setValue','')
    // $('#t_vehicle').combobox('setValue','')
    // $('#t_user').combobox('setValue','')
    store_status = 0
    $('#form_title').text('Tambah Petugas')
    $('#ff').form('clear');
    $('#t_level').textbox('setValue','petugas')
    $('#pac-input').text('')
    $('#w_tambah').window('open') 
    // $('#tt').tabs('select', 0);
    // var today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // $('#t_time').textbox('setValue',time)
    // // gmarker.setMap(null)
    // gmarker = []

    $('#w_tambah').window('center');
}

async function simpan_data(){

    alert('store status: '+ store_status)
    
    if (store_status==0){

      

        var username = $('#t_username').textbox('getValue')
        var password = $('#t_password').textbox('getValue')
        var ph_number = $('#t_phnumber').textbox('getValue')
        var level = $('#t_level').textbox('getValue')
       

        

        const data = {
            id: 1,
            username: username,
            password: password,
            level: level,
            ph_number:ph_number
        };
        // alert(JSON.stringify(data))
        let  url = '/petugas/create'

        // const response = await fetch(url, {
        //     method: "POST",
        //     body: JSON.stringify(data)
        //   })

        $('#ff').form('submit', {
            url:url,
            success: function(data){
                // alert(data)
                var data = eval('(' + data + ')');  // change the JSON string to javascript object
                // alert(data)
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
            url:'/petugas/update',
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


function view_data(){
   
    var row = $('#dg').datagrid('getSelected');
    // alert(row.id)
    var username = row.username
    var password = row.password
    var ph_number = row.ph_number


    // $('#edit_view_task').css("visibility","visible")
    // $('#close_view_task').css("margin-left","80px")

  

    $('#view_petugas1').text(username)
    $('#view_petugas2').text(password)
    $('#view_petugas3').text(ph_number)


    $('#w').window('open')
    $('#w').window('center');
}

function edit_data(){
    
    var row = $('#dg').datagrid('getSelected');
    //alert(row.id)
    $('#form_title').text('Edit Petugas')
    selectedId = row.id
    $('#w').window('close')
    $('#w_tambah').window('open')
    
    store_status = 1
    $('#ff').form('load',{
        id: row.id,
        username: row.username,
        password:row.password,
        ph_number:row.ph_number,
        
    });


    //alert(row.filename)
   
   

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
    var url = "/petugas/delete"
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



//   $('#view_task').bind('click', function(){
//     window.location = '/tasklist'

// });
