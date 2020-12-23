import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ITransactionsRepository } from '../../repositories/ITransactionsRepository'
import IReverseTransactionDTO from './IReverseTransactionDTO'

export class ReverseTransactionUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private transactionRepository: ITransactionsRepository
  ) {}

  async execute(data: IReverseTransactionDTO) {
    const transaction = await this.transactionRepository.checkTransactionStatus(data.transaction_id)

    if (transaction?.status === null || transaction?.sender_id === null)
      throw new Error('Transaction not found')
    else if (transaction?.status === 'REVERSED') {
      throw new Error('Transaction already reversed')
    }

    if (transaction?.sender_id !== data.sender_id)
      throw new Error('You are not allowed to reverse this transaction')

    const userBalance = await this.userRepository.checkBalance(data.sender_id)

    if (transaction.value > userBalance)
      throw new Error('You do not have enough funds to reverse this transaction')

    const reversedTransaction = await this.transactionRepository.reverseTransaction(
      data.transaction_id
    )
  }
}
