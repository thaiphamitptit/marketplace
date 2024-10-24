import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import categoryController from '@/controllers/category.controller'
import {
  createNewCategoryReqBody,
  deleteCategoryReqParams,
  getAncestorCategoriesReqParams,
  getAncestorCategoriesReqQuery,
  getCategoriesReqQuery,
  getCategoryReqParams,
  getDescendantCategoriesReqParams,
  getDescendantCategoriesReqQuery,
  searchCategoriesReqQuery,
  updateCategoryReqBody,
  updateCategoryReqParams
} from '@/shared/validators/category.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const categoryRoutes = Router()

categoryRoutes.get(
  '/search',
  validateSchema(searchCategoriesReqQuery, 'query'),
  asyncHandler(categoryController.searchCategories)
)
categoryRoutes.get('', validateSchema(getCategoriesReqQuery, 'query'), asyncHandler(categoryController.getCategories))
categoryRoutes.get(
  '/:categoryId',
  validateSchema(getCategoryReqParams, 'params'),
  asyncHandler(categoryController.getCategory)
)

/** Check authentication */
categoryRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
categoryRoutes.use(checkAuthorization(['admin', 'seller']))

categoryRoutes.get(
  '/:categoryId/ancestors',
  validateSchema(getAncestorCategoriesReqParams, 'params'),
  validateSchema(getAncestorCategoriesReqQuery, 'query'),
  asyncHandler(categoryController.getAncestorCategories)
)
categoryRoutes.get(
  '/:categoryId/descendants',
  validateSchema(getDescendantCategoriesReqParams, 'params'),
  validateSchema(getDescendantCategoriesReqQuery, 'query'),
  asyncHandler(categoryController.getDescendantCategories)
)
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
