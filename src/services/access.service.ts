import bcrypt from 'bcrypt'
import { generateKeyPairSync, randomBytes } from 'crypto'
import { BadRequestError } from '~/core/error.response'
import UserService from '~/services/user.service'
import KeyTokenService from '~/services/keytoken.service'
import { signTokenPair } from '~/helpers/jwt.helper'
import systemMessages from '~/constants/messages'

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
}
