import Joi from 'joi'

export const createNewPricingReqBody = Joi.object({
  origin: Joi.number().required(),
  sale: Joi.number().required(),
  currency: Joi.string().valid('vnd', 'usd').optional()
})

export const getPricingReqParams = Joi.object({
  productId: Joi.string().uuid().required(),
  pricingId: Joi.string().uuid().required()
})

export const getPricingsReqQuery = Joi.object({
  filter: Joi.object({
    origin: Joi.object({
      $gte: Joi.number().integer().optional(),
      $lte: Joi.number().integer().optional()
    }).optional(),
    sale: Joi.object({
      $gte: Joi.number().integer().optional(),
      $lte: Joi.number().integer().optional()
    }).optional(),
    currency: Joi.string().valid('vnd', 'usd').optional(),
    startDate: Joi.object({
      $gte: Joi.date().iso().optional(),
      $lte: Joi.date().iso().optional()
    }).optional(),
    endDate: Joi.object({
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
  sort: Joi.string().valid('origin', 'sale', 'startDate', 'endDate', 'createdAt', 'updatedAt').optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  select: Joi.array()
    .items(Joi.string().valid('origin', 'sale', 'currency').optional())
    .unique()
    .optional()
})
