$("#login").click(function(){
			
			var action = $("#lg-form").attr('action');
			var form_data = {
				uname: $("#uname").textbox('getValue'),
				upass: $("#upass").textbox('getValue'),
				is_ajax: 1
			};
			
			$.ajax({
				type: "POST",
				url: './control/validate.php',
				data: form_data,
				success: function(response)
				{
					
					//alert(response);
					if(response == "success")
						$("#lg-form").slideUp('slow', function(){
							$("#message").html('<p class="success">You have logged in successfully!</p><p>Redirecting....</p>');
							setTimeout(myFunction, 1000);
						});
					else
						$("#message").html('<p class="error">ERROR: Invalid username and/or password.</p>');
				}	
			});
			return false;
		});	
		
function myFunction() {
window.location='home.php';
}		