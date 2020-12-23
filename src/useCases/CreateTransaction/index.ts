import { SQLiteTransactionsRepository } from '../../repositories/implementations/SQLiteTransactionsRepository'
import { SQLiteUsersRepository } from '../../repositories/implementations/SQLiteUsersRepository'
import { CreateTransactionController } from './CreateTransactionController'
import { CreateTransactionUseCase } from './CreateTransactionUseCase'

const sqliteTransactionRepository = new SQLiteTransactionsRepository()
const sqliteUserRepository = new SQLiteUsersRepository()

const createTransactionUseCase = new CreateTransactionUseCase(
  sqliteUserRepository,
  sqliteTransactionRepository
)

const createTransactionController = new CreateTransactionController(createTransactionUseCase)

export { createTransactionUseCase, createTransactionController }
