import { Router } from 'express'
import { validate } from '~/middlewares/validator.middleware'
import { loginJoiSchema, registerJoiSchema } from '~/validators/access.validator'
import accessController from '~/controllers/access.controller'
import asyncHandler from '~/helpers/asynchandler.helper'

const accessRoute = Router()

accessRoute.post('/register', validate(registerJoiSchema, 'body'), asyncHandler(accessController.register))
accessRoute.post('/login', validate(loginJoiSchema, 'body'), asyncHandler(accessController.login))

export default accessRoute
