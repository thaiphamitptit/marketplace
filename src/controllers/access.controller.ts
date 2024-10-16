import { NextFunction, Request, Response } from 'express'
import AccessService from '@/services/access.service'
import { LoginDto, RegisterDto } from '@/shared/dtos/user.dto'
import { Created, Ok } from '@/shared/responses/success.response'
import { ILoginReqBody, IRegisterReqBody, IUserInfo } from '@/shared/types/user'
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

  login = async (req: Request<any, any, ILoginReqBody, any>, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const loginDto = new LoginDto({
      email,
      password
    })
    new Ok({
      message: SuccessMessages.LOGIN_SUCCESSFULLY,
      metadata: await AccessService.login(loginDto)
    }).send(res)
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.userInfo as IUserInfo
    new Ok({
      message: SuccessMessages.LOGOUT_SUCCESSFULLY,
      metadata: await AccessService.logout(userInfo)
    }).send(res)
  }
}

const accessController = new AccessController()
export default accessController
