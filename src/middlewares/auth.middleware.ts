import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import KeyStoreRepository from '@/repositories/key-store.repository'
import UserRepository from '@/repositories/user.repository'
import { AuthFailure, Forbidden } from '@/shared/responses/error.response'
import { verifyToken } from '@/shared/helpers/jwt-handler'
import { IUserInfo } from '@/shared/types/user'
import { RequestHeaders, ErrorMessages } from '@/shared/constants'

/** Check authentication */
export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /** Check key store exists or not */
    const userId = req.headers[RequestHeaders.USER_ID] as string
    const keyStore = await KeyStoreRepository.findByUser(userId)
    if (!keyStore) {
      throw new AuthFailure({
        message: ErrorMessages.KEY_STORE_NOT_FOUND
      })
    }
    const refreshToken = req.headers[RequestHeaders.REFRESH_TOKEN] as string
    const accessToken = req.headers[RequestHeaders.ACCESS_TOKEN] as string
    const authToken = refreshToken || accessToken
    /** Verify auth token */
    const userInfo = await verifyToken({
      token: authToken,
      secretOrPublicKey: keyStore.publicKey
    })
    /** Check tokens valid or not */
    if (userId !== userInfo.user) {
      throw new AuthFailure({
        message: ErrorMessages.INVALID_AUTH_TOKEN
      })
    }
    req.keyStore = keyStore
    req.userInfo = userInfo
    if (refreshToken) {
      req.refreshToken = authToken
    } else {
      req.accessToken = authToken
    }
    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      next(
        new AuthFailure({
          message: ErrorMessages.JWT_ERROR
        })
      )
    } else {
      next(err)
    }
  }
}

/** Check authorization */
export const checkAuthorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      /** Check user exist or not */
      const { email } = req.userInfo as IUserInfo
      const user = await UserRepository.findByEmail(email)
      if (!user) {
        throw new AuthFailure({
          message: ErrorMessages.EMAIL_NOT_REGISTERED
        })
      }
      /** Check user roles contain specific role or not */
      if (!user.roles || !roles.some((role) => user.roles.includes(role))) {
        throw new Forbidden({
          message: ErrorMessages.NOT_ALLOW_ACCESS_RESOURCE
        })
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}
