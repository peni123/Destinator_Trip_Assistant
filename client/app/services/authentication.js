
travelAssistant.factory('authentication', [
            '$http',
            '$cookies',
            '$q',
            '$location',
            'identity', 
            'BASE_URL',
            function($http, $cookies, $q, $location, identity, BASE_URL) {
                
     var AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';
                
      function preserveUserData(data) {
                    var accessToken = data.access_token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
       }
                
      function registerUser(user) {
            		return $http({
            				url: '../server/insert.php',
            				data: user,
            				method: 'POST',
            				dataType: "json",
            				headers: {'Content-Type': 'application/json'}
            			}).then(function success(response) {

            				preserveUserData(response.data);
                            identity.requestUserProfile()
                             
                             return response;
                             
            			  }, function error(response) {
            			    response = 'error';   
            			    return response;
            			  })
        }
                
      function sendAjax(user) {
                	return $http({
            			url: '../server/login.php',
            			data: user,
            			method: 'POST',
            			dataType: "json",
            			headers: {'Content-Type': 'application/json'}
            		}).then(function(response){
            			if(response.success == 'true'){
            			preserveUserData(response.data);
            			identity.requestUserProfile();
            			
            			return response;
            		} else {
        			    response = 'error';
        			    return response;
            		}
            		});
            		
       }
                
       function isAuthenticated() {
                    return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
       }
                
       function logoutUser() {
    	   accessToken = '';
                    $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                    $http.defaults.headers.common.Authorization = undefined;
                    identity.removeUserProfile();
                    $location.path('/homePage');
                    /*if(isAuthenticated()== true) {
                    	isAuthenticated()== false;
                    } else {
                    	isAuthenticated()== true;
                    }*/
        }
                
       function refreshCookie() {
                    if (isAuthenticated()) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                        identity.requestUserProfile();
                    }
       }
                
       return {
                	registerUser: registerUser,
                    sendAjax: sendAjax,
                    isAuthenticated: isAuthenticated,
                    refreshCookie: refreshCookie,
                    logoutUser: logoutUser
       }
}])