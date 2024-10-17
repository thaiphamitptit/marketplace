import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import categoryController from '@/controllers/category.controller'
import {
  createNewCategoryReqBody,
  deleteCategoryReqParams,
  getCategoryReqParams,
  updateCategoryReqBody,
  updateCategoryReqParams
} from '@/shared/validators/category.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const categoryRoutes = Router()

categoryRoutes.get(
  '/:categoryId',
  validateSchema(getCategoryReqParams, 'params'),
  asyncHandler(categoryController.getCategory)
)

/** Check authentication */
categoryRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
categoryRoutes.use(checkAuthorization(['admin', 'seller']))

categoryRoutes.post(
  '',
  validateSchema(createNewCategoryReqBody, 'body'),
  asyncHandler(categoryController.createNewCategory)
)
categoryRoutes.patch(
  '/:categoryId',
  validateSchema(updateCategoryReqParams, 'params'),
  validateSchema(updateCategoryReqBody, 'body'),
  asyncHandler(categoryController.updateCategory)
)
categoryRoutes.delete(
  '/:categoryId',
  validateSchema(deleteCategoryReqParams, 'params'),
  asyncHandler(categoryController.deleteCategory)
)

export default categoryRoutes
