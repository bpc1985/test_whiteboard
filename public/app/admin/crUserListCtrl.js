angular.module('app').controller('crUserListCtrl', function($scope, crUser){
    $scope.users = crUser.query();
});
