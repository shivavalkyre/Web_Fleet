
var username = sessionStorage.getItem("username")
var level = sessionStorage.getItem("level")
$('#username').text(username)
$('#level').text(level)

Dashboard()

// 
function Dashboard(){
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

    $('#title_page').text('Dashboard')
    $('#p').panel({href:'overview'});
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
    
    if (width_monitor=='40px' || width_tasklist == '40px'){
        $('#monitor').css('width','20%')
        $('#tasklist').css('width','20%')
    }else{
        $('#monitor').css('width','100%')
        $('#tasklist').css('width','100%')
    }

    
    $('#p').panel({
        href:'dashboard'
    });
    // $('#p').attr('src','dashboard')
    $('#title_page').text('Pantauan')
    
    
}


function Tasklist(){
    //alert('tasklist')

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
        iconCls: 'icon-tasklist',
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
      
    if (width_monitor=='40px' || width_tasklist == '40px'){
        $('#monitor').css('width','20%')
        $('#tasklist').css('width','20%')
    }else{
        $('#monitor').css('width','100%')
        $('#tasklist').css('width','100%')
    }

    $('#title_page').text('Penugasan')


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