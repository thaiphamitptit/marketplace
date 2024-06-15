import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'KeyToken'
const COLLECTION_NAME = 'keytokens'

const keyTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    privateKey: {
      type: String,
      required: true
    },
    publicKey: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    refreshTokensUsed: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const keyTokenModel = model(DOCUMENT_NAME, keyTokenSchema)
export default keyTokenModel
