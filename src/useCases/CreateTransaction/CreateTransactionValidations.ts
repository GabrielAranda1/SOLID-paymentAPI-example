//
// Validates User input
//
import ICreateTransactionDTO from './ICreateTransactionDTO'

export async function validateCreateTransaction(value: Number, receiver: string) {
  interface IErrors {
    receiver?: string
    value?: string
  }

  const errors: IErrors = {}

  if (typeof receiver !== 'string') {
    errors.receiver = 'Invalid data type'
  } else if (receiver === undefined || receiver.trim() === '' || receiver === null) {
    errors.receiver = 'Field cannot be blank'
  } else {
    if (receiver.length != 11) errors.receiver = 'Invalid CPF'
  }

  if (typeof value !== 'number') {
    errors.receiver = 'Invalid data type'
  } else if (value === undefined || value === null) {
    errors.value = 'Field cannot be blank'
  } else {
    if (value <= 0) errors.value = 'Invalid amount'
  }

  return errors
}
