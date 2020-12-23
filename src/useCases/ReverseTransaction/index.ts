import { SQLiteTransactionsRepository } from '../../repositories/implementations/SQLiteTransactionsRepository'
import { SQLiteUsersRepository } from '../../repositories/implementations/SQLiteUsersRepository'
import { ReverseTransactionController } from './ReverseTransactionController'
import { ReverseTransactionUseCase } from './ReverseTransactionUseCase'

const sqliteTransactionRepository = new SQLiteTransactionsRepository()
const sqliteUserRepository = new SQLiteUsersRepository()

const reverseTransactionUseCase = new ReverseTransactionUseCase(
  sqliteUserRepository,
  sqliteTransactionRepository
)

const reverseTransactionController = new ReverseTransactionController(reverseTransactionUseCase)

export { reverseTransactionUseCase, reverseTransactionController }
