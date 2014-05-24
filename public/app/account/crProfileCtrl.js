angular.module('app').controller('crProfileCtrl', function($scope, crNotifier, crAuth, crIdentity){
    $scope.username = crIdentity.currentUser.username;
    $scope.email = crIdentity.currentUser.email;
    $scope.fname = crIdentity.currentUser.firstName;
    $scope.lname = crIdentity.currentUser.lastName;

    $scope.update = function(){
        var newUserData = {
            username: $scope.username,
            email: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        crAuth.updateCurrentUser(newUserData).then(function() {
            crNotifier.notify('Your user account has been updated');
        }, function(reason) {
            crNotifier.error(reason);
        })
    };
});
