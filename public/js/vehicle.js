
var username = sessionStorage.getItem("username");
var level = sessionStorage.getItem("level");
var area = sessionStorage.getItem("area");
var userid =  sessionStorage.getItem("id");

$(function(){
    //alert('here')


    $('#username').text(username)
    $('#level').text(level)
   

    if (area == 'pusat'){
        var url = '/device/read/all'
    }else{
        var url = '/device/read/all/'+ userid
    }
   
    // alert(url)

    $('#t_deviceid').combogrid({
        panelWidth: 280,
        idField: 'deviceId',
        textField: 'deviceId',
        url: url,
        method: 'post',
        columns: [[
                        {field:'deviceId',title:'Device ID',width:80},
                 ]],
        fitColumns: true,
        label: 'Device ID',
        labelPosition: 'left'
                 
    })

    if (area == 'pusat'){
        var url = '/user/admin'
    }else{
        var url = '/user/admin/selected/'+ userid
    }
    
    // alert(url)

    $('#t_assignment').combogrid({
        panelWidth: 280,
        idField: 'id',
        textField: 'username',
        url: url,
        method: 'POST',
        columns: [[
                        {field:'id',title:'ID',width:80},
                        {field:'username',title:'User',width:80},
                        {field:'area',title:'Area',width:80},
                 ]],
        fitColumns: true,
        label: 'Assignment',
        labelPosition: 'left'
    })

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: 1,rows:10 })
    };

        console.log('requestOptions' + requestOptions)

        if (area == 'pusat'){
            var url =  '/vehicle/read/all'
        }else{
            var url = '/vehicle/read/selected/'+ userid
        }
        

        fetch(url,requestOptions)
        .then(response => response.json()) 
        .then(json => {
            // alert (json)
            console.log(json)
            if (json.status==200){
                $('#dg').datagrid({
                    url: url // problem read by created id
                });


            }else{
                sessionStorage.clear()
                window.location = '/'
            }
        }).catch (function (error) {
            console.log('Request failed', error);
        });
})