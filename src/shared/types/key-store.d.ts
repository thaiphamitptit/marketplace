import { Document } from 'mongoose'

export interface IKeyStore extends Document {
  _id: string
  user: string
  privateKey: string
  publicKey: string
  refreshToken: string
  refreshTokensUsed: string[]
  createdAt?: Date | string
  updatedAt?: Date | string
  __v?: number
}

export interface ICreateNewKeyStoreDto {
  user: string
  privateKey: string
  publicKey: string
  refreshToken: string
  refreshTokensUsed?: string[]
}
