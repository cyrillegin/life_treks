export default class blogController {

    constructor($scope) {
        'ngInject';
        this.$scope = $scope;
        console.log('asdf');

    }
    $onInit() {
        console.log('asdf');
        this.$scope.blogs = ['assadfdf', 'asdf', 'afdsa'];
    }
}
