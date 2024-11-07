import { Router } from 'express'
import accessRoutes from '@/routes/access'
import categoryRoutes from '@/routes/category'
import attributeRoutes from '@/routes/attribute'
import productTypeRoutes from '@/routes/product-type'
import productRoutes from '@/routes/product'
import inventoryRoutes from '@/routes/inventory'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkApiKey, checkPermission } from '@/middlewares/api-key.middleware'
import { apiKeyReqHeaders } from '@/shared/validators/api-key.validator'

const appRoutes = Router()

/** Check api key and permissions */
appRoutes.use(validateSchema(apiKeyReqHeaders, 'headers'), checkApiKey)
appRoutes.use(checkPermission(['all']))

/** Define all routes after middleware */
appRoutes.use('/inventories', inventoryRoutes)
appRoutes.use('/products', productRoutes)
appRoutes.use('/product-types', productTypeRoutes)
appRoutes.use('/attributes', attributeRoutes)
appRoutes.use('/categories', categoryRoutes)
appRoutes.use('', accessRoutes)

export default appRoutes
