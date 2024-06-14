import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import instanceMongodb from '~/databases/init.mongodb'

const app = express()

/** Init middlewares */
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** Init dbs */
instanceMongodb.connect()

export default app
