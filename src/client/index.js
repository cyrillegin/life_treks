import angular from 'angular';
import angularRoute from 'angular-route'; // eslint-disable-line
// import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'autotrack';
// Page imports
// import blogPage from './pages/blog-roll/blog-page.html';
import demoPage from './pages/demo/demo-page.html';
// import aboutPage from './pages/about/about-page.html';
// import adminPage from './pages/admin/admin-page.html';
// Controller imports
// import blogController from './pages/blog-roll/blog.controller';
import demoController from './pages/demo/demo.controller';
// import aboutController from './pages/about/about.controller';
// Component imports
import navbar from './components/navbar/navbar.component';
import footer from './components/footer/footer.component';
// import blogHeader from './components/blog-head/blogHeader.component';
// import blogBody from './components/blog-body/blogBody.component';
// import blogFooter from './components/blog-foot/blogFooter.component';
// import blogNav from './components/blog-nav/blogNav.component';
import dthree from './components/dthree/dthree.component';
import threejs from './components/threejs/threejs.component';
import login from './components/login/login.component';
import boatDemo from './components/boatDemo/boatDemo.component';
// Boat demo imports
import threecomponent from './components/boatDemo/components/3dContainer/three.component';
// import blueprintcomponent from './components/2dContainer/blueprint.component';
import controlscomponent from './components/boatDemo/components/controlsContainer/controls.component';
import boatParametersService from './components/boatDemo/services/boatParameters.service';
import manipulateService from './components/boatDemo/services/manipulate.service';
// Style
import './main.style.scss';

angular.module('life_treks', ['ngRoute'])
    .component('navbar', navbar)
    .component('footer', footer)
    // .component('blogheader', blogHeader)
    // .component('blogbody', blogBody)
    // .component('blogfooter', blogFooter)
    // .component('blognav', blogNav)
    .component('threejs', threejs)
    .component('dthree', dthree)
    .component('login', login)
    .component('boatdemo', boatDemo)
    // .controller('blogController', blogController)
    .controller('demoController', demoController)
    // .controller('aboutController', aboutController)
    // Boat demo imports
    .component('threecomponent', threecomponent)
    // .component('blueprintcomponent', blueprintcomponent)
    .component('controlscomponent', controlscomponent)
    .service('boatParametersService', boatParametersService)
    .service('manipulateService', manipulateService)
    // Config
    .config(
        ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
            $locationProvider.hashPrefix('');
            $routeProvider
                // .when('/', {
                //     template: blogPage,
                // })
                .when('/', {
                    template: demoPage,
                })
                // .when('/about', {
                //     template: aboutPage,
                // })
                // .when('/admin', {
                //     template: adminPage,
                // })
                .otherwise({
                    redirectTo: '/',
                });
        }]);
