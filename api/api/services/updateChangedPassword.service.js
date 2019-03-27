const TokenGen = require('./../models/tokengeneration.model');
const Boom = require('boom');

/** 
* PATCH token 
*/
exports.updateUsedToken = async(tokenId) =>{
    console.log(tokenId);
    try{
        await TokenGen.findByIdAndUpdate(tokenId, {used : true}, {new : true});
    }catch(err){
        throw( Boom.expectationFailed(err.message));
    }
}