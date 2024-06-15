import { Router } from 'express'
import { checkApiKey, checkPermission } from '~/middlewares/apikey.middleware'
import { validate } from '~/middlewares/validator.middleware'
import { apiKeyJoiSchema } from '~/validators/apikey.validator'

const route = Router()

/** Check apikey middleware */
route.use(validate(apiKeyJoiSchema, 'headers'), checkApiKey)
route.use(checkPermission('p0000'))

export default route
