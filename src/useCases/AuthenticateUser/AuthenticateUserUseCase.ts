import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { IUsersRepository } from '../../repositories/IUsersRepository'
import IAuthenticateUserDTO from './IAuthenticateUserDTO'

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IAuthenticateUserDTO) {
    const user = await this.userRepository.findByCPF(data.cpf)
    if (user) {
      if (await bcrypt.compare(data.password, user.password)) {
        const token = jwt.sign(
          { id: user.id, name: user.name, lastname: user.lastname, cpf: user.cpf },
          String(process.env.JWT_TOKEN),
          {
            expiresIn: '1d',
          }
        )

        return token
      } else {
        throw new Error('Incorrect Password')
      }
    } else {
      throw new Error('User not found')
    }
  }
}
