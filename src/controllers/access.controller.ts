import { NextFunction, Request, Response } from 'express'
import { CreatedResponse, SuccessResponse } from '~/core/success.response'
import AccessService from '~/services/access.service'
import systemMessages from '~/constants/messages'
import { AuthFailureError } from '~/core/error.response'

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

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const keyToken = req.keyToken
    if (!keyToken) {
      throw new AuthFailureError(systemMessages.INVALID_REQUEST)
    }
    new SuccessResponse({
      message: systemMessages.LOGOUT_SUCCESSFULLY,
      metadata: await AccessService.logout({ keyToken })
    }).send(res)
  }

  refreshTokenPair = async (req: Request, res: Response, next: NextFunction) => {
    const keyToken = req.keyToken
    const userInfo = req.userInfo
    const refreshToken = req.refreshToken
    if (!(keyToken && userInfo && refreshToken)) {
      throw new AuthFailureError(systemMessages.INVALID_REQUEST)
    }
    new SuccessResponse({
      message: systemMessages.REFRESH_TOKEN_PAIR_SUCCESSFULLY,
      metadata: await AccessService.refreshTokenPair({ keyToken, userInfo, refreshToken })
    }).send(res)
  }
}

const accessController = new AccessController()
export default accessController
