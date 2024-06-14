import mongoose from 'mongoose'
import { configs, env } from '~/configs'

const {
  db: { host, port, name }
} = configs[env]
const uri = `mongodb://${host}:${port}/${name}`

class Database {
  private static instance: Database

  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {
    if (env === 'development') {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }
    mongoose
      .connect(uri)
      .then((_) => {
        console.log('Connect mongodb successfully')
      })
      .catch((err) => {
        console.log('Connect mongodb failed')
      })
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()
export default instanceMongodb
