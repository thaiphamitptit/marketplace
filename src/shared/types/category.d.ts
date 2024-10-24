import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

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

export interface ICategoryFilter {
  _id?: string
  parent?: string | null
  createdAt?: {
    $gte?: Date | string
    $lte?: Date | string
  }
  updatedAt?: {
    $gte?: Date | string
    $lte?: Date | string
  }
}

export interface INestedSetFilter {
  left?: {
    $gt?: number
    $lt?: number
  }
  right?: {
    $gt?: number
    $lt?: number
  }
}

export interface ICategoryNestedSetFilter extends ICategoryFilter, INestedSetFilter {}

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

export interface IGetCategoriesReqQuery extends ParsedQs {
  filter?: ICategoryFilter
  page?: number
  limit?: number
  sort?: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetCategoriesDto {
  filter?: ICategoryNestedSetFilter
  page?: number
  limit?: number
  sort?: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchCategoriesReqQuery extends ParsedQs {
  keyword: string
  filter?: ICategoryFilter
  page?: number
  limit?: number
  sort?: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface ISearchCategoriesDto {
  keyword: string
  filter?: ICategoryNestedSetFilter
  page?: number
  limit?: number
  sort?: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetAncestorCategoriesReqQuery extends ParsedQs {
  filter?: ICategoryFilter
  page?: number
  limit?: number
  sort?: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetAncestorCategoriesReqParams extends ParamsDictionary {
  categoryId: string
}

export interface IGetAncestorCategoriesDto {
  filter?: ICategoryNestedSetFilter
  page?: number
  limit?: number
  sort?: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetDescendantCategoriesReqQuery extends ParsedQs {
  filter?: ICategoryFilter
  page?: number
  limit?: number
  sort?: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}

export interface IGetDescendantCategoriesReqParams extends ParamsDictionary {
  categoryId: string
}

export interface IGetDescendantCategoriesDto {
  filter?: ICategoryNestedSetFilter
  page?: number
  limit?: number
  sort?: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  select?: string[]
}
