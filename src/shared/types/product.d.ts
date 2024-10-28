import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

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

export interface IProductFilter {
  _id?: string
  seller?: string
  categories?: {
    $in: string[]
  }
  type?: string
  rating?: {
    $gte?: number
    $lte?: number
  }
  status?: 'draft' | 'publish'
  createdAt?: {
    $gte?: Date | string
    $lte?: Date | string
  }
  updatedAt?: {
    $gte?: Date | string
    $lte?: Date | string
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

export interface IUpdateProductReqBody {
  categories?: string[]
  type?: string
  name?: string
  thumb?: string
  images?: string[]
  description?: string
  specifications?: IProductSpecification[]
  variants?: IProductVariant[]
}

export interface IUpdateProductReqParams extends ParamsDictionary {
  productId: string
}

export interface IUpdateProductDto {
  categories?: string[]
  type?: string
  name?: string
  thumb?: string
  images?: string[]
  description?: string
  specifications?: IProductSpecification[]
  variants?: IProductVariant[]
}

export interface IDeleteProductReqParams extends ParamsDictionary {
  productId: string
}

export interface IPublishProductReqParams extends ParamsDictionary {
  productId: string
}

export interface IUnPublishProductReqParams extends ParamsDictionary {
  productId: string
}

export interface IGetProductReqParams extends ParamsDictionary {
  productId: string
}

export interface IGetProductsReqQuery extends ParsedQs {
  filter?: Omit<IProductFilter, 'status'>
  page?: number
  limit?: number
  sort?: 'name' | 'rating' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetProductsDto {
  filter?: IProductFilter
  page?: number
  limit?: number
  sort?: 'name' | 'rating' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchProductsReqQuery extends ParsedQs {
  keyword: string
  filter?: Omit<IProductFilter, 'status'>
  page?: number
  limit?: number
  sort?: 'name' | 'rating' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchProductsDto {
  keyword: string
  filter?: IProductFilter
  page?: number
  limit?: number
  sort?: 'name' | 'rating' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}
