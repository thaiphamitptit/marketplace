import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import slugify from 'slugify'
import { ICategory } from '@/shared/types/category'

const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'Categories'

const categorySchema = new Schema<ICategory>(
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
    parent: {
      type: String,
      default: null,
      ref: 'Category'
    },
    left: {
      type: Number,
      required: true
    },
    right: {
      type: Number,
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
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

categorySchema.index({ name: 'text', description: 'text' })

categorySchema.pre('save', async function (next) {
  if (this.isModified('name') || this.isNew) {
    const base = slugify(this.name, {
      lower: true,
      strict: true
    })
    let slug = base
    let counter = 1
    while (await categoryModel.exists({ slug })) {
      slug = `${base}-${counter++}`
    }
    this.slug = slug
  }
  next()
})

export const categoryModel = model<ICategory>(DOCUMENT_NAME, categorySchema)
