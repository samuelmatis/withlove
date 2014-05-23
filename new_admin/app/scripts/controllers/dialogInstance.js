'use strict';

angular.module('withlove.admin')
    .controller('DialogInstanceCtrl', function($scope, $modalInstance, data) {

        $scope.modal_data = data;

        $scope.ok = function() {
            $modalInstance.close(data.place);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    });
