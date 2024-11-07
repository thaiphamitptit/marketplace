import Joi from 'joi'

export const createNewInventoryReqBody = Joi.object({
  product: Joi.string().uuid().required(),
  location: Joi.string().optional(),
  stock: Joi.number().integer().required(),
  threshold: Joi.number().integer().optional()
})
