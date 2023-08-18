var url;
$('#id_ujian').combogrid({
    panelWidth:300,
    idField:'id',
    textField:'nama_ujian',
    url:'/get_ujian_all',
    columns:[[
        {field:'id',title:'ID',width:60,hidden:false},
        {field:'nama_ujian',title:'Nama Ujian',width:200}
    ]],
    onSelect: function(index,row){
		var id = row.id;  
		
        $('#id_matpel').combogrid({
            panelWidth:300,
            idField:'id_matpel',
            textField:'nama_matpel',
            url:'/get_matapelajaran_selected_by_ujian/'+id,
            columns:[[
                {field:'id_matpel',title:'ID',width:60,hidden:false},
                {field:'nama_matpel',title:'Nama Matpel',width:200}
            ]]
        });

        $('#peserta').combogrid({
            panelWidth:300,
            idField:'peserta',
            textField:'peserta',
            url:'/get_peserta_selected_by_ujian/'+id,
            columns:[[
                {field:'peserta',title:'Peserta',width:200}
            ]]
        });
	}
});


            
function newChild(){
    $('#dlg').dialog('open').dialog('center').dialog('setTitle','New Data');
    $('#fm').form('clear');
    url = '/save_hasil';
}
function editChild(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit Data');
        $('#fm').form('load',row);
        url = 'update_hasil/'+ row.id;
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
                    url:'destroy_hasil',
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
