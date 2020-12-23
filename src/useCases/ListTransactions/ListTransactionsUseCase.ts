import { ITransaction } from '../../interfaces/ITransaction'
import { ITransactionView } from '../../interfaces/Views/ITransactionView'
import { ITransactionsRepository } from '../../repositories/ITransactionsRepository'
import IListTransactionsDTO from './ListTransactionsDTO'

export class ListTransactionsUseCase {
  constructor(private transactionRepository: ITransactionsRepository) {}

  async execute(data: IListTransactionsDTO) {
    const transactions = await this.transactionRepository.listTransactions(
      data.user_id,
      data.to,
      data.from
    )

    if (transactions === null)
      throw new Error('An error ocurred while searching for your transactions')

    if (transactions.length < 1)
      throw new Error('You do not have transactions in this period of time')

    interface transactionViews extends Array<ITransactionView> {}

    const transactionViews: transactionViews = []

    await transactions.map((transaction) => {
      transactionViews.push({
        created_at: transaction.created_at,
        updated_at: transaction.updated_at,
        status: transaction.status,
        value: transaction.value,

        receiver_cpf:
          data.user_id === transaction.receiver_id ? undefined : transaction.receiver_cpf,
        receiver_name:
          data.user_id === transaction.receiver_id ? undefined : transaction.receiver_name,
        receiver_lastname:
          data.user_id === transaction.receiver_id ? undefined : transaction.receiver_lastname,

        sender_cpf: data.user_id === transaction.sender_id ? undefined : transaction.sender_cpf,
        sender_name: data.user_id === transaction.sender_id ? undefined : transaction.sender_name,
        sender_lastname:
          data.user_id === transaction.sender_id ? undefined : transaction.sender_lastname,
      })
    })

    return transactionViews
  }
}
