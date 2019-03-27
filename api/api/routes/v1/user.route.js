const Express = require('express'),
      UserController = require('../../controllers/user.controller');

const { authorize, ADMIN, LOGGED_USER } = require('./../../middlewares/auth.middleware');

const router = Express.Router();

router
  .route('/')
    .get(UserController.findAll)
    .post(UserController.create);

router
  .route('/:userId')
    .get(UserController.findOne)
    .patch(UserController.update);

module.exports = router;
