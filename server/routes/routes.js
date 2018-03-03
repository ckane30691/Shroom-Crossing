const scoresController = require('../controllers').scores;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Scores API!',
  }));

  app.post('/api/scores', scoresController.create);
  app.get('/api/scores', scoresController.index);
  app.get('/api/scores/:scoreId', scoresController.show);
  app.put('/api/scores/:scoreId', scoresController.update);
  app.delete('/api/scores/:scoreId', scoresController.destroy);
};
