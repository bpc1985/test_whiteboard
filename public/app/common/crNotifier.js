angular.module('app').value('crToastr', toastr);

angular.module('app').factory('crNotifier', function(crToastr){
    return {
        notify: function(msg){
            crToastr.success(msg);
            console.log(msg);
        },
        error: function(msg){
            crToastr.error(msg);
            console.log(msg);
        }
    };
});
