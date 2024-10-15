import { userModel } from '@/models/user.model'
import { ICreateNewUserDto } from '@/shared/types/user'

export default class UserRepository {
  static createNew = async (dto: ICreateNewUserDto) => {
    return await userModel.create(dto)
  }

  static findByEmail = async (email: string) => {
    const filter = {
      email
    }
    return await userModel.findOne(filter)
  }
}
