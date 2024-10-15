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
}
