$('#rs').textbox().css('text-align','center');
var arr_bilangan =[];

$('#btn').bind('click', function(){
    var num = $('#ak').textbox('getValue')
    $('#rs').textbox('setValue',factorialize(num))
})

function factorialize(num) {
    var result = num;
    if (num === 0 || num === 1) 
      return 1; 
    while (num > 1) { 
      num--;
      result *= num;
    }
    return result;
  }