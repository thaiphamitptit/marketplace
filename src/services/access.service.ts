import bcrypt from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken'
import { generateKeyPairSync, randomBytes } from 'crypto'
import { BadRequestError, ForbiddenError } from '~/core/error.response'
import UserService from '~/services/user.service'
import KeyTokenService from '~/services/keytoken.service'
import { signTokenPair } from '~/helpers/jwt.helper'
import systemMessages from '~/constants/messages'
import { KeyToken } from '~/types'

export default class AccessService {
  static register = async ({ email }: { email: string }) => {
    const foundUser = await UserService.findUserByEmail({ email })
    if (foundUser) {
      throw new BadRequestError(systemMessages.USER_ALREADY_REGISTERED)
    }
    const randomPassword = randomBytes(16).toString('hex')
    const hashPassword = await bcrypt.hash(randomPassword, 10)
    const newUser = await UserService.createUser({
      email,
      password: hashPassword
    })
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      }
    })
    const { _id: userId } = newUser
    const tokens = await signTokenPair({ userId, email }, privateKey, publicKey)
    await KeyTokenService.createKeyToken({
      userId,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken
    })

    return {
      user: newUser,
      tokens
    }
  }

  static login = async ({
    email,
    password,
    refreshToken = null
  }: {
    email: string
    password: string
    refreshToken?: string | null
  }) => {
    const foundUser = await UserService.findUserByEmail({ email })
    if (!foundUser) {
      throw new BadRequestError(systemMessages.USER_NOT_REGISTERED)
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
      throw new BadRequestError(systemMessages.EMAIL_OR_PASSWORD_IS_INCORRECT)
    }
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      }
    })
    const { _id: userId } = foundUser
    const tokens = await signTokenPair({ userId, email }, privateKey, publicKey)
    await KeyTokenService.createKeyToken({
      userId,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken
    })

    return {
      user: foundUser,
      tokens
    }
  }

  static logout = async ({ keyToken }: { keyToken: KeyToken }) => {
    const keyTokenId = keyToken._id.toString()
    return await KeyTokenService.deleteKeyTokenById({ keyTokenId })
  }

  static refreshTokenPair = async ({
    keyToken,
    userInfo,
    refreshToken
  }: {
    keyToken: KeyToken
    userInfo: JwtPayload
    refreshToken: string
  }) => {
    if (keyToken.refreshTokensUsed.includes(refreshToken)) {
      const keyTokenId = keyToken._id.toString()
      await KeyTokenService.deleteKeyTokenById({ keyTokenId })
      throw new ForbiddenError(systemMessages.PLEASE_RELOGIN_BECAUSE_SOMETHING_WRONG_HAPPENED)
    }
    if (keyToken.refreshToken !== refreshToken) {
      throw new BadRequestError(systemMessages.INVALID_REFRESH_TOKEN)
    }
    const { userId, email } = userInfo
    const tokens = await signTokenPair({ userId, email }, keyToken.privateKey, keyToken.publicKey)
    const foundUser = await UserService.findUserByEmail({ email })
    if (!foundUser) {
      throw new BadRequestError(systemMessages.USER_NOT_REGISTERED)
    }
    await KeyTokenService.updateKeyTokenByRefreshToken({
      newRefreshToken: tokens.refreshToken,
      currentRefreshToken: refreshToken
    })

    return {
      user: foundUser,
      tokens
    }
  }
}
