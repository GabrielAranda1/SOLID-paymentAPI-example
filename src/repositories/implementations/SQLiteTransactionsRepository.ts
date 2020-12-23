import { Transaction } from '../../entities/Transaction'
import { ITransactionsRepository } from '../ITransactionsRepository'
import db from '../../database/connection'
import { ITransaction } from '../../interfaces/ITransaction'

export class SQLiteTransactionsRepository implements ITransactionsRepository {
  async saveTransaction(transaction: Transaction): Promise<void> {
    const trx = await db.transaction()
    try {
      const creditReceiver = await trx('users')
        .where('id', '=', transaction.receiver_id)
        .increment('balance', transaction.value)

      const debitSender = await trx('users')
        .where('id', '=', transaction.sender_id)
        .decrement('balance', transaction.value)

      const create = await trx('transactions').insert({
        id: transaction.id,
        receiver_id: transaction.receiver_id,
        sender_id: transaction.sender_id,
        value: transaction.value,
        status: 'CONFIRMED',
      })

      trx.commit()
    } catch (err) {
      trx.rollback()
      throw err
    }
  }

  async listTransactions(
    user_id: string,
    to: string,
    from: string
  ): Promise<[ITransaction] | null> {
    /// Knex does not support subqueries in their querybuilder, because of that I created the entire query using pure SQL
    //
    /*const transactions = db('transactions')
      .where('sender_id', '=', user_id)
      .orWhere('receiver_id', '=', user_id)
      .join('users AS sender', 'sender_id', '=', 'sender.id')
      .select(
        'sender_id as sender',
        'receiver_id as receiver',
        'value',
        'status',
        'cpf as sender_cpf'
      )*/

    try {
      const transactions = await db.raw(
        'SELECT transaction_id,status,subquery.created_at,subquery.updated_at,subquery.value,sender_id,receiver_id,receiver_cpf,cpf as sender_cpf,receiver_name,receiver_lastname,name as sender_name, lastname as sender_lastname' +
          ' FROM (SELECT transactions.id as transaction_id,transactions.status,transactions.created_at,transactions.updated_at,transactions.value,transactions.sender_id as sender_id,transactions.receiver_id as receiver_id,cpf as receiver_cpf,name as receiver_name,lastname as receiver_lastname' +
          ' FROM (SELECT * FROM transactions WHERE (sender_id = ? OR receiver_id = ?) AND created_at BETWEEN ? AND ?) as transactions JOIN "users" ON transactions.receiver_id = users.id) as subquery JOIN users ON sender_id = users.id',
        [user_id, user_id, from, to]
      )

      return transactions
    } catch (err) {
      return null
    }
  }

  async reverseTransaction(transaction_id: string): Promise<void | null> {
    const trx = await db.transaction()
    try {
      const update = await trx('transactions')
        .where('id', '=', transaction_id)
        .update({
          status: 'REVERSED',
          updated_at: db.raw('CURRENT_TIMESTAMP'),
        })

      if (update === 0) return null

      const selectTransation = await trx('transactions')
        .select('value', 'sender_id', 'receiver_id')
        .where('id', '=', transaction_id)

      const debitReceiver = await trx('users')
        .where('id', '=', selectTransation[0].receiver_id)
        .decrement('balance', selectTransation[0].value)

      const credtSender = await trx('users')
        .where('id', '=', selectTransation[0].sender_id)
        .increment('balance', selectTransation[0].value)

      trx.commit()
    } catch (err) {
      trx.rollback()
      return err
    }
  }

  async checkTransactionStatus(transaction_id: string): Promise<ITransaction | null> {
    const transaction = await db('transactions').where('id', '=', transaction_id)

    if (transaction.length === 0) return null

    const transactionView: ITransaction = transaction[0]

    return transactionView
  }
}
