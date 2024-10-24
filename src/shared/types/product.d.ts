import { Document } from 'mongoose'

export interface IProduct extends Document {
  _id: string
  slug: string
  seller: string
  categories: string[]
  type: string
  name: string
  thumb: string
  images: string[]
  description: string
  rating: number
  specifications: IProductSpecification[]
  variants: IProductVariant[]
  status: 'draft' | 'publish'
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface IProductSpecification {
  attribute: string
  value: any
}

export interface IProductVariant {
  name: string
  options: {
    name: string
    images: string[]
  }
}

export interface ICreateNewProductReqBody {
  categories: string[]
  type: string
  name: string
  thumb: string
  images?: string[]
  description?: string
  specifications: IProductSpecification[]
  variants?: IProductVariant[]
}

export interface ICreateNewProductDto {
  seller: string
  categories: string[]
  type: string
  name: string
  thumb: string
  images?: string[]
  description?: string
  specifications: IProductSpecification[]
  variants?: IProductVariant[]
}
