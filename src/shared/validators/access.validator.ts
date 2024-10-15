import Joi from 'joi'

export const registerReqBody = Joi.object({
  email: Joi.string().email().required()
})

export const loginReqBody = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
