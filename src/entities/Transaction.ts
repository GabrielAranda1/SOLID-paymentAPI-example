import { v4 } from 'uuid'

export class Transaction {
  public id!: string

  public sender_id!: string
  public receiver_id!: string
  public value!: number

  constructor(props: Omit<Transaction, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = v4()
    } else this.id = id
  }
}
