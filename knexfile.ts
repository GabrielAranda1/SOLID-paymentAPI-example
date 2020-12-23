import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'TEST' ? '.env.test' : '.env',
})

if (process.env.DB_STORAGE === undefined) throw new Error('ENVIRONMENT NOT CONFIGURED PROPERLY')

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', process.env.DB_STORAGE),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
}
