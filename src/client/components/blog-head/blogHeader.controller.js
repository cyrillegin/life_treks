export default class header {
    constructor($scope) {
        this.$scope = $scope;
    }
    $onInit() {
        console.log(this.data);
        this.$scope.title = this.data.title;
        this.$scope.date = this.data.timestamp;
    }
}
