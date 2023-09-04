
var username = sessionStorage.getItem("username");
var level = sessionStorage.getItem("level");
var area = sessionStorage.getItem("area");
var userid =  sessionStorage.getItem("id");

$(function(){

$('#username').text(username)
$('#level').text(level)

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: 1,rows:10 })
    };
    // console.log('DATA' + data)
    var url = '/petugas/read/selected/'+ userid
        fetch(url,requestOptions)
        .then(response => response.json()) 
        .then(json => {
            // alert (json)
            console.log(json)
            if (json.status==200){
                $('#dg').datagrid({
                    url: url
                });
            }else{
                sessionStorage.clear()
                window.location = '/'
            }
        }).catch (function (error) {
            console.log('Request failed', error);
        });
    

})