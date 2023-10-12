// Global variable ==================================================================



$('#username').text(username)
$('#level').text(level)


var current_section = 'pantau'
var selected_sclId
var selected_vehicleUid
var asset_req_counter = 0

// Menu handler ====================================================================
 
function Dashboard(){
    //alert(1)
    location.replace("dashboard")
}

function Monitor(){
    //alert('dashboard')
    var width_monitor = $('#monitor').css('width')
    var width_tasklist = $('#tasklist').css('width')
    
    
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });

    $('#monitor').linkbutton({
        iconCls: 'icon-monitor',
        selected:true
    });
    

    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist-black',
        selected:false
    });
    
    $('#chat').linkbutton({
        iconCls: 'icon-chat-black',
        selected:false
    });

    $('#alert').linkbutton({
        iconCls: 'icon-bell-black',
        selected:false
    });
    
    $('#report').linkbutton({
        iconCls: 'icon-document-black',
        selected:false
    });

    $('#setting').linkbutton({
        iconCls: 'icon-setting-black',
        selected:false
    });
    
    if (width_monitor=='40px' && width_tasklist == '40px'){
        $('#monitor').css('width','20%')
        $('#tasklist').css('width','20%')
    }else{
        $('#monitor').css('width','100%')
        $('#tasklist').css('width','100%')
    }

    
   
    $('#title_page').text('Pantauan')
    // alert(current_section)
    close_live_box()
    close_riwayat()
    close_detail_box()
    ReInitializeMap(map,gmarkers)
    
}

function Device(){
    window.location='device';
}
function Vehicle(){
    window.location='vehicle'
}
function Petugas (){
    window.location='petugas';  
}

function Tasklist(){
    // alert('task')
    location.replace("tasklist")
}
function Chat(){
    window.location='chat'
}

function Notifikasi(){
    window.location = 'notifikasi'
  }

// Menu handler =======================================================================


// selected menu

function getClicked(e){

    let elementId = e.id;
    // alert(elementId)
    var name = e.getAttribute("name");
    // alert('name:'+name)
  
    var no = elementId.substr(5)
    // alert('no:'+no)

    // $('#pnl0').css("margin-bottom","-=100px")
    var selector = e
    var myparent  = $(e).parent().closest('div');
    // console.log(myparent)
    var selector_parent = myparent
    // console.log(selector_parent)
    var current_height =  $(selector_parent).css("height")
    // alert(current_height)

    var lat = $('#lat'+ no).text()
    // alert(lat)
    var lng = $('#lon'+ no).text()
    // alert(lng)

    var location = {lat:lat,lng:lng}
    // console.log(location)

    // minimize all content
    var container_div = document.getElementById('live_monitor');
    var count = container_div.getElementsByClassName('pnl').length;
    var content = container_div.getElementsByClassName('pnl')

    // alert(count)

    for (i=0;i<=count-1;i++)
    {
        // console.log('id',content[i].id)
        var id = content[i].id
        // console.log('id',id)
        var no_id = id.substr(3)
        // console.log('no_id',no_id)
        $('#pnl' + no_id).css("height","30px")
        $('#angle' + no_id).html('<i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>')
        $('#img_location'+ no_id).css("visibility","hidden")
        $('#location'+ no_id).css("visibility","hidden")
        $('#img_time'+ no_id).css("visibility","hidden")
        $('#time'+ no_id).css("visibility","hidden")
        $('#options'+ no_id).css("visibility","hidden")
        $('#td_arrow' + no_id).css("border-bottom-right-radius","5px")
       
    }
    
    if (current_height== '160px'){
        $(selector_parent).css("height","30px")
        $('#angle' + no).html('<i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>')
        $('#img_location'+ no).css("visibility","hidden")
        $('#location'+ no).css("visibility","hidden")
        $('#img_time'+ no).css("visibility","hidden")
        $('#time'+ no).css("visibility","hidden")
        $('#options'+ no).css("visibility","hidden")
        $('#td_arrow' + no).css("border-bottom-right-radius","5px")
      
    } else{
        $(selector_parent).css("height","160px")
        $('#angle'+ no).html('<i class="fa fa-angle-up fa-2x" aria-hidden="true"></i>')
        $('#img_location'+ no).css("visibility","visible")
        $('#location'+ no).css("visibility","visible")
        $('#img_time'+ no).css("visibility","visible")
        $('#time'+ no).css("visibility","visible")
        $('#options'+ no).css("visibility","visible")
        $('#td_arrow' + no).css("border-bottom-right-radius","0px")
        
        getAddress(location).then( result => {
            var address = result
            // console.log(address)
            $('#location'+ no).text(address)
        })
    
    }   
    
    $(selector).after('<p></p>')
}

