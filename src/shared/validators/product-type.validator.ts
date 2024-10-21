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
