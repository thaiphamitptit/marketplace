import { ICreateNewAttributeDto, IUpdateAttributeDto } from '@/shared/types/attribute'

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
