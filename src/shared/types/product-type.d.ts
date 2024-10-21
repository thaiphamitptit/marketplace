import { Document } from 'mongoose'

export interface IProductType extends Document {
  _id: string
  slug: string
  name: string
  attributes: string[]
  thumb: string
  description: string
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface ICreateNewProductTypeReqBody {
  name: string
  attributes: string[]
  thumb?: string
  description?: string
}

export interface ICreateNewProductTypeDto {
  name: string
  attributes: string[]
  thumb?: string
  description?: string
}