function getClickedTitle(e){
    let elementId = e.id;
    var selector = e
    // console.log(elementId)
    var myparent  = $(e).parent().closest('div');
    // console.log(myparent)
    var selector_parent = myparent
    // console.log(selector_parent)
    var current_height =  $(selector_parent).css("height")
    var no = elementId.substr(5)
    // console.log('no:',no)

    var lat = $('#lat'+ no).text()
    // alert(lat)
    var lng = $('#lon'+ no).text()
    // alert(lng)

    var location = {lat:lat,lng:lng}
    // console.log(location)

    // minimize all content
    var container_div = document.getElementById('live_monitor');
    var count = container_div.getElementsByClassName('pnl').length;
    var content = container_div.getElementsByClassName('pnl')

    for (i=0;i<=count-1;i++)
    {
        // console.log('id',content[i].id)
        var id = content[i].id
        // console.log('id',id)
        var no_id = id.substr(3)
        // console.log('no_id',no_id)
        $('#pnl' + no_id).css("height","30px")
        $('#angle' + no_id).html('<i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>')
        $('#img_location'+ no_id).css("visibility","hidden")
        $('#location'+ no_id).css("visibility","hidden")
        $('#img_time'+ no_id).css("visibility","hidden")
        $('#time'+ no_id).css("visibility","hidden")
        $('#options'+ no_id).css("visibility","hidden")
        $('#td_arrow' + no_id).css("border-bottom-right-radius","5px")
        $('#title_row' + no_id).css("background-color","white")
        $('#title_row' + no_id).css("color","black")
        $('#v_uid' + no_id).css("color","black")

    }
    
    if (current_height== '160px'){
        $(selector_parent).css("height","30px")
        $('#angle' + no).html('<i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>')
        $('#img_location'+ no).css("visibility","hidden")
        $('#location'+ no).css("visibility","hidden")
        $('#img_time'+ no).css("visibility","hidden")
        $('#time'+ no).css("visibility","hidden")
        $('#options'+ no).css("visibility","hidden")
        $('#td_arrow' + no).css("border-bottom-right-radius","5px")
        $('#title_row' + no).css("background-color","white")
        $('#v_uid' + no).css("color","black")
        $('#angle' + no).css("color","black")
    } else{
        $(selector_parent).css("height","160px")
        $('#angle'+ no).html('<i class="fa fa-angle-up fa-2x" aria-hidden="true"></i>')
        $('#img_location'+ no).css("visibility","visible")
        $('#location'+ no).css("visibility","visible")
        $('#img_time'+ no).css("visibility","visible")
        $('#time'+ no).css("visibility","visible")
        $('#options'+ no).css("visibility","visible")
        $('#td_arrow' + no).css("border-bottom-right-radius","0px")
        $('#title_row' + no).css("background-color","#436AAC")
        $('#v_uid' + no).css("color","white")
        $('#angle' + no).css("color","white")

        getAddress(location).then( result => {
            var address = result
            // console.log(address)
            $('#location'+ no).text(address)
        })
    
    }   
    
    $(selector).after('<p></p>')

}

// sub menu handler ==================================================

