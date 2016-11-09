/**
 * 
 */
travelAssistant.controller("SignUpUserController", 
		['$scope', 'userService', '$http', '$location', 'authentication', '$timeout', '$rootScope',
		 function SignUpUserController($scope, userService, $http, $location, authentication, $timeout, $rootScope){
			$scope.authentication = authentication;
	$scope.newUser = {};
	
	$scope.register = function(){
		var user = $scope.newUser.name;
		var pass = $scope.newUser.password;
		var passRepeat = $scope.newUser.passRepeat;
		var email = $scope.newUser.email;
		if (pass !== passRepeat){
			console.log('wrong repeat password');
		}
		
		if (pass === passRepeat){
			var data = {
					name: user,
					password: pass,
					email: email
			} 
			authentication.registerUser(data)
			.then(function(loggedInUser){
				$scope.alertMsg ='Success Sign Up';
				$scope.alertStyle = 'alert-success';
				polling_interval=2000;
				var poll = function() {
					$scope.alertStyle = '';
					$location.path('/homePage/login');
				};
				 $timeout(poll, polling_interval);
				 $rootScope.flag = false;
				 console.log($rootScope.flag);
			}, function error(response){
				$scope.alertMsg ='Error registration. Try again!';
				$scope.alertStyle = 'alert-failed';
				polling_interval=2000;
				var poll = function() {
					$scope.alertStyle = '';
				};
				  $timeout(poll, polling_interval);
				  $rootScope.flag = false;
				  console.log($rootScope.flag)
			});
		}
	};
	$scope.newUser = {};

}])
