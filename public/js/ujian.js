var url;

$('#tgl').datetimebox({
    formatter:function(date){
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
      var s1= y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
      var s2 = [date.getHours(),date.getMinutes(),date.getSeconds()].join(':');
      return s1 + ' ' + s2;
    },
    parser:function(s){
      if (!s){return new Date();}
      var dt = s.split('-');
      var ds = s.split(' ')
      //alert(ds)
      //alert(ds[1])

      //let text = "2023-05-05 20:30:01";
      //const myArray = text.split(" ");
      let hms = ds[1]
      const tm = hms.split(":")
      var hr = ''+ tm[0]
      var mn = ''+ tm[1]
      var sc = ''+ tm[2]

      if (hr.length <2) hr = '0'+hr;
      if (mn.length <2) mn = '0'+mn;
      if (sc.length <2) sc = '0'+sc;

      //var date = new Date(dt[0][2],dt[0][1],dt[0][0]);
      var y = parseInt(dt[0],10);
      var m = parseInt(dt[1],10);
      var d = parseInt(dt[2],10);
      
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        //return new Date(y,m-1,d);
        var date = new Date(y,m-1,d,hr,mn,sc);
       
      } else {
        var date =  new Date();
      }

      
      return date;
    }
  })

  $('#id_m').combogrid({
    panelWidth:300,
    idField:'id_matpel',
    textField:'nama_matpel',
    url:'/get_matapelajaran_all',
    columns:[[
        {field:'id_matpel',title:'ID',width:60,hidden:false},
        {field:'nama_matpel',title:'Nama Matpel',width:200},
    ]]
});

  function formatDate1(val,row){		
    return formattedDate(val);	
 }

function formattedDate(date) {
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = ''+ d.getFullYear(),
        hour = '' + d.getHours(),
        minute = '' + d.getMinutes(),
        second = ''+ d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length<2) hour ='0' + hour;
    if (minute.length<2) minute ='0' + minute;
    if (second.length<2) second ='0' + second;
    
    //alert(hour)
    //alert(minute)
    //alert(second)

    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
}
            
function newChild(){
    $('#dlg').dialog('open').dialog('center').dialog('setTitle','New Data');
    $('#fm').form('clear');
    url = '/save_ujian';
}
function editChild(){
    var row = $('#dg').datagrid('getSelected');
    if (row){

        var tgl = '' + formattedDate(row.tanggal) + '';
        //alert(tgl)
        //alert (row.nama_ujian)
        //alert (row.id_matpel)
        $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit Data');
        //$('#fm').form('load',row);
        $('#nm_ujian').textbox('setValue',row.nama_ujian)
        $('#id_m').textbox('setValue',row.id_matpel)
        $('#tgl').datetimebox('setValue',tgl)
        url = 'update_ujian/'+ row.id;
    }
}
function saveChild(){

    
    var data = $('#fm').serialize();
    //alert(data)
    $.ajax({
    type:'POST',
    url:url,
    data: data,
    success:function(XMLHttpRequest, textStatus,result){
        //alert("Status: " + textStatus); 
        if(textStatus =='success')
        {
            $('#dlg').dialog('close');        
            $('#dg').datagrid('reload');  
            
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        alert("Status: " + textStatus); 
        alert("Error: " + errorThrown); 
    }       
    });
}
function destroyChild(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this data?',function(r){
            if (r){
    
                var data = {id:row.id}
                $.ajax({
                    type:'DELETE',
                    url:'destroy_ujian',
                    data: data,
                    success:function(XMLHttpRequest, textStatus,result){
                        //alert("Status: " + textStatus); 
                        if(textStatus =='success')
                        {
                            $('#dlg').dialog('close');        
                            $('#dg').datagrid('reload');    
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); 
                        alert("Error: " + errorThrown); 
                    }       
                    });
            }
        });
    }
}

// function openfile(val,row){
//     return '<button class="w3-button w3-blue" onclick="view_asset();" style="width:80px;">View</button>';
// }

// function getPrice()
// {
//     var url = '/get_product_all'
//     var url_update_product = '/update_product/'
//     var data_product = []
//     $.ajax({
//     type:'POST',
//     url:url,
//     success:function(XMLHttpRequest, textStatus,result){
//        data_product = result.responseJSON
//        for (i=0;i<=data_product.length-1;i++)
//        {
//         var url_price = 'https://dummyjson.com/products/search?q=' + data_product[i].product
//         var id = data_product[i].id

//            return_price(id,url_price,function(getRes){
//                 //console.log(getRes.products.length)
//                 if (getRes.products.length>0)
//                 {
//                     var data = getRes.products[0]
//                     var post_data = {"product":data.title,"price":data.price}
//                     var url= '/update_product/'+data.id_product
//                     $.ajax({
//                         url:url,
//                         type:'POST',
//                         data:post_data,
//                         success:function(res){
//                             $('#dg').datagrid('reload')
//                         }
//                     })
//                 }
               
//            })
    
            
//        }
//     },
//     error: function(XMLHttpRequest, textStatus, errorThrown) { 
//         alert("Status: " + textStatus); 
//         alert("Error: " + errorThrown); 
//     }       
//     })
// }


// function return_price(id,req,callback){
//     //console.log(req)
//     $.ajax({
//         url: req,
//         type: 'GET',
//         contentType: 'application/json',
//         success: function(data)
//         {
//             //console.log('id_product:',id)
//             if (data.products.length>0)
//             {
//                 data.products[0].id_product = id
//             }
            
//             //console.log('data',data)
//             callback(data)
//         }
//     });
//  }
