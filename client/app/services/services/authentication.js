
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
                             
            			  }, function error(response) { //kato response tuk moje da se prashta greshkata
            			    response = 'error';   //i tozi red da go niama
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
            				identity.requestUserProfile();
            				return response;
            		}
            		);
            		
       }
                
       function isAuthenticated() {
                    return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
       }
                
       function logoutUser(user) {
    	   return $http({
   			url: '../server/delete.php',
   			data: user,
   			method: 'POST',
   			dataType: "json",
   			headers: {'Content-Type': 'application/json'}
   		}).then(function(response){
   			
   				return response;
   		});
    	   accessToken = '';
    	   $cookies.remove(AUTHENTICATION_COOKIE_KEY);      
           $http.defaults.headers.common.Authorization = undefined;
           identity.removeUserProfile();
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