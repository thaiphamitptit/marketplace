import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkApiKey, checkPermission } from '@/middlewares/api-key.middleware'
import { apiKeyReqHeaders } from '@/shared/validators/api-key.validator'

const appRoutes = Router()

/** Check api key and permissions */
appRoutes.use(validateSchema(apiKeyReqHeaders, 'headers'), checkApiKey)
appRoutes.use(checkPermission(['all']))

export default appRoutes
