import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export interface IInventory extends Document {
  _id: string
  product: string
  location: string
  stock: number
  threshold: number
  reservations: IInventoryReservation[]
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface IInventoryReservation {
  cart: string
  quantity: number
}

export interface IInventoryFilter {
  _id?: string
  product?: string
  $expr?: {
    $gt?: ['$stock', '$threshold']
    $lte?: ['$stock', '$threshold']
  }
  stock?: {
    $gte?: number
    $lte?: number
  }
  threshold?: {
    $gte?: number
    $lte?: number
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

export interface ICreateNewInventoryReqBody {
  product: string
  location?: string
  stock: number
  threshold?: number
}

export interface ICreateNewInventoryDto {
  product: string
  location?: string
  stock: number
  threshold?: number
}

export interface IUpdateInventoryReqBody {
  location?: string
  offset?: number
  threshold?: number
}

export interface IUpdateInventoryReqParams extends ParamsDictionary {
  inventoryId: string
}

export interface IUpdateInventoryDto {
  location?: string
  offset?: number
  threshold?: number
}

export interface IDeleteInventoryReqParams extends ParamsDictionary {
  inventoryId: string
}

export interface IGetInventoryReqParams extends ParamsDictionary {
  inventoryId: string
}

export interface IGetInventoriesReqQuery extends ParsedQs {
  filter?: Omit<IInventoryFilter, '$expr'>
  page?: number
  limit?: number
  sort?: 'stock' | 'threshold' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetInventoriesDto {
  filter?: IInventoryFilter
  page?: number
  limit?: number
  sort?: 'stock' | 'threshold' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchInventoriesReqQuery extends ParsedQs {
  keyword: string
  filter?: Omit<IInventoryFilter, '$expr'>
  page?: number
  limit?: number
  sort?: 'stock' | 'threshold' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchInventoriesDto {
  keyword: string
  filter?: IInventoryFilter
  page?: number
  limit?: number
  sort?: 'stock' | 'threshold' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetHighStockInventoriesReqQuery extends ParsedQs {
  filter?: Omit<IInventoryFilter, '$expr'>
  page?: number
  limit?: number
  sort?: 'stock' | 'threshold' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetHighStockInventoriesDto {
  filter?: IInventoryFilter
  page?: number
  limit?: number
  sort?: 'stock' | 'threshold' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}
