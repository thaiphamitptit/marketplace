import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'

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
