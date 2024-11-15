import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export interface IDiscount extends Document {
  _id: string
  seller: string
  name: string
  thumb: string
  description: string
  code: string
  effectiveDate: Date | string
  expirationDate: Date | string
  type: 'fixed amount' | 'percentage'
  value: number
  maxValue: number
  usageLimit: number
  usageCount: number
  appliesTo: 'all' | 'specific'
  products: string[]
  redemptions: IDiscountRedemption[]
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface IDiscountRedemption {
  user: string
  cart: string
  amount: number
}

export interface IDiscountFilter {
  _id?: string
  seller?: string
  type?: 'fixed amount' | 'percentage'
  appliesTo?: 'specific' | 'all'
  products?: {
    $in?: string[]
  }
  value?: {
    $gte: number
    $lte: number
  }
  effectiveDate?: {
    $gte?: Date | string
    $lte?: Date | string
  }
  expirationDate?: {
    $gte?: Date | string
    $lte?: Date | string
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

export interface ICreateNewDiscountReqBody {
  name: string
  thumb?: string
  description?: string
  code: string
  effectiveDate: Date | string
  expirationDate: Date | string
  type: 'fixed amount' | 'percentage'
  value: number
  maxValue: number | null
  usageLimit: number
  appliesTo: 'all' | 'specific'
  products?: string[]
}

export interface ICreateNewDiscountDto {
  seller: string
  name: string
  thumb?: string
  description?: string
  code: string
  effectiveDate: Date | string
  expirationDate: Date | string
  type: 'fixed amount' | 'percentage'
  value: number
  maxValue: number | null
  usageLimit: number
  appliesTo: 'all' | 'specific'
  products?: string[]
}

export interface IUpdateDiscountReqBody {
  name?: string
  thumb?: string
  description?: string
  code?: string
  effectiveDate?: Date | string
  expirationDate?: Date | string
  type?: 'fixed amount' | 'percentage'
  value?: number
  maxValue?: number | null
  usageLimit?: number
  appliesTo?: 'all' | 'specific'
  products?: string[]
}

export interface IUpdateDiscountReqParams extends ParamsDictionary {
  discountId: string
}

export interface IUpdateDiscountDto {
  seller: string
  name?: string
  thumb?: string
  description?: string
  code?: string
  effectiveDate?: Date | string
  expirationDate?: Date | string
  type?: 'fixed amount' | 'percentage'
  value?: number
  maxValue?: number | null
  usageLimit?: number
  appliesTo?: 'all' | 'specific'
  products?: string[]
}

export interface IDeleteDiscountReqParams extends ParamsDictionary {
  discountId: string
}

export interface IGetDiscountReqParams extends ParamsDictionary {
  discountId: string
}

export interface IGetDiscountsReqQuery extends ParsedQs {
  filter?: IDiscountFilter
  page?: number
  limit?: number
  sort?: 'name' | 'value' | 'effectiveDate' | 'expirationDate' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetDiscountsDto {
  filter?: IDiscountFilter
  page?: number
  limit?: number
  sort?: 'name' | 'value' | 'effectiveDate' | 'expirationDate' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchDiscountsReqQuery extends ParsedQs {
  keyword: string
  filter?: IDiscountFilter
  page?: number
  limit?: number
  sort?: 'name' | 'value' | 'effectiveDate' | 'expirationDate' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchDiscountsDto {
  keyword: string
  filter?: IDiscountFilter
  page?: number
  limit?: number
  sort?: 'name' | 'value' | 'effectiveDate' | 'expirationDate' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}
