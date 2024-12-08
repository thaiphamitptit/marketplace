import { Router } from 'express'
import pricingRoutes from '@/routes/product/pricing'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import productController from '@/controllers/product.controller'
import {
  createNewProductReqBody,
  deleteProductReqParams,
  getDraftProductsReqQuery,
  getProductReqParams,
  getProductsReqQuery,
  getPublishProductsReqQuery,
  publishProductReqParams,
  unPublishProductReqParams,
  searchProductsReqQuery,
  updateProductReqBody,
  updateProductReqParams
} from '@/shared/validators/product.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const productRoutes = Router()

productRoutes.get(
  '/search',
  validateSchema(searchProductsReqQuery, 'query'),
  asyncHandler(productController.searchProducts)
)
productRoutes.get('', validateSchema(getProductsReqQuery, 'query'), asyncHandler(productController.getProducts))
productRoutes.get(
  '/:productId',
  validateSchema(getProductReqParams, 'params'),
  asyncHandler(productController.getProduct)
)

/** Check authentication */
productRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
productRoutes.use(checkAuthorization(['admin', 'seller']))

productRoutes.post(
  '',
  validateSchema(createNewProductReqBody, 'body'),
  asyncHandler(productController.createNewProduct)
)
productRoutes.patch(
  '/:productId',
  validateSchema(updateProductReqParams, 'params'),
  validateSchema(updateProductReqBody, 'body'),
  asyncHandler(productController.updateProduct)
)
productRoutes.delete(
  '/:productId',
  validateSchema(deleteProductReqParams, 'params'),
  asyncHandler(productController.deleteProduct)
)
productRoutes.patch(
  '/:productId/publish',
  validateSchema(publishProductReqParams, 'params'),
  asyncHandler(productController.publishProduct)
)
productRoutes.patch(
  '/:productId/un-publish',
  validateSchema(unPublishProductReqParams, 'params'),
  asyncHandler(productController.unPublishProduct)
)
productRoutes.get(
  '/drafts/all',
  validateSchema(getDraftProductsReqQuery, 'query'),
  asyncHandler(productController.getDraftProducts)
)
productRoutes.get(
  '/publishes/all',
  validateSchema(getPublishProductsReqQuery, 'query'),
  asyncHandler(productController.getPublishProducts)
)

productRoutes.use('/:productId/pricings', validateSchema(getProductReqParams, 'params'), pricingRoutes)

export default productRoutes
