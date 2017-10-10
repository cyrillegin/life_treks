import './about-page.style.scss';

export default class aboutController {

    constructor($scope) {
        'ngInject';
        this.$scope = $scope;

    }
    $onInit() {
        $('#form-submit').on('click', (event) => {
            console.log('got a hit');
        });
    }
}
