import userModel from '~/models/user.model'

export default class UserService {
  static createUser = async ({ email, password }: { email: string; password: string }) => {
    return await userModel.create({ email, password })
  }

  static findUserByEmail = async ({ email }: { email: string }) => {
    return await userModel.findOne({ email })
  }
}
