const User = require('../models/user.model'),
      Boom = require('boom'),
      Client = require('../controllers/client.controller'),
      Agent = require('../controllers/agent.controller'),
      Mailer = require('../services/nodemailer.service'),
      TokenGen = require('../models/tokengeneration.model');

/**
 * POST user
 */
exports.create = async (req, res, next, data) => {
  try{
    const user = new User(data);
    // console.log(user);
    await user.save();
    if (user.role === 'client') {
      Client.updateUserId(req, res, next, user._id, user.refId);
      const accessToken  = await TokenGen.generate(user);
      Mailer.sendMail(accessToken, 'user');
    } else if (user.role === 'agent') {
      Agent.updateUserId(req, res, next, user._id, user.refId);
    }
    
    // res.status(HTTPStatus.CREATED);
    // res.json(savedUser.transform());
  }
  catch(e){
    next(Boom.expectationFailed(e.message));
    // next(User.checkDuplicateEmail(e));
  }
}

/**
 * GET all users
 */
exports.findAll = async (req, res, next) => {
  try{
    const users = {};
    users['users'] = await User.find();
    res.json(users);
  }
  catch(e){
    next(Boom.badImplementation(e));
  }
}

/**
 * GET one user
 */
exports.findOne = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userId);
    res.json(user);
  }
  catch(e){
    next(Boom.badImplementation(e));
  }
}

exports.update = async (req, res, next) => {
  try {
    const savedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new : true });
    // console.log(savedUser);
    res.json(savedUser);
  }
  catch(e)
  {
    next( User.checkDuplicateEmail(e) );
  }
}

exports.remove = async (req, res, next, userId) => {
  await User.findByIdAndRemove(userId);
}