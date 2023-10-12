
var gmarkers = []
var gmarkers_waypoint = []
var markerCluster
var infowindow
var infowindow_waypoint
var waypts = [];
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();
var historyMarker = []
var startLocation = null;
var endLocation = null;
var route = null
var selectedShape;
var drawRadius=[];
var drawCoordinates=[];
var all_overlays = [];
var selectedShape;
var drawingManager;
var editRadius

// smoot moving
var numDeltas = 100;
var delay = 10; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;
var position

// Initialize Map =====================================================================

function InitializeMap() {
    //alert('Start');
    // map = null
    waypts = []
    gmarkers = []
    directionsRenderer.setMap(null);
    removeMarkerWaypoint(gmarkers_waypoint,gmarkers_waypoint.length)

    var mapProp= {
    center:new google.maps.LatLng(-6.200000,106.816666),
    zoom:10,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    disableDefaultUI: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // styles: [{
    //     "featureType": "landscape",
    //     "stylers": [{
    //         "saturation": -100
    //     }, {
    //         "lightness": 65
    //     }, {
    //         "visibility": "on"
    //     }]
    // }, {
    //     "featureType": "poi",
    //     "stylers": [{
    //         "saturation": -100
    //     }, {
    //         "lightness": 51
    //     }, {
    //         "visibility": "off"
    //     }]
    // }, {
    //     "featureType": "road.highway",
    //     "stylers": [{
    //         "saturation": -100
    //     }, {
    //         "visibility": "simplified"
    //     }]
    // }, {
    //     "featureType": "road.arterial",
    //     "stylers": [{
    //         "saturation": -100
    //     }, {
    //         "lightness": 30
    //     }, {
    //         "visibility": "on"
    //     }]
    // }, {
    //     "featureType": "road.local",
    //     "stylers": [{
    //         "saturation": -100
    //     }, {
    //         "lightness": 40
    //     }, {
    //         "visibility": "on"
    //     }]
    // }, {
    //     "featureType": "transit",
    //     "stylers": [{
    //         "saturation": -100
    //     }, {
    //         "visibility": "simplified"
    //     }]
    // }, {
    //     "featureType": "administrative.province",
    //     "stylers": [{
    //         "visibility": "off"
    //     }]
    // }, {
    //     "featureType": "water",
    //     "elementType": "labels",
    //     "stylers": [{
    //         "visibility": "on"
    //     }, {
    //         "lightness": -25
    //     }, {
    //         "saturation": -100
    //     }]
    // }, {
    //     "featureType": "water",
    //     "elementType": "geometry",
    //     "stylers": [{
    //         "hue": "#ffff00"
    //     }, {
    //         "lightness": -25
    //     }, {
    //         "saturation": -97
    //     }]
    // }]
    };
    map = null
    // map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    // map.setZoom(3)

    // markerCluster = new MarkerClusterer(map, [], {
    //     imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    //   });

    // directionsRenderer.setMap(map);
}

