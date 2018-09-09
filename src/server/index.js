import path from 'path';
import http from 'http';
import https from 'https';
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

  app.post('/crypto', (req, res) => {
    console.log(req.body);
    const crypto = req.body.details.meta;
    if (!crypto) {
      res.json('Add a cryptocurrency name to the meta field');
      return;
    }
    https.get('https://api.coinmarketcap.com/v1/ticker/', (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        const result = JSON.parse(data).filter(e => e.id === crypto.toLowerCase())[0];
        if (result) {
          res.json(`Got new reading for ${crypto}: $${result.price_usd}`);
        } else {
          res.json(`Could not find entry for ${crypto}`);
        }
      });
    });
  });

  // serve all endpoints the index
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.env.PWD, 'dist/index.html'));
  });

  const port = process.env.PORT || '3000';
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port, () => console.log(`Site running on localhost:${port}`));
})();
