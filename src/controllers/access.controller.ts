import { NextFunction, Request, Response } from 'express'
import { CreatedResponse } from '~/core/success.response'
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
}

const accessController = new AccessController()
export default accessController
