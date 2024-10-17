import Joi from 'joi'

export const createNewCategoryReqBody = Joi.object({
  parent: Joi.string().uuid().optional().allow(null),
  name: Joi.string().required(),
  thumb: Joi.string().optional(),
  description: Joi.string().optional()
})

export const updateCategoryReqBody = Joi.object({
  parent: Joi.string().uuid().optional().allow(null),
  name: Joi.string().optional(),
  thumb: Joi.string().optional(),
  description: Joi.string().optional()
}).or('parent', 'name', 'thumb', 'description')

export const updateCategoryReqParams = Joi.object({
  categoryId: Joi.string().uuid().required()
})
