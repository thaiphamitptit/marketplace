import { ICreateNewUserDto, ILoginDto, IRegisterDto } from '@/shared/types/user'

export class RegisterDto {
  email: string

  constructor({ email }: IRegisterDto) {
    this.email = email
  }
}

export class LoginDto {
  email: string
  password: string
  refreshToken?: string

  constructor({ email, password, refreshToken }: ILoginDto) {
    this.email = email
    this.password = password
    this.refreshToken = refreshToken
  }
}

export class CreateNewUserDto {
  email: string
  name?: string
  password?: string
  phone?: string
  avatar?: string
  dob?: Date
  roles?: string[]
  status?: 'pending' | 'active' | 'block'

  constructor({ email, name, password, phone, avatar, dob, roles, status }: ICreateNewUserDto) {
    this.email = email
    this.name = name
    this.password = password
    this.phone = phone
    this.avatar = avatar
    this.dob = dob
    this.roles = roles
    this.status = status
  }
}
