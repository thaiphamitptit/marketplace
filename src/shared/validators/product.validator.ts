import Joi from 'joi'

export const createNewProductReqBody = Joi.object({
  categories: Joi.array().items(Joi.string().uuid().required()).unique().required(),
  type: Joi.string().uuid().required(),
  name: Joi.string().required(),
  thumb: Joi.string().required(),
  images: Joi.array().items(Joi.string().optional()).unique().optional(),
  description: Joi.string().optional(),
  specifications: Joi.array()
    .items(
      Joi.object({
        attribute: Joi.string().uuid().required(),
        value: Joi.any().required()
      }).required()
    )
    .unique((a, b) => a.attribute === b.attribute)
    .required(),
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        options: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              images: Joi.array().items(Joi.string().optional()).unique().optional()
            })
          )
          .unique((a, b) => a.name === b.name)
          .required()
      }).optional()
    )
    .unique((a, b) => a.name === b.name)
    .optional()
})

export const updateProductReqBody = Joi.object({
  categories: Joi.array().items(Joi.string().uuid().required()).unique().optional(),
  type: Joi.string().uuid().optional(),
  name: Joi.string().optional(),
  thumb: Joi.string().optional(),
  images: Joi.array().items(Joi.string().optional()).unique().optional(),
  description: Joi.string().optional(),
  specifications: Joi.array()
    .items(
      Joi.object({
        attribute: Joi.string().uuid().required(),
        value: Joi.any().required()
      }).required()
    )
    .unique((a, b) => a.attribute === b.attribute)
    .optional(),
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        options: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              images: Joi.array().items(Joi.string().optional()).unique().optional()
            })
          )
          .unique((a, b) => a.name === b.name)
          .required()
      }).optional()
    )
    .unique((a, b) => a.name === b.name)
    .optional()
}).or('categories', 'type', 'name', 'thumb', 'images', 'description', 'specifications', 'variants')

export const updateProductReqParams = Joi.object({
  productId: Joi.string().uuid().required()
})

export const deleteProductReqParams = Joi.object({
  productId: Joi.string().uuid().required()
})

export const publishProductReqParams = Joi.object({
  productId: Joi.string().uuid().required()
})

export const unPublishProductReqParams = Joi.object({
  productId: Joi.string().uuid().required()
})

export const getProductReqParams = Joi.object({
  productId: Joi.string().uuid().required()
})

export const getProductsReqQuery = Joi.object({
  filter: Joi.object({
    seller: Joi.string().uuid().optional(),
    categories: Joi.object({
      $in: Joi.array().items(Joi.string().uuid().required()).unique().optional()
    }).optional(),
    type: Joi.string().uuid().optional(),
    rating: Joi.object({
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
  sort: Joi.string().valid('name', 'rating', 'createdAt', 'updatedAt').optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  select: Joi.array()
    .items(Joi.string().valid('slug', 'seller', 'categories', 'type', 'name', 'thumb', 'rating').optional())
    .unique()
    .optional()
})

export const searchProductsReqQuery = Joi.object({
  keyword: Joi.string().required(),
  filter: Joi.object({
    seller: Joi.string().uuid().optional(),
    categories: Joi.object({
      $in: Joi.array().items(Joi.string().uuid().required()).unique().optional()
    }).optional(),
    type: Joi.string().uuid().optional(),
    rating: Joi.object({
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
  sort: Joi.string().valid('name', 'rating', 'createdAt', 'updatedAt').optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  select: Joi.array()
    .items(Joi.string().valid('slug', 'seller', 'categories', 'type', 'name', 'thumb', 'rating').optional())
    .unique()
    .optional()
})
