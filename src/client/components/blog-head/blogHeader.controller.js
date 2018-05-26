export default class header {
    constructor($scope) {
        'ngInject';
        this.$scope = $scope;
    }
    $onInit() {
        this.$scope.title = this.data.title;
        this.$scope.date = new Date(this.data.created).toDateString();
    }
}
