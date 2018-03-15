const scoresController = require('../controllers').scores;
const sessionController = require('../controllers').sessionController;
const userController = require('../controllers').userController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Scores API!',
  }));
  app.get('api/authentication/google/redirect', sessionController.oAuthRedirect);
  app.get('api/authentication/google/start', sessionController.oAuthStart);
  app.delete('api/session', sessionController.destroy);
  app.post('/api/scores', scoresController.create);
  app.get('/api/scores', scoresController.index);
  app.get('/api/scores/:scoreId', scoresController.show);
  app.put('/api/scores/:scoreId', scoresController.update);
  app.delete('/api/scores/:scoreId', scoresController.destroy);
};
