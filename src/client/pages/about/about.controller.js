import './about-page.style.scss';

export default class aboutController {

    constructor($scope, $http) {
        'ngInject';
        this.$scope = $scope;

        $('#form-submit').on('click', (event) => {
            const message = {
                title: $('#form-title').val(),
                body: $('#form-body').val(),
                email: $('#form-from-email').val()
            };
            const email = this.validateEmail(message.email);
            let errors = false;
            if (message.title.length < 1) {
                $('#subject-required').css('display', 'block');
                errors = true;
            } else {
                $('#subject-required').css('display', 'none');
            }
            if (message.body.length < 1) {
                $('#message-required').css('display', 'block');
                errors = true;
            } else {
                $('#message-required').css('display', 'none');
            }
            if (! email) {
                $('#email-required').css('display', 'block');
                errors = true;
            } else {
                $('#email-required').css('display', 'none');
            }
            if (errors) {
                console.log('fail')
            } else {
                console.log('good!')
            }
            // $http.post('/message', message).then((success) => {
            //     console.log(success);
            //     console.log('good')
            // })
            // .catch((error) => {
            //     console.log('got error')
            //     console.log(error)
            // })
        });
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $onInit() {

    }
}
