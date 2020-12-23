//
// Validates User Input
//

import { IListTransactionsValidation } from '../../interfaces/IListTransactionValidation'

export async function validateListTransactionsRequest(data: IListTransactionsValidation) {
  interface IErrors {
    from?: string
    to?: string
  }

  const errors: IErrors = {}

  if (data.from === undefined || data.from.trim() === '' || data.from === null) {
    errors.from = 'Invalid date'
  } else if (data.from.includes('/')) {
    errors.from = 'Invalid date format'
  } else if (new Date(data.from) > new Date(new Date().toDateString())) {
    errors.from = 'I cannot see the future :('
  }

  if (data.to === undefined || data.to.trim() === '' || data.to === null) {
    errors.to = 'Invalid date'
  } else if (data.to.includes('/')) {
    errors.to = 'Invalid date format'
  } else if (new Date(data.to) > new Date(new Date().toDateString())) {
    errors.to = 'I cannot see the future :('
  }

  return errors
}
