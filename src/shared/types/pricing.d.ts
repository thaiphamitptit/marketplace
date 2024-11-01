import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export interface IPricing extends Document {
  _id: string
  product: string
  origin: number
  sale: number
  currency: 'vnd' | 'usd'
  startDate: Date | string
  endDate: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface IPricingFilter {
  _id?: string
  product?: string
  origin?: {
    $gte?: number
    $lte?: number
  }
  sale?: {
    $gte?: number
    $lte?: number
  }
  currency?: 'vnd' | 'usd'
  startDate?: {
    $gte?: Date | string
    $lte?: Date | string
  }
  endDate?: {
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

export interface ICreateNewPricingReqBody {
  origin: number
  sale: number
  currency?: 'vnd' | 'usd'
}

export interface ICreateNewPricingReqParams extends ParamsDictionary {
  productId: string
}

export interface ICreateNewPricingDto {
  product: string
  origin: number
  sale: number
  currency?: 'vnd' | 'usd'
  startDate?: Date | string
  endDate?: Date | string | null
}

export interface IGetPricingReqParams extends ParamsDictionary {
  productId: string
  pricingId: string
}

export interface IGetPricingsReqQuery extends ParsedQs {
  filter?: Omit<IPricingFilter, 'product'>
  page?: number
  limit?: number
  sort?: 'origin' | 'sale' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetPricingsReqParams extends ParamsDictionary {
  productId: string
}

export interface IGetPricingsDto {
  filter?: IPricingFilter
  page?: number
  limit?: number
  sort?: 'origin' | 'sale' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}
