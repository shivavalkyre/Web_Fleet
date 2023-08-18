function myformatter(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function myparser(s){
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d);
    } else {
        return new Date();
    }
}

var kabisat 

$('#btn').bind('click', function(){
    var dt = $('#dt').datebox('getValue')
    kabisat = is_kabisat(dt)
    //console.log(kabisat)
    var result 
    if(kabisat == true){
        // alert('tahun kabisat')
        result = hitung_umur(dt) + ' ' + hitung_kabisat(dt)
    }else{
        //alert('bukan tahun kabisat')
        result = hitung_umur(dt)
    }

    $('#rs').textbox('setValue',result)

});

function is_kabisat(dt){
    var ss = dt.split('-')
    var y1 = parseInt(ss[0],10);
    var m1 = parseInt(ss[1],10);
    var d1 = parseInt(ss[2],10);
    var result = false;

    if(y1%4==0){
        result = true
    }
    return result
}

function hitung_kabisat(dt){
    var ss = dt.split('-')
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    var counter = 0

    for (var i=1;i<=y;i++){
        if(i%4==0){
            counter++
        }
        
    }

    return counter + ' Tahun Kabisat'
}

function hitung_umur (dt){
    var ss = dt.split('-')
    var y1 = parseInt(ss[0],10);
    var m1 = parseInt(ss[1],10);
    var d1 = parseInt(ss[2],10);

    // alert(y)
    // alert(m)
    // alert(d)

    var date = new Date();
    var d2 = date.getDate();
    var m2 = 1 + date.getMonth();
    var y2 = date.getFullYear();
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(d1 > d2){
        d2 = d2 + month[m2 - 1];
        m2 = m2 - 1;
    }
    if(m1 > m2){
        m2 = m2 + 12;
        y2 = y2 - 1;
    }
    var d = d2 - d1;
    var m = m2 - m1;
    var y = y2 - y1;

    return 'Umur Anda adalah '+y+' Tahun '+m+' Bulan '+d+' Hari';

}