import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import slugify from 'slugify'
import { IAttribute } from '@/shared/types/attribute'

const DOCUMENT_NAME = 'Attribute'
const COLLECTION_NAME = 'Attributes'

const attributeSchema = new Schema<IAttribute>(
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
      required: true,
      unique: true,
      index: true
    },
    type: {
      type: String,
      enum: ['string', 'number', 'date', 'boolean', 'array', 'object'],
      required: true
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

attributeSchema.pre('save', async function (next) {
  if (this.isModified('name') || this.isNew) {
    const base = slugify(this.name, {
      lower: true,
      strict: true
    })
    let slug = base
    let counter = 1
    while (await attributeModel.exists({ slug })) {
      slug = `${base}-${counter++}`
    }
    this.slug = slug
  }
  next()
})

export const attributeModel = model<IAttribute>(DOCUMENT_NAME, attributeSchema)
