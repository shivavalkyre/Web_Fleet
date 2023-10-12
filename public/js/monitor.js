

var map = null
var map_place = null
var isinitializeMap = false
var  isreinitializeMap = false
var prevSpeed
var prevStatus
var prev_row_index_selected
var row_index_selected=0
var geofences = []
var gmarkers_place = []
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
var place_save_status
var selected_placeUid

var username = sessionStorage.getItem("username");
var level = sessionStorage.getItem("level");
var area = sessionStorage.getItem("area");
var userid =  sessionStorage.getItem("id");


		$(document).ready(function(){

			close_live_box()
			close_riwayat()
			close_detail_box()

			$('#geofence_box').hide();
			$('#geo_circle').hide();
			$('#geo_poly').hide();

			// var tt = $('#address_geo1');

			// tt.textbox('textbox').attr('autocomplete', 'on');

			// tt.textbox('textbox').bind('keydown', function(e){
			// 	if (e.keyCode == 13){   // when press ENTER key, accept the inputed value.
			// 		// alert('here')
			// 		var marker_geo  = null
					
			// 		AddressToLatLng($(this).val())
			// 		// map_place
			// 	}
			// });	
			$('#clear_geo_shape').bind('click', function(e){
				InitializeMapPlace()
				// alert('here')
				$('#coordinates_geo1').textbox('setValue','')
				$('#placeId_geo1').textbox('setValue','')
				$('#pac-input').val('')
				$('#radius_geo1').textbox('setValue','')
				deleteAllShape()
			})
			

			$('#create_geo_shape').bind('click', function(e){

				console.log('place_save_status',place_save_status)

				if (place_save_status == 0)
				{
					//check radius minimum 75
					var coord = $('#coordinates_geo1').textbox('getValue')
					var identify = coord.substr(0,1)
					console.log('identify',identify)
   
					if(identify == '{'){
					   // circle
					   var json_coord =JSON.parse(coord)
					   var lat = JSON.parse(coord).lat
					   var lng = JSON.parse(coord).lng
					   console.log('lat',lat)
					   console.log('lng',lng)
   
					   console.log('json_coord',json_coord)
   
					   // address =  $('#address_geo1').textbox('getValue')
					   address = $('#pac-input').val()
					   placeId =  $('#placeId_geo1').textbox('getValue')
   
					   if (lat !='' && lng != '' && address != '' && placeId != ''){
						   var radius = $('#radius_geo1').textbox('getValue')
						   var data = {
							   "mode":"circle",
							   "placeId" : placeId,
							   "address" : address,
							   "coordinates": [lat,lng],
							   "radius"  : radius
						   }
						   console.log('data',data)
						   createDataCirlceGeofence(data)
					   }else{
						   alert('Harap isi dengan lengkap')
					   }
					   
   
					}else if(identify == '['){
					   // polygon
   
						   address =   $('#pac-input').val()
						   placeId =  $('#placeId_geo1').textbox('getValue')
   
						   var data = {
							   "mode":"polygon",
							   "placeId" : placeId,
							   "address" : address,
							   "coordinates": coord
						   }
						   createDataPolygonGeofence(data)
   
					}
				}
				else
				{
					// alert('edit')
					var coord = $('#coordinates_geo1').textbox('getValue')
					var identify = coord.substr(0,1)
					console.log('identify',identify)

					if(identify == '{'){
						// circle
						var json_coord =JSON.parse(coord)
						var lat = JSON.parse(coord).lat
						var lng = JSON.parse(coord).lng
						console.log('lat',lat)
						console.log('lng',lng)
	
						console.log('json_coord',json_coord)
	
						// address =  $('#address_geo1').textbox('getValue')
						address = $('#pac-input').val()
						placeId =  $('#placeId_geo1').textbox('getValue')
	
						if (lat !='' && lng != '' && address != '' && placeId != ''){
							var radius = $('#radius_geo1').textbox('getValue')
							var data = {
								"placeUid": selected_placeUid,
								"mode":"circle",
								"placeId" : placeId,
								"address" : address,
								"coordinates": [lat,lng],
								"radius"  : radius
							}
							console.log('data',data)
							updateDataCirlceGeofence(data)
						}else{
							alert('Harap isi dengan lengkap')
						}
						
	
					 }else if(identify == '['){
							// polygon
   
							address =   $('#pac-input').val()
							placeId =  $('#placeId_geo1').textbox('getValue')
	
							var data = {
								"placeUid": selected_placeUid,
								"mode":"polygon",
								"placeId" : placeId,
								"address" : address,
								"coordinates": coord
							}
							console.log('data',data)
							updateDataPolygonGeofence(data)
					 }
				}
				 
				

			  });

			InitializeMap()
			InitializeMapPlace()
			processing_data('pantau',null,'semua',false,null,userid)

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

						processing_data(current_section,null,null,true,value,userid)
					}else{
						current_section = 'pantau'
						clearInterval(t1_moving)
						clearInterval(t1_offline)
						clearInterval(t1_stop)
						clearInterval(t2)
						clearInterval(t3)
						clearInterval(t4)

						processing_data(current_section,null,prev_mode,false,null,userid)
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

				$('#toggle_vehicle').linkbutton({
					onClick:function(){
					  var opts = $(this).linkbutton('options');
					//   alert (opts.selected)
					  if(opts.selected == false){
							
							clearInterval(t1_moving)
							clearInterval(t1_offline)
							clearInterval(t1_stop)
							clearInterval(t1_all)
							clearInterval(t2)
							clearInterval(t3)
							clearInterval(t4)
							ReInitializeMap(null,gmarkers)
							// clearMarkers()
					  }else{

							clearInterval(t1_moving)
							clearInterval(t1_offline)
							clearInterval(t1_stop)
							clearInterval(t1_all)
							clearInterval(t2)
							clearInterval(t3)
							clearInterval(t4)

							InitializeMap()
							processing_data('pantau',null,'semua',false,null,userid)
					  }
				}})

				$('#toggle_place').linkbutton({
					onClick:function(){
					  var opts = $(this).linkbutton('options');
					  
					  if(opts.selected == true){
							
							// hit api geofence
			

							// gmarkers_place = null

							var url = '/geofence/read'
							const requestOptions = {
								method: 'POST',
								headers: { 
									'Content-Type': 'application/json'
								},
							};
						
							fetch(url,requestOptions)
							.then(response => response.json()) 
							.then(json => {
								// alert (json)
								console.log('json',json)
								console.log('data length',json.places.length)
								// return json
								// var ctr = 0;
								// for (i=0; i<= json.places.length-1;i++){
								// 		var jparse = JSON.parse(json.places[i].coordinates)
								// 		// if (json.places[i].coordinates){
								// 		console.log('i',i)
								// 		console.log('jparse',jparse)
								// 		var type_geometry = jparse.geometry.type
								// 		console.log('type geometry',type_geometry)
								// 		console.log('=======================================')


								// 		if (type_geometry == 'Point'){
								// 			console.log('ctr',ctr)
								// 			ctr++

								// 				var lat = jparse.geometry.coordinates[1]
								// 				var lng = jparse.geometry.coordinates [0]
								// 				var radius = jparse.properties.radius.value
								// 				var center = {lat:lat,lng:lng}
								// 				var title = json.places[i].placeId
								// 				var address = json.places[i].address
								// 				console.log('lat',lat)
								// 				console.log('lng',lng)
								// 				console.log('radius',radius)
								// 				console.log('center',center)
								// 				console.log('title',title)
								// 				console.log('address',address)

												

								// 				drawCircle(lat,lng,radius,center,title,address,map,false)

								// 		}else{
								// 			console.log('ctr',ctr)
								// 			ctr++

								// 			// drawPolygon
								// 			console.log('ctr',ctr)
								// 			var coordinates = jparse.geometry.coordinates[0]
								// 			var title = json.places[i].placeId
								// 			var path_coordinates = []
								// 			for (l=0;l<=coordinates.length-1;l++){
								// 			   var lat = coordinates[l][1]
								// 			   var lon = coordinates[l][0]
											   
								// 			   var coordinate = {lat:lat,lng:lon}
								// 			   path_coordinates.push(coordinate)
								// 			}
								// 			ctr++
								// 		   //  console.log('path',path_coordinates)
								// 		   drawPolygon(path_coordinates,title,map,false)

								// 		}
								// 	// }
								// }

								showShapes(json.places)
							})	
					  	}else{
							
							// for (i=0;i<= geofences.length-1;i++){
							// 	geofences[i].setMap(null);
							// }

							// console.log('gmarker_place',gmarkers_place.length)
							// for (m=0;m<= gmarkers_place.length-1;m++){
							// 	gmarkers_place[m].setMap(null)
							// }

							

							// gmarkers_place = []

							hideShapes()
						}
					}
				})

				$('#circle_place').linkbutton({
					onClick:function(){
						var opts = $(this).linkbutton('options');
						// alert(opts.selected)
						$('#coordinates_geo1').textbox('setValue','')
						$('#pac-input').val('')
						

					  if(opts.selected == true){
						place_save_status = 0
						$('#title_geofence').text('Create Geofence')
						$('#place_box').css("visibility","visible")
						// marker_geo.setMap(null)
						map_place.setCenter(new google.maps.LatLng(-6.200000,106.816666))
						InitializeMapPlace
						$('#placeId_geo1').textbox('setValue','')
						$('#address_geo1').textbox('setValue','')
						// $('#lat_geo1').textbox('setValue','')
						// $('#lng_geo1').textbox('setValue','')
						$('#radius_geo1').textbox('setValue','')

						$('#placeId_geo2').textbox('setValue','')
						$('#address_geo2').textbox('setValue','')

						$('#toggle_place').linkbutton({
							selected:false,
							disabled:true
						})

						hideShapes()

					  }else{
						place_save_status = 0
						InitializeMapPlace()
						$('#place_box').css("visibility","hidden")
						// marker_geo.setMap(null)
						map_place.setCenter(new google.maps.LatLng(-6.200000,106.816666))
						
						// InitializeMapPlace
						$('#placeId_geo1').textbox('setValue','')
						$('#address_geo1').textbox('setValue','')
						// $('#lat_geo1').textbox('setValue','')
						// $('#lng_geo1').textbox('setValue','')
						$('#radius_geo1').textbox('setValue','')

						$('#placeId_geo2').textbox('setValue','')
						$('#address_geo2').textbox('setValue','')

						$('#toggle_place').linkbutton({
							selected:false,
							disabled:false
						})

					  }
					}
				})

				$('#list_place').linkbutton({
					onClick:function(){
						$('#w_place').window('open')
						$('#dg_place').datagrid({
							url: '/geofence/list/read'
						})

						$('#toggle_place').linkbutton({
							selected:false,
							disabled:true
						})

						hideShapes()
					}
				})
		});


