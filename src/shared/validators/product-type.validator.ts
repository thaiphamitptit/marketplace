import Joi from 'joi'

export const createNewProductTypeReqBody = Joi.object({
  name: Joi.string().required(),
  attributes: Joi.array().items(Joi.string().uuid().required()).unique().required(),
  thumb: Joi.string().optional(),
  description: Joi.string().optional()
})

export const updateProductTypeReqBody = Joi.object({
  name: Joi.string().optional(),
  attributes: Joi.array().items(Joi.string().uuid().required()).unique().optional(),
  thumb: Joi.string().optional(),
  description: Joi.string().optional()
}).or('name', 'attributes', 'thumb', 'description')

export const updateProductTypeReqParams = Joi.object({
  productTypeId: Joi.string().uuid().required()
})

export const deleteProductTypeReqParams = Joi.object({
  productTypeId: Joi.string().uuid().required()
})

export const getProductTypeReqParams = Joi.object({
  productTypeId: Joi.string().uuid().required()
})

export const getProductTypesReqQuery = Joi.object({
  filter: Joi.object({
    attributes: Joi.object({
      $in: Joi.array().items(Joi.string().uuid().required()).unique().optional()
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
  sort: Joi.string().valid('name', 'createdAt', 'updatedAt').optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  select: Joi.array()
    .items(Joi.string().valid('slug', 'name', 'thumb', 'description').optional())
    .unique()
    .optional()
})
