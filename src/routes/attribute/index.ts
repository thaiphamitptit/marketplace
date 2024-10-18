import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication, checkAuthorization } from '@/middlewares/auth.middleware'
import attributeController from '@/controllers/attribute.controller'
import {
  createNewAttributeReqBody,
  deleteAttributeReqParams,
  getAttributeReqParams,
  updateAttributeReqBody,
  updateAttributeReqParams
} from '@/shared/validators/attribute.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const attributeRoutes = Router()

attributeRoutes.get(
  '/:attributeId',
  validateSchema(getAttributeReqParams, 'params'),
  asyncHandler(attributeController.getAttribute)
)

/** Check authentication */
attributeRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)
attributeRoutes.use(checkAuthorization(['admin', 'seller']))

attributeRoutes.post(
  '',
  validateSchema(createNewAttributeReqBody, 'body'),
  asyncHandler(attributeController.createNewAttribute)
)
attributeRoutes.patch(
  '/:attributeId',
  validateSchema(updateAttributeReqParams, 'params'),
  validateSchema(updateAttributeReqBody, 'body'),
  asyncHandler(attributeController.updateAttribute)
)
attributeRoutes.delete(
  '/:attributeId',
  validateSchema(deleteAttributeReqParams, 'params'),
  asyncHandler(attributeController.deleteAttribute)
)

export default attributeRoutes
