import {
  ICategoryFilter,
  ICreateNewCategoryDto,
  IGetCategoriesDto,
  ISearchCategoriesDto,
  IUpdateCategoryDto
} from '@/shared/types/category'

export class CreateNewCategoryDto {
  parent?: string | null
  left?: number
  right?: number
  name: string
  thumb?: string
  description?: string

  constructor({ parent, left, right, name, thumb, description }: ICreateNewCategoryDto) {
    this.parent = parent
    this.left = left
    this.right = right
    this.name = name
    this.thumb = thumb
    this.description = description
  }
}

export class UpdateCategoryDto {
  parent?: string | null
  left?: number
  right?: number
  name?: string
  thumb?: string
  description?: string

  constructor({ parent, left, right, name, thumb, description }: IUpdateCategoryDto) {
    this.parent = parent
    this.left = left
    this.right = right
    this.name = name
    this.thumb = thumb
    this.description = description
  }
}

export class GetCategoriesDto {
  filter: ICategoryFilter
  page: number
  limit: number
  sort: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {},
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['slug', 'parent', 'name', 'thumb', 'description']
  }: IGetCategoriesDto) {
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}

export class SearchCategoriesDto {
  keyword: string
  filter: ICategoryFilter
  page: number
  limit: number
  sort: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    keyword,
    filter = {},
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['slug', 'parent', 'name', 'thumb', 'description']
  }: ISearchCategoriesDto) {
    this.keyword = keyword
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}

export class GetAncestorCategoriesDto {
  filter: ICategoryFilter
  page: number
  limit: number
  sort: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {},
    page = 1,
    limit = 50,
    sort = 'left',
    order = 'desc',
    select = ['slug', 'parent', 'name', 'thumb', 'description']
  }: IGetCategoriesDto) {
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}

export class GetDescendantCategoriesDto {
  filter: ICategoryFilter
  page: number
  limit: number
  sort: 'name' | 'left' | 'right' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {},
    page = 1,
    limit = 50,
    sort = 'left',
    order = 'asc',
    select = ['slug', 'parent', 'name', 'thumb', 'description']
  }: IGetCategoriesDto) {
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}
