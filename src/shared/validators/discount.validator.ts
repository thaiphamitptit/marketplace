import Joi from 'joi'

export const createNewDiscountReqBody = Joi.object({
  name: Joi.string().required(),
  thumb: Joi.string().optional(),
  description: Joi.string().optional(),
  code: Joi.string().required(),
  effectiveDate: Joi.date().iso().required(),
  expirationDate: Joi.date().iso().required(),
  type: Joi.string().valid('fixed amount', 'percentage').required(),
  value: Joi.number().required(),
  maxValue: Joi.number().required().allow(null),
  usageLimit: Joi.number().integer().required(),
  appliesTo: Joi.string().valid('all', 'specific').required(),
  products: Joi.array().items(Joi.string().uuid().optional()).optional()
})