function AddressToLatLng(address){
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {
			var latitude = results[0].geometry.location.lat();
			var longitude = results[0].geometry.location.lng();

			var location = new google.maps.LatLng(latitude,longitude);

			marker_geo = new google.maps.Marker({
				position: location,
				map: map_place
			});

			map_place.setCenter(location);

			// $('#lat_geo1').textbox('setValue',latitude)
			// $('#lng_geo1').textbox('setValue',longitude)

			// const cityCircle = new google.maps.Circle({
			// 	strokeColor: "#FF0000",
			// 	strokeOpacity: 0.8,
			// 	strokeWeight: 2,
			// 	fillColor: "#FF0000",
			// 	fillOpacity: 0.35,
			// 	map:map_place,
			// 	center: location,
			// 	radius: 75,
			//   });

			//   map_place.setZoom(15)

			// console.log('latitude',latitude)
			// console.log('longitude',longitude)

			} 
		});
}
		
function createDataCirlceGeofence(data){
	// console.log('data',data)

	var url = '/geofence/create'
	var body = JSON.stringify(data)

	console.log('body',body)

	const requestOptions = {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json'
		},
		body: body
	};

	fetch(url,requestOptions)
	.then(response => response.json()) 
	.then(json => {
		// console.log(json)



		if (json.status == 'success'){
				var img = "/img/success.png"
				var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
				msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data sukses</div>`
				msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
							<hr style="width: 280px;margin-top:10px;margin-left:0px;">
						</div>
						<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
							OK
						</div>
						`
		
				dlg = $.messager.show({
				
				msg: msg,
				showType:'fade',
				border:'thin',
				timeout:500,
				cls: 'cls1',
				height:180,
				style:{
					right:'',
					bottom:''
				}
			});

			$('#circle_place').linkbutton({
				selected:false
			})

			$('#toggle_place').linkbutton({
				selected:false,
				disabled:false
			})

			$('#pac-input').val('')

			$('#place_box').css("visibility","hidden")
			InitializeMapPlace()

		}else{
					var img = "/img/red_close.png"
					var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
					msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data gagal</div>`
					msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
								<hr style="width: 280px;margin-top:10px;margin-left:0px;">
							</div>
							<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
								OK
							</div>
							`
			
					dlg = $.messager.show({
					
					msg: msg,
					showType:'fade',
					border:'thin',
					timeout:500,
					cls: 'cls1',
					height:180,
					style:{
						right:'',
						bottom:''
					}
				});

				InitializeMapPlace()
				$('#pac-input').val('')
		}


	})
}

