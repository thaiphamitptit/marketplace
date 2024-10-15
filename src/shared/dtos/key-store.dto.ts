import { ICreateNewKeyStoreDto } from '@/shared/types/key-store'

export class CreateNewKeyStoreDto {
  user: string
  privateKey: string
  publicKey: string
  refreshToken: string
  refreshTokensUsed?: string[]

  constructor({ user, privateKey, publicKey, refreshToken, refreshTokensUsed }: ICreateNewKeyStoreDto) {
    this.user = user
    this.privateKey = privateKey
    this.publicKey = publicKey
    this.refreshToken = refreshToken
    this.refreshTokensUsed = refreshTokensUsed
  }
}
