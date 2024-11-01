import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import slugify from 'slugify'
import { IProduct } from '@/shared/types/product'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema<IProduct>(
  {
    _id: {
      type: String,
      default: v4
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    seller: {
      type: String,
      ref: 'User',
      required: true
    },
    categories: {
      type: [
        {
          type: String,
          ref: 'Category',
          required: true
        }
      ],
      required: true
    },
    type: {
      type: String,
      ref: 'ProductType',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    thumb: {
      type: String,
      required: true
    },
    pricing: {
      type: {
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
      _id: false,
      default: {
        currency: 'vnd'
      }
    },
    images: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 4.5
    },
    specifications: {
      type: [
        {
          attribute: {
            type: String,
            ref: 'Attribute',
            required: true
          },
          value: {
            type: Schema.Types.Mixed,
            required: true
          }
        }
      ],
      _id: false,
      required: true
    },
    variants: {
      type: [
        {
          name: {
            type: String,
            required: true
          },
          options: {
            type: [
              {
                name: {
                  type: String,
                  required: true
                },
                images: {
                  type: [String],
                  default: []
                }
              }
            ],
            required: true
          }
        }
      ],
      _id: false,
      default: []
    },
    status: {
      type: String,
      enum: ['draft', 'publish'],
      default: 'draft'
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

productSchema.index({ name: 'text', description: 'text' })

productSchema.pre('save', async function (next) {
  if (this.isModified('name') || this.isNew) {
    const base = slugify(this.name, {
      lower: true,
      strict: true
    })
    let slug = base
    let counter = 1
    while (await productModel.exists({ slug })) {
      slug = `${base}-${counter++}`
    }
    this.slug = slug
  }
  next()
})

export const productModel = model<IProduct>(DOCUMENT_NAME, productSchema)
