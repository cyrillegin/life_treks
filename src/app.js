import angular from 'angular';
import angularRoute from 'angular-route'; // eslint-disable-line

import basePage from './layout.html';
import 'jquery';
// import 'popper';
import 'bootstrap';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

angular.module('life_treks', ['ngRoute'])
    .config(
        ['$routeProvider', ($routeProvider) => {
            $routeProvider
                .when('/', {
                    template: basePage,
                })
                .otherwise({
                    redirectTo: '/',
                });
        }]);
