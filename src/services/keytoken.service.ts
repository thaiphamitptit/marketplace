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

  static findKeyTokenByUserId = async ({ userId }: { userId: string }) => {
    return await keyTokenModel.findOne({ userId: new Types.ObjectId(userId) })
  }

  static updateKeyTokenByRefreshToken = async ({
    newRefreshToken,
    currentRefreshToken
  }: {
    newRefreshToken: string
    currentRefreshToken: string
  }) => {
    const filter = {
      refreshToken: currentRefreshToken
    }
    const update = {
      $set: {
        refreshToken: newRefreshToken
      },
      $addToSet: {
        refreshTokensUsed: currentRefreshToken
      }
    }
    const options = {
      upsert: true,
      new: true
    }
    return await keyTokenModel.findOneAndUpdate(filter, update, options)
  }

  static deleteKeyTokenById = async ({ keyTokenId }: { keyTokenId: string }) => {
    return await keyTokenModel.deleteOne({ _id: new Types.ObjectId(keyTokenId) })
  }
}
