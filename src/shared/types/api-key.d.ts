import { Document } from 'mongoose'

export interface IApiKey extends Document {
  _id: string
  key: string
  status: 'active' | 'inactive' | 'revoked'
  permissions: string[]
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}
