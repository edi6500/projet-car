const Client = require('../models/client.model'),
      User = require('./user.controller'),
      HTTPStatus = require('http-status'),
      Boom = require('boom'),
      GeneratePassword = require('password-generator');

/**
 * POST client
 */
exports.create = async (req, res, next) => {
  try{
    const client = new Client(req.body);
    await client.save();
    let user_data = {};
    const generatedPassword = GeneratePassword(12, false);
    console.log("password client : "+generatedPassword);
    user_data = {
      email: client.email,
      password: generatedPassword,
      refId: client._id,
      role: "client"
    };
    await User.create(req, res, next, user_data);
    res.json(client);
  }
  catch(e){
    next(Boom.expectationFailed(e.message));
    // next(Client.checkDuplicateIban(e.message));
  }
}

/**
 * GET all clients
 */
exports.findAll = async (req, res, next) => {
  try{
    const clients =  await Client.find();
    // res.json(await Client.serialize(clients));
    res.json(await clients);
  }
  catch(e){
    next(Boom.badImplementation(e));
  }
}

/**
 * GET one client
 */
exports.findOne = async (req, res, next) => {
  try{
    const client = await Client.findById(req.params.clientId);
    res.json(client);
  }
  catch(e){
    next(Boom.badImplementation(e));
  }
}

/**
 * DELETE client
 */
exports.remove = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndRemove(req.params.clientId);
    User.remove(req, res, next, client.userId);
    res.status(HTTPStatus.NO_CONTENT).end();
  }
  catch(e) {
    next( Boom.badImplementation(e) );
  }
}


/** 
* PATCH client 
*/
exports.update = async (req, res, next) =>{
  try{
      const client = await Client.findByIdAndUpdate(req.params.clientId, req.body, {new : true});
      console.log(client);
      let data = client.userId;
      User.update(req, res, next, data);
      return res.json(client);
  }catch(err){
      console.log(err);
      next(Boom.expectationFailed(err.message));
  }
}

/** 
* PATCH userId 
*/
exports.updateUserId = async (req, res, next, userId, clientId) => {
  try {
    const savedClient = await Client.findByIdAndUpdate(clientId, {userId: userId}, { new : true });
  } catch (error) {
    next(Boom.expectationFailed(error.message))
  }
  
}

/** 
* PATCH quotesId 
*/
exports.updateQuotesId = async (req, res, next, clientId, quoteId) => {
  try {
    await Client.findByIdAndUpdate(clientId, {$push: {quotesId : quoteId}}, { new : true });
  } catch (error) {
    next(Boom.expectationFailed(error.message))
  }
  
}