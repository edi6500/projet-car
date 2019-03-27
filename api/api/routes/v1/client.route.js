const Express = require('express'),
      ClientController = require('../../controllers/client.controller');

const { authorize, ADMIN, LOGGED_USER } = require('./../../middlewares/auth.middleware');

const router = Express.Router();

router
  .route('/')
    .post(ClientController.create)
    .get(/*authorize([ADMIN, LOGGED_USER]),*/ ClientController.findAll);

router
  .route('/:clientId')
    .get(ClientController.findOne)
    .delete(ClientController.remove);

module.exports = router;
