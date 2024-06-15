import { ApiKey } from '~/types'

declare module 'express' {
  interface Request {
    apiKey?: ApiKey
  }
}
