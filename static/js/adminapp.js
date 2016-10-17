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
                console.log(response);
                $scope.currentAdmins = response['data']
                console.log($scope.currentAdmins);
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

        $scope.getBlogList = function(){
            var req = {
                method: 'POST',
                url: 'getBlogList',
            };
            $http(req).then(function successCallback(response){
                console.log(response);
                $scope.currentBlogs = response['data']
            });
        };

        $scope.deleteBlog = function(){
            var req = {
                method: 'POST',
                url: 'deleteBlog',
                params: {
                    'name': $('#deleteBlog').val(),
                }
            };

            $http(req).then(function successCallback(response){
                var myStr = "You've just deleted " + response['data'];
                $scope.deleteBlogDialog = myStr;
            })
        }

        $scope.SubmitPost = function(){
            var req = {
                method: 'POST',
                url: 'SubmitPost',
                params: {
                    'title': $('#blog-title').val(),
                    'content': $('#blog-content').val(),
                    'tags': $('#blog-tags').val().split(", ")
                }
            };

            $http(req).then(function successCallback(response){
                var myStr = "You've just posted a new blog!";
                $scope.blogSuccess = myStr;
            })
        }
    }]);






