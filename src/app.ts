import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import route from '~/routes'
import errorHandler from '~/middlewares/errorhandler.middleware'
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

/** Init routes */
app.use('/v1/api', route)

/** Define error handler after routes */
app.use(errorHandler)

export default app
