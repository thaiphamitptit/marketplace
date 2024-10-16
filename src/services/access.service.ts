import bcrypt from 'bcrypt'
import { generateKeyPairSync, randomBytes } from 'crypto'
import UserRepository from '@/repositories/user.repository'
import KeyStoreRepository from '@/repositories/key-store.repository'
import { CreateNewUserDto } from '@/shared/dtos/user.dto'
import { CreateNewKeyStoreDto } from '@/shared/dtos/key-store.dto'
import { AuthFailure, BadRequest, Forbidden } from '@/shared/responses/error.response'
import { generateTokenPair } from '@/shared/helpers/jwt-handler'
import { getInfoData } from '@/shared/utils'
import { ILoginDto, IRegisterDto, IUserInfo } from '@/shared/types/user'
import { IKeyStore } from '@/shared/types/key-store'
import { ErrorMessages } from '@/shared/constants'

export default class AccessService {
  static register = async (dto: IRegisterDto) => {
    const { email } = dto
    /** Check user exists or not */
    const user = await UserRepository.findByEmail(email)
    if (user) {
      throw new BadRequest({
        message: ErrorMessages.EMAIL_ALREADY_REGISTERED
      })
    }
    /** Generate and hash password */
    const tempPassword = randomBytes(16).toString('hex')
    const hashPassword = await bcrypt.hash(tempPassword, 10)
    /** Create new user */
    const createNewUserDto = new CreateNewUserDto({
      ...dto,
      password: hashPassword
    })
    const newUser = await UserRepository.createNew(createNewUserDto)
    /** Generate key pair */
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
    /** Generate token pair */
    const { _id: userId } = newUser
    const tokens = await generateTokenPair({
      payload: {
        user: userId,
        email
      },
      secretOrPrivateKey: privateKey
    })
    /** Create new key store */
    const createNewKeyStoreDto = new CreateNewKeyStoreDto({
      user: userId,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken
    })
    await KeyStoreRepository.createNew(createNewKeyStoreDto)

    return {
      user: getInfoData(newUser.toObject(), ['_id', 'email']),
      tokens
    }
  }

  static login = async (dto: ILoginDto) => {
    const { email, password } = dto
    /** Check user exists or not */
    const user = await UserRepository.findByEmail(email)
    if (!user) {
      throw new BadRequest({
        message: ErrorMessages.EMAIL_NOT_REGISTERED
      })
    }
    /** Check password matches or not */
    const { _id: userId, password: hashPassword } = user
    const isMatched = await bcrypt.compare(password, hashPassword)
    if (!isMatched) {
      throw new AuthFailure({
        message: ErrorMessages.INVALID_CREDENTIALS
      })
    }
    /** Generate key pair */
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
    /** Generate token pair */
    const tokens = await generateTokenPair({
      payload: {
        user: userId,
        email
      },
      secretOrPrivateKey: privateKey
    })
    /** Create new key store */
    const createNewKeyStoreDto = new CreateNewKeyStoreDto({
      user: userId,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
      refreshTokensUsed: []
    })
    await KeyStoreRepository.createNew(createNewKeyStoreDto)

    return {
      user: getInfoData(user.toObject(), ['_id', 'email']),
      tokens
    }
  }

  static logout = async (userInfo: IUserInfo) => {
    /** Delete key store */
    const { user: userId } = userInfo
    await KeyStoreRepository.deleteByUser(userId)

    return {
      user: userId
    }
  }

  static refreshTokens = async (userInfo: IUserInfo, keyStore: IKeyStore, refreshToken: string) => {
    const { user: userId, email } = userInfo
    /** Check token reused or not */
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      /** Delete key store */
      await KeyStoreRepository.deleteByUser(userId)
      throw new Forbidden({
        message: ErrorMessages.AUTH_TOKEN_ALREADY_REUSED
      })
    }
    /** Check token valid or not */
    if (refreshToken !== keyStore.refreshToken) {
      throw new AuthFailure({
        message: ErrorMessages.INVALID_AUTH_TOKEN
      })
    }
    /** Check user exists or not */
    const user = await UserRepository.findByEmail(email)
    if (!user) {
      throw new BadRequest({
        message: ErrorMessages.EMAIL_NOT_REGISTERED
      })
    }
    /** Generate token pair */
    const tokens = await generateTokenPair({
      payload: {
        user: userId,
        email
      },
      secretOrPrivateKey: keyStore.privateKey
    })
    /** Update key store */
    await KeyStoreRepository.updateByRefreshToken(refreshToken, tokens.refreshToken)

    return {
      user: getInfoData(user.toObject(), ['_id', 'email']),
      tokens
    }
  }
}
