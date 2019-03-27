const Agent = require('../models/agent.model'),
      User = require('./user.controller'),
      HTTPStatus = require('http-status'),
      Boom = require('boom'),
      Logger = require('../../config/logger.config'),
      GeneratePassword = require('password-generator');

exports.create = async (req, res, next) => {
  try{
    const agent = new Agent(req.body);
    await agent.save();
    // const generatedPassword = GeneratePassword(12, false);
    const user_data = {
      email: req.body.email,
      password: req.body.password,
      refId: agent._id,
      role: "agent"
    };
    User.create(req, res, next, user_data);
    res.json(agent);
  }
  catch(e){
    next(Boom.expectationFailed(e.messaget));
  }
}

exports.findAll = async (req, res, next) => {
  try{
    const agents = await Agent.find();
    res.json(agents);
  }
  catch(e){
    next(Boom.expectationFailed(e.message));
  }
}

exports.findOne = async (req, res, next) => {
  try{
    const agent = await Agent.findById(req.params.agentId);
    res.json(agent);
  }
  catch(e){
    next(Boom.expectationFailed(e.message));
  }
}

exports.remove = async (req, res, next) => {
  try {
    const agent = await Agent.findByIdAndRemove(req.params.agentId);
    // console.log(agent.userId);
    User.remove(req,res, next, agent.userId);
    res.status(HTTPStatus.NO_CONTENT).end();
  }
  catch(e) {
    next( Boom.expectationFailed(e.message) );
  }
}

exports.updateUserId = async (req, res, next, userId, AgentId) => {
  const savedAgent = await Agent.findByIdAndUpdate(AgentId, {userId: userId}, { new : true });
}