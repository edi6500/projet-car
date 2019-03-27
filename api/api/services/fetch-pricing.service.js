const Pricing = require('../controllers/pricing.controller');

/** 
 * GET pricings
*/
exports.getPricing = async () => {
  const pricings = await Pricing.findAll();
  // console.log(pricings);
  return pricings;
}