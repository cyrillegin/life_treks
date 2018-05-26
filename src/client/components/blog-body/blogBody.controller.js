export default class body {
    constructor($scope) {
        'ngInject';
        this.$scope = $scope;
    }
    $onInit() {
        this.$scope.content = this.data.body;
    }
}
