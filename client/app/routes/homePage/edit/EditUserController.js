/**
 * 
 */
travelAssistant.controller("EditUserController",
		['$scope', 'userService', '$http',
		 function EditUserController($scope, userService, $http){
	/*$scope.users = userService.getUserById($routeParams.id);
	$scope.userId = $routeParams.id;
	$scope.update = function() {
		userService.updateById($routeParams.id, $scope.users);
		$location.url('/homePage/' + $routeParams.id);
	}*/
	$scope.makeNewPass = function(user) {
		/*$location.url('/homePage/' + $routeParams.id);*/
		
		var user = $scope.user.name;
		var pass = $scope.user.password;
		var passRepeat = $scope.user.passRepeat;
		if (pass === passRepeat){
			var data = {
					name: user,
					password: pass,
			}
		} else {
			console.log('error');
		}
		
		$http({
			url: '../server/update.php',
			data: data,
			method: 'POST',
			dataType: "json",
			headers: {'Content-Type': 'application/json'}
		}).then(function(data){
			
			if(data.status == 200) {
				alert("success");
				$location.path('/homePage/login');
			} else {
				alert("Not success");
			}
		})
	
	}
	
}])