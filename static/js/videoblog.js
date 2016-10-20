angular.module('lifeTreks.videoblog', [])

.controller('lifeTreksVideoBlog', ['$scope', '$http', function($scope, $http){

	var req = {
        method: 'POST',
        data: {
        	"startDate": "someDate?",
        	"endDate": "someDate?",
        	"number": "someNumber?"
        },
        url: 'getVideoBlogRoll'
    };
    $http(req).then(function successCallback(response){
    	$scope.blog = response.data[response.data.length-1];

        previewArr = []
        for(var i in response.data){
            if(i > response.data.length-1){
                break;
            }
            previewArr.push({
                "title": response.data[i].title,
                "content": response.data[i].content,
                "date": response.data[i].date
            })
        }

        $scope.blogPreviews = previewArr;
    	console.log(response.data)
    	
    });

    /*
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
	*/

	$scope.getIframeSrc = function(src) {
      return 'https://www.youtube.com/embed/' + src;
    };
}]);