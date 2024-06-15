import { NextFunction, Request, Response } from 'express'
import { CreatedResponse, SuccessResponse } from '~/core/success.response'
import AccessService from '~/services/access.service'
import systemMessages from '~/constants/messages'

class AccessController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    new CreatedResponse({
      message: systemMessages.REGISTER_SUCCESSFULLY,
      metadata: await AccessService.register({ email })
    }).send(res)
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    new SuccessResponse({
      message: systemMessages.LOGIN_SUCCESSFULLY,
      metadata: await AccessService.login({ email, password })
    }).send(res)
  }
}

const accessController = new AccessController()
export default accessController
