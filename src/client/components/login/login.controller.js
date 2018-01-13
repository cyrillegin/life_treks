export default class login {
    constructor($scope, $http, $timeout, $compile) {
        'ngInject';

        this.$scope = $scope;
        this.$http = $http;
        this.$timeout = $timeout;
        this.$compile = $compile;
    }

    $onInit() {
        const that = this;
        this.$scope.submitLogin = () => {
            const reg = RegExp(/^[a-zA-Z0-9]+$/);

            if (! reg.test(this.$scope.username)) {
                $('#user-warning').html('* User name must be alphanumeric.');
                return;
            }
            $('#user-warning').html('');

            if (! reg.test(this.$scope.password)) {
                $('#incorrect-warning').html('* Incorrect username / password combination.');
                return;
            }
            $('#incorrect-warning').html('');

            that.$http.post('/login', {username: this.$scope.username, password: this.$scope.password})
                .then((success) => {
                    console.log('got success');
                    console.log(success);
                    if (success.data.length < 1) {
                        $('#incorrect-warning').html('* Incorrect username / password combination.');
                        return;
                    }
                    $('#myCard').addClass('flip');
                })
                .catch((error) => {
                    console.log('got error');
                    console.log(error);
                });
        };

        this.$scope.submitBlog = () => {
            console.log('subbmitting blog');
        };
    }
}
