const TokenGen = require('./../models/tokengeneration.model');
const Boom = require('boom');

/** 
* GET one token 
*/
exports.findOne = async (req, res, next) =>{
    try{
        const token = await TokenGen.findById(req.params.tokenId);
        return res.json(token);
    }catch(err){
        next(Boom.badImplementation(err.message));
    }
}

/** 
* PATCH token 
*/
exports.updateUsedToken = async(req, res, next, tokenId) =>{
    try{
        await TokenGen.findByIdAndUpdate(tokenId, {used : true}, {new : true});
    }catch(err){
        next( Boom.badImplementation(err.message));
    }
}