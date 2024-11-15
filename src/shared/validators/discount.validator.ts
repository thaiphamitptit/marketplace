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

export const updateDiscountReqBody = Joi.object({
  name: Joi.string().optional(),
  thumb: Joi.string().optional(),
  description: Joi.string().optional(),
  code: Joi.string().optional(),
  effectiveDate: Joi.date().iso().optional(),
  expirationDate: Joi.date().iso().optional(),
  type: Joi.string().valid('fixed amount', 'percentage').optional(),
  value: Joi.number().optional(),
  maxValue: Joi.number().optional().allow(null),
  usageLimit: Joi.number().integer().optional(),
  appliesTo: Joi.string().valid('all', 'specific').optional(),
  products: Joi.array().items(Joi.string().uuid().optional()).optional()
}).or(
  'name',
  'thumb',
  'description',
  'code',
  'effectiveDate',
  'expirationDate',
  'type',
  'value',
  'maxValue',
  'usageLimit',
  'appliesTo',
  'products'
)

export const updateDiscountReqParams = Joi.object({
  discountId: Joi.string().uuid().required()
})

export const deleteDiscountReqParams = Joi.object({
  discountId: Joi.string().uuid().required()
})

export const getDiscountReqParams = Joi.object({
  discountId: Joi.string().uuid().required()
})

export const getDiscountsReqQuery = Joi.object({
  filter: Joi.object({
    seller: Joi.string().uuid().optional(),
    type: Joi.string().valid('fixed amount', 'percentage').optional(),
    appliesTo: Joi.string().valid('specific', 'all').optional(),
    products: Joi.object({
      $in: Joi.array().items(Joi.string().uuid().required()).unique().optional()
    }).optional(),
    value: Joi.object({
      $gte: Joi.number().integer().optional(),
      $lte: Joi.number().integer().optional()
    }).optional(),
    effectiveDate: Joi.object({
      $gte: Joi.date().iso().optional(),
      $lte: Joi.date().iso().optional()
    }).optional(),
    expirationDate: Joi.object({
      $gte: Joi.date().iso().optional(),
      $lte: Joi.date().iso().optional()
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
  sort: Joi.string().valid('name', 'value', 'effectiveDate', 'expirationDate', 'createdAt', 'updatedAt').optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  select: Joi.array()
    .items(
      Joi.string().valid('code', 'name', 'thumb', 'effectiveDate', 'expirationDate', 'value', 'maxValue').optional()
    )
    .unique()
    .optional()
})
