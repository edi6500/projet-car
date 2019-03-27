const Express = require('express');
      AuthController = require(`${process.cwd()}/api/controllers/auth.controller`)
      // Validate = require('express-validation');

// const { login, register, refresh } = require('./../../validations/auth.validation');

const router = Express.Router();
      
router
  .route('/register')
    .post( AuthController.register ); // Validate(register),

router
  .route('/login')
    .post(  AuthController.login ); // Validate(login),

router
  .route('/refresh-token')
    .post(  AuthController.refresh ); //Validate(refresh),

router
  .route('/token-gen-client')
    .post(AuthController.createJwtClient);

router
  .route('/:userId')
    .patch(AuthController.updatePwd)

router
  .route('/message')
    .post(AuthController.sendMessage)

module.exports = router;