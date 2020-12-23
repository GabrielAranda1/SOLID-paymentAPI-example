export async function validateUserAuthentication(cpf: string, password: string) {
  interface IErrors {
    cpf?: string
    password?: string
  }

  const errors: IErrors = {}

  if (typeof cpf !== 'string') {
    errors.cpf = 'Invalid data type'
  } else if (cpf === undefined || cpf.trim() === '' || cpf === null) {
    errors.cpf = 'Field cannot be blank'
  }

  if (typeof password !== 'string') {
    errors.password = 'Invalid data type'
  } else if (password === undefined || password.trim() === '' || password === null) {
    errors.password = 'Insert your password'
  }

  return errors
}
