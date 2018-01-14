export default class blogController {

    constructor($scope, $http, $location) {
        'ngInject';
        this.$scope = $scope;
        this.$http = $http;
        this.$location = $location;
    }

    $onInit() {
        this.$scope.blogs = [];
        this.loadBlogs();
    }

    loadBlogs(count) {
        this.$http.get(`/blogs${this.$location.url()}`)
            .then((success) => {
                this.$scope.blogs = success.data;
            })
            .catch((error) => {
                console.log('Got error');
                console.log(error);
            });
    }
}


// const exampleBlog2 = {
//     title: 'Hello World!',
//     bodyText: `
//     Welcome, my name is Cyrille Gindreau.
//     I’m currently going to school for my second degree in computer science,
//     my first was in animation. Over the past few years I’ve been coding more and more
//     and more and thought “Man, I need a spot to start putting all of this knowledge.”
//     Which brings us here. The first goal of this site is to develop and maintain an
//     online presence using current technologies that the industry is using. The second
//     goal is to create a kind of repository of intro to mid-level tutorials on the different
//     frameworks and libraries that I come across. That’s it for now, thanks for reading!
//     `,
//     timestamp: 'October 5, 2017',
//     tags: ['helloworld', 'introduction', 'greeting'],
// };
// const exampleBlog1 = {
//     title: 'Front End Architecture',
//     bodyText: `
//         I’d like to take a moment to discuss how the site works. From a user perspective,
//         it’s fairly simple. There’s at the top, a blog nav on the right, and all the blog content
//         is in the middle. Technically however, there’s quite a bit going on however. The main star
//         of the show here is angularjs <link me>. I’m using angular 1.6 with es6 components (More on
//         traspilling later!). If that makes no sense, that’s okay, I’ll have separate blog posts
//         going into more detail about each component in the future. Each blog is split into three
//         components, the header which contains the title and the date when the blog was written.
//         The body which just contains a single attribute, the text. And the footer which contains
//         the tags and links to the appropriate pages. I chose this method because I’m a big fan of
//         modularity. Each component has its own angular controller, it’s own html template and its
//         own scss file. That way if I decide that maybe I want to change the font or color of something,
//         I can change it in one place and it will be reflected across every single page.
//
//         For style I choose to go with bootstrap<link me> for layout but steal some design concepts
//         from material-io<link me> There’s a great library for angular, angular-material<link me>
//         however with bootstrap V4 coming out, I decided that to really be bleeding edge, I should be
//         playing with alpha and beta versions of libraries today.
//
//         For routing I’m using angulars’ ui-router. This little gem is what allows for all of the
//         blog-search, sort, and groupings. I have it linked up to a home-grown api (More on back end
//         later) to handle all of the different possible requests.
//
//         That’s about it for the front end of this page. All of the ‘card’ templates are recycled
//         on the other pages but they’re quite a bit more customized there using libraries like d3.js and three.js
//
//     `,
//     timestamp: 'October 7, 2017',
//     tags: ['frontend', 'angular', 'materialdesign'],
// };
