const express = require('express');
const router = require('./routes/route.js');
const db = require('./db/sequelize');

const app = express();
app.use(express.json());
app.use(router);

app.all('*', (req, res, next) => {
  res.status(400).json({
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Something broke!' });
});

app.listen(8000);
