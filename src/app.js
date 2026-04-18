import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World for you!');
});

export default app;
