import Joi from 'joi'

export const registerJoiSchema = Joi.object({
  email: Joi.string().trim().strict().email().required()
})

export const loginJoiSchema = Joi.object({
  email: Joi.string().trim().strict().email().required(),
  password: Joi.string().trim().strict().min(8).max(32).required()
})
