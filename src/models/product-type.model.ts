import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import slugify from 'slugify'
import { IProductType } from '@/shared/types/product-type'

const DOCUMENT_NAME = 'ProductType'
const COLLECTION_NAME = 'ProductTypes'

const productTypeSchema = new Schema<IProductType>(
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
    name: {
      type: String,
      required: true
    },
    attributes: {
      type: [
        {
          type: String,
          ref: 'Attribute',
          required: true
        }
      ],
      required: true
    },
    thumb: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

productTypeSchema.pre('save', async function (next) {
  if (this.isModified('name') || this.isNew) {
    const base = slugify(this.name, {
      lower: true,
      strict: true
    })
    let slug = base
    let counter = 1
    while (await productTypeModel.exists({ slug })) {
      slug = `${base}-${counter++}`
    }
    this.slug = slug
  }
  next()
})

export const productTypeModel = model<IProductType>(DOCUMENT_NAME, productTypeSchema)
