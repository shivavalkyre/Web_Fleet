var map = null
var gmarker = []

var username = sessionStorage.getItem("username")
var level = sessionStorage.getItem("level")
var area = sessionStorage.getItem("area");
var userid =  sessionStorage.getItem("id");

$(function(){

    $('#div_taskid').hide()

    // InitializeMap()
    google.maps.event.addDomListener(window, 'load', InitializeMap);

    // var pager = $('#dg').datagrid().datagrid('getPager');    // get the pager of datagrid
    // pager.pagination({
    //     showPageList:false,
    //     layout:['list','sep','first','prev','links','next','last','sep','refresh']
    // }); 
    // pager.css("background-color","transparent")
    // pager.css("border","none")
    // // var pager_width = pager.css("width")
    // // alert(pager_width)
    // // var margin_left = ` "calc(50% - ` + pager_width +`)" `
    // // alert(margin_left)
    // pager.css("margin-left","calc(50% - 100px)")    

//     var tb = $('#t_address');
//     tb.textbox('textbox').bind('keydown', function(e){
// 	if (e.keyCode == 13){	// when press ENTER key, accept the inputed value.
// 		// tb.textbox('setValue', $(this).val());
//         // alert('here')
//         SearchBox()
// 	}
// });

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
    var url = '/tasklist/read/selected/'+userid
    fetch(url,requestOptions)
    .then(response => response.json()) 
    .then(json => {
        // alert (json)
        // console.log(json)
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