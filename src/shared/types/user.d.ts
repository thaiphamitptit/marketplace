import { Document } from 'mongoose'

export interface IUser extends Document {
  _id: string
  slug: string
  email: string
  name: string
  password: string
  phone: string
  avatar: string
  dob: Date
  roles: string[]
  status: 'pending' | 'active' | 'block'
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface IUserInfo extends JwtPayload {
  user: string
  email: string
}

export interface IRegisterReqBody {
  email: string
}

export interface IRegisterDto {
  email: string
}

export interface ILoginReqBody {
  email: string
  password: string
}

export interface ILoginDto {
  email: string
  password: string
  refreshToken?: string
}

export interface ICreateNewUserDto {
  email: string
  name?: string
  password?: string
  phone?: string
  avatar?: string
  dob?: Date
  roles?: string[]
  status?: 'pending' | 'active' | 'block'
}
