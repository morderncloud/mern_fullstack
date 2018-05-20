const express = require("express");
const mongoose = require('mongoose');

const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

const app = new express();
const db = require('./config/keys').dbURI;

mongoose.connect(db).then(() => console.log('DB connected successfully')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));