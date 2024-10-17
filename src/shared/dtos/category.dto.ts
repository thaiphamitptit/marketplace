import { ICreateNewCategoryDto, IUpdateCategoryDto } from '@/shared/types/category'

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
