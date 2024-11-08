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

export const deleteInventoryReqParams = Joi.object({
  inventoryId: Joi.string().uuid().required()
})

export const getInventoryReqParams = Joi.object({
  inventoryId: Joi.string().uuid().required()
})

export const getInventoriesReqQuery = Joi.object({
  filter: Joi.object({
    product: Joi.string().uuid().optional(),
    stock: Joi.object({
      $gte: Joi.number().integer().optional(),
      $lte: Joi.number().integer().optional()
    }).optional(),
    threshold: Joi.object({
      $gte: Joi.number().integer().optional(),
      $lte: Joi.number().integer().optional()
    }).optional(),
    createdAt: Joi.object({
      $gte: Joi.date().iso().optional(),
      $lte: Joi.date().iso().optional()
    }).optional(),
    updatedAt: Joi.object({
      $gte: Joi.date().iso().optional(),
      $lte: Joi.date().iso().optional()
    }).optional()
  }).optional(),
  page: Joi.number().integer().optional(),
  limit: Joi.number().integer().optional(),
  sort: Joi.string().valid('stock', 'threshold', 'createdAt', 'updatedAt').optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  select: Joi.array()
    .items(Joi.string().valid('product', 'location', 'stock', 'threshold').optional())
    .unique()
    .optional()
})
