import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import DB, {Blogs} from './db';
// import connectMongo from 'connect-mongo'; // eslint-disable-line
const dotenv = require('dotenv').config() // eslint-disable-line

const app = express();
const port = process.env.PORT || '5000';

app.disable('x-powered-by');

app.use(express.static(path.join(process.env.PWD, 'dist/server/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(process.env.PWD, 'dist/server/public/index.html'));
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));

DB.connect();

app.post('/message', (req, res) => {
    try {
        sendEmail(req.body);
        res.send('success');
    } catch (error) {
        res.send(error);
    }
});

app.post('/blog', async (req, res) => {
    console.log('Request to blogs');
    let result;
    try {
        result = await Blogs.find().toArray();
        res.send(result);
    } catch (error) {
        console.log('Error querying db');
        console.log(error);
        result = {Err: error};
        res.send(result);
    }
});

// Email commands
function sendEmail(emailContent) {
    console.log('email request:');
    console.log(emailContent);
    if (! validateMessage(emailContent)) {
        console.log('got bad email content!');
        return;
    }
    console.log('Email seems sound.');
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
            throw error;
        } else {
            console.log(`Email sent: ${ info.response}`);
            return 'success';
        }
    });
}
app.listen(port);

function validateMessage(message) {
    let errors = false;
    if (message.title.length < 1) {
        errors = true;
    }
    if (message.body.length < 1) {
        errors = true;
    }
    if (! validateEmail(message.email)) {
        errors = true;
    }
    return ! errors;
}

// TODO: make this a module
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(email);
}
