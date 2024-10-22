import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import productTypeController from '@/controllers/product-type.controller'
import {
  createNewProductTypeReqBody,
  deleteProductTypeReqParams,
  getProductTypeReqParams,
  updateProductTypeReqBody,
  updateProductTypeReqParams
} from '@/shared/validators/product-type.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const productTypeRoutes = Router()

productTypeRoutes.get(
  '/:productTypeId',
  validateSchema(getProductTypeReqParams, 'params'),
  asyncHandler(productTypeController.getProductType)
)

/** Check authentication */
productTypeRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
productTypeRoutes.use(checkAuthorization(['admin', 'seller']))

productTypeRoutes.post(
  '',
  validateSchema(createNewProductTypeReqBody, 'body'),
  asyncHandler(productTypeController.createNewProductType)
)
productTypeRoutes.patch(
  '/:productTypeId',
  validateSchema(updateProductTypeReqParams, 'params'),
  validateSchema(updateProductTypeReqBody, 'body'),
  asyncHandler(productTypeController.updateProductType)
)
productTypeRoutes.delete(
  '/:productTypeId',
  validateSchema(deleteProductTypeReqParams, 'params'),
  asyncHandler(productTypeController.deleteProductType)
)

export default productTypeRoutes
