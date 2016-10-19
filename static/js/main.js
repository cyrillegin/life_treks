angular.module('lifeTreks.main', [])

.controller('lifeTreksMain', ['$scope', '$location', function($scope, $location){
    var currentUrl = $location.url().split("?");
    var currentPath = currentUrl[0].split("/");
    console.log(currentPath);
    if(currentPath.length <= 1 || currentPath[1] === ""){
        $scope.contentpage = "/html/pages/homecontent.html";
        $scope.menupage = "/html/pages/homemenu.html";
    } else {
        $scope.contentpage = "/html/pages/"+currentPath[1]+"content.html";
        $scope.menupage = "/html/pages/"+currentPath[1]+"menu.html";    
    }

	$scope.menuBtn = function(path) {
    	$scope.contentpage = "/html/pages/" + path + "content.html";
    	$scope.menupage = "/html/pages/" + path + "menu.html";
        $location.url(path)
	};
}]);