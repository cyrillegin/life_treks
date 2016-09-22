angular.module('lifeTreks.videoblog', [])

.controller('lifeTreksVideoBlog', function($scope){
	//Will need a server call to populate this:
	$scope.blogroll = [{
		"title": "My First Post",
		"url": 'a-Qj6Hs43b4',
		"tag": [
			"homepage",
			"firstpost",
			"hiking",
			"journal"
		],
		"commentlist": [{
			"title": "Awesome",
			"date": "9/22/15",
			"body": "This is a comment!"
		}, {
			"title": "Great",
			"date": "9/20/15",
			"body": "This is another comment!"
		}]
	}, {
		"title": "My Second Post",
		"url": "JRTvo9KJilg",
		"tag": [
			"homepage",
			"firstpost",
			"hiking",
			"journal"
		],
		"commentlist": [{
			"title": "Woot",
			"date": "9/22/15",
			"body": "This is a comment!"
		}, {
			"title": "Got em",
			"date": "9/20/15",
			"body": "This is another comment!"
		}]
	}];

	$scope.getIframeSrc = function(src) {
      return 'https://www.youtube.com/embed/' + src;
    };
});