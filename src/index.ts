import app from '~/app'
import { configs, env } from '~/configs'

const {
  app: { port }
} = configs[env]

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', () => {
  server.close(() => console.log('Exit server express'))
})