// MAP PLACE ==========================================================================
function InitializeMapPlace() {
    //alert('Start');
    // map = null
    // waypts = []
    // gmarkers = []
    // directionsRenderer.setMap(null);
    // removeMarkerWaypoint(gmarkers_waypoint,gmarkers_waypoint.length)
    drawCoordinates = []

    var mapProp= {
    center:new google.maps.LatLng(-6.200000,106.816666),
    zoom: 13,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    disableDefaultUI: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    map_place = null
    // map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    
    map_place = new google.maps.Map(document.getElementById("googleMapPlace"),mapProp);
    
   
    
     drawingManager = new google.maps.drawing.DrawingManager({
       
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,

          ],
        },
       
        circleOptions: {
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
        polygonOptions: {
            clickable: true,
            editable: true,
            strokeColor: "#FF0000",
            fillColor: "#FF0000",
            fillOpacity: 0.35,

        }
      });
    
      drawingManager.setMap(map_place);

    //   google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    //     const coords = polygon.getPath().getArray().map(coord => {
    //       return {
    //         lat: coord.lat(),
    //         lng: coord.lng()
    //       }
    //     });
        
    //     var coord = JSON.stringify(coords, null, 1)

    //     $('#coordinates_geo1').textbox('setValue',coord)
      
    //     // SAVE COORDINATES HERE
    //   });

    //   google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
    //     var radius = circle.getRadius();
    //     var center = circle.getCenter();
    //     // console.log(JSON.stringify(radius, null, 1));
        
    //     var coord = JSON.stringify(center, null, 1)
    //     drawCoordinates.push(coord)
    //     // drawCoordinates.push(center)
    //     // console.log(drawCoordinates)
    //     $('#coordinates_geo1').textbox('setValue',coord)
    //     $('#radius_geo1').textbox('setValue',radius)
    //     // SAVE COORDINATES HERE
    //   });

      google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
            all_overlays.push(e);
            var newShape = e.overlay;
            newShape.type = e.type;
            // console.log('e',e)

            google.maps.event.addListener(newShape, 'click', function() {
                setSelection(newShape);
              });

            if (e.type != google.maps.drawing.OverlayType.MARKER) {

                if(e.type == google.maps.drawing.OverlayType.CIRCLE){
                    var radius = newShape.getRadius();
                    var center = newShape.getCenter();
                    // console.log(JSON.stringify(radius, null, 1));
                    
                    var coord = JSON.stringify(center, null, 1)
                    drawCoordinates.push(coord)
                    // drawCoordinates.push(center)
                    // console.log(drawCoordinates)
                    $('#coordinates_geo1').textbox('setValue',coord)
                    $('#radius_geo1').textbox('setValue',radius)
                }

                if(e.type == google.maps.drawing.OverlayType.POLYGON){
                    const coords = newShape.getPath().getArray().map(coord => {
                        return {
                          lat: coord.lat(),
                          lng: coord.lng()
                        }
                      });
                      
                      var coord = JSON.stringify(coords, null, 1)
              
                      $('#coordinates_geo1').textbox('setValue',coord)
                }
            }

            setSelection(newShape);
      })

      var address = document.getElementById('pac-input');
      var options = {
          types: ['establishment'],
      };
    
    //   var autocomplete = new google.maps.places.Autocomplete(address, options);
      var autocomplete = new google.maps.places.SearchBox(address);
      
}

function clearSelection() {
    if (selectedShape) {
      selectedShape.setEditable(false);
      selectedShape = null;
    }
  }

  function setSelection(shape) {
    clearSelection();
    selectedShape = shape;
    shape.setEditable(true);
  }

  function deleteSelectedShape() {
    alert('here')
    console.log('selectedShape',selectedShape)
    if (selectedShape) {
      selectedShape.setMap(null);
    }
  }

  function deleteAllShape() {
    for (var i=0; i < all_overlays.length; i++)
    {
      all_overlays[i].overlay.setMap(null);
    }
    all_overlays = [];
  }

// MAP PLACE ==========================================================================


// Initialize Map =====================================================================

// ReInitialize Map

function ReInitializeMap(map,gmarkers){
    
    deleteMarkers()
    removeMarkerWaypointAll(gmarkers_waypoint,gmarkers_waypoint.length)
    map = null
    directionsRenderer.setMap(map)
    InitializeMap()
}

// Add New Marker =====================================================================

