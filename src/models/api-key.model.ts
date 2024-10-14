import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { IApiKey } from '@/shared/types/api-key'

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

const apiKeySchema = new Schema<IApiKey>(
  {
    _id: {
      type: String,
      default: v4
    },
    key: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'revoked'],
      default: 'active'
    },
    permissions: {
      type: [String],
      required: true,
      enum: ['all', 'public', 'private']
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export const apiKeyModel = model<IApiKey>(DOCUMENT_NAME, apiKeySchema)
