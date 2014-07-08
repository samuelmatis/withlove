'use strict';

angular.module('withlove.map')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, data) {
        $scope.modalData = data;

        $scope.ok = function () {
            $modalInstance.close();
        };
    });