async function addMarker(location,heading,cars_info) {
   
    
    // console.log('Add Marker ==============================================================================')
    // console.log('Location: ' + location)
    // console.log('heading: ' + heading)

    var svgIcon = getMarkerSVG(heading)
    

    var homer = {
        anchor: new google.maps.Point(16, 16),
        url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon),
        scale: 2,
        anchor: new google.maps.Point(0, 40),
      }
    // //   var $markerImage = document.querySelector('.markerImage'),
    // //   markerImageSvg = $markerImage.innerHTML && '';

        // console.log('cars_info:' + cars_info)

        var contentString =`<div style="width:300px">`
        contentString += `<div style="width:100%;height:20px;margin-top:5px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins';background:#436AAC;color:white;font-size:12px;"><div style="margin-left:10px">`+ cars_info.vehicleUid +`</div></div>`
        contentString += `<div style="height:30px;margin-top:5px;text-align:left;font-size:12px;font-family:'Poppins';">Status</div>`
        contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
        contentString += `<div style="height:30px;width:50px;margin-top:-30px;margin-left:80px;text-align:left;font-family:'Poppins';font-size:12px;">`+ cars_info.deviceStatus + `</div>`
        contentString += `<div style="height:30px;margin-top:-15px;text-align:left;font-family:'Poppins';font-size:12px;">Last Update</div>`
        contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
        contentString += `<div style="height:30px;width:190px;margin-top:-30px;margin-left:80px;text-align:left;font-family:'Poppins';font-size:12px;">`+  cars_info.last_update + `</div>`
        contentString += `<div style="height:30px;margin-top:-15px;text-align:left;font-family:'Poppins';font-size:12px;">Speed</div>`
        contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
        contentString += `<div style="height:30px;width:100px;margin-top:-30px;margin-left:80px;text-align:left;font-family:'Poppins';font-size:12px;">`+  cars_info.speed + `</div>`
        contentString +=  `<div style="width:100%;font-size:10px;font-family:'Poppins';margin-left:45px;height:15px;margin-bottom:10px;" ><a href="#" id="live`+ cars_info.no +`" class="info" style="text-decoration: none;" onclick="live_tracking_marker('`+ cars_info.sclId +`')">Live Tracking</a>  &nbsp;| &nbsp;  <a href="#" id="riwayat`+ cars_info.no +`" class="info" style="text-decoration: none;" onclick="riwayat_marker('`+ cars_info.sclId +`')">Riwayat</a>  &nbsp;| &nbsp;  <a href="#" id="detail`+ cars_info.no +`" class="info" style="text-decoration: none;">Chat</a></div>`
        // contentString +=  `<div style="width:100%;font-size:10px;font-family:'Poppins';margin-left:45px;height:15px;margin-bottom:10px;" ><a href="#" id="live`+ cars_info.no +`" class="info" style="text-decoration: none;" onclick="live_tracking_marker('`+ cars_info.sclId +`')">Live Tracking</a>  &nbsp;| &nbsp;  <a href="#" id="riwayat`+ cars_info.no +`" class="info" style="text-decoration: none;" onclick="riwayat_marker('`+ cars_info.sclId +`')">Riwayat</a>  &nbsp;| &nbsp;  <a href="#" id="detail`+ cars_info.no +`" class="info" style="text-decoration: none;" onclick="detail_marker('`+ cars_info.sclId +`')">Detail</a></div>`
        contentString +=  `</div>`
        // ' ('+ cars_info.deviceStatus +')'
        // console.log('contentString',contentString)

        const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });


    // find marker in map

    // for (k=0;k<=gmarkers.length-1;k++){

    //     console.log('marker title',gmarkers[k].title)
    //     console.log('cars_info.vehicleUid',cars_info.vehicleUid)

    //     if (gmarkers[k].title == cars_info.vehicleUid)
    //     {
    //         console.log('marker title sama')
    //     }else{
    //         console.log('marker title beda')
    //     }
    // }


    var marker = new google.maps.Marker({
        position: location,
        icon: homer,
        map,
        title: cars_info.vehicleUid
    });

    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        })
      })
      

    return [marker,infowindow]

    
    
}


