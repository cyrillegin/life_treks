import path from 'path';
import express from 'express';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
// import Blog from './api/blog/blog.model'; // eslint-disable-line
// import User from './api/login/login.model'; //eslint-disable-line
// import blogRoutes from './api/blog/blog.routes';
// import mailRoutes from './api/mail/mail.routes';
// import loginRoutes from './api/login/login.routes';// eslint-disable-line
const dotenv = require('dotenv').config();// eslint-disable-line

const app = express();

app.use(helmet());
// This will work once bootstrap has been removed.
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: [`'self'`],
//         scriptSrc: [`'self'`,`'unsafe-inline'`, '*.google-analytics.com/'],
//         styleSrc: [`'self'`, `'unsafe-inline'`, '*.googleapis.com/'],
//         fontSrc: [`'self'`, '*.gstatic.com/'],
//         imgSrc: [`'self'`, '*.google-analytics.com/'],
//     },
// }));
app.use(helmet.hidePoweredBy());

app.use(express.static(path.join(process.env.PWD, 'dist/server/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.env.PWD, 'dist/server/public/index.html'));
});

app.get('/demo/boat', (req, res) => {
    res.sendFile(path.join(process.env.PWD, 'dist/server/public/boatDemo/boat1.json'));
});

const port = process.env.PORT || 3000;

// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// blogRoutes(app);
// mailRoutes(app);
// loginRoutes(app);

app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl } not found`});
});


app.listen(port);

console.log(`Listening on port: ${ port}`);
