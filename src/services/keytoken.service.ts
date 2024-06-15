import { Types } from 'mongoose'
import keyTokenModel from '~/models/keytoken.model'

export default class KeyTokenService {
  static createKeyToken = async ({
    userId,
    privateKey,
    publicKey,
    refreshToken
  }: {
    userId: Types.ObjectId
    privateKey: string
    publicKey: string
    refreshToken: string
  }) => {
    return await keyTokenModel.create({ userId, privateKey, publicKey, refreshToken })
  }
}