function addMarkerTracking(location,heading,cars_info) {
   
    // console.log('heading: ' + heading)
    // console.log('loction:'  + location)
    var marker
    
        var contentString = `<div style="width:200px;height:30px;margin-top:10px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins'">`+ cars_info.vehicleUid+`</div>`
        contentString += `<div style="height:30px;margin-top:-10px;text-align:center;font-family:'Poppins';">`+ cars_info.speed + ' ('+ cars_info.deviceStatus +')' +`</div>`

    
        infowindow = new google.maps.InfoWindow({
        content: contentString,
      });


    

    for (i=0;i<=1;i++){
        if (i==0){
            var svgIcon = getMarkerSVGArrow(heading)
            marker = new google.maps.Marker({
                position: location,
                icon: {
                    url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon),
                    scale: 1,
                    anchor: new google.maps.Point(0, 0),
                  },
                  zIndex: 100,
                map: map
            });
        }else{
            var svgIcon = getMarkerSVG(heading)
            marker = new google.maps.Marker({
                position: location,
                icon: {
                    url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon),
                    scale: 1,
                    anchor: new google.maps.Point(0, 0),
                  },
                  zIndex: 200,
                map: map
            });
        }
        gmarkers.push(marker)
    }
    

    



    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      })

      
      map.setZoom(16)
      

    return [marker,infowindow]

    
    
}
// add Marker Waypoint
function addMarkerWaypoint(latlng,cars_info){

    // console.log('Create Marker')
    // console.log('Cars_Info: ' + cars_info)
    
    var contentString = `<div style="width:200px;height:30px;margin-top:10px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins'">`+ cars_info.updateJam +`</div>`
    contentString += `<div style="height:30px;margin-top:-10px;text-align:center;font-family:'Poppins';">`+ cars_info.speed  +`</div>`

    // console.log ('contentString: '+ contentString)
    // console.log('latlng:'+ latlng)

          var marker_waypoint = new google.maps.Marker({
            position: latlng,
            icon: '/img/highway.png',
            map: map
          });

        //   gmarkers.push(marker);
        //   alert(marker)
        gmarkers_waypoint.push(marker_waypoint)

        const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });

          google.maps.event.addListener(marker_waypoint, 'click', function() {
            infowindow.open(map, marker_waypoint);
          });

          
          

    return marker_waypoint
}
// Create Icon

var CreateIconRes = async function(path,heading){
      console.log('path: '+path)
      var res = await  RotateIcon
            .makeIcon(
                path,width=60,height=60)
            .setRotation({deg: heading})
            .getUrl()

    //  console.log(res)
      return res
}

// Clear Marker =======================================================================


// function ClearAllMarker(){
//     console.log('gmarkers length: '+ gmarkers.length)
//     deleteMarkers()
// }

// Remove Marker ======================================================================

function deleteMarkers() {
    // console.log('process delete markers')
    clearMarkers();
    
 }
function clearMarkers() {
    setMapOnAll(null);

 }

function setMapOnAll(req) {
    console.log('marker length: ' + gmarkers.length)
    // console.log('start process delete markers')
    
    if (gmarkers.length >0){
        for (var x = 0; x <= gmarkers.length-1; x++) 
        {
            
            // console.log('gmarkers ['+ x +']',gmarkers[x])
            // var lat = gmarkers[x].getPosition().lat();
            // var lng = gmarkers[x].getPosition().lng();
            // var title = gmarkers[x].title
            // console.log('lat:'+ lat)
            // console.log('lng:'+ lng)
            // console.log('title',title)
            gmarkers[x].setMap(null);
        }
        gmarkers = [];
        console.log('delete finish')
        //     for (x in gmarkers) {
        //      gmarkers[x].setMap(null);
        //   }
    }
    // console.log('finish process delete markers')
 }





function removeMarkerWaypoint(){

    // for (var it in gmarkers_waypoint) {
    //     markerCluster.removeMarker(it);
    //     // gmarkers[it].setVisible(false);
    // }
   
    // console.log('gmarkersLengthWaypoint',gmarkers_waypoint.length)
    // gmarkers_waypoint[0].setMap(null)

     for (i=0;i<gmarkers_waypoint.length;i++){
        if (i==0){
            gmarkers_waypoint[0].setMap(null);
            gmarkers_waypoint.splice(0,1)
            break;
        }
     }
       
   
}

