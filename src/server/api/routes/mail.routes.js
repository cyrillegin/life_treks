import mail from '../controllers/mail.controller';

export default function (app) {

    app.route('/message')
        .post(mail.sendMail);

}
