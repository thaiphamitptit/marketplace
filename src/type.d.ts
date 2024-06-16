import { JwtPayload } from 'jsonwebtoken'
import { ApiKey, KeyToken } from '~/types'

declare module 'express' {
  interface Request {
    apiKey?: ApiKey
    keyToken?: KeyToken
    userInfo?: JwtPayload
    accessToken?: string
    refreshToken?: string
  }
}
