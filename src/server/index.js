import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

(async () => {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));


  app.get('*.gz', (req, res, next) => {
    res.set('Content-Type', 'application/javascript');
    res.set('Content-Encoding', 'gzip');
    next();
  });

  // This sets where all the public files can be served from.
  app.use(express.static(path.join(process.env.PWD, 'dist/')));

  // serve all endpoints the index
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.env.PWD, 'dist/index.html'));
  });

  const port = process.env.PORT || '3000';
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port, () => console.log(`Site running on localhost:${port}`));
})();
