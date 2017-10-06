export default class body {
    constructor($scope) {
        this.$scope = $scope;
    }
    $onInit() {
        console.log(this.data);
        this.$scope.content = this.data.bodyText;
    }
}
