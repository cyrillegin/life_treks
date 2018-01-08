// import * as THREE from 'three';
import './demo.style.scss';

export default class demoController {

    constructor($scope) {
        'ngInject';
        this.$scope = $scope;

        global.THREE = THREE;
    }
    $onInit() {
    }
}
