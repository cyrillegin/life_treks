export default class blogController {

    constructor($scope) {
        'ngInject';
        this.$scope = $scope;
        console.log('asdf');

    }
    $onInit() {
        console.log('asdf');
        const exampleBlog1 = {
            title: 'My first post',
            bodyText: 'This is just an example of what a blog could look like in the future.',
            timestamp: 'Sep 28, 2017',
            tags: ['first', 'post', 'ever', 'lifeTreks'],
        };
        const exampleBlog2 = {
            title: 'My first post',
            bodyText: 'This is just an example of what a blog could look like in the future.',
            timestamp: 'Sep 28, 2017',
            tags: ['first', 'post', 'ever', 'lifeTreks'],
        };
        const exampleBlog3 = {
            title: 'My first post',
            bodyText: 'This is just an example of what a blog could look like in the future.',
            timestamp: 'Sep 28, 2017',
            tags: ['first', 'post', 'ever', 'lifeTreks'],
        };
        this.$scope.blogs = [exampleBlog1, exampleBlog2, exampleBlog3];
    }
}
