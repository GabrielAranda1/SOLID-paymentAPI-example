import { Transaction } from '../entities/Transaction'
import { ITransaction } from '../interfaces/ITransaction'

export interface ITransactionsRepository {
  saveTransaction(transaction: Transaction): Promise<void>
  listTransactions(user_id: string, from?: string, to?: string): Promise<[ITransaction] | null>
  reverseTransaction(transaction_id: string): Promise<void | null>
  checkTransactionStatus(transaction_id: string): Promise<ITransaction | null>
}
