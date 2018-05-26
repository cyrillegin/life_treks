export default class footer {
    constructor($scope) {
        'ngInject';
        this.$scope = $scope;
    }
    $onInit() {
        this.$scope.tags = this.data.tags;
    }
}
