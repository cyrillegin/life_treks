export default class boatDemo {
    constructor($scope, $location) {
        'ngInject';
        this.$scope = $scope;
        this.$location = $location;
        console.log('construct')
    }

    $onInit() {
        console.log('here in controller');
    }
}
