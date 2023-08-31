
var username = sessionStorage.getItem("username")
var level = sessionStorage.getItem("level")
var selected_phone = ''
$('#username').text(username)
$('#level').text(level)

Chat()
 
function Dashboard(){
  window.location ="dashboard"
}

function Monitor(){
    //alert('dashboard')
     
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });
    window.location='monitor';
    
    
}

function Device(){
    //alert('dashboard')
     
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });
    window.location='device';
    
    
}

function Petugas(){
    window.location='petugas';
}

function Tasklist(){


    window.location='tasklist';
}

function Chat(){
    var width_monitor = $('#monitor').css('width')
    var width_tasklist = $('#tasklist').css('width')
    
    
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });

    $('#monitor').linkbutton({
        iconCls: 'icon-monitor-black',
        selected:false
    });
    

    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist-black',
        selected:false
    });

    
    $('#chat').linkbutton({
        iconCls: 'icon-chat',
        selected:true
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

    
   
    $('#title_page').text('Chat')
}

function Notifikasi(){
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });

    $('#monitor').linkbutton({
        iconCls: 'icon-monitor-black',
        selected:false
    });
    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist-black',
        selected:false
    });

    $('#alert').linkbutton({
        iconCls: 'icon-bell',
        selected:true
    });
    
    $('#report').linkbutton({
        iconCls: 'icon-document-black',
        selected:false
    });

    $('#setting').linkbutton({
        iconCls: 'icon-setting-black',
        selected:false
    });
}


function Laporan(){
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });

    $('#monitor').linkbutton({
        iconCls: 'icon-monitor-black',
        selected:false
    });
    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist-black',
        selected:false
    });

    $('#alert').linkbutton({
        iconCls: 'icon-bell-black',
        selected:false
    });

    
    $('#report').linkbutton({
        iconCls: 'icon-document',
        selected:true
    });

    $('#setting').linkbutton({
        iconCls: 'icon-setting-black',
        selected:false
    });
}

function Setting(){
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard-black',
        selected:false
    });

    $('#monitor').linkbutton({
        iconCls: 'icon-monitor-black',
        selected:false
    });
    $('#tasklist').linkbutton({
        iconCls: 'icon-tasklist-black',
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
        iconCls: 'icon-setting1',
        selected:true
    });
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

//   async function member_chats(){
//     var url='/user'
//     var res = await fetch(url)
//      .then(response => {
//          // handle the response
//         return response.json()
//      })
//      .catch(error => {
//          // handle the error
//      });

//      var pnl =''
//      console.log('res',res)

//      for (i=0;i<=res.length-1;i++){

//             pnl += `<div><img src="/img/icon_petugas.png" style="width:40px;height:40px;vertical-align:middle;"><span style="margin-top: -30px;left: 60px;margin-left: 10px;font-size: 14px;font-family: 'Poppins';">`+ res[i].username +`</span></div>`
//      }

    
//     $('#chat_member').append(pnl)

     
//   }

$('#chat_member').datalist({
    onSelect: function(rowIndex, rowData){
        var data = rowData.value
        var separator = data.indexOf('_')
        var phone = data.substr(0,separator)
        selected_phone = phone
        var petugas = data.substr(separator+1)
        $('#selected_petugas').text(petugas)
        // alert(rowData.value)
        // alert(phone)
        // alert(petugas)

        // load chat data
        load_chat_data()

       
        
    }
})


function load_chat_data(){
    var chat_data = ` 
    <div class="chat-container">
    <div class="message-box my-message">
      <p>I've been waiting to see that show asap!<br><span>07:43</span></p>
    </div>
    <div class="message-box friend-message">
      <p>Ahh, I can't believe you do too!<br><span>07:45</span></p>
    </div>
    <div class="message-box friend-message">
      <p>The trailer looks good<br><span>07:45</span></p>
    </div>
    <div class="message-box friend-message">
      <p>I've been waiting to watch it!!<br><span>07:45</span></p>
    </div>
    <div class="message-box my-message">
      <p>😐😐😐<br><span>07:46</span></p>
    </div>
    <div class="message-box my-message">
      <p>Mee too! 😊<br><span>07:46</span></p>
    </div>
    <div class="message-box friend-message">
      <p>We should video chat to discuss, if you're up for it!<br><span>07:48</span></p>
    </div>
    <div class="message-box my-message">
      <p>Sure<br><span>07:48</span></p>
    </div>
    <div class="message-box my-message">
      <p>I'm free now!<br><span>07:48</span></p>
    </div>
    <div class="message-box friend-message">
      <p>Awesome! I'll start a video chat with you in a few.<br><span>07:49</span></p>
    </div>      
    </div>`

    $('#chat_content').text('')

    $('#chat_content').append(chat_data)
}

