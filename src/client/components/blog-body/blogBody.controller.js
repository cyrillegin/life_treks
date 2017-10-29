export default class body {
    constructor($scope) {
        this.$scope = $scope;
    }
    $onInit() {
        this.$scope.content = this.data.bodyText;
    }
}