function removeMarkerWaypointAll(gmarkerswaypoint,gmarkersLength){

    // for (var it in gmarkers_waypoint) {
    //     markerCluster.removeMarker(it);
    //     // gmarkers[it].setVisible(false);
    // }
    // console.log('gmarkersLength',gmarkersLength)
    // console.log('gmarkersLengthWaypoint',gmarkers_waypoint.length)

     for (i=0;i<gmarkerswaypoint.length;i++){
        gmarkers_waypoint[i].setMap(null);
        // console.log('here remove yes')
     }
       
   gmarkers_waypoint.length = 0
   gmarkers_waypoint = []

}

function transition(result,heading,cars_info,locs){
    console.log('transition')
    k = 0;
    // console.log(result[0])
    deltaLat = (result[0] - position[0])/numDeltas;
    deltaLng = (result[1] - position[1])/numDeltas;

    // console.log('deltaLat:'+ deltaLat)
    // console.log('deltaLng:'+ deltaLng)
    // console.log(1,cars_info)
    // console.log(2,cars_info)
    moveMarker(heading,cars_info, locs);
}

function moveMarker(heading, cars_info,locs){
    position[0] += deltaLat;
    position[1] += deltaLng;

    // console.log(3,locs)

    var latlng = new google.maps.LatLng(position[0], position[1]);
    // marker.setTitle("Latitude:"+position[0]+" | Longitude:"+position[1]);
    setMarkerAnchor(heading,cars_info,locs)
    // gmarkers[0].setIcon(homer1)
    gmarkers[0].setPosition(latlng)
    // gmarkers[1].setIcon(homer2)
    gmarkers[1].setPosition(latlng)
    // marker.setPosition(latlng);

    

    if(k!=numDeltas){
        k++;
        setTimeout(moveMarker(heading,cars_info,locs), delay);
    }
    
   
    
}

function setMarkerAnchor(heading,cars_info,locs){

    var svgIcon1 = getMarkerSVGArrow(parseInt(heading))
    var svgIcon2 = getMarkerSVG(parseInt(heading))

    // console.log(cars_info)
        var img

        if (cars_info.deviceStatus == 'bergerak'){
            img = "/img/moving.png"
        }else if(cars_info.deviceStatus == 'diam'){
            img = "/img/moving_stop.png"
        }else if(cars_info.deviceStatus == 'offline'){
            img = "/img/moving_offline.png"
        }


    var contentString =`<div style="width:200px;height:30px;margin-top:10px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins'"> <img src='`+ img +`' width="24" height="24"'/>` + ' ('+ cars_info.deviceStatus +')' + `</div>`
    contentString += `<div style="width:200px;height:30px;margin-top:10px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins'">`+ cars_info.licensePlate +`</div>`
    contentString += `<div style="height:30px;margin-top:-10px;text-align:center;font-family:'Poppins';">`+ cars_info.speed  +`</div>`
    
    
    // console.log(svgIcon)
    var homer1 ={
        url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1)
      }

    var homer2 ={
        url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon2)
      }


    if (heading == 0 ){
                gmarkers[0].setOptions({
                    icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
                    anchor: new google.maps.Point(80,80)
                }
                });
    }else if(heading >0 && heading <= 5){
            gmarkers[0].setOptions({
                icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
                anchor: new google.maps.Point(80,80)
            }
            });
    }else if(heading >5 && heading<=10){
            gmarkers[0].setOptions({
                icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
                anchor: new google.maps.Point(80,80)
            }
            });
    }else if(heading>10 && heading <= 15){
            gmarkers[0].setOptions({
                icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
                anchor: new google.maps.Point(80,80)
            }
            });
    }else if(heading >15 && heading <= 20){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(75,80)
        }
        });
    }else if( heading>20 && heading<=25){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading>25 && heading <= 30){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading >30 && heading<=35){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >35 && heading<=40){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading >40 && heading <=45){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>45 && heading<=50){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(70,80)
        }
        });
    }else if (heading >50 && heading <= 55){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>55 && heading<= 60){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading>60 && heading <= 65){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >65 && heading <= 70){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 70 && heading <=75){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading > 75 && heading <=80){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>80 && heading <=85){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading >85 && heading <= 90){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >90 && heading<=95){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>95 && heading <=100){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(75,75)
        }
        });
    }else if (heading> 100 && heading <=105){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 105 && heading <= 110){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>110 && heading<=115){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >115 && heading <= 120){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>120 && heading <= 125){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 130 && heading <= 135){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 135 && heading <= 140){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>140 && heading <=145){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >145 && heading <=150){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading>150 && heading <=155){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    } else if (heading>155 && heading <= 160){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 160 && heading <= 165){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 165 && heading <= 170){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >170 && heading <= 175){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(75,80)
        }
        });
    }else if(heading >175 && heading <= 180){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >180 && heading <=185){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 185 && heading <=190){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(75,80)
        }
        });
    }else if (heading > 190 && heading <= 195){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading>195 && heading <= 200){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(75,80)
        }
        });
    }else if (heading >200 && heading <= 205){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>205 && heading <=210){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 210 && heading <= 215){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(65,70)
        }
        });
    }else if(heading >215 && heading <=220){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading >220 && heading <=225){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >225 && heading <= 230){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >230 && heading<=235){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 235 && heading <= 240){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading >240 && heading <=245){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >245 && heading <= 250){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading > 250 && heading <=255 ){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 255 && heading <= 260){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
        
    }else if (heading >265 && heading <= 270){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 270 && heading <= 275){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 275 && heading <= 280){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 280 && heading <= 285){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 285 && heading <= 290){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading > 290 && heading <=295) {
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading >295 && heading<=300){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >300 && heading <=305){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
       
    }else if (heading >310 && heading <=315){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >315 && heading <= 320){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading>320 && heading<=325){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading>325 && heading<=330){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >330 && heading <= 335){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if(heading > 335 && heading <=340){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >340 && heading <= 345){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >345 && heading<= 350){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >350 && heading <= 355){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }else if (heading >355 && heading<=360){
        gmarkers[0].setOptions({
            icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon1),
            anchor: new google.maps.Point(80,80)
        }
        });
    }
    
    gmarkers[1].setOptions({
        icon: { url:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgIcon2),
            anchor: new google.maps.Point(16,16)
        }
        
    });

    infowindow.setContent(contentString);
}


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

