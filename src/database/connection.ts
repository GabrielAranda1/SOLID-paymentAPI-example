import knex from 'knex'
import path from 'path'

if (process.env.DB_STORAGE === undefined) throw new Error('ENVIRONMENT NOT CONFIGURED PROPERLY')

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, process.env.DB_STORAGE),
  },
  useNullAsDefault: true,
})

export default db
