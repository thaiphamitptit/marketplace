import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { IDiscount } from '@/shared/types/discount'

const DOCUMENT_NAME = 'Discount'
const COLLECTION_NAME = 'Discounts'

const discountSchema = new Schema<IDiscount>(
  {
    _id: {
      type: String,
      default: v4
    },
    seller: {
      type: String,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    thumb: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      required: true
    },
    effectiveDate: {
      type: Date,
      required: true
    },
    expirationDate: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: ['fixed amount', 'percentage'],
      default: 'fixed amount'
    },
    value: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      default: null
    },
    usageLimit: {
      type: Number,
      required: true
    },
    usageCount: {
      type: Number,
      default: 0
    },
    appliesTo: {
      type: String,
      enum: ['all', 'specific'],
      default: 'all'
    },
    products: {
      type: [
        {
          type: String,
          ref: 'Product'
        }
      ],
      default: []
    },
    redemptions: {
      type: [
        {
          user: {
            type: String,
            required: true
          },
          cart: {
            type: String,
            required: true
          },
          amount: {
            type: Number,
            required: true
          }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

discountSchema.index({ code: 'text', name: 'text', description: 'text' })

export const discountModel = model<IDiscount>(DOCUMENT_NAME, discountSchema)