function live_tracking(e){
    var selection = e.id
    // alert(selection)
    var no = selection.substr(4)
    // alert (no)
    var sclId = $('#pnl'+no).attr("name")
    // alert(sclId)
    selected_sclId = sclId
    // alert(selection)
    // alert(sclId)
    $('#cc_monitor').layout('panel','west').panel('close');
    $('#cc_monitor').layout('resize');
    $('#live_box').css('visibility','visible')
    historyMarker =[]

    current_section = 'live_tracking'
    processing_data(current_section,sclId)
    
    // alert(current_section)
}


function live_tracking_marker(e){

    var sclId = e
    // alert(sclId)
    selected_sclId = sclId
    // alert(selection)
    // alert(sclId)
    $('#cc_monitor').layout('panel','west').panel('close');
    $('#cc_monitor').layout('resize');
    $('#live_box').css('visibility','visible')
    historyMarker =[]

    current_section = 'live_tracking'
    processing_data(current_section,sclId)
    
    // alert(current_section)
}

function close_live_box(){
    $('#cc_monitor').layout('panel','west').panel('open');
    $('#cc_monitor').layout('resize');
    $('#live_box').css('visibility','hidden')
    $('#toggle_place').linkbutton({
        selected:false
    })

    for (i=0;i<= arr_drivingPath.length-1;i++)
    {
        arr_drivingPath[i].setMap(null)
    }
    arr_drivingPath =[]
    drivingPlanCoordinates = []
    
    current_section = 'pantau'
    // directionsRenderer.setMap(null);
    
    processing_data(current_section,null,prev_mode,false,null)

    // alert(current_section)
}

function riwayat(e){
    var selection = e.id
    // alert(selection)
    var no = selection.substr(7)
    // alert(no)
    $('#cc_monitor').layout('panel','west').panel('close');
    $('#cc_monitor').layout('resize');
    var sclId = $('#pnl'+no).attr("name")
    var selected_vehicleUid = $('#pnl'+no)
    // alert(sclId)
    $('#history_box').css('visibility','visible')
    $('#history_box_table').css('visibility','visible')
    $('#close_history').css('visibility','visible')
    current_section = 'riwayat'
    processing_data(current_section,sclId)
    // alert(current_section)
}

function riwayat_marker(e){
    // var selection = e
    console.log('marker detail',e)
    $('#cc_monitor').layout('panel','west').panel('close');
    $('#cc_monitor').layout('resize');
    var sclId = e
    $('#history_box').css('visibility','visible')
    $('#history_box_table').css('visibility','visible')
    $('#close_history').css('visibility','visible')
    current_section = 'riwayat'
    processing_data(current_section,sclId)
}

function close_riwayat(){

    $('#dt1').datebox('setValue','')
    $('#dt2').datebox('setValue','')
    
    $('#cc_monitor').layout('panel','west').panel('open');
    $('#cc_monitor').layout('resize');
    $('#history_box').css('visibility','hidden')
    $('#history_box_table').css('visibility','hidden')
    $('#close_history').css('visibility','hidden')
    $('#toggle_place').linkbutton({
        selected:false
    })
    for(i=0;i<=arr_tout.length-1;i++){
        clearTimeout(arr_tout[i])
    }
    arr_tout = []
    row_index_selected =0
    current_section = 'pantau'
    // $('#toggle_vehicle').css('width','100px')
    // $('#toggle_vehicle').css('height','40px')
    // $('#toggle_place').css('width','100px')
    // $('#toggle_place').css('height','40px')

    processing_data(current_section,null,prev_mode,false,null)
    // alert(current_section)
}

function detail(e){
    var selection = e.id
    //alert(selection)
    var no = selection.substr(6)
    var sclId = $('#pnl'+no).attr("name")
    $('#cc_monitor').layout('panel','west').panel('close');
    $('#cc_monitor').layout('resize');
    $('#detail_box').css('visibility','visible')
    current_section = 'detail'
    processing_data(current_section,sclId,'semua',false,null)
    // alert(current_section)
}

