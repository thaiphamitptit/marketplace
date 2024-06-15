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
    const filter = {
      userId
    }
    const update = {
      $set: {
        userId,
        privateKey,
        publicKey,
        refreshToken
      }
    }
    const options = {
      upsert: true,
      new: true
    }
    return await keyTokenModel.findOneAndUpdate(filter, update, options)
  }
}
