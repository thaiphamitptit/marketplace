import { Document } from 'mongoose'

export interface IAttribute extends Document {
  _id: string
  slug: string
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description: string
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface ICreateNewAttributeReqBody {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description?: string
}

export interface ICreateNewAttributeDto {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description?: string
}
