import { User } from '../entities/User'

export interface IUsersRepository {
  saveUser(user: User): Promise<void>
  checkBalance(user_id: string): Promise<number>
  findByCPF(cpf: string): Promise<User | null>
  findByID(id: string): Promise<User | null>
}
