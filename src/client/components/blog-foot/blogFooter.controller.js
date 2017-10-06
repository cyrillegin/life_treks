export default class footer {
    constructor($scope) {
        this.$scope = $scope;
    }
    $onInit() {
        this.$scope.tags = this.data.tags;
    }
}
