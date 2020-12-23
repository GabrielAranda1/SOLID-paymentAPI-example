import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { passwordHash } from '../../security/passwordHash'
import ICreateUserDTO from './ICreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByCPF(data.cpf)

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    data.password = await passwordHash(data.password) // hashes user's password

    const user = new User(data)

    await this.userRepository.saveUser(user)
  }
}
