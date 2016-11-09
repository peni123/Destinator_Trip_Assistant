'use strict';

travelAssistant.controller('MapCtrl', ['$scope', '$rootScope', 'userService', '$timeout', function($scope, $rootScope, userService, $timeout) {
	
	if(!!navigator.geolocation ) {
	    
        var map;
        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var startPosLat = position.coords.latitude;
            var startPosLat1 = startPosLat + '';
            var startPosLng = position.coords.longitude;
            var startPosLng1 = startPosLng + '';
           
    	    var image =	{
    	    		  url: 'pin3.ico',
    	    		  size: new google.maps.Size(90, 90),
    	    		  origin: new google.maps.Point(0, 0),
    	    		  anchor: new google.maps.Point(17, 34),
    	    		  scaledSize: new google.maps.Size(50, 50)
    	    		 };
            	
    	    var image2 = {
		    		  url: 'pin2.png',
		    		  size: new google.maps.Size(90, 90),
		    		  origin: new google.maps.Point(0, 0),
		    		  anchor: new google.maps.Point(17, 34),
		    		  scaledSize: new google.maps.Size(22,44)
			    	};
            var initalPosition = new google.maps.Marker({
			          position: geolocate,
			          map: map,
			          title: 'My Place',
			          draggable: true,
			          icon: image,
			          animation: google.maps.Animation.DROP,
			          animation: google.maps.Animation.BOUNCE
			          });
          initalPosition.addListener('click', toggleBounce);

		function toggleBounce() {
			if (initalPosition.getAnimation() == null) {
				initalPosition.setAnimation(google.maps.Animation.BOUNCE);
			} else {
				initalPosition.setAnimation(null);
			}
		}
		var typesA=[];
		var types ={};
		$scope.changeSelectAttr = function() {
			
			types = $scope.selectedAttractions;
		}
		$scope.showPlaces = function() {
			if(types){
				for (var type in types) {
					typesA.push(type)
				}
				$scope.typesA = typesA;
				var requestCurrentLocationPlaces = {
					    location: geolocate,
					    radius: '500',
					    types: $scope.typesA
					  };
				console.log(requestCurrentLocationPlaces)
			var service = new google.maps.places.PlacesService(map);
				
			service.nearbySearch(requestCurrentLocationPlaces, callback);
				
			function callback(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					for (var i = 0; i < results.length; i++) {
						var place = results[i];
						$scope.place = place;
						createMarker(results[i]);
					}
				}
			}
		}
		
	}

		$scope.selectionClick = function () {
			
			if($scope.wayPoints.length>1){
				$scope.data =  [];
					for (var int = 0; int < $scope.wayPoints.length; int++) {
						var item = $scope.wayPoints[int];
						
						var id = item.id;
						var name = item.name;
						var position = item.position;
						$scope.data.push({id:item.id, name:item.name,  position: position})
						
					 }
				}
		}
		$scope.changeSelectStart = function() {
			console.log($scope.selectedOptionStart);
			
		};
		$scope.changeSelectEnd = function() {
			console.log($scope.selectedOptionStart);
		};	
		
		$scope.calcRoute = function(geo, $window) {
			var start = $scope.selectedOptionStart;
			var endPoint = $scope.selectedOptionEnd;
			endPoint = endPoint.replace('(', "").replace(')', "");
			start = start.replace('(', "").replace(')', "");
			
			$scope.start = start;
			$scope.endPoint = endPoint;
			
			var wayPoints1 = [];
			
			
			
				for (var int = 0; int < wayPoints.length; int++) {
					wayPoints1.push({
					location: (wayPoints[int].position+'').replace('(', "").replace(')', ""),
					stopover: true
					});
				}
				$scope.wayPoints1 = wayPoints1;
				
				var wayPoints2 = '';
				for (var int = 0; int < wayPoints1.length-1; int++) {
					var a = wayPoints1[int].location+', ';
					a += wayPoints1[int+1].location;
				}	
				wayPoints2 = a
			
				$scope.wayPoints2 = wayPoints2; 
				
			var requestRoute = {
						/*origin: startPosLat1+', '+ startPosLng1,*/
						origin: $scope.start,
						destination: $scope.endPoint,
						waypoints: $scope.wayPoints1,
						optimizeWaypoints: true,
						unitSystem: google.maps.UnitSystem.METRIC,
						travelMode: 'WALKING'
						};
			console.log(requestRoute)
			var route = null;
			
			var directionsService = new google.maps.DirectionsService();
			$scope.directionsService =  directionsService;
			
			var directionsDisplay = new google.maps.DirectionsRenderer();
			$scope.directionsDisplay = directionsDisplay;
			directionsDisplay.setMap(map);
			
			directionsService.route(requestRoute, function(result, status) {
				
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
					route = result.routes[0];
					$scope.route = route
					
					
						for (var i = 0; i < route.legs.length; i++) {
							var routeSegment = i + 1;
							timeLength += route.legs[i].distance.value;
							routeLength += route.legs[i].duration.value;
						}
						
						$scope.timeLength = timeLength;
						$scope.routeLength = routeLength;
						$scope.totalTimeMinutes = function() {
							var time = 0;
							if (timeLength/60 < 60) {
								time = Math.floor(timeLength/60) + "min";
							} else if (timeLength/60 > 60) {
								time = Math.floor(timeLength/60) + "h." + " " + timeLength%60 + "min"
							}
							return time;
						};
						
						var totalRouteKm;
						$scope.totalRouteKm = function() {
							return routeLength/1000 + "km";
						};
						
					}
			});
		}
		
	/*	types: ['poi', 'place_of_worship', 'museum', 'amusement_park', 'art_gallery']*/
		map.setCenter(geolocate);
		
        	 
		var wayPoints = [];
        $scope.wayPoints = wayPoints;
       
        
		        
		var timeLength = 0;
		var routeLength = 0;
		
	$scope.selectionClick = function () {
			
			if($scope.wayPoints.length>1){
				$scope.data =  [];
					for (var int = 0; int < $scope.wayPoints.length; int++) {
						var item = $scope.wayPoints[int];
						
						var id = item.id;
						var name = item.name;
						var position = item.position;
						$scope.data.push({id:item.id, name:item.name,  position: position})
						
					 }
				}
		}
		$scope.changeSelectStart = function() {
			
			console.log($scope.selectedOptionStart);
			
		};
		$scope.changeSelectEnd = function() {
			console.log($scope.selectedOptionStart);
		};	
		
		$scope.calcRoute = function(geo, $window) {
		
			var start = $scope.selectedOptionStart;
			
			
			var endPoint = $scope.selectedOptionEnd;
			
			
			endPoint = endPoint.replace('(', "").replace(')', "");
			start = start.replace('(', "").replace(')', "");
			$scope.endPoint = endPoint;
			$scope.start = start;
			
			var wayPoints1 = [];
			
			$scope.wayPoints1 = wayPoints1;
			
				for (var int = 0; int < wayPoints.length; int++) {
					wayPoints1.push({
					location: (wayPoints[int].position+'').replace('(', "").replace(')', ""),
					stopover: true
					});
				}
				
				var wayPoints2 = '';
				for (var int = 0; int < wayPoints1.length-1; int++) {
					var a = wayPoints1[int].location+', ';
					a += wayPoints1[int+1].location;
				}	
				wayPoints2 = a
				$scope.wayPoints2 = wayPoints2; 
				
			var requestRoute = {
						
						origin: $scope.start,
						destination: $scope.endPoint,
						waypoints: $scope.wayPoints1,
						optimizeWaypoints: true,
						unitSystem: google.maps.UnitSystem.METRIC,
						travelMode: 'WALKING'
						};
		
			var route = null;
			//var routeIsCalculated = false;
			var directionsService = new google.maps.DirectionsService();
			$scope.directionsService =  directionsService;
			
			var directionsDisplay = new google.maps.DirectionsRenderer();
			$scope.directionsDisplay = directionsDisplay;
			directionsDisplay.setMap(map);
			
			directionsService.route(requestRoute, function(result, status) {
			
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
					route = result.routes[0];
					$scope.route = route
					
					//routeIsCalculated = true;
					
						for (var i = 0; i < route.legs.length; i++) {
							var routeSegment = i + 1;
							timeLength += route.legs[i].distance.value;
							routeLength += route.legs[i].duration.value;
						}
						
						$scope.timeLength = timeLength;
						$scope.routeLength = routeLength;
						$scope.totalTimeMinutes = function() {
							var time = 0;
							if (timeLength/60 < 60) {
								time = Math.floor(timeLength/60) + "min";
							} else if (timeLength/60 > 60) {
								time = Math.floor(timeLength/60) + "h." + " " + timeLength%60 + "min"
							}
							return time;
						};
						
						var totalRouteKm;
						$scope.totalRouteKm = function() {
							return routeLength/1000 + "km";
						};
						
					}
			});
		}
		
	/*	types: ['poi', 'place_of_worship', 'museum', 'amusement_park', 'art_gallery']*/
		map.setCenter(geolocate);
		
        	 
		var wayPoints = [];
        $scope.wayPoints = wayPoints;
       
    	var prev_infowindow = false;
		function createMarker() {
			var placeLoc = $scope.place.geometry.location;
			 
			var marker = new google.maps.Marker({
				      map: map,
				      position: placeLoc,
				      name: $scope.place.name,
				      id: $scope.place.place_id,
				      icon: image2,
				   });
		
			var infowindow = new google.maps.InfoWindow({
			    position: placeLoc,
			    content:  $scope.place.name,
			    maxWidth: 120 
			})
			/*google.maps.event.addListener(infowindow, 'domready', function() {

				var iwOuter = document.getElementsByClassName("gm-style-iw");
				iwOuter[0].offsetParent.offsetParent.attributes.style.left= '0px';	
				});		
*/
		
			
			marker.addListener('click', function() {
				 console.log(prev_infowindow)
				 if( !!prev_infowindow) {
			           prev_infowindow.close();
			           console.log(prev_infowindow)
			        }

			       
			        infowindow.open(map, marker);
			        console.log(infowindow)
			         prev_infowindow = infowindow;
			        console.log(!!prev_infowindow)
			    });
			    
			
			$scope.marker = marker;
			marker.addListener('dblclick', function selectWayPointsOne(e) {
				$scope.wayPoints.push(marker)
				
			}, false); 
		}
        
		var timeLength = 0;
		var routeLength = 0;
		
		 $scope.saveRoute = function() {
			    var route = {
			    		
					 origin: $scope.start,
					 destination: $scope.endPoint,
					 waypoints: $scope.wayPoints2,
					 optimizeWaypoints: true,
					 travelMode: 'WALKING',
					 message: $scope.message,
					 routeName: $scope.routeName,
					 rating: $scope.selectedRating
			     };
			    userService.registerRoute(route)
					.then(function(response){
					 $scope.alertMsg ='Success route saved!';
					 $scope.alertStyle = 'alert-success';
					 polling_interval=2000;
					 var poll = function() {
					  $scope.alertStyle = '';
					 };
				 
			      $timeout(poll, polling_interval);
				  
					}, function error(response){
					 $scope.alertMsg ='Error! Route is not saved!';
					 $scope.alertStyle = 'alert-failed';
					 polling_interval=2000;
					 var poll = function() {
					  $scope.alertStyle = '';
					 };
					   $timeout(poll, polling_interval);
					 
					});
		 }
		$scope.getAllRoutes = function() {
			userService.getRoutes()
			.then(function(response){
				if (response != 'error') {
					$scope.response = response;
					
				}
				console.log($scope.response)
			});
		}
		$scope.getUserRoutes = function() {
			userService.getUserRoutesFromDB()
			.then(function(response){
				if (response != 'error') {
					$scope.response = response;
					
					for (var int = 0; int < $scope.response.length; int++) {
						$scope.response[int].flag = false;
						
					}
					console.log($scope.response)
					
				}
			});
		}
		
		$scope.discardRoute = function(){
			$scope.totalTimeMinutes = null;
			$scope.totalRouteKm = null;
			$scope.selectedOptionEnd = null;
			$scope.selectedOptionStart = null;
			$scope.selectedAttractions.place_of_worship = null;
			$scope.selectedAttractions.museum = null;
			$scope.selectedAttractions.amusement_park = null;
			$scope.selectedAttractions.art_gallery = null;
			$scope.selectedAttractions.poi= null;
			$scope.routeName = null;
			$scope.message = null;
			$scope.selectedRating = null;
		}
		
	$scope.changeData = function(index) {
		
		savedRouteOrigin = $scope.response[index].origin;
		savedRouteDestination =	$scope.response[index].destination;
		savedRouteWaypoints=	$scope.response[index].waypoints;
		
		var waypointesIntoArrayOne = savedRouteWaypoints.split('"');
		var waypointsArr =[];
		var count = [];
		count.length = savedRouteWaypoints.length
		var index = 0;
		var item = {};
		var indexes = [];
		
		for (var int = 0; int < savedRouteWaypoints.length; int++) {
			if (savedRouteWaypoints[int] == ",") {
				count[int] =+ 1;
				console.log(count);
			}
		}
		for (var j = 0; j < count.length; j++) {
			if (!isNaN(count[j])){
			indexes.push(j)
			}
		}
		var lastIndex = indexes.length - 1;
		for (var int2 = 0; int2 < indexes.length; int2++) {
			if(int2 != lastIndex && (int2%2 != 0)){
				var item = CreateObject(savedRouteWaypoints.slice(index, indexes[int2]));
				console.log(item);
				waypointsArr.push(item);
				index = indexes[int2]+1;
				item = null;
			} 
			else if (int2 == lastIndex){
				item = savedRouteWaypoints.slice(index, (savedRouteWaypoints.length-1));
				waypointsArr.push(item);
			}
			item ='';
		} 
			$scope.waypointsArr = waypointsArr;
	}


	$scope.drawSavedRoute = function ($widnow, geo){
			
		var requestRoute = {
						origin: savedRouteOrigin,
						destination: savedRouteDestination,
						waypoints:$scope.waypointsArr,
						optimizeWaypoints: true,
						unitSystem: google.maps.UnitSystem.METRIC,
						travelMode: 'WALKING'
						};
		
		var route = null;
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		directionsService.route(requestRoute, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
				route = result.routes[0];
				$scope.route = route
			}
			
		});
			
			
		}
		
		$scope.upRating = upRating;
		$scope.downRating = downRating;
		
		function upRating(ratingChange) {
			if (ratingChange < 5) {
				ratingChange++; // TODO: save
			}
		}

        function downRating(ratingChange) {
            if (ratingChange > 0) {
            	ratingChange--; // TODO: save
            }
        }
		
		/*var input = document.getElementById('pac-input');
		var searchBox = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
       
		$scope.changeInput = function() {
			//console.warn($scope.newCity);
		};
		map.addListener('bounds_changed', function() { // Bias the SearchBox results towards current map's viewport.
			searchBox.setBounds(map.getBounds());
		});
     
		var markers = [];
		searchBox.addListener('places_changed', function() {	// Listen for the event fired when the user selects a prediction and retrieve
			var places = searchBox.getPlaces();					 // more details for that place.
		       
			if (places.length == 0) {
				return;
			}
			markers.forEach(function(marker) { // Clear out the old markers.
				marker.setMap(null);
			});
			markers = [];
			var bounds = new google.maps.LatLngBounds(); // For each place, get the icon, name and location.
			map.setCenter(bounds.getCenter());
			places.forEach(function(place) {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				var icon = {
						url: place.icon,
						size: new google.maps.Size(71, 71),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(25, 25)
						};
				markers.push(new google.maps.Marker({  // Create a marker for each place.
						map: map,
						icon: icon,
						title: place.name,
						position: place.geometry.location
				}));
				if (place.geometry.viewport) {  // Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			map.fitBounds(bounds);
			mapOptions = {
						zoom: 13,
						mapTypeId: google.maps.MapTypeId.ROADMAP
						};
			map.setOptions(mapOptions);
			var requestNewCityPlaces = {
						location: map.getCenter(),
						radius: '2000',
						types: ['poi'] //must be types
						};
			service.nearbySearch(requestNewCityPlaces, callback);
			

			
			});
	*/
        }); 	

	}
}]);
 

