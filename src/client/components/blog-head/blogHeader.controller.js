export default class header {
    constructor($scope) {
        this.$scope = $scope;
    }
    $onInit() {
        this.$scope.title = this.data.title;
        this.$scope.date = this.data.timestamp;
    }
}
