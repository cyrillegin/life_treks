angular.module('lifeTreks.miniMenuController', [])

.controller('miniMenuController', function($scope){
    templateDateTree = [{
        "Year": "2016",
        "AccordianId": "2016Accordian",
        "Months": [{
            "Month": "October",
            "AccordianId": "2016OctoberAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date": "10-20-2016",
                "BlogId": 1
            }, {
                "Blog title": "my second!",
                "Blog date": "10-17-2016",
                "BlogId": 2
            }, {
                "Blog title": "my third!",
                "Blog date": "10-14-2016",
                "BlogId": 3
            }, {
                "Blog title": "my forth!",
                "Blog date": "10-10-2016",
                "BlogId": 4
            }]
        }, {
            "Month": "September",
            "AccordianId": "2016SeptemberAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date": "9-20-2016",
                "BlogId": 5
            }, {
                "Blog title": "my second!",
                "Blog date": "9-17-2016",
                "BlogId": 6
            }, {
                "Blog title": "my third!",
                "Blog date": "9-14-2016",
                "BlogId": 7
            }, {
                "Blog title": "my forth!",
                "Blog date": "9-10-2016",
                "BlogId": 8
            }]
        }, {
            "Month": "Augest",
            "AccordianId": "2016AugestAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date": "8-20-2016",
                "BlogId": 9
            }, {
                "Blog title": "my second!",
                "Blog date": "8-17-2016",
                "BlogId": 10
            }, {
                "Blog title": "my third!",
                "Blog date": "8-14-2016",
                "BlogId": 11
            }, {
                "Blog title": "my forth!",
                "Blog date":  "8-10-2016",
                "BlogId": 12
            }]
        }]
    }, {
        "Year": "2015",
        "AccordianId": "2015Accordian",
        "Months": [{
            "Month": "October",
            "AccordianId": "2015OctoberAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date":  "10-20-2015",
                "BlogId": 13
            }, {
                "Blog title": "my second!",
                "Blog date":  "10-17-2015",
                "BlogId": 14
            }, {
                "Blog title": "my third!",
                "Blog date":  "10-14-2015",
                "BlogId": 15
            }, {
                "Blog title": "my forth!",
                "Blog date":  "10-10-2015",
                "BlogId": 16
            }]
        }, {
            "Month": "September",
            "AccordianId": "2015SeptemberAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date":  "9-20-2015",
                "BlogId": 17
            }, {
                "Blog title": "my second!",
                "Blog date":  "9-17-2015",
                "BlogId": 18
            }, {
                "Blog title": "my third!",
                "Blog date": "9-14-2015",
                "BlogId": 19
            }, {
                "Blog title": "my forth!",
                "Blog date": "9-10-2015",
                "BlogId": 20
            }]
        }, {
            "Month": "Augest",
            "AccordianId": "2015AugestAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date":  "8-20-2015",
                "BlogId": 21
            }, {
                "Blog title": "my second!",
                "Blog date":  "8-17-2015",
                "BlogId": 22
            }, {
                "Blog title": "my third!",
                "Blog date":  "8-14-2015",
                "BlogId": 23
            }, {
                "Blog title": "my forth!",
                "Blog date":  "8-10-2015",
                "BlogId": 24
            }]
        }]
    }, {
        "Year": "2014",
        "AccordianId": "2014Accordian",
        "Months": [{
            "Month": "October",
            "AccordianId": "2014OctoberAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date":  "10-20-2014",
                "BlogId": 25
            }, {
                "Blog title": "my second!",
                "Blog date":  "10-17-2014",
                "BlogId": 26
            }, {
                "Blog title": "my third!",
                "Blog date":  "10-14-2014",
                "BlogId": 27
            }, {
                "Blog title": "my forth!",
                "Blog date":  "10-10-2014",
                "BlogId": 28
            }]
        }, {
            "Month": "September",
            "AccordianId": "2014SeptemberAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date":  "9-20-2014",
                "BlogId": 29
            }, {
                "Blog title": "my second!",
                "Blog date":  "9-17-2014",
                "BlogId": 30
            }, {
                "Blog title": "my third!",
                "Blog date":  "9-14-2014",
                "BlogId": 31
            }, {
                "Blog title": "my forth!",
                "Blog date":  "9-10-2014",
                "BlogId": 32
            }]
        }, {
            "Month": "Augest",
            "AccordianId": "2014AugestAccordian",
            "Blogs": [{
                "Blog title": "my first!",
                "Blog date":  "8-20-2014",
                "BlogId": 33
            }, {
                "Blog title": "my second!",
                "Blog date":  "8-17-2014",
                "BlogId": 34
            }, {
                "Blog title": "my third!",
                "Blog date":  "8-14-2014",
                "BlogId": 35
            }, {
                "Blog title": "my forth!",
                "Blog date":  "8-10-2014",
                "BlogId": 36
            }]
        }]
    }];

    templateTagTree = [{
        "tagname": "hiking",
        "AccordianId": "hiking",
        "blogs": [{
            "Blog title": "my first!",
            "Blog date":  "8-20-2014",
            "BlogId": 33
        }, {
            "Blog title": "my second!",
            "Blog date":  "8-17-2014",
            "BlogId": 34
        }, {
            "Blog title": "my third!",
            "Blog date":  "8-14-2014",
            "BlogId": 35
        }, {
            "Blog title": "my forth!",
            "Blog date":  "8-10-2014",
            "BlogId": 36
        }]
    }, {
        "tagname": "climbing",
        "AccordianId": "climbing",
        "blogs": [{
            "Blog title": "my first!",
            "Blog date": "10-20-2016",
            "BlogId": 1
        }, {
            "Blog title": "my second!",
            "Blog date": "10-17-2016",
            "BlogId": 2
        }, {
            "Blog title": "my third!",
            "Blog date": "10-14-2016",
            "BlogId": 3
        }, {
            "Blog title": "my forth!",
            "Blog date": "10-10-2016",
            "BlogId": 4
        }]
    }];


    $scope.years = templateDateTree;

    $scope.blogTags = templateTagTree;


    $scope.SelectBlog = function(something){
        console.log(something);
    };




































});