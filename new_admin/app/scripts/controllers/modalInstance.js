'use strict';

angular.module('withlove.admin')
    .controller('ModalInstanceCtrl', function($scope, $modalInstance, data) {

        $scope.modal_data = data;

        $scope.ok = function() {
            $modalInstance.close();
        };

    });
