const Score = require('../models').Score;

module.exports = {
  create(req, res) {
    return Score
      .create({
        highScore: req.body.highScore,
      })
      .then((score) => res.status(201).send(score))
      .catch((error) => res.status(400).send(error));
  },

  index(req, res) {
    return Score
      .findAll({
        order: [
          ['highScore', 'DESC'],
        ],
      })
      .then((scores) => res.status(200).send(scores))
      .catch((error) => res.status(400).send(error));
  },

  show(req, res) {
    return Score
      .findById(req.params.scoreId)
      .then((score) => {
        if (!score) {
          return res.status(404).send({
            message: 'Score Not Found',
          });
        }
        return res.status(200).send(score);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Score
      .findById(req.params.scoreId)
      .then(score => {
        if (!score) {
          return res.status(404).send({
            message: 'Score Not Found',
          });
        }
        return score
          .update({
            title: req.body.title || score.title,
          })
          .then(() => res.status(200).send(score))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Score
      .findById(req.params.scoreId)
      .then(score => {
        if (!score) {
          return res.status(400).send({
            message: 'Score Not Found',
          });
        }
        return score
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
