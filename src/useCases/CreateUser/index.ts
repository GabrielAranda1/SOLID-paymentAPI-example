import { SQLiteUsersRepository } from '../../repositories/implementations/SQLiteUsersRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const sqliteUsersRepository = new SQLiteUsersRepository()

const createUserUseCase = new CreateUserUseCase(sqliteUsersRepository)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
