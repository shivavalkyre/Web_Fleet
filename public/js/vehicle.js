
$(function(){
    //alert('here')

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: 1,rows:10 })
    };

        console.log('requestOptions' + requestOptions)

        fetch('/vehicle/read',requestOptions)
        .then(response => response.json()) 
        .then(json => {
            // alert (json)
            console.log(json)
            if (json.total>0){
                $('#dg').datagrid({
                    url: '/vehicle/read'
                });
            }else{
                sessionStorage.clear()
                window.location = '/'
            }
        }).catch (function (error) {
            console.log('Request failed', error);
        });
})