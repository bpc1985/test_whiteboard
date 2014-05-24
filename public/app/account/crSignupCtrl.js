angular.module('app').controller('crSignupCtrl', function($scope, $location, crNotifier, crAuth){
    $scope.signup = function(){
        var newUserData = {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        crAuth.createUser(newUserData).then(function(){
            crNotifier.notify('User account has been created!');
            $location.path('/');
        }, function(reason){
            crNotifier.error(reason);
        });
    };
});
