import Joi from 'joi'

export const createNewAttributeReqBody = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('string', 'number', 'date', 'boolean', 'array', 'object').required(),
  description: Joi.string().optional()
})
