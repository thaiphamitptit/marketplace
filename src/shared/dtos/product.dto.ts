import {
  ICreateNewProductDto,
  IGetDraftProductsDto,
  IGetProductsDto,
  IGetPublishProductsDto,
  IProductFilter,
  IProductPricing,
  IProductSpecification,
  IProductVariant,
  ISearchProductsDto,
  IUpdateProductDto
} from '@/shared/types/product'

export class CreateNewProductDto {
  seller: string
  categories: string[]
  type: string
  name: string
  thumb: string
  pricing: IProductPricing
  images?: string[]
  description?: string
  specifications: IProductSpecification[]
  variants?: IProductVariant[]

  constructor({
    seller,
    categories,
    type,
    name,
    thumb,
    pricing,
    images,
    description,
    specifications,
    variants
  }: ICreateNewProductDto) {
    this.seller = seller
    this.categories = categories
    this.type = type
    this.name = name
    this.thumb = thumb
    this.pricing = pricing
    this.images = images
    this.description = description
    this.specifications = specifications
    this.variants = variants
  }
}

export class UpdateProductDto {
  categories?: string[]
  type?: string
  name?: string
  thumb?: string
  pricing?: IProductPricing
  images?: string[]
  description?: string
  specifications?: IProductSpecification[]
  variants?: IProductVariant[]

  constructor({
    categories,
    type,
    name,
    thumb,
    pricing,
    images,
    description,
    specifications,
    variants
  }: IUpdateProductDto) {
    this.categories = categories
    this.type = type
    this.name = name
    this.thumb = thumb
    this.pricing = pricing
    this.images = images
    this.description = description
    this.specifications = specifications
    this.variants = variants
  }
}

export class GetProductsDto {
  filter: IProductFilter
  page: number
  limit: number
  sort: 'name' | 'pricing.sale' | 'rating' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {
      status: 'publish'
    },
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['slug', 'seller', 'categories', 'type', 'name', 'thumb', 'pricing', 'rating']
  }: IGetProductsDto) {
    this.filter = {
      ...filter,
      status: 'publish'
    }
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}

export class SearchProductsDto {
  keyword: string
  filter: IProductFilter
  page: number
  limit: number
  sort: 'name' | 'pricing.sale' | 'rating' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    keyword,
    filter = {
      status: 'publish'
    },
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['slug', 'seller', 'categories', 'type', 'name', 'thumb', 'pricing', 'rating']
  }: ISearchProductsDto) {
    this.keyword = keyword
    this.filter = {
      ...filter,
      status: 'publish'
    }
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}

export class GetDraftProductsDto {
  filter: IProductFilter
  page: number
  limit: number
  sort: 'name' | 'pricing.sale' | 'rating' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {
      status: 'draft'
    },
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['slug', 'seller', 'categories', 'type', 'name', 'thumb', 'pricing', 'rating']
  }: IGetDraftProductsDto) {
    this.filter = {
      ...filter,
      status: 'draft'
    }
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}

export class GetPublishProductsDto {
  filter: IProductFilter
  page: number
  limit: number
  sort: 'name' | 'pricing.sale' | 'rating' | 'createdAt' | 'updatedAt'
  order: 'asc' | 'desc'
  select: string[]

  constructor({
    filter = {
      status: 'publish'
    },
    page = 1,
    limit = 50,
    sort = 'updatedAt',
    order = 'desc',
    select = ['slug', 'seller', 'categories', 'type', 'name', 'thumb', 'pricing', 'rating']
  }: IGetPublishProductsDto) {
    this.filter = {
      ...filter,
      status: 'publish'
    }
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}
