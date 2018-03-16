'use strict';
// const token = require('./authentication/token');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sessionToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    generateSessionToken: (req) => {
      const accessToken = token.generateAccessToken(req.user.id);
    }
  }, {});

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Score, {
      foreignKey: 'userId'
    });
  };
  return User;
};
