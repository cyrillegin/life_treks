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
            const req = {
                method: 'POST',
                url: '/',
                data: message,
            };
            $http.post('/message', message).then((success) => {
                console.log(success);
                console.log('good')
            })
            .catch((error) => {
                console.log('got error')
                console.log(error)
            })

        });

    }
    $onInit() {

    }
}
