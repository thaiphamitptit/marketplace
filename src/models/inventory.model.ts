import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { IInventory } from '@/shared/types/inventory'

const DOCUMENT_NAME = 'Inventory'
const COLLECTION_NAME = 'Inventories'

const inventorySchema = new Schema<IInventory>(
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
    location: {
      type: String,
      default: 'unknown'
    },
    stock: {
      type: Number,
      required: true
    },
    threshold: {
      type: Number,
      default: 100
    },
    reservations: {
      type: [
        {
          cart: {
            type: String,
            required: true
          },
          quantity: {
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

inventorySchema.index({ location: 'text' })

export const inventoryModel = model<IInventory>(DOCUMENT_NAME, inventorySchema)
