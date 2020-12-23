import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import db from '../../database/connection'

export class SQLiteUsersRepository implements IUsersRepository {
  async saveUser(user: User): Promise<void> {
    try {
      const create = await db('users').insert({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        cpf: user.cpf,
        balance: user.balance,
        password: user.password,
      })
    } catch (err) {
      throw err
    }
  }

  async checkBalance(user_id: string): Promise<number> {
    try {
      const userBalance = await db('users').where('id', '=', user_id)
      if (userBalance[0] === undefined)
        throw new Error('An error occured while checking your balance')

      return userBalance[0].balance
    } catch (err) {
      throw err
    }
  }

  async findByCPF(cpf: string): Promise<User | null> {
    try {
      const user = await db('users').where('users.cpf', '=', cpf)

      if (user.length === 0) return null

      const { id, name, lastname, balance, password } = user[0]
      const objUser = new User({ name, lastname, cpf, balance, password }, id)

      return objUser
    } catch (err) {
      throw err
    }
  }

  async findByID(id: string): Promise<User | null> {
    try {
      const user = await db('users').where('users.id', '=', id)

      return user[0]
    } catch (err) {
      throw err
    }
  }
}
