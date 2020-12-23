export interface ITransactionView {
  status: string
  created_at: string
  updated_at: string
  value: number
  sender_cpf?: string
  receiver_cpf?: string
  receiver_name?: string
  receiver_lastname?: string
  sender_name?: string
  sender_lastname?: string
}
