const express = require("express");
const mongoose = require('mongoose');
const app = new express();
const db = require('./config/keys').dbURI;

mongoose.connect(db).then(() => console.log('DB connected successfully')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));