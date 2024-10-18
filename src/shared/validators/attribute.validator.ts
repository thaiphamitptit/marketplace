import Joi from 'joi'

export const createNewAttributeReqBody = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('string', 'number', 'date', 'boolean', 'array', 'object').required(),
  description: Joi.string().optional()
})

export const updateAttributeReqBody = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().valid('string', 'number', 'date', 'boolean', 'array', 'object').optional(),
  description: Joi.string().optional()
}).or('name', 'type', 'description')

export const updateAttributeReqParams = Joi.object({
  attributeId: Joi.string().uuid().required()
})

export const deleteAttributeReqParams = Joi.object({
  attributeId: Joi.string().uuid().required()
})
