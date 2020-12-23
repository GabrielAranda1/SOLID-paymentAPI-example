import { SQLiteUsersRepository } from '../../repositories/implementations/SQLiteUsersRepository'
import { ViewBalanceController } from './ViewBalanceController'
import { ViewBalanceUseCase } from './ViewBalanceUseCase'

const sqliteUserRepository = new SQLiteUsersRepository()

const viewBalanceUseCase = new ViewBalanceUseCase(sqliteUserRepository)

const viewBalanceController = new ViewBalanceController(viewBalanceUseCase)

export { viewBalanceUseCase, viewBalanceController }
