import { SQLiteTransactionsRepository } from '../../repositories/implementations/SQLiteTransactionsRepository'
import { ListTransactionsController } from './ListTransactionsController'
import { ListTransactionsUseCase } from './ListTransactionsUseCase'

const sqliteTransacitonsRepository = new SQLiteTransactionsRepository()

const listTransactionsUseCase = new ListTransactionsUseCase(sqliteTransacitonsRepository)

const listTransactionsController = new ListTransactionsController(listTransactionsUseCase)

export { listTransactionsUseCase, listTransactionsController }
