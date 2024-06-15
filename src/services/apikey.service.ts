import apiKeyModel from '~/models/apikey.model'

export default class ApiKeyService {
  static createApiKey = async ({ key, permissions }: { key: string; permissions: string[] }) => {
    return await apiKeyModel.create({ key, permissions })
  }

  static findApiKeyByKey = async ({ key }: { key: string }) => {
    return await apiKeyModel.findOne({ key, status: 'active' })
  }
}
