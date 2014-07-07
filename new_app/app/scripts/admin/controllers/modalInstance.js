'use strict';

angular.module('withlove.admin')
    .controller('ModalInstanceCtrl', function($scope, $modalInstance, data) {

        $scope.modalData = data;

        $scope.ok = function() {
            $modalInstance.close();
        };

    });
