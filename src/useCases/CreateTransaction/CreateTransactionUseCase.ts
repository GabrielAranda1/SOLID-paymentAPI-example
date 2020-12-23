import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ITransactionsRepository } from '../../repositories/ITransactionsRepository'
import ICreateTransactionDTO from './ICreateTransactionDTO'
import { Transaction } from '../../entities/Transaction'

export class CreateTransactionUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private transactionRepository: ITransactionsRepository
  ) {}

  async execute(data: ICreateTransactionDTO) {
    // Check if receiver exists
    const userExists = await this.userRepository.findByCPF(data.receiver)

    if (!userExists) {
      throw new Error('User not found.')
    }

    // Check if receiver and sender are the same
    if (data.receiver === data.sender) throw new Error('You cannot transfer to yourself')

    // Check sender balance
    const senderBalance = await this.userRepository.checkBalance(data.sender_id)

    if (data.value > senderBalance) throw new Error('You do not have enough funds to transfer')

    // Create transaction
    const transaction = new Transaction({
      sender_id: data.sender_id,
      receiver_id: userExists.id,
      value: data.value,
    })

    const saveTransaction = await this.transactionRepository.saveTransaction(transaction)
  }
}
