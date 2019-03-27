const Joi = require('joi');
const User = require('../models/user.model');

module.exports = {
  //POST v1/user
  createUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
    }
  },
  // PATCH /v1/user/:userId
  updateUser: {
    body: {
      email: Joi.string().email(),
      password: Joi.string().min(6).max(128)
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
    }
  }
}