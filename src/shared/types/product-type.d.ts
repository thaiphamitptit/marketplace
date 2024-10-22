import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

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

export interface IProductTypeFilter {
  _id?: string
  attributes?: {
    $in: string[]
  }
  createdAt?: {
    $gte?: Date | string
    $lte?: Date | string
  }
  updatedAt?: {
    $gte?: Date | string
    $lte?: Date | string
  }
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

export interface IGetProductTypesReqQuery extends ParsedQs {
  filter?: IProductTypeFilter
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetProductTypesDto {
  filter?: IProductTypeFilter
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchProductTypesReqQuery extends ParsedQs {
  keyword: string
  filter?: IProductTypeFilter
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchProductTypesDto {
  keyword: string
  filter?: IProductTypeFilter
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}
