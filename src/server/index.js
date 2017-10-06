import path from 'path';
import express from 'express';

const app = express();
const port = process.env.PORT || '5000';

app.use(express.static(path.join(process.env.PWD, 'dist/server/public')));


app.get('*', (req, res) => {
    res.sendFile(path.join(process.env.PWD, 'dist/server/public/index.html'));
});

app.listen(port);
