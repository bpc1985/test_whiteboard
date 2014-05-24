angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'restangular']);

angular.module('app').config(function(RestangularProvider, $routeProvider, $locationProvider){
    var routeRoleChecks = {
        admin: {
            auth: function(crAuth) { return crAuth.authorizeCurrentUserForRoute('admin') }
        },
        user: {
            auth: function(crAuth) { return crAuth.authorizeAuthenticatedUserForRoute() }
        }
    }

    RestangularProvider.setBaseUrl("/api");
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'crMainCtrl' })
        .when('/admin/users', { templateUrl: '/partials/admin/user-list', controller: 'crUserListCtrl', resolve: routeRoleChecks.admin })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'crSignupCtrl' })
        .when('/profile', { templateUrl: '/partials/account/profile', controller: 'crProfileCtrl', resolve: routeRoleChecks.user })
        .when('/register', { templateUrl: '/partials/person/register', controller: 'crPersonRegisterCtrl', resolve: routeRoleChecks.user })
        .when('/board', { templateUrl: '/partials/board/index', controller: 'crWhiteBoardCtrl'})
        .otherwise({ redirectTo: "/" });
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
