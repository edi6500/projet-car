const Express = require('express');
const TokenGenController = require(`${process.cwd()}/api/controllers/tokenGeneration.controller`);
const Validate = require('express-validator');

// const { listSurveys, createSurvey } = require('./../../validations/survey.validation');
// const {authorize, ADMIN, CLIENT} = require('./../../middlewares/auth.middleware');

const router = Express.Router();

router
    .route('/:tokenId')
        .get(/*authorize(ADMIN), Validate(listSurveys), */TokenGenController.findOne)
        .post(/*authorize(CLIENT), Validate(createSurvey),*/ TokenGenController.updateUsedToken)


module.exports = router;