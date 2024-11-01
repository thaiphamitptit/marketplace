import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { IPricing } from '@/shared/types/pricing'

const DOCUMENT_NAME = 'Pricing'
const COLLECTION_NAME = 'Pricings'

const pricingSchema = new Schema<IPricing>(
  {
    _id: {
      type: String,
      default: v4
    },
    product: {
      type: String,
      ref: 'Product',
      required: true
    },
    origin: {
      type: Number,
      required: true
    },
    sale: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      enum: ['vnd', 'usd'],
      default: 'vnd'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export const pricingModel = model<IPricing>(DOCUMENT_NAME, pricingSchema)
