const Pricing = require('../models/pricing.model'),
      Boom = require('boom');

/**
 * GET pricing
 */
exports.findAll = async (req, res, next) => {
  try {
    const pricing = await Pricing.find();
    // console.log("test : " + 2 * pricing[0].vat);
    return pricing[0];
  } catch (error) {
    next(Boom.expectationFailed(error.message));
  }
}

/**
 * POST pricing
 */
exports.create = async (req, res, next) => {
  try {
    const pricing = new Pricing(req.body);
    await pricing.save();
    res.json(pricing);
  } catch (error) {
    next(Boom.expectationFailed(error.message));
  }
}

/** 
* PATCH quote 
*/
exports.update = async (req, res, next) =>{
  try {
      const pricing = await Pricing.findByIdAndUpdate(req.params.pricingId, req.body, {new : true});
      return res.json(pricing);
  } catch (err) {
      next(Boom.expectationFailed(err.message));
  }
}

/** 
* DELETE pricing 
*/
exports.remove = async (req, res, next) =>{
  try {
      const pricing = await Pricing.findByIdAndDelete(req.params.pricingId)
      return res.json(pricing);
  } catch (err) {
      next(Boom.expectationFailed(err.message));
  }
}