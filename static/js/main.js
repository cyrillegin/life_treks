angular.module('lifeTreks.main', [])

.controller('lifeTreksMain', function($scope){
	$scope.contentpage = "/html/pages/homepagecontent.html";
    $scope.menupage = "/html/pages/homepagemenu.html";

	$scope.menuBtn = function(path) {
    	$scope.contentpage = "/html/pages/" + path + "content.html";
    	$scope.menupage = "/html/pages/" + path + "menu.html";
	};
});