import { v4 } from 'uuid'

export class User {
  public id!: string

  public name!: string
  public lastname!: string
  public cpf!: string
  public balance!: number
  public password!: string

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = v4()
    } else this.id = id
  }
}
