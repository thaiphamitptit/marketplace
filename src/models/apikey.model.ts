import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'apikeys'

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'revoked'],
      default: 'active'
    },
    permissions: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const apiKeyModel = model(DOCUMENT_NAME, apiKeySchema)
export default apiKeyModel
