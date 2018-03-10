'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sessionToken: {
      type: DataTypes.STRING,
      allowNull: false
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
