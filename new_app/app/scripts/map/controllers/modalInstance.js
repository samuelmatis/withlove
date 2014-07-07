'use strict';

angular.module('withlove.map')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, data) {
        $scope.modal_data = data;

        $scope.ok = function () {
            $modalInstance.close();
        };
    });
