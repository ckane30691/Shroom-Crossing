'use strict';
module.exports = (sequelize, DataTypes) => {
  var Score = sequelize.define('Score', {
    highScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Score.associate = function(models) {
    // associations can be defined here
    Score.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Score;
};
