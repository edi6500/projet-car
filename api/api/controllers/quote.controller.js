const Quote = require('./../models/quote.model');
const Boom = require('boom');
const Client = require('../controllers/client.controller');
const Mailer = require('../services/nodemailer.service');

/** 
* GET all quotes
*/
exports.findAll = async (req, res, next) => {
    try{
        const quotes = await Quote.find();
        return res.json(quotes);
    }catch(err){
        next(Boom.expectationFailed(err.message));
    }
};

/** 
* GET one quote 
*/
exports.findOne = async(req, res, next) =>{
    try {
        const quote = await Quote.findById(req.params.quoteId);
        return res.json(quote);
    } catch (err) {
        next(Boom.expectationFailed(err.message));
    }
}

/** 
* GET quote per clients
*/
exports.findPerClient = async(req, res, next) =>{
    try {
        const quote = await Quote.findById(req.params.clientId);
        return res.json(quote);
    } catch (err) {
        next(Boom.expectationFailed(err.message));
    }
}

/** 
* POST one quote 
*/
exports.add = async (req, res, next) =>{
    console.log(req.body);
    try{
        const quote = await new Quote(req.body);
        await quote.save();
        await Client.updateQuotesId(req, res, next, quote.idClient, quote._id);
        return res.json(quote);
    }catch(err){
        console.log(err.message);
        next(Boom.expectationFailed(err.message));
    }
}

/** 
* PATCH quote 
*/
exports.update = async (req, res, next) =>{
    try {
        const quote = await Quote.findOneAndUpdate({_id : req.params.quoteId}, req.body, {new : true});
        return res.json(quote);
    } catch (err) {
        next(Boom.badImplementation(err.message));
    }
}

/** 
* PATCH quote prices
*/
exports.updatePrices = async (req, res, next) =>{
    try {
        const quote = await Quote.findById(req.params.quoteId);
        // console.log(quote);
        await quote.findOneandCalculatePrice(req.body);
        await quote.save();
        Mailer.sendMail('', 'treated');
        res.json(quote);
    } catch (err) {
        next(Boom.expectationFailed(err.message));
    }
}


/** 
* DELETE quote 
*/
exports.remove = async (req, res, next) =>{
    try {
        const quote = await Quote.findByIdAndDelete(req.params.quoteId)
        return res.json(quote);
    } catch (err) {
        next(Boom.badImplementation(err.message));
    }
}