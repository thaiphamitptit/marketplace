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

export const deleteCategoryReqParams = Joi.object({
  categoryId: Joi.string().uuid().required()
})

export const getCategoryReqParams = Joi.object({
  categoryId: Joi.string().uuid().required()
})

export const getCategoriesReqQuery = Joi.object({
  filter: Joi.object({
    parent: Joi.string().uuid().optional(),
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
  sort: Joi.string().valid('name', 'left', 'right', 'createdAt', 'updatedAt').optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  select: Joi.array()
    .items(Joi.string().valid('slug', 'parent', 'left', 'right', 'name', 'thumb', 'description').optional())
    .unique()
    .optional()
})
