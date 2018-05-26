export default class blogNav {

    constructor($scope, $http, $timeout, $location) {
        'ngInject';

        this.$http = $http;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$location = $location;
    }

    $onInit() {
        this.buildTree();
        $('#january-icon').on('click', (e) => {
            $(e.currentTarget).toggleClass('nav-open-section');
        });
    }

    buildTree() {
        this.$http.get('/blogTree')
            .then((success) => {
                this.$scope.tree = success.data;
                this.$timeout(() => {
                    this.setListeners(success.data);
                    this.setDefaults(Object.keys(success.data.dates)[0]);
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
            });
    }

    setListeners(tree) {
        // set date listeners
        Object.keys(tree.dates).forEach((date) => {
            $(`#${date}-icon`).on('click', (e) => {
                $(e.currentTarget).toggleClass('nav-open-section');
                $(`#${this.$scope.showMonth}-icon`).toggleClass('nav-open-section');
                this.$scope.showMonth = date;
                this.$scope.$apply();
            });
        });
        // set tag listeners
        Object.keys(tree.tags).forEach((tag) => {
            $(`#${tag}-icon`).on('click', (e) => {
                $(e.currentTarget).toggleClass('nav-open-section');
                $(`#${this.$scope.showTag}-icon`).toggleClass('nav-open-section');
                this.$scope.showTag = tag;
                this.$scope.$apply();
            });
        });
    }

    setDefaults(currentMonth) {
        const search = this.$location.search();
        if (search.tag !== undefined) {
            this.$scope.showTag = search.tag;
        } else if (search.blog === undefined) {
            this.$scope.showMonth = currentMonth;
        }
        if (search.date !== undefined) {
            this.$scope.showMonth = search.date;
        }
    }
}
