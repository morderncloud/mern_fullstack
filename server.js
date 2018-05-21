const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');

const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

const app = new express();

// Body parser
app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(bodyparser.json());

// DB connection
const db = require('./config/keys').dbURI;
mongoose.connect(db).then(() => console.log('DB connected successfully')).catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));