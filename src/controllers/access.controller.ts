import { NextFunction, Request, Response } from 'express'
import AccessService from '@/services/access.service'
import { RegisterDto } from '@/shared/dtos/user.dto'
import { Created } from '@/shared/responses/success.response'
import { IRegisterReqBody } from '@/shared/types/user'
import { SuccessMessages } from '@/shared/constants'

class AccessController {
  register = async (req: Request<any, any, IRegisterReqBody, any>, res: Response, next: NextFunction) => {
    const { email } = req.body
    const registerDto = new RegisterDto({
      email
    })
    new Created({
      message: SuccessMessages.REGISTER_SUCCESSFULLY,
      metadata: await AccessService.register(registerDto)
    }).send(res)
  }
}

const accessController = new AccessController()
export default accessController
