const Express = require('express'),
      UserRoutes = require('./user.route'),
      ClientRoutes = require('./client.route'),
      AgentRoutes = require('./agent.route'),
      AuthRoutes = require('./auth.route'),
      QuoteRoutes = require('./quote.route'),
      PricingRoutes = require('./pricing.route');
      //   TokenGenRoutes = require('./tokenGeneraton.route');

const router = Express.Router();

/**
 * Application routes
 */
router.use('/users', UserRoutes);
router.use('/clients', ClientRoutes);
router.use('/agents', AgentRoutes);
router.use('/auth', AuthRoutes);
router.use('/quotes', QuoteRoutes);
router.use('/pricings', PricingRoutes);
// router.use('/tokens', TokenGenRoutes);

module.exports = router;