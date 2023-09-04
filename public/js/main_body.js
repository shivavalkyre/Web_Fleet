function err(target, message){
    var t = $(target);
    if (t.hasClass('textbox-text')){
        t = t.parent();
    }
    var m = t.next('.error-message');
    if (!m.length){
        m = $('<div class="error-message"></div>').insertAfter(t);
    }
    m.html(message);
}

async function submitForm(){
    // alert('submit')
    var uname = $('#uname').textbox('getValue')
    var upass = $('#upass').passwordbox('getValue')

    // alert(uname)
    // alert(upass)
    const data = { username: uname ,password:upass};

    

    axios.post("/auth",data)
    .then((response)=> {
        console.log(response)
        var status = response.data.status

        if(status == true){
            var level = response.data.data.body[0].level
            if (level == 'administrator'){
                var token = response.data.data.token
                var id    = response.data.data.body[0].id
                var area  = response.data.data.body[0].area
                sessionStorage.setItem("username",uname);
                sessionStorage.setItem("level",level);
                sessionStorage.setItem("area",area)
                sessionStorage.setItem("id",id)
                sessionStorage.setItem("token",token);
                setTimeout(myFunction, 1000);
            }else{
                console.log('failed')
            }
           

        }else{
            // message here
            console.log('failed')
        }
        

    }).catch((error) => {
        console.error(error)
    });



    // axios.post("http://localhost:3002/api/patern/auth",data)
    // .then((response) => {
    //     // console.log(response.headers.token)
    //     console.log(response.data)
    //     console.log(response.data.data[0].level)
    //     console.log(response.data.status)
        
    //     var status = response.data.status
    //     if (status == true) {
    //         var level = response.data.data[0].level
    //         if (level == 'administrator'){
    //             var token = response.headers.token

    //             sessionStorage.setItem("username",uname);
    //             sessionStorage.setItem("level",level);
    //             sessionStorage.setItem("token",token);

    //             setTimeout(myFunction, 1000);
    //         }
            
    //     }
        

    // })
    // .catch((error) => console.error(error));
    



}

function myFunction() {
    window.location='dashboard';
}		