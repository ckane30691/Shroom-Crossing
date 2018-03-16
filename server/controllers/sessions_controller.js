const User = require('../models').User;
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
  oAuthStart(req, res) {
    passport.authenticate(
          'google',
          { session: false, scope: ['openid', 'profile', 'email'] }
    );
  },
  oAuthRedirect(req, res) {
    passport.authenticate(
      'google',
      { session: false }
    ).then((req) => User.generateSessionToken(req));
  },
  create(req, res) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ message: 'Must pass token' });
    }
    jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) {
      throw err;
    }
    res.json({
      token: token
    });
  });
  }

};
