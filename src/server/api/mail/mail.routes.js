import mail from './mail.controller';

export default function (app) {

    app.route('/message')
        .post(mail.sendMail);

}
