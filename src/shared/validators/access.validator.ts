import Joi from 'joi'

export const registerReqBody = Joi.object({
  email: Joi.string().email().required()
})
