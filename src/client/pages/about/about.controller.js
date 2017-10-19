import './about-page.style.scss';

export default class aboutController {

    constructor($scope, $http) {
        'ngInject';
        this.$scope = $scope;

        $('#form-submit').on('click', (event) => {
            const message = {
                title: $('#form-title').val(),
                body: $('#form-body').val(),
                email: $('#form-from-email').val(),
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
                // return;
            }
            $('#contact-form').addClass('contact-form-closed');
            $http.post('/message', message).then((success) => {
                console.log(success);
                $('#contact-form').html(`
                    <div class="alert alert-success">
                        Thanks for your email, I will try to respond as soon as possible.
                    </div>
                `);
                $('#contact-form').removeClass('contact-form-open');
            })
                .catch((error) => {
                    console.log('got error');
                    console.log(error);
                    $('#contact-form').html(`
                        <div class="alert alert-danger">
                            Uh oh! Something went wrong :( Please try refresing your browser and try again.
                        </div>
                    `);
                    $('#contact-form').removeClass('contact-form-open');
                });
        });
    }

    // TODO: make this a module
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
        return re.test(email);
    }

    $onInit() {

    }
}
