const express = require('express');
const router = require('./routes/route.js');
const db = require('./db/sequelize');

const app = express();
app.use(express.json());
app.use(router);

// db.sync()
//   .then(() => {
//     console.log('Synced db.');
//   })
//   .catch((err) => {
//     console.log('Failed to sync db: ' + err);
//   });

app.listen(8000);
