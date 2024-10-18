import {
  IAttributeFilter,
  ICreateNewAttributeDto,
  IGetAttributesDto,
  IUpdateAttributeDto
} from '@/shared/types/attribute'

export class CreateNewAttributeDto {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description?: string

  constructor({ name, type, description }: ICreateNewAttributeDto) {
    this.name = name
    this.type = type
    this.description = description
  }
}

export class UpdateAttributeDto {
  name?: string
  type?: 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object'
  description?: string

  constructor({ name, type, description }: IUpdateAttributeDto) {
    this.name = name
    this.type = type
    this.description = description
  }
}

export class GetAttributesDto {
  filter: IAttributeFilter
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
    select = ['slug', 'name', 'type', 'description']
  }: IGetAttributesDto) {
    this.filter = filter
    this.page = page
    this.limit = limit
    this.sort = sort
    this.order = order
    this.select = select
  }
}
