import { config } from 'dotenv'
import { Environment } from '~/types'

config()

const development = {
  app: {
    port: process.env.DEVELOPMENT_APP_PORT || 3000
  },
  db: {
    host: process.env.DEVELOPMENT_DB_HOST || 'localhost',
    port: process.env.DEVELOPMENT_DB_PORT || '27017',
    name: process.env.DEVELOPMENT_DB_NAME || 'dbmarketplace'
  }
}

const production = {
  app: {
    port: process.env.PRODUCTION_APP_PORT || 8080
  },
  db: {
    host: process.env.PRODUCTION_DB_HOST || 'localhost',
    port: process.env.PRODUCTION_DB_PORT || '27017',
    name: process.env.PRODUCTION_DB_NAME || 'dbmarketplace'
  }
}

export const configs = { development, production }

export const env = (process.env.NODE_ENV || 'development') as Environment
