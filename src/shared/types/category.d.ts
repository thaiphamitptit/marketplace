import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'

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

export interface IUpdateCategoryReqBody {
  parent?: string | null
  name?: string
  thumb?: string
  description?: string
}

export interface IUpdateCategoryReqParams extends ParamsDictionary {
  categoryId: string
}

export interface IUpdateCategoryDto {
  parent?: string | null
  left?: number
  right?: number
  name?: string
  thumb?: string
  description?: string
}

export interface IDeleteCategoryReqParams extends ParamsDictionary {
  categoryId: string
}

export interface IGetCategoryReqParams extends ParamsDictionary {
  categoryId: string
}
