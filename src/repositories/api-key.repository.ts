import { apiKeyModel } from '@/models/api-key.model'

export default class ApiKeyRepository {
  static findByKey = async (key: string) => {
    const filter = {
      key,
      status: 'active'
    }
    return await apiKeyModel.findOne(filter)
  }
}
