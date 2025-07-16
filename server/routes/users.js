const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/register').post(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ username: username })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        username,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      username: user.username
                    }
                  });
                }
              )
            });
        })
      })
    })
});

router.route('/login').post(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ username: username })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username
                }
              });
            }
          )
        })
    })
});

module.exports = router;
