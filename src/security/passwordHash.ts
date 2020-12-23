import bcrypt from 'bcrypt'

export async function passwordHash(password: string): Promise<string> {
  const salt = bcrypt.genSaltSync(10)

  const hashedPassword = bcrypt.hashSync(password, salt)

  return hashedPassword
}
