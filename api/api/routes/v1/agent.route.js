const Express = require('express'),
      AgentController = require('../../controllers/agent.controller');

const { authorize, ADMIN, LOGGED_USER } = require('./../../middlewares/auth.middleware');

const router = Express.Router();

router
  .route('/')
    .get(AgentController.findAll)
    .post(AgentController.create);

router
  .route('/:agentId')
    .get(authorize(ADMIN), AgentController.findOne)
    .delete(AgentController.remove);

module.exports = router;
