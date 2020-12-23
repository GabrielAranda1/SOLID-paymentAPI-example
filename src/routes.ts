import { Request, Response, Router } from 'express'
import { createUserController } from './useCases/CreateUser'
import { authenticateUserController } from './useCases/AuthenticateUser'
import { createTransactionController } from './useCases/CreateTransaction'
import { reverseTransactionController } from './useCases/ReverseTransaction'
import { viewBalanceController } from './useCases/ViewBalance'
import { listTransactionsController } from './useCases/ListTransactions'

import { auth } from './middlewares/auth'

const router = Router()

router.post('/users', (request: Request, response: Response) => {
  return createUserController.handle(request, response)
})

router.post('/login', (request: Request, response: Response) => {
  return authenticateUserController.handle(request, response)
})

//
router.use(auth) // Authorization token is required to connect to all routes listed below this line
//

router.post('/transaction', (request: Request, response: Response) => {
  return createTransactionController.handle(request, response)
})

router.put('/transaction/:transaction_id', (request: Request, response: Response) => {
  return reverseTransactionController.handle(request, response)
})

router.get('/user/:user_id', (request: Request, response: Response) => {
  return viewBalanceController.handle(request, response)
})

router.get('/transactions/:user_id', (request: Request, response: Response) => {
  return listTransactionsController.handle(request, response)
})

export { router }
