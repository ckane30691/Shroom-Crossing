const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
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