function detail_marker(e){
  
    var sclId = e
    $('#cc_monitor').layout('panel','west').panel('close');
    $('#cc_monitor').layout('resize');
    $('#detail_box').css('visibility','visible')
    current_section = 'detail'
    processing_data(current_section,sclId,'semua',false,null)
    // alert(current_section)
}

function close_detail_box(){
    $('#cc_monitor').layout('panel','west').panel('open');
    $('#cc_monitor').layout('resize');
    $('#detail_box').css('visibility','hidden')
    current_section = 'pantau'
    processing_data(current_section,null,prev_mode,false,null)
    // alert(current_section)
}

function semua(){
    //alert('semua')
    current_section = 'pantau'
    
    clearInterval(t1_moving)
    clearInterval(t1_offline)
    clearInterval(t1_stop)
    processing_data(current_section,null,'semua',false,null,userid)
}

function bergerak(){
    // alert('bergerak')
    current_section = 'pantau'
    clearInterval(t1_all)
    clearInterval(t1_offline)
    clearInterval(t1_stop)
    processing_data(current_section,null,'bergerak',false,null,userid)
}
function diam(){
    //alert('diam')
    current_section = 'pantau'
    clearInterval(t1_all)
    clearInterval(t1_offline)
    clearInterval(t1_moving)
    processing_data(current_section,null,'diam',false,null,userid)
}

function offline(){
    // alert('offline')
    current_section = 'pantau'
    clearInterval(t1_all)
    clearInterval(t1_moving)
    clearInterval(t1_stop)
    processing_data(current_section,null,'offline',false,null,userid)
}


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  $('#g3_1').bind('click', function(){
    // alert('easyui');

    $('#g3_1').css('backkground','white')
    $('#g3_2').css('backkground','transparent')
    read_speed_data = 500

    // console.log('speed:' + speed)
});

$('#g3_2').bind('click', function(){
    // alert('easyui');

    $('#g3_1').css('backkground','transparent')
    $('#g3_2').css('backkground','white')
    read_speed_data = 100

});

function logout(){
    sessionStorage.clear();
    window.history.forward();
    window.location ='/'
}

function mydtformatter(date)
  {
    //alert('mydtformatter(date) date=['+ date +']');
   
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    var s1 = String(y) + '-' + String(m<10?('0'+m):m) + '-' + String(d<10?('0'+d):d) ;
   
    
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    var s2 = String(hh<10?('0'+hh):hh) + ':' + String(mm<10?('0'+mm):mm) + ':' + String(ss<10?('0'+ss):ss);
   
    // alert('mydtformatter(date) return date=['+ s1 + ' ' + s2 +']');

    return s1 + ' ' + s2;
  } 

  function mydtparser(s)
  {
    //alert('mydtparser(s) s=['+ s +']');
    if ( (!s) || ($.trim(s) == '') )
      {return new Date();}
    var dt = s.split(' ');
    var dateFormat = dt[0].split('-');
    var timeFormat = dt[1].split(':');
    var date = new Date( parseInt(dateFormat[0]),parseInt(dateFormat[1])-1,parseInt(dateFormat[2]) );
    // alert(date)
    if (dt.length>1){
      date.setHours(timeFormat[0]);
      date.setMinutes(timeFormat[1]);
      date.setSeconds(timeFormat[2]);
    }
    //alert('mydtparser(s) return date=['+ date +']');
    return date;
  }

  function FormatedDate(d){
    var  tahun = d.getFullYear()
    var bulan = d.getMonth()+1
    var tanggal = d.getDate()
    var jam = d.getHours()
    var menit = d.getMinutes()
    var detik = d.getSeconds()

    if (jam< 10){
        jam = "0" + jam 
    }
    if (menit<10){
        menit = "0" + menit 
    }
    if(detik<10){
        detik = "0" + detik
    }

    var bln_text = ''

    if (bulan == 1){
        bln_text = 'Januari'
    }else if (bulan == 2) {
        bln_text = 'Februari'
    }else if(bulan == 3) {
        bln_text = 'Maret'
    }else if (bulan == 4) {
        bln_text = 'April'
    }else if(bulan == 5) {
        bln_text ='Mei'
    }else if (bulan == 6){
        bln_text = 'Juni'
    }else if( bulan == 7) {
        bln_text = 'Juli'
    }else if (bulan ==8){
        bln_text = 'Agustus'
    } else if (bulan ==9){
        bln_text = 'September'
    }else if (bulan == 10){
        bln_text = 'Oktober'
    }else if ( bulan == 11) {
        bln_text ='November'
    }else{
        bln_text = 'Desember'
    }

    var tgl_baru = tanggal + ' ' + bln_text + ' ' + tahun + ' ' + jam + ':' + menit + ':' + detik + ' WIB'
    return tgl_baru
}


