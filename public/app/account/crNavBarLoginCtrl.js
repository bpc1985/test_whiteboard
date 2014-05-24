angular.module('app').controller('crNavBarLoginCtrl', function($scope, $http, $location, crIdentity, crNotifier, crAuth){
    $scope.identity = crIdentity;

    $scope.signin = function(username, password){
        crAuth.authenticateUser(username, password).then(function(success){
            if(success) {
                crNotifier.notify('You have successfully signed in!');
            } else {
                crNotifier.error('Username/Password combination incorrect');
            }
        });
    };

    $scope.signout = function(){
        crAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            crNotifier.notify("You have successfully signed out!");
            $location.path('/');
        });
    };
});
