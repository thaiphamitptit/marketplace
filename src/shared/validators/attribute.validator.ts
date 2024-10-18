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

export const getAttributeReqParams = Joi.object({
  attributeId: Joi.string().uuid().required()
})

export const getAttributesReqQuery = Joi.object({
  filter: Joi.object({
    type: Joi.string().valid('string', 'number', 'date', 'boolean', 'array', 'object').optional(),
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
    .items(Joi.string().valid('slug', 'name', 'type', 'description').optional())
    .unique()
    .optional()
})
