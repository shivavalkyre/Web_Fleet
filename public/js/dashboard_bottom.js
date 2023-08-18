
var username = sessionStorage.getItem("username")
var level = sessionStorage.getItem("level")
$('#username').text(username)
$('#level').text(level)

Dashboard()
 
function Dashboard(){
    var width_monitor = $('#monitor').css('width')
    var width_tasklist = $('#tasklist').css('width')
    
    
    $('#dashboard').linkbutton({
        iconCls: 'icon-dashboard',
        selected:true
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

    
   
    $('#title_page').text('Dashboard')
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


function Tasklist(){
    //alert('tasklist')

    // var width_monitor = $('#monitor').css('width')
    // var width_tasklist = $('#tasklist').css('width')

    // $('#dashboard').linkbutton({
    //     iconCls: 'icon-dashboard-black',
    //     selected:false
    // });

    // $('#monitor').linkbutton({
    //     iconCls: 'icon-monitor-black',
    //     selected:false
    // });
    // $('#tasklist').linkbutton({
    //     iconCls: 'icon-tasklist',
    //     selected:true
    // });

    // $('#alert').linkbutton({
    //     iconCls: 'icon-bell-black',
    //     selected:false
    // });
    
    // $('#report').linkbutton({
    //     iconCls: 'icon-document-black',
    //     selected:false
    // });
    
    // $('#setting').linkbutton({
    //     iconCls: 'icon-setting-black',
    //     selected:false
    // });
      
    // if (width_monitor=='40px' && width_tasklist == '40px'){
    //     $('#monitor').css('width','20%')
    //     $('#tasklist').css('width','20%')
    // }else{
    //     $('#monitor').css('width','100%')
    //     $('#tasklist').css('width','100%')
    // }

    // $('#title_page').text('Penugasan')

    window.location='tasklist';
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

  $('#view_task').bind('click', function(){
    window.location = '/tasklist'

});
