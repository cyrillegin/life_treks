import login from './login.controller';

export default function (app) {

    app.route('/login')
        .post(login.attemptLogin);
}
