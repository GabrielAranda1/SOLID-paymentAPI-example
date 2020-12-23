import { IUsersRepository } from '../../repositories/IUsersRepository'
import IViewBalanceDTO from './IViewBalanceDTO'

export class ViewBalanceUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IViewBalanceDTO) {
    const userBalance = await this.userRepository.checkBalance(data.user_id)

    return userBalance
  }
}
