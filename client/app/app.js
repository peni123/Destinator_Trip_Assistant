

var travelAssistant = angular.module('travelAssistant',['ngRoute'                                                    
    , 'ngCookies'
    ])

.config(['$locationProvider', '$routeProvider', 
          function($locationProvider, $routeProvider){
	//$locationProvider.hashPrefix('!');   ???
	
	$routeProvider
	.when('/InsidePage/mapApp', {
		templateUrl:"./app/routes/InsidePage/mapApp.html",
		controller:'MapCtrl'
	})
	.when('/homePage/contacts', {
		templateUrl:"./app/routes/homePage/contacts/contacts.html",
		controller:'ContactsController'
	})
	.when('/homePage/login', {
		templateUrl:"./app/routes/homePage/login/login.html",
		controller:'LoginUserController'
	})
	.when('/homePage/signUp', {
		templateUrl:"./app/routes/homePage/signUp/signUp.html",
		controller:'SignUpUserController'
	})
	.when('/homePage/:id/edit', {
		templateUrl:"./app/routes/homePage/edit/userEdit.html",
		controller:'EditUserController'
	})
	.otherwise({redirectTo: '/homePage/login'})
}])
.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                $location.path('/homePage/login');
            }
        });
        
        authentication.refreshCookie();
    }])
.controller('PageController', function($rootScope, $scope, $cookies, authentication, identity, $timeout, $location) {
	$scope.authentication = authentication;
	
	if(authentication.isAuthenticated()){
		$location.path('/InsidePage/mapApp')
	}
		
	identity.getCurrentUser()
		.then(function(user){
			$scope.currentUser = user;
			
		});
	
	$scope.logout = function(){
		authentication.logoutUser().then(function(){
			$scope.alertMessage ='Success Log OUT';
			$scope.alertStyleM='alert-success';
			polling_int=2000;
			var poll1 = function() {
				$scope.alertStyleM='';
			};
			$timeout(poll1, polling_int);
			$rootScope.flag = false;
		});
		
	}
	
})
.constant('BASE_URL', 'http://localhost/trip/client/#/homePage/login')
	
	
	
	
/*var existingCookie = $cookies.get('my-cookie');
if(existingCookie){
	console.log('FROM COOKIE');
} else {
	$cookies.put('my-cookie', 'new Cookie');
}*/
	/*$scope.changeState = function(){
		$scope.hidden = !$scope.hidden;
	}
	if (isLogged){
		$scope.
	}*/