function updateDataCirlceGeofence(data){
	var url = '/geofence/update'
	var body = JSON.stringify(data)

	console.log('body',body)

	const requestOptions = {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json'
		},
		body: body
	};

	fetch(url,requestOptions)
	.then(response => response.json()) 
	.then(json => {
		// console.log(json)



		if (json.status == 'success'){
				var img = "/img/success.png"
				var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
				msg+= `<div style="width:100%;height:40px;text-align:center"> Update data sukses</div>`
				msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
							<hr style="width: 280px;margin-top:10px;margin-left:0px;">
						</div>
						<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
							OK
						</div>
						`
		
				dlg = $.messager.show({
				
				msg: msg,
				showType:'fade',
				border:'thin',
				timeout:500,
				cls: 'cls1',
				height:180,
				style:{
					right:'',
					bottom:''
				}
			});

			$('#circle_place').linkbutton({
				selected:false
			})

			$('#toggle_place').linkbutton({
				selected:false,
				disabled:false
			})

			$('#pac-input').val('')

			$('#place_box').css("visibility","hidden")
			InitializeMapPlace()

		}else{
					var img = "/img/red_close.png"
					var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
					msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data gagal</div>`
					msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
								<hr style="width: 280px;margin-top:10px;margin-left:0px;">
							</div>
							<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
								OK
							</div>
							`
			
					dlg = $.messager.show({
					
					msg: msg,
					showType:'fade',
					border:'thin',
					timeout:500,
					cls: 'cls1',
					height:180,
					style:{
						right:'',
						bottom:''
					}
				});

				InitializeMapPlace()
				$('#pac-input').val('')
		}


	})
}

function createDataPolygonGeofence(data){
	// console.log('data',data)

	var url = '/geofence/create'
	const requestOptions = {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json'
		},
		body:JSON.stringify(data)
	};

	fetch(url,requestOptions)
	.then(response => response.json()) 
	.then(json => {
		// console.log(json)



		if (json.status == 'success'){
				var img = "/img/success.png"
				var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
				msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data sukses</div>`
				msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
							<hr style="width: 280px;margin-top:10px;margin-left:0px;">
						</div>
						<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
							OK
						</div>
						`
		
				dlg = $.messager.show({
				
				msg: msg,
				showType:'fade',
				border:'thin',
				timeout:500,
				cls: 'cls1',
				height:180,
				style:{
					right:'',
					bottom:''
				}
			});

			$('#circle_place').linkbutton({
				selected:false
			})

			$('#place_box').css("visibility","hidden")
			InitializeMapPlace()

		}else{
					var img = "/img/red_close.png"
					var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
					msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data gagal</div>`
					msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
								<hr style="width: 280px;margin-top:10px;margin-left:0px;">
							</div>
							<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
								OK
							</div>
							`
			
					dlg = $.messager.show({
					
					msg: msg,
					showType:'fade',
					border:'thin',
					timeout:500,
					cls: 'cls1',
					height:180,
					style:{
						right:'',
						bottom:''
					}
				});
				InitializeMapPlace()
		}


	})
}

function updateDataPolygonGeofence(data){
	// console.log('data',data)

	var url = '/geofence/update'
	const requestOptions = {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json'
		},
		body:JSON.stringify(data)
	};

	fetch(url,requestOptions)
	.then(response => response.json()) 
	.then(json => {
		// console.log(json)



		if (json.status == 'success'){
				var img = "/img/success.png"
				var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
				msg+= `<div style="width:100%;height:40px;text-align:center"> Update data sukses</div>`
				msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
							<hr style="width: 280px;margin-top:10px;margin-left:0px;">
						</div>
						<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
							OK
						</div>
						`
		
				dlg = $.messager.show({
				
				msg: msg,
				showType:'fade',
				border:'thin',
				timeout:500,
				cls: 'cls1',
				height:180,
				style:{
					right:'',
					bottom:''
				}
			});

			$('#circle_place').linkbutton({
				selected:false
			})

			$('#place_box').css("visibility","hidden")
			InitializeMapPlace()

		}else{
					var img = "/img/red_close.png"
					var msg = `<div style="width:100%;height:40px;text-align:center;margin-bottom:10px;"><img src="`+ img +`" witdth="40" height="40" /></div>`
					msg+= `<div style="width:100%;height:40px;text-align:center"> Insert data gagal</div>`
					msg+= `<div style="width:100%;height:40px;text-align:center;margin-top:20px;">
								<hr style="width: 280px;margin-top:10px;margin-left:0px;">
							</div>
							<div style="margin-top:-20px;text-align:center;font-size:14px;font-family:'Poppins';font-weight:900;color:#0A7AFF;cursor:pointer;" onclick="close_msg()">
								OK
							</div>
							`
			
					dlg = $.messager.show({
					
					msg: msg,
					showType:'fade',
					border:'thin',
					timeout:500,
					cls: 'cls1',
					height:180,
					style:{
						right:'',
						bottom:''
					}
				});
				InitializeMapPlace()
		}


	})
}

