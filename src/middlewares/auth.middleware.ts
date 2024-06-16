import { NextFunction, Request, Response } from 'express'
import { AuthFailureError } from '~/core/error.response'
import KeyTokenService from '~/services/keytoken.service'
import { verifyToken } from '~/helpers/jwt.helper'
import requestHeaders from '~/constants/headers'
import systemMessages from '~/constants/messages'

/** Check authentication */
export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers[requestHeaders.CLIENT_ID]?.toString()
    const refreshToken = req.headers[requestHeaders.REFRESHTOKEN]?.toString()
    const accessToken = req.headers[requestHeaders.AUTHORIZATION]?.toString()
    if (!userId) {
      throw new AuthFailureError(systemMessages.INVALID_REQUEST)
    }
    const keyToken = await KeyTokenService.findKeyTokenByUserId({ userId })
    if (!keyToken) {
      throw new AuthFailureError(systemMessages.INVALID_REQUEST)
    }
    if (refreshToken) {
      const userInfo = await verifyToken(refreshToken, keyToken.publicKey)
      if (userId !== userInfo.userId) {
        throw new AuthFailureError(systemMessages.INVALID_USER)
      }
      req.userInfo = userInfo
      req.keyToken = keyToken
      req.refreshToken = refreshToken
      return next()
    }
    if (!accessToken) {
      throw new AuthFailureError(systemMessages.INVALID_REQUEST)
    }
    const userInfo = await verifyToken(accessToken, keyToken.publicKey)
    if (userId !== userInfo.userId) {
      throw new AuthFailureError(systemMessages.INVALID_USER)
    }
    req.userInfo = userInfo
    req.keyToken = keyToken
    req.accessToken = accessToken
    return next()
  } catch (err) {
    next(err)
  }
}
