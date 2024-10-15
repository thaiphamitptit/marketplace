import bcrypt from 'bcrypt'
import { generateKeyPairSync, randomBytes } from 'crypto'
import UserRepository from '@/repositories/user.repository'
import KeyStoreRepository from '@/repositories/key-store.repository'
import { CreateNewUserDto } from '@/shared/dtos/user.dto'
import { CreateNewKeyStoreDto } from '@/shared/dtos/key-store.dto'
import { BadRequest } from '@/shared/responses/error.response'
import { generateTokenPair } from '@/shared/helpers/jwt-handler'
import { getInfoData } from '@/shared/utils'
import { IRegisterDto } from '@/shared/types/user'
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
}
