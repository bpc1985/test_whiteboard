angular.module('app').factory('crAuth', function($http, $q, $location, crIdentity, crUser){
    return {
        authenticateUser: function(username, password){
            var deferred = $q.defer();
            $http.post('/login', {username: username, password:password}).then(function(response){
                if(response.data.success){
                    var user = new crUser();
                    angular.extend(user, response.data.user);
                    crIdentity.currentUser = user;
                    $location.path('/board');
                    deferred.resolve(true);
                }
                else{
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        },

        createUser: function(newUserData){
            var newUser = new crUser(newUserData);
            var deferred = $q.defer();

            newUser.$save().then(function(){
                crIdentity.currentUser = newUser;
                deferred.resolve();
            }, function(response){
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },

        updateCurrentUser: function(newUserData){
            var dfd = $q.defer();
            var clone = angular.copy(crIdentity.currentUser);

            angular.extend(clone, newUserData);

            clone.$update().then(function() {
                crIdentity.currentUser = clone;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        logoutUser: function(){
            var deferred = $q.defer();
            $http.post("/logout", {logout: true}).then(function(){
                crIdentity.currentUser = undefined;
                deferred.resolve();
            });
            return deferred.promise;
        },

        authorizeCurrentUserForRoute: function(role) {
            if(crIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute: function(){
            if(crIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
});
