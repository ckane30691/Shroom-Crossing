'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    highScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    allScores: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    }

  }, {});
  Score.associate = function(models) {
    // associations can be defined here
  };
  return Score;
};
