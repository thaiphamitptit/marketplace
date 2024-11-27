import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { ICart } from '@/shared/types/cart'

const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'Carts'

const cartSchema = new Schema<ICart>(
  {
    _id: {
      type: String,
      default: v4
    },
    user: {
      type: String,
      ref: 'User',
      required: true
    },
    items: {
      type: [
        {
          product: {
            type: String,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          pricing: {
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
            }
          },
          _id: false
        }
      ],
      default: []
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'failed'],
      default: 'active'
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export const cartModel = model<ICart>(DOCUMENT_NAME, cartSchema)
