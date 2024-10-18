import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

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

export interface IAttributeFilter {
  _id?: string
  type?: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  createdAt?: {
    $gte?: Date | string
    $lte?: Date | string
  }
  updatedAt?: {
    $gte?: Date | string
    $lte?: Date | string
  }
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

export interface IGetAttributeReqParams extends ParamsDictionary {
  attributeId: string
}

export interface IGetAttributesReqQuery extends ParsedQs {
  filter?: IAttributeFilter
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetAttributesDto {
  filter?: IAttributeFilter
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchAttributesReqQuery extends ParsedQs {
  keyword: string
  filter?: IAttributeFilter
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchAttributesDto {
  keyword: string
  filter?: IAttributeFilter
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}
