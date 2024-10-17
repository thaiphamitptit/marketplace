import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import categoryController from '@/controllers/category.controller'
import { createNewCategoryReqBody } from '@/shared/validators/category.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const categoryRoutes = Router()

/** Check authentication */
categoryRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
categoryRoutes.use(checkAuthorization(['admin', 'seller']))

categoryRoutes.post(
  '',
  validateSchema(createNewCategoryReqBody, 'body'),
  asyncHandler(categoryController.createNewCategory)
)

export default categoryRoutes
