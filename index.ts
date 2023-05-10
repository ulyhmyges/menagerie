import express from 'express';


const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('my first animal'));

app.listen(port, () => console.log(`application listening on port ${port}`));

