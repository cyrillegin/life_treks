'use strict';

// angular!
var app = angular.module('adminApp', [])
    
    .controller('adminController', ['$scope', '$http', function($scope, $http) {
        $scope.currentAdmins = [];

        $scope.submitNewAdmin = function(){
            var req = {
                method: 'POST',
                url: 'submitNewAdmin',
                params: {
                    'name': $('#newAdminName').val(),
                    'password': $('#newAdminPass').val()
                }
            };

            $http(req).then(function successCallback(response){
                var myStr = "You've just added " + response['data']['name'] + " with password " + response['data']['password'];
                $scope.successDialog = myStr;
            })
        }

        $scope.getAdminList = function(){
            var req = {
                method: 'POST',
                url: 'getAdminList',
            };
            $http(req).then(function successCallback(response){
                $scope.currentAdmins = response['data']
            });
        };

        $scope.deleteAdmin = function(){
            var req = {
                method: 'POST',
                url: 'deleteAdmin',
                params: {
                    'name': $('#deleteUserName').val(),
                }
            };

            $http(req).then(function successCallback(response){
                var myStr = "You've just deleted " + response['data'];
                $scope.deleteDialog = myStr;
            })
        }
    }]);

