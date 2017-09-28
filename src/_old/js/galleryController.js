angular.module('lifeTreks.galleryController', [])

.controller('photoGalleryController', function($scope){

	$scope.galleryRows = [{
		"something": "here",
		"Columns": [{
			"rowindex": 0,
			"colindex": 0,
			"location": "Las Cruces",
			"pubDate": "September 27, 2016",
			"thumb": "/photography/thumbnails/lascruces_0001_thumb.jpg",
			"high": "/photography/highres/lascruces_0001_high.jpg"
		}, {
			"rowindex": 0,
			"colindex": 1,
			"location": "Los Alamos",
			"pubDate": "October 26, 2017",
			"thumb": "/photography/thumbnails/losalamos_0002_thumb.jpg",
			"high": "/photography/highres/losalamos_0002_high.jpg"
		}]
	}]

	$scope.OpenModal = function(obj){
		$scope.selectedImage = $scope.galleryRows[obj['rowindex']]["Columns"][obj['colindex']];
		$scope.showmodal = true;
	}



	$scope.selectedImage = $scope.galleryRows[0]["Columns"][0];
	console.log($scope.selectedImage);
	$scope.mainPrev = function(){
		console.log("Prev image");
	}

	$scope.mainNext = function(){
		console.log("Next image");
	}
	$scope.showmodal = false;
});