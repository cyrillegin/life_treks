'use strict';

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

app.post('/message', (req, res) => {
    try {
        sendEmail(req.body);
        res.send('success');
    } catch (error) {
        res.send(error);
    }
});

// Email commands
function sendEmail(emailContent) {
    console.log('email request:');
    console.log(emailContent);
    if (!validateMessage(emailContent)) {
        console.log('got bad email content!');
        return;
    }
    console.log('Email seems sound.');
    const transporter = _nodemailer2.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    let message = emailContent.body;
    message += '<br> emailer: ';
    message += emailContent.email;

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: emailContent.title,
        html: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log(`Email sent: ${info.response}`);
            return 'success';
        }
    });
}

// TODO: make this a module
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(email);
}

function validateMessage(message) {
    let errors = false;
    if (message.title.length < 1) {
        errors = true;
    }
    if (message.body.length < 1) {
        errors = true;
    }
    if (!validateEmail(message.email)) {
        errors = true;
    }
    return !errors;
}