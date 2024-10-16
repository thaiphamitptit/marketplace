import { keyStoreModel } from '@/models/key-store.model'
import { ICreateNewKeyStoreDto } from '@/shared/types/key-store'

export default class KeyStoreRepository {
  static createNew = async (dto: ICreateNewKeyStoreDto) => {
    const { user } = dto
    const filter = {
      user
    }
    const update = {
      $set: dto
    }
    const options = {
      new: true,
      upsert: true
    }
    return await keyStoreModel.findOneAndUpdate(filter, update, options)
  }

  static findByUser = async (user: string) => {
    const filter = {
      user
    }
    return await keyStoreModel.findOne(filter)
  }

  static deleteByUser = async (user: string) => {
    const filter = {
      user
    }
    return await keyStoreModel.findOneAndDelete(filter)
  }
}
