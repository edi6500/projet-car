const Express = require('express');
const PricingController = require('../../controllers/pricing.controller');

const router = Express.Router();

router
    .route('/')
    .get(PricingController.findAll)
    .post(PricingController.create);

router
    .route('/:pricingId')
    .patch(PricingController.update)
    .delete(PricingController.remove);

module.exports = router;