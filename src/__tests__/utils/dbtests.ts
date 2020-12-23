import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'TEST' ? '.env.test' : '.env',
})

import { passwordHash } from '../../security/passwordHash'
import db from '../../database/connection'

export default {
  async createOneUser(
    id: string,
    name: string,
    lastname: string,
    cpf: string,
    balance: number,
    password: string
  ) {
    await db('users').insert({
      id,
      name,
      lastname,
      cpf,
      balance,
      password: await passwordHash(password),
    })
  },

  async creatOneTransaction(
    id: string,
    sender_id: string,
    receiver_id: string,
    value: number,
    status?: string
  ) {
    await db('transactions').insert({
      id,
      sender_id,
      receiver_id,
      value,
      status: status || 'CONFIRMED',
    })
  },

  async dropUsers() {
    await db.raw('DELETE FROM users')
  },

  async dropTransactions() {
    await db.raw('DELETE FROM transactions')
  },
}
