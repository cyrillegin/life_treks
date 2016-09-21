angular.module('lifeTreks.main', [])

.controller('lifeTreksMain', function($scope){
	$scope.menuBtn = function(path) {
    	$scope.contentpage = "/html/pages/" + path + "content.html";
    	$scope.menupage = "/html/pages/" + path + "menu.html";
    	console.log("here");
	};

});