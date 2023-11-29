var username = sessionStorage.getItem("username")
var level = sessionStorage.getItem("level")
var selected_phone = ''
$('#username').text(username)
$('#level').text(level)

Laporan()
 
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

function Vehicle(){
    window.location ='vehicle'
}

function Chat(){
    
   window.location ='chat'
}

function Notifikasi(){
    // $('#dashboard').linkbutton({
    //     iconCls: 'icon-dashboard-black',
    //     selected:false
    // });

    // $('#monitor').linkbutton({
    //     iconCls: 'icon-monitor-black',
    //     selected:false
    // });
    // $('#tasklist').linkbutton({
    //     iconCls: 'icon-tasklist-black',
    //     selected:false
    // });

    // $('#alert').linkbutton({
    //     iconCls: 'icon-bell',
    //     selected:true
    // });
    
    // $('#report').linkbutton({
    //     iconCls: 'icon-document-black',
    //     selected:false
    // });

    // $('#setting').linkbutton({
    //     iconCls: 'icon-setting-black',
    //     selected:false
    // });
    window.location='notifikasi'
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