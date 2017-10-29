import navController from './navbar.controller';
import nav from './navbar.html';
import './navbar.style.scss';
import 'font-awesome/css/font-awesome.min.css';

const navcomponent = {
    template: nav,
    controller: navController,
};

export default navcomponent;
