import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'

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

export interface IUpdateProductTypeReqBody {
  name?: string
  attributes?: string[]
  thumb?: string
  description?: string
}

export interface IUpdateProductTypeReqParams extends ParamsDictionary {
  productTypeId: string
}

export interface IUpdateProductTypeDto {
  name?: string
  attributes?: string[]
  thumb?: string
  description?: string
}

export interface IDeleteProductTypeReqParams extends ParamsDictionary {
  productTypeId: string
}

export interface IGetProductTypeReqParams extends ParamsDictionary {
  productTypeId: string
}
