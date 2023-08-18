
$('#rs').textbox().css('text-align','center');

$('#btn').bind('click', function(){
    var rows = $('#rw').textbox('getValue');
    var char = $('#ch').textbox('getValue');
    // alert (rows)
    // alert (char)
   $('#rs').textbox('setValue',draw_piramid(rows,char))
    
});

function draw_piramid (rows,char)
{

let string = "";
// External loop
for (let i = 1; i <= rows; i++) {
  // printing spaces
  for (let j = 1; j <= rows - i; j++) {
    string += "  ";
  }
  // printing star
  for (let k = 0; k < 2 * i - 1; k++) {
    string += char + " ";
  }
  string += "\n";
}
console.log(string);
return string
}