async function drawCircle(lat,lng,radius,center,title,address,map_target,shape_editable){
   
    var geofence = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map:map_target,
        center: center,
        radius: radius,
        editable:shape_editable
      });

      console.log('address',address)

      var marker_place = new google.maps.Marker({
        position: center,
        map:map_target,
        title: title,
      });

      console.log('marker_place',marker_place);
     

    //   var avm = new google.maps.LatLng(center.lat, center.lng);
    //   console.log('avm',avm)
      var markerCnt = 0;

      for (h=0;h<=gmarkers.length-1;h++){
        if (google.maps.geometry.spherical.computeDistanceBetween(gmarkers[h].getPosition(), geofence.getCenter())<= geofence.getRadius()){
            markerCnt++
        }

      }

    //   console.log(markerCnt)

    //   var contentString =`<div style="width:300px">`
    //   contentString += `<div style="width:100%;height:20px;margin-top:5px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins';background:#436AAC;color:white;font-size:12px;"><div style="margin-left:10px">`+ title +`</div></div>`
    //   contentString += `<div style="height:30px;margin-top:5px;text-align:left;font-size:12px;font-family:'Poppins';">Latitude</div>`
    //   contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
    //   contentString += `<div style="height:30px;width:50px;margin-top:-30px;margin-left:80px;text-align:left;font-family:'Poppins';font-size:12px;">`+ lat + `</div>`
    //   contentString += `<div style="height:30px;margin-top:-5px;text-align:left;font-size:12px;font-family:'Poppins';">Longitude</div>`
    //   contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
    //   contentString += `<div style="height:30px;width:50px;margin-top:-30px;margin-left:80px;text-align:left;font-family:'Poppins';font-size:12px;">`+ lng + `</div>`
    //   contentString += `<div style="height:30px;margin-top:-5px;text-align:left;font-size:12px;font-family:'Poppins';">Address</div>`
    //   contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
    //   contentString += `<div style="height:30px;width:200px;margin-top:-30px;margin-left:80px;margin-bottom:10px;text-align:left;font-family:'Poppins';font-size:12px;">`+ address + `</div>`
    //   contentString += `<div style="height:30px;margin-top:25px;text-align:left;font-size:12px;font-family:'Poppins';">Radius</div>`
    //   contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
    //   contentString += `<div style="height:30px;width:180px;margin-top:-30px;margin-left:80px;text-align:left;font-family:'Poppins';font-size:12px;">`+ radius + ` meters </div>`
    //   contentString += `<div style="height:30px;margin-top:-5px;text-align:left;font-size:12px;font-family:'Poppins';">Vehicles</div>`
    //   contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
    //   contentString += `<div style="height:30px;width:50px;margin-top:-30px;margin-left:80px;text-align:left;font-family:'Poppins';font-size:12px;">`+ markerCnt + `</div>`
    //   contentString += `</div>`

    //   console.log('content_string',contentString)
    // if (shape_editable == false){
      var wide = 22/7 * radius * radius
    // }else{
    //     var wide=0;
    // }
      var contentString =`<div style="width:350px">`
      contentString += `<div style="width:100%;height:20px;margin-top:5px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins';background:#436AAC;color:white;font-size:12px;"><div style="margin-left:10px">`+ title +`</div></div>`
      contentString += `<table>`
      contentString += `<tr style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Address</div>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">`+ address +`</div>`
      contentString += `</td>`
      contentString += `</tr>`
      contentString += `<tr style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Coordinate</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">{`+ lat + ','+ lng +`}</div>`
      contentString += `</td>`
      contentString += `</tr">`
      contentString += `<tr style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Radius</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">`+ radius +` meters</div>`
      contentString += `</td>`
      contentString += `</tr">`
      contentString += `<tr style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Wide</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">`+ wide +` meters<sup>2</sup></div>`
      contentString += `</td>`
      contentString += `</tr">`
      contentString += `<tr style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Vehicles</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">`+ markerCnt +`</div>`
      contentString += `</td>`
      contentString += `</tr">`
      contentString += `</table>`
      contentString += `</div>`
      
      var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 500
    });

    //   google.maps.event.addListener(geofence, 'click', function(ev) {
    //     infoWindow.setPosition(ev.latlng);
    //     infoWindow.open(map);
    // });

    google.maps.event.addListener(geofence, 'click', function(ev){
        infoWindow.setPosition(geofence.getCenter());
        infoWindow.open(map_target);
    });

    google.maps.event.addListener(geofence, 'radius_changed', function () {
        console.log('newRadius',geofence.getRadius());
        editRadius = geofence.getRadius()
        $('#radius_geo1').textbox('setValue',editRadius)
    });

      geofences.push(geofence)
      gmarkers_place.push(marker_place)
}