function searchMap(ele) {
    if(event.key === 'Enter') {
        // alert(ele.value);  
		AddressToLatLng(ele.value)      
    }
}

function edit_data(){

	place_save_status = 1
	console.log('geofences.length',geofences.length)
	for (l=0;l<=geofences.length-1;l++){
		geofences[l].setMap(null)
		
	}
	console.log('gmarkers_place.length',gmarkers_place.length)
	for (j=0;j<=gmarkers_place.length-1;j++){
		gmarkers_place[j].setMap(null)
	}

	geofences = []
	gmarkers_place = []

	var row = $('#dg_place').datagrid('getSelected')
	// alert(row.placeUid)
	$('#circle_place').linkbutton({
		selected:true
	})
	$('#place_box').css('visibility','visible')

	$('#title_geofence').text('Edit Geofence')

	$('#placeId_geo1').textbox('setValue',row.placeId)
	$('#pac-input').val(row.address)

	selected_placeUid = row.placeUid
	// const event = new KeyboardEvent('keydown', {
	// 	key: 'Enter',
	// 	code: 'Enter',
	// 	which: 13,
	// 	keyCode: 13,
	//   });

	//   document.getElementById('pac-input').dispatchEvent(event);

	  $('#coordinates_geo1').textbox('setValue',row.coordinates)
	  $('#radius_geo1').textbox('setValue',row.radius)

	  // drawing shape
	  var radius = row.radius
	  if (radius != ''){
		 var place = JSON.parse(row.coordinates)
		 console.log('place',place)
		 var lat = parseFloat(place.lat)
		 var lng = parseFloat(place.lng )
		 var center = {lat:lat,lng:lng}
		 map_place.setCenter(center)
		 console.log('center',center)

		//  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);

		 drawCircle(lat,lng,radius,center,row.placeId,row.address,map_place,true)
	  }else{

		var place = JSON.parse(row.coordinates)
		console.log('place',place)
		var lat = parseFloat(place[0].lat)
		var lng = parseFloat(place[0].lng )
		var center = {lat:lat,lng:lng}
		console.log('center',center)
		map_place.setCenter(center)
		drawPolygon(place,row.placeId,map_place,true)

	  }

	  $('#w_place').window('close')

}