function FormatedDate1(d){
    var  tahun = d.getFullYear()
    var bulan = d.getMonth()+1
    var tanggal = d.getDate()
    var jam = d.getHours()
    var menit = d.getMinutes()
    var detik = d.getSeconds()
    
    if (jam< 10){
        jam = '0' + jam 
    }
    if (menit<10){
        menit = '0' + menit 
    }
    if(detik<10){
        detik = '0' + detik
    }

    if (tanggal<10){
        tanggal = '0' + tanggal
    }
    if (bulan<10){
        bulan = '0' + bulan
    }
    var bln_text = ''

    if (bulan == 1){
        bln_text = 'Januari'
    }else if (bulan == 2) {
        bln_text = 'Februari'
    }else if(bulan == 3) {
        bln_text = 'Maret'
    }else if (bulan == 4) {
        bln_text = 'April'
    }else if(bulan == 5) {
        bln_text ='Mei'
    }else if (bulan == 6){
        bln_text = 'Juni'
    }else if( bulan == 7) {
        bln_text = 'Juli'
    }else if (bulan ==8){
        bln_text = 'Agustus'
    } else if (bulan ==9){
        bln_text = 'September'
    }else if (bulan == 10){
        bln_text = 'Oktober'
    }else if ( bulan == 11) {
        bln_text ='November'
    }else{
        bln_text = 'Desember'
    }

    var tgl_baru = tanggal + '/' + bulan + '/' + tahun + ' ' + jam + ':' + menit + ':' + detik + ' WIB'
    // var tgl_baru = tanggal + ' ' + bln_text + ' ' + tahun + ' ' + jam + ':' + menit + ':' + detik + ' WIB'
    return tgl_baru
}

// epoch ======================================================================================

function datetime_to_epoch (date) {
    return Date.parse(date)
}

function epoch_to_datetime(epoch){
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(epoch);
    return d
}

// degree to DMS ===============================================================================

function deg_to_dms (deg) {
    var d = Math.floor (deg);
    var minfloat = (deg-d)*60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat-m)*60;
    var s = Math.round(secfloat);
    // After rounding, the seconds might become 60. These two
    // if-tests are not necessary if no rounding is done.
    if (s==60) {
      m++;
      s=0;
    }
    if (m==60) {
      d++;
      m=0;
    }
    return ("" + d + ":" + m + ":" + s);
 }

 
function FormatedTime(d){
    var  tahun = d.getFullYear()
    var bulan = d.getMonth()+1
    var tanggal = d.getDate()
    var jam = d.getHours()
    var menit = d.getMinutes()
    var detik = d.getSeconds()
    if (jam.length == 1){
        jam = "0" + jam 
    }
    if (menit<10){
        menit = "0" + menit 
    }
    if(detik<10){
        detik = "0" + detik
    }

    var bln_text = ''

    if (bulan == 1){
        bln_text = 'Januari'
    }else if (bulan == 2) {
        bln_text = 'Februari'
    }else if(bulan == 3) {
        bln_text = 'Maret'
    }else if (bulan == 4) {
        bln_text = 'April'
    }else if(bulan == 5) {
        bln_text ='Mei'
    }else if (bulan == 6){
        bln_text = 'Juni'
    }else if( bulan == 7) {
        bln_text = 'Juli'
    }else if (bulan ==8){
        bln_text = 'Agustus'
    } else if (bulan ==9){
        bln_text = 'September'
    }else if (bulan == 10){
        bln_text = 'Oktober'
    }else if ( bulan == 11) {
        bln_text ='November'
    }else{
        bln_text = 'Desember'
    }

    var tgl_baru =  jam + ':' + menit + ':' + detik + ' WIB'
    return tgl_baru
}


