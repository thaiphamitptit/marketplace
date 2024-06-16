import { Types } from 'mongoose'

export type Environment = 'production' | 'development'

export type Location = 'headers' | 'params' | 'query' | 'body'

export interface ApiKey {
  _id: Types.ObjectId
  key: string
  status: string
  permissions: string[]
}

export interface KeyToken {
  _id: Types.ObjectId
  userId: Types.ObjectId
  privateKey: string
  publicKey: string
  refreshToken: string
  refreshTokensUsed: string[]
}
