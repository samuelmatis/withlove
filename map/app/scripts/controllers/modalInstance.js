'use strict';

angular.module('withloveApp')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, data) {

        $scope.modal_data = data;

        $scope.ok = function () {
            $modalInstance.close();
        };
    });
