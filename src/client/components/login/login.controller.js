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
            console.log('submitting blog');
            const reg = RegExp(/^[a-zA-Z0-9 ]+$/);

            if (this.$scope.blogTitle === undefined || ! reg.test(this.$scope.blogTitle) || this.$scope.blogTitle.length < 5) {
                $('#blog-title-warning').html('* Pass the regex.');
                return;
            }
            $('#blog-title-warning').html('');

            if (this.$scope.blogBody === undefined || ! reg.test(this.$scope.blogBody) || this.$scope.blogBody.length < 5) {
                $('#blog-body-warning').html('* Pass the regex.');
                return;
            }
            $('#blog-body-warning').html('');

            if (this.$scope.blogTags === undefined || ! reg.test(this.$scope.blogTags) || this.$scope.blogTags.length < 5) {
                $('#blog-tags-warning').html('* Pass the regex.');
                return;
            }
            $('#blog-tags-warning').html('');
            console.log('passed sanitation');

            const params = {
                blogTitle: this.$scope.blogTitle,
                blogBody: this.$scope.blogBody,
                blogTags: this.$scope.blogTags,
            };

            that.$http.post('/blogs', params)
                .then((success) => {
                    console.log('success');
                    console.log(success);
                })
                .catch((error) => {
                    console.log('there was an error posting');
                    console.log(error);
                });
        };
    }
}
