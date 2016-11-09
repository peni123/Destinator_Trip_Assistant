/**
 * var formSection = document.getElementById("form");

formSection.addEventListener('focus', function(e){
	var target = e.target;
	if (target.tagName.toLowerCase()== "input" 
			|| target.tagName.toLowerCase()=="textarea") {
		var label = target.previousElementSibling;
		label.style.transition = "0.5s ease";
		label.style.transform = "translate(0px, -1.8em)";
	}
	
}, true);

}, false);
 */

travelAssistant.controller("ContactsController",
		['$scope', 'userService', '$http', '$location',
		 function ContactsController($scope, userService, $http, $location){
			$scope.user = {};
			
			$scope.userAjaxMessage = function() {
				
				var user = $scope.user.name;
				var email = $scope.user.email;
				var message = $scope.user.message;
		
					var data = {
							name: user,
							email: email,
							message: message
					}
					$http({
						url: '../server/getMessage.php',
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
				
				$scope.newUser = {};
			}
			
			/*label.style.transition = "0.5s ease";
			label.style.transform = "translate(0px, -1.8em)";*/
		
}])