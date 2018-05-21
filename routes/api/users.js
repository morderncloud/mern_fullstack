const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load model
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({
  msg: 'The router works'
}));

router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      res.status(400).json({
        email: 'Email already exists'
      })
    } else {
      const avatar = gravatar.url({
        email: req.body.email
      }, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm', // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        //avatar: avatar,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        });
      });
    }
  })
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          email: 'User not found'
        });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          res.status(200).json({
            msg: 'Success'
          });
        } else {
          res.status(400).json({
            password: 'Password incorrect'
          });
        }
      });
    });
});

module.exports = router;