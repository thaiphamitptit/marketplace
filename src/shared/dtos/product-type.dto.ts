import {
  ICreateNewProductTypeDto,
  IGetProductTypesDto,
  IProductTypeFilter,
  ISearchProductTypesDto,
  IUpdateProductTypeDto
} from '@/shared/types/product-type'

export class CreateNewProductTypeDto {
  name: string
  attributes: string[]
  thumb?: string
  description?: string

  constructor({ name, attributes, thumb, description }: ICreateNewProductTypeDto) {
    this.name = name
    this.attributes = attributes
    this.thumb = thumb
    this.description = description
  }
}

export class UpdateProductTypeDto {
  name?: string
  attributes?: string[]
  thumb?: string
  description?: string

  constructor({ name, attributes, thumb, description }: IUpdateProductTypeDto) {
    this.name = name
    this.attributes = attributes
    this.thumb = thumb
    this.description = description
  }
}

export class GetProductTypesDto {
  filter: IProductTypeFilter
  page: number
  limit: number
  sort: 'name' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {},
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['slug', 'name', 'thumb', 'description']
  }: IGetProductTypesDto) {
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}

export class SearchProductTypesDto {
  keyword: string
  filter: IProductTypeFilter
  page: number
  limit: number
  sort: 'name' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    keyword,
    filter = {},
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['slug', 'name', 'thumb', 'description']
  }: ISearchProductTypesDto) {
    this.keyword = keyword
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}
