import Joi from 'joi'

export const createNewInventoryReqBody = Joi.object({
  product: Joi.string().uuid().required(),
  location: Joi.string().optional(),
  stock: Joi.number().integer().required(),
  threshold: Joi.number().integer().optional()
})

export const updateInventoryReqBody = Joi.object({
  location: Joi.string().optional(),
  offset: Joi.number().integer().optional(),
  threshold: Joi.number().integer().optional()
}).or('location', 'offset', 'threshold')

export const updateInventoryReqParams = Joi.object({
  inventoryId: Joi.string().uuid().required()
})