function showShapes(places){

	var ctr = 0;
	for (i=0; i<= places.length-1;i++){
			var jparse = JSON.parse(places[i].coordinates)
			// if (json.places[i].coordinates){
			console.log('i',i)
			console.log('jparse',jparse)
			var type_geometry = jparse.geometry.type
			console.log('type geometry',type_geometry)
			console.log('=======================================')


			if (type_geometry == 'Point'){
				console.log('ctr',ctr)
				ctr++

					var lat = jparse.geometry.coordinates[1]
					var lng = jparse.geometry.coordinates [0]
					var radius = jparse.properties.radius.value
					var center = {lat:lat,lng:lng}
					var title = places[i].placeId
					var address = places[i].address
					console.log('lat',lat)
					console.log('lng',lng)
					console.log('radius',radius)
					console.log('center',center)
					console.log('title',title)
					console.log('address',address)

					

					drawCircle(lat,lng,radius,center,title,address,map,false)

			}else{
				console.log('ctr',ctr)
				ctr++

				// drawPolygon
				console.log('ctr',ctr)
				var coordinates = jparse.geometry.coordinates[0]
				var title = places[i].placeId
				var address = places[i].address
				var path_coordinates = []
				for (l=0;l<=coordinates.length-1;l++){
				   var lat = coordinates[l][1]
				   var lon = coordinates[l][0]
				   
				   var coordinate = {lat:lat,lng:lon}
				   path_coordinates.push(coordinate)
				}
				ctr++
			   //  console.log('path',path_coordinates)
			   drawPolygon(path_coordinates,title,address,map,false)

			}
		// }
	}
}

function hideShapes(){
	
	for (i=0;i<= geofences.length-1;i++){
		geofences[i].setMap(null);
	}

	console.log('gmarker_place',gmarkers_place.length)
	for (m=0;m<= gmarkers_place.length-1;m++){
		gmarkers_place[m].setMap(null)
	}

	
	gmarkers_place = []
}