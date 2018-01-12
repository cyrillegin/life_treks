export default class login {
    constructor($scope, $http) {
        'ngInject';

        this.$scope = $scope;
        this.$http = $http;
    }

    $onInit() {
        $('#login-btn').on('click', (e) => {
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

            this.$http.post('/login', {un: this.$scope.username, pw: this.$scope.password})
                .then((success) => {
                    console.log('got success');
                    console.log(success);
                })
                .catch((error) => {
                    console.log('got error');
                    console.log(error);
                });
        });
    }
}
