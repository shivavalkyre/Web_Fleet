	

		$(document).ready(function(){
			// here paste google maps code

			$('#p').panel({href:'overview'})

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
		});