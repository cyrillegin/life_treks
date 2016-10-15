angular.module('lifeTreks.homepageblog', [])

.controller('lifeTreksHomePageBlog', ['$scope', '$http', function($scope, $http){


	var req = {
        method: 'POST',
        data: {
        	"startDate": "someDate?",
        	"endDate": "someDate?",
        	"number": "someNumber?"
        },
        url: 'getBlogRoll'
    };
    $http(req).then(function successCallback(response){
    	$scope.blogroll = response.data;
    	console.log(response.data)
    	
    });
	//Will need a server call to populate this:
	// $scope.blogroll = [{
	// 	"title": "My First Post",
	// 	"date": "9/22/15",
	// 	"content": "This is my first post on this blog for the home page!!!",
	// 	"tag": [
	// 		"homepage",
	// 		"firstpost",
	// 		"hiking",
	// 		"journal"
	// 	],
	// 	"commentlist": [{
	// 		"title": "Awesome",
	// 		"date": "9/22/15",
	// 		"body": "This is a comment!"
	// 	}, {
	// 		"title": "Great",
	// 		"date": "9/20/15",
	// 		"body": "This is another comment!"
	// 	}]
	// }, {
	// 	"title": "My Second Post",
	// 	"date": "9/20/15",
	// 	"content": "This is my second post on this blog for the home page!!!",
	// 	"tag": [
	// 		"homepage",
	// 		"firstpost",
	// 		"hiking",
	// 		"journal"
	// 	],
	// 	"commentlist": [{
	// 		"title": "Woot",
	// 		"date": "9/22/15",
	// 		"body": "This is a comment!"
	// 	}, {
	// 		"title": "Got em",
	// 		"date": "9/20/15",
	// 		"body": "This is another comment!"
	// 	}]
	// }];
}]);