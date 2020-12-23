//
// Validates User Input
//
import ICreateUserDTO from './ICreateUserDTO'

export async function validateCreateUserRequest(data: ICreateUserDTO) {
  interface IErrors {
    name?: string
    lastname?: string
    balance?: string
    cpf?: string
    password?: string
  }

  const errors: IErrors = {}
  if (typeof data.name !== 'string') {
    errors.name = 'Invalid data type'
  } else if (data.name === undefined || data.name.trim() === '' || data.name === null) {
    errors.name = 'Field cannot be blank'
  } else {
    if (data.name.length === 0) errors.name = 'Name cannot be empty'
  }

  if (typeof data.lastname !== 'string') {
    errors.lastname = 'Invalid data type'
  } else if (data.lastname === undefined || data.lastname.trim() === '' || data.lastname === null) {
    errors.lastname = 'Field cannot be blank'
  } else {
    if (data.lastname.length === 0) errors.lastname = 'Last name cannot be empty'
  }

  if (typeof data.balance !== 'number') {
    errors.balance = 'Invalid data type'
  } else if (data.balance === undefined || data.balance === null) {
    errors.balance = 'Field cannot be blank'
  } else {
    if (data.balance < 0) errors.balance = 'Invalid amount'
  }

  if (typeof data.cpf !== 'string') {
    errors.cpf = 'Invalid data type'
  } else if (data.cpf === undefined || data.cpf.trim() === '' || data.cpf === null) {
    errors.cpf = 'Field cannot be blank'
  } else {
    if (data.cpf.length != 11) errors.cpf = 'Invalid CPF'
  }

  return errors
}
