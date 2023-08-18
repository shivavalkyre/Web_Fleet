
var pass_mode = 0;
var password_fill ='';

$(function(){
    $('#upass').passwordbox({
        onClickButton: function(){
            //alert('onClickButton')
            //alert (pass_mode)
            password_fill = $('#upass').passwordbox('getValue');
            // alert(password_fill)
            if (pass_mode==0) {
                $('#upass').passwordbox({
                    revealed:true,
                    buttonIcon:'icon-eye_open',
                });
                $('#upass').passwordbox('setValue',password_fill);
                pass_mode =1;
            }else{
                $('#upass').passwordbox({
                    revealed:false,
                    buttonIcon:'icon-eye_off',
                });
                $('#upass').passwordbox('setValue',password_fill);
                pass_mode=0;
            }
          }
    })

    function disableBack() {
        window.history.forward()
    }
    window.onload = disableBack();
    window.onpageshow = function(e) {
        if (e.persisted)
            disableBack();
    }

})