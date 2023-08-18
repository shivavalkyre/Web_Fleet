$('#logo').hide();

       var data = [{
            text: 'Dashboard',
            iconCls: 'fa fa-wpforms',
            state: 'open',
            children: [{
                text: 'Vehicle Overview'
            },{
                text: 'Real Time Data'
            },{
                text: 'Event'
            }]
        },{
            text: '  Vehicle',
            iconCls: 'fa fa-car',
            selected: true,
			state:'open',
            children: [{
                text: 'Fleet'
            },{
                text: 'Vehicle Assignment'
            },{
                text: 'Vehicle Detail',
				state:'open',
            }]
        },{
            text: '  Trips',
            iconCls: 'fa fa-map',
			state:'open',
            children: [{
                text: 'Overview'
            },{
                text: 'Upcomming Trip'
            },{
                text: 'Schedule Trip'
            }]
        },{
            text: 'Maintenance',
            iconCls: 'fa fa-gear',
			state:'open',
            children: [{
                text: 'Maintenance Planer'
            },{
                text: 'History'
            }]
        },{
            text: 'Analytics',
            iconCls: 'fa fa-pie-chart',
			state:'open',
            children: [{
                text: 'Overview'
            }]
        }
	];
 
        function toggle(){
			
            var opts = $('#sm').sidemenu('options');
            $('#sm').sidemenu(opts.collapsed ? 'expand' : 'collapse');
            opts = $('#sm').sidemenu('options');
            $('#sm').sidemenu('resize', {
                width: opts.collapsed ? 60 : 208
            })
			console.log(opts.collapsed)

			if(opts.collapsed==true){
					
				
				 
				  p = $('#cc').layout('panel','west');
				
						w=62
						p.panel('resize', {width:w});
						$('#cc').layout('resize');
						$('#logo').show();
						console.log(w);
			}else{
				p = $('#cc').layout('panel','west');
				
				w=211
				p.panel('resize', {width:w});
				$('#cc').layout('resize');
				$('#logo').hide();
				console.log(w);
			}
        }

