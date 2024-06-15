import { model, Schema } from 'mongoose'
import slugify from 'slugify'

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'users'

const userSchema = new Schema(
  {
    slug: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    salf: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['user', 'shop', 'admin'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'block'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

userSchema.pre('save', async function (next) {
  const base = slugify(this.email.trim().split('@')[0], {
    trim: true,
    lower: true,
    strict: true
  })
  let slug = base
  let count = 1
  while (await userModel.exists({ slug })) {
    slug = `${base}${count}`
    count++
  }
  this.slug = slug
  next()
})

const userModel = model(DOCUMENT_NAME, userSchema)
export default userModel
