
async function submitForm(){
    // alert('test')
    const queryString = window.location.href
    var lp = queryString.indexOf("lupa_password")
    var param = queryString.substring(lp+14)
    // alert(param)
    var password = $('#password').passwordbox('getValue')
    var repassword = $('#repassword').passwordbox('getValue')

    // alert(password)
    // alert(repassword)

    if(password.length >0 && repassword.length >0){
        if (password.toLowerCase()==repassword.toLowerCase()){
            // alert('here')
            var formData={
                password: password,
                data: param
            }
            //
            var url='http://localhost:3003/api/pattern/change_password'
            $.ajax({
                url:url,
                method:'POST',
                data:formData,
                cache:false,
                success:function(data){
                    // alert(data)
                    console.log(data)
                    if (data.status=true){
                        // redirect url
                        alert('Change Password Success')
                        window.location.href ='/'
                    }
                },error:function(err){
                    console.log(err)
                }
            })
        }
    }else{
        alert('Password Kosong')
    }

    
}