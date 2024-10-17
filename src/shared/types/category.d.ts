import { Document } from 'mongoose'

export interface ICategory extends Document {
  _id: string
  slug: string
  parent: string | null
  left: number
  right: number
  name: string
  thumb: string
  description: string
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface ICreateNewCategoryReqBody {
  parent?: string | null
  name: string
  thumb?: string
  description?: string
}

export interface ICreateNewCategoryDto {
  parent?: string | null
  left?: number
  right?: number
  name: string
  thumb?: string
  description?: string
}
