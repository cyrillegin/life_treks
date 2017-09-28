import angular from 'angular';
import angularRoute from 'angular-route'; // eslint-disable-line
// import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Page imports
import blogPage from './pages/blog-roll/blog-page.html';
import demoPage from './pages/demo/demo-page.html';
import aboutPage from './pages/about/about-page.html';
// Controller imports
import blogController from './pages/blog-roll/blog.controller';
// Component imports
import navbar from './components/navbar/navbar.component';


angular.module('life_treks', ['ngRoute'])
    .component('navbar', navbar)
    .controller('blogController', blogController)
    .config(
        ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
            $locationProvider.hashPrefix('');
            $routeProvider
                .when('/', {
                    template: blogPage,
                })
                .when('/demo', {
                    template: demoPage,
                })
                .when('/about', {
                    template: aboutPage,
                })
                .otherwise({
                    redirectTo: '/',
                });
        }]);
