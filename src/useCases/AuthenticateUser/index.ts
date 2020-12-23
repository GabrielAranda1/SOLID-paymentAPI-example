import { SQLiteUsersRepository } from '../../repositories/implementations/SQLiteUsersRepository'
import { AuthenticateUserController } from './AuthenticateUserController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const sqliteUsersRepository = new SQLiteUsersRepository()

const authenticateUserUseCase = new AuthenticateUserUseCase(sqliteUsersRepository)

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)

export { authenticateUserUseCase, authenticateUserController }
