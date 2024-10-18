import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'

export interface IAttribute extends Document {
  _id: string
  slug: string
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description: string
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface ICreateNewAttributeReqBody {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description?: string
}

export interface ICreateNewAttributeDto {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description?: string
}

export interface IUpdateAttributeReqBody {
  name?: string
  type?: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description?: string
}

export interface IUpdateAttributeReqParams extends ParamsDictionary {
  attributeId: string
}

export interface IUpdateAttributeDto {
  name?: string
  type?: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description?: string
}

export interface IDeleteAttributeReqParams extends ParamsDictionary {
  attributeId: string
}
