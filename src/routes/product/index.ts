import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import productController from '@/controllers/product.controller'
import {
  createNewProductReqBody,
  deleteProductReqParams,
  publishProductReqParams,
  updateProductReqBody,
  updateProductReqParams
} from '@/shared/validators/product.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const productRoutes = Router()

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

export default productRoutes
