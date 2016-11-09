
travelAssistant.controller("LoginUserController", 
		['$scope', 'userService', '$http', '$location', 'authentication', '$timeout', '$rootScope',
		 function LoginUserController($scope, userService, $http, $location, authentication, $timeout, $rootScope){
	
	
	$scope.user={};
	
	$scope.login = function(){
		var user = $scope.user.name;
		var pass = $scope.user.password;
		
		var data = {
				name: user,
				password: pass
		};
		authentication.sendAjax(data)
		.then(function(loggedInUser){
			$scope.alertMsg ='Success Sign In';
			$scope.alertStyle = 'alert-success';
			polling_interval=2000;
			var poll = function() {
				$scope.alertStyle = '';
				$location.path('/InsidePage/mapApp');
				$rootScope.flag = true;
				console.log($rootScope.flag)
			};
			 $timeout(poll, polling_interval);
			 
			}, function(){
				$scope.alertMsg ='Ivalid name or password';
				$scope.alertStyle = 'alert-failed';
				polling_interval=2000;
				var poll = function() {
					$scope.alertStyle = '';
				};
				$timeout(poll, polling_interval);
				$rootScope.flag = false;
				console.log($rootScope.flag)
			}
		);
	}

	$scope.dataUser = $scope.user;
	$scope.user={};

	$scope.authentication = authentication;
	
/*	console.log(authentication.isAuthenticated($scope.dataUser));
if(authentication.isAuthenticated()) {
alert("You are already logged")
$location.path('/InsidePage/mapApp');
}*/
	
	}
])