function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    var hDisplay = h
    var mDisplay = m
    var sDisplay = s

    return hDisplay + ':' + mDisplay + ':' + sDisplay; 
}


function changeColor(e){
    $(e).addClass("info1");
}

function restoreColor(e){
    $(e).removeClass("hoverTable");
}


//table button formatter  for dg_place

function formatAction(){
   
    // console.log (value)
            // var style = `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;"><a href="#" onclick="view_data()"><img src="/img/view.png" width=28 height=28 /></div>`
            var style = `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:0px;margin-left:30px;"><a href="#" onclick="edit_data()"><img src="/img/edit1.png" width=28 height=28 /></div>`
            style+= `<div style="border: 0px solid red;width:30px;height:30px;text-align:center;padding-top:0px;margin-top:-30px;margin-left:60px;"><a href="#" onclick="ask_delete()"><img src="/img/delete1.png" width=28 height=28 /></div>`
  
     
    
    return style
}


function ask_delete(){

    var img = "/img/info.png"
    var msg =  `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
        msg += `<div style="width:100%;height:40px;text-align:center;font-size:18px;font-weight:900;margin-top:-10px;"> Hapus File ? </div>`
        msg += `<div style="color:#353736;text-align:center;margin-top:-10px;">Apakah kamu sudah yakin ingin menghapus file ini?</div>`
        msg += `<div style="width:100%;height:40px;text-align:center;margin-top:0px;"> `
        msg += `<hr style="width: 280px;margin-top:10px;margin-left:0px;">`
        msg += `</div>`
        msg += `<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#E93426;cursor:pointer;float:left;width:100px;border:0px solid red;margin-left:20px;" onclick="javascript:dlg.dialog('close');">Cancel</div>`
        msg += `<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;float:right;width:100px;border:0px solid red;margin-right:20px;" onclick="delete_data()" >Yakin</div>`
        msg += `<div class="vl"></div>`

      dlg= $.messager.show({
                    
        msg: msg,
        showType:'fade',
        border:'thin',
        cls: 'cls1',
        height:180,
        style:{
            right:'',
            bottom:''
        }
    });
}

async function delete_data(value){
    dlg.dialog('close');
    var img
    var row = $('#dg_place').datagrid('getSelected');
    var placeUid = row.placeUid
    // alert(placeUid)
    var result = await proccess_delete(placeUid)
    console.log(result)
    if (result.status='success'){
        $('#dg_place').datagrid('reload')
        img = "/img/success.png"
        var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
        msg+= `<div style="width:100%;height:40px;text-align:center"> Data berhasil dihapus </div>`
        msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
                                <hr style="width: 280px;margin-top:10px;margin-left:0px;">
                            </div>
                            <div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
                                OK
                            </div>
                            `
    }else{
        img = "/img/red_close.png"
        var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
        msg+= `<div style="width:100%;height:40px;text-align:center"> Hapus data tidak diijinkan </div>`
        msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
                                <hr style="width: 280px;margin-top:10px;margin-left:0px;">
                            </div>
                            <div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
                                OK
                            </div>
                            `
    }
}

async function  proccess_delete(id){
    var url = "/geofence/delete"
    var data = {id:id}

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ placeUid: id })
    };

    const response = await fetch(url,requestOptions)
    .then(response => response.json()) 
    .then(json => {
        // alert (json)
       return json
    })

    return response
}