function drawPolygon(paths,title,address,map_target,shape_editable){
    console.log('paths',paths)
   
    var geofence = new google.maps.Polygon({
        paths: paths,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        editable:shape_editable
      });

      var markerCnt = 0;
      

      for (var i = 0; i < gmarkers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(gmarkers[i].getPosition(), geofence)) {
          markerCnt++;
        }
      }

      var center = {lat:paths[0].lat,lng:paths[0].lng}

      var marker_place = new google.maps.Marker({
        position: center,
        map:map_target,
        title: title,
      });

    //   var contentString =`<div style="width:450px;height:200px;">`
    //   contentString += `<div style="width:100%;height:20px;margin-top:5px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins';background:#436AAC;color:white;font-size:12px;"><div style="margin-left:10px">`+ title +`</div></div>`
    //   contentString += `<div style="height:30px;margin-top:5px;text-align:left;font-size:12px;font-family:'Poppins';">Address</div>`
    //   contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
    //   contentString += `<div style="height:30px;width:200px;margin-top:-30px;margin-left:80px;margin-bottom:20px;text-align:left;font-family:'Poppins';font-size:12px;">`+ address + `</div>`
    //   contentString += `<div style="height:30px;margin-top:5px;text-align:left;font-size:12px;font-family:'Poppins';">Coordinate</div>`
    //   contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
    //   contentString += `<div style="height:30px;width:200px;margin-top:-30px;margin-left:80px;margin-bottom:20px;text-align:left;font-family:'Poppins';font-size:12px;">`+ JSON.stringify(paths) + `</div>`
    //   contentString += `<div style="height:30px;margin-top:5px;text-align:left;font-size:12px;font-family:'Poppins';">Vehicles</div>`
    //   contentString += `<div style="height:30px;width:10px;margin-top:-30px;margin-left:70px;text-align:center;font-family:'Poppins';font-size:12px;">:</div>`
    //   contentString += `<div style="height:30px;width:50px;margin-top:-30px;margin-left:80px;text-align:left;font-family:'Poppins';font-size:12px;">`+  markerCnt + `</div>`
    //   contentString += `</div>`
    //   if (shape_editable== false){
        var wide = google.maps.geometry.spherical.computeArea(geofence.getPath());
    //   }else{
    //     var wide = 0;
    //   }
      

      var contentString =`<div style="width:450px;">`
      contentString += `<div style="width:100%;height:20px;margin-top:5px;margin-left:-10px;text-align:center;font-weight:bold;font-family:'Poppins';background:#436AAC;color:white;font-size:12px;"><div style="margin-left:10px">`+ title +`</div></div>`
      contentString += `<table>`
      contentString += `<tr style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Address</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">`+ address +`</div>`
      contentString += `</td>`
      contentString += `</tr>`
      contentString += `<tr  style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Coordinate</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">`+ JSON.stringify(paths) +`</div>`
      contentString += `</td>`
      contentString += `</tr>`
      contentString += `<tr  style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Wide</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">`+ wide +` meters<sup>2</sup></div>`
      contentString += `</td>`
      contentString += `</tr>`
      contentString += `<tr  style="width:300px">`
      contentString += `<td style="vertical-align: top;width:50px"> <div style="font-size:12px;font-family:'Poppins';">Vehicles</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:10px"> <div style="font-size:12px;font-family:'Poppins';">:</div>`
      contentString += `</td>`
      contentString += `<td style="vertical-align: top;width:300px"> <div style="font-size:12px;font-family:'Poppins';">`+ markerCnt +`</div>`
      contentString += `</td>`
      contentString += `</tr>`
      contentString += `</table>`
      contentString += `</div>`
      
      var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 500
    });

      google.maps.event.addListener(geofence, 'click', function(ev) {
            infoWindow.setPosition(ev.latLng);
            infoWindow.open(map_target);
    });

    google.maps.event.addListener(geofence.getPath(), 'set_at', function(ev) {
        var polygonBounds = geofence.getPath();
        var bounds = [];
        for (var i = 0; i < polygonBounds.length; i++) {
            var point = {
              lat: polygonBounds.getAt(i).lat(),
              lng: polygonBounds.getAt(i).lng()
            };
            bounds.push(point);
       }
       console.log('bounds',bounds)
       $('#coordinates_geo1').textbox('setValue',JSON.stringify(bounds))
    });

    google.maps.event.addListener(geofence.getPath(), 'insert_at', function(ev) {
        var polygonBounds = geofence.getPath();
        var bounds = [];
        for (var i = 0; i < polygonBounds.length; i++) {
            var point = {
              lat: polygonBounds.getAt(i).lat(),
              lng: polygonBounds.getAt(i).lng()
            };
            bounds.push(point);
       }
       console.log('bounds',bounds)
       $('#coordinates_geo1').textbox('setValue',JSON.stringify(bounds))

    });
    
      geofence.setMap(map_target);
      geofences.push(geofence)
      gmarkers_place.push(marker_place)
}

