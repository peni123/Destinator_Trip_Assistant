/**
 * 
 */
travelAssistant.factory('userService', ['$http', '$httpParamSerializerJQLike',
                                        '$cookies',
                                        '$q',
                                        '$location', 
                                        function($http, $httpParamSerializerJQLike, $cookies,
                                                $q, $location) {

	function registerRoute(route) {
	
		return $http({
				url: '../server/saveRoute.php',
				data: route,
				method: 'POST',
				dataType: "json",
				headers: {'Content-Type': 'application/json'}
			}).then(function(response){
				 /*preserveRouteData(response.data);
                */
				
                 return response;
				/*if(data.status == 200) {
					alert("success");
					
				} else {
					alert("Not success");
				}*/
			})
    }
	
	function getRoutes(){
		return $http({
			url: '../server/list.php',
			method: 'GET',
	}).then(function(response) {
		console.log(response.data);
		var resultAllRoutes = response.data;
		return resultAllRoutes;
	  }, function(response) {
		  console.log(response.data);
		  response = 'error';
		  console.log(response);
	  });
	}
	
	function getUserRoutesFromDB() {
		return $http({
				url: '../server/getRouteFromDB.php',
				method: 'GET',
			}).then(function(response){
				console.log(response.data);
				var userRoutes = response.data;
				return userRoutes;
			}, function(response) {
   				  $scope.error = response;
   			});
    }
	
	
	return {
		getUserById: function(id) {
			return users[id];
		},
		addNewUser: function(newUser) {
			return $http.post(baseUrl, {newUser:newUser});
		},
		updateById:function(id, updatedData) {
			users[id] = updatedData;
		},
		
		registerRoute: registerRoute,
		
		getRoutes: getRoutes,
		
		getUserRoutesFromDB: getUserRoutesFromDB
		
		
		/*loginUser: function(user){
			return $http.post('login.php', {newUser:newUser});
		},
        sendLoginData: function (data, successCb, failCb) {
                $http({
                    method: 'POST',
                    url: 'login.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'},
                    data: $httpParamSerializerJQLike(data)
                }).then(function successCallback(response) {
                    if (response.data.success == true) {
                        failCounter = 0;
                        successCb(response.data.success)
                    } else {
                        failCb(++failCounter);
                    }
                }, function errorCallback(response) {
                    failCb(++failCounter);
                });
        }*/
	}
}]);
