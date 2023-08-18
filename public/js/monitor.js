

var map = null
var isinitializeMap = false
var  isreinitializeMap = false
var prevSpeed
var prevStatus
var prev_row_index_selected
var row_index_selected=0
// var tout
var tint
var arr_tout = []
var arr_tint = []
var paused_history = false
var stopped_history = false
var k
var data_riwayat
var prev_history_latitude
var prev_history_longitude
var prev_mode




		$(document).ready(function(){
			close_live_box()
			close_riwayat()
			close_detail_box()

			InitializeMap()
			processing_data('pantau',null,'semua',false,null)

			var g3_1 = document.getElementById('g3_1')
			g3_1.style.color ='black'
			g3_1.style.background = 'white'
			var g3_2 = document.getElementById('g3_2')
			g3_2.style.color ='white'
			

			$('#mini_me').click(function(e) {  
				var mypos = $('#mini_me').css('margin-left')
				if (mypos == '230px')
				{
					$('#mini_me').css('margin-left','70px')
					$("#img_mini_me").attr("src","/img/mini1.png");

					w=90
					p = $('#cc').layout('panel','west');
					p.panel('resize', {width:w});
					$('#cc').layout('resize');

					$('#dashboard').css('width','20%')
					$('#monitor').css('width','20%')
					$('#tasklist').css('width','20%')
					$('#alert').css('width','20%')
					$('#report').css('width','20%')
					$('#setting').css('width','20%')

				}else{
					$('#mini_me').css('margin-left','230px')
					$("#img_mini_me").attr("src","/img/mini.png");
					w=250
					p = $('#cc').layout('panel','west');
					p.panel('resize', {width:w});
					$('#cc').layout('resize');

					
					$('#dashboard').css('width','100%')
					$('#monitor').css('width','100%')
					$('#tasklist').css('width','100%')
					$('#alert').css('width','100%')
					$('#report').css('width','100%')
					$('#setting').css('width','100%')
				}
				
			  });

			  $('#level').text(level)

			//   $('#dt1').datetimebox({
	
			// })

			var tb = $('#usearch');
				tb.textbox('textbox').bind('keydown', function(e){
				if (e.keyCode == 13){   // when press ENTER key, accept the inputed value.
					var value = tb.textbox('getValue')
					if (value.length>0){
						// alert('search')
						// CreateDataSearch(value)
						current_section = 'pantau'
						clearInterval(t1_moving)
						clearInterval(t1_offline)
						clearInterval(t1_stop)
						clearInterval(t1_all)
						clearInterval(t2)
						clearInterval(t3)
						clearInterval(t4)

						processing_data(current_section,null,null,true,value)
					}else{
						current_section = 'pantau'
						clearInterval(t1_moving)
						clearInterval(t1_offline)
						clearInterval(t1_stop)
						clearInterval(t2)
						clearInterval(t3)
						clearInterval(t4)

						processing_data(current_section,null,prev_mode,false,null)
					}
				}
				});	

				document.getElementById('g3_1').onclick = function () {
					this.style.color= 'black';
					this.style.background = '#ffffff'
					var g3_2 = document.getElementById('g3_2')
					g3_2.style.color ='white'
					g3_2.style.background = 'transparent'
				};

				document.getElementById('g3_2').onclick = function () {
					this.style.color= 'black';
					this.style.background = '#ffffff'

					var g3_1 = document.getElementById('g3_1')
					g3_1.style.color ='white'
					g3_1.style.background = 'transparent'
				};
		});
		