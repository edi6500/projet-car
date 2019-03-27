const Express = require('express');
const QuoteController = require(`${process.cwd()}/api/controllers/quote.controller`);
const Validate = require('express-validator');

// const { listQuotes, createQuote, getQuote, updateQuote, removeQuote } = require('./../../validations/quote.validation');

const { authorize, ADMIN, LOGGED_USER } = require('./../../middlewares/auth.middleware');

const router = Express.Router();

router
    .route('/')
    .get(authorize([ADMIN, LOGGED_USER]), QuoteController.findAll)
    .post(QuoteController.add)

router
    .route('/:quoteId')
    .get(authorize([ADMIN, LOGGED_USER]), QuoteController.findOne)
    .patch(authorize([ADMIN, LOGGED_USER]), QuoteController.update)
    .delete(authorize([ADMIN, LOGGED_USER]), QuoteController.remove)

router
    .route('/pricing/:quoteId')
    .patch(authorize([ADMIN, LOGGED_USER]), QuoteController.updatePrices)

module.exports = router;