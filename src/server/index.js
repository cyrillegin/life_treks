import path from 'path';
import express from 'express';


const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || '5000';

app.use(express.static(path.join(process.env.PWD, 'dist/server/public')));


app.get('*', (req, res) => {
    res.sendFile(path.join(process.env.PWD, 'dist/server/public/index.html'));
});


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));


app.post('/message', (req, res) => {
    sendEmail(req.body);
});


function sendEmail(emailContent) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    let message = emailContent.body;
    message += '<br> emailer: ';
    message += emailContent.email;

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: emailContent.title,
        html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${ info.response}`);
        }
    });
}
app.listen(port);
