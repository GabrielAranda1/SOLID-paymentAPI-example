import { Request, Response } from 'express'
import { decode } from '../../middlewares/auth'
import { ViewBalanceUseCase } from './ViewBalanceUseCase'

export class ViewBalanceController {
  constructor(private viewBalanceUseCase: ViewBalanceUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    const user = await decode(request)

    try {
      if (user === null) throw new Error('An error occured with your session')

      if (user.id !== user_id) throw new Error('You do not have permissions to do this')

      const balance = await this.viewBalanceUseCase.execute({
        user_id: user_id,
      })

      return response.status(200).json({ balance: balance })
    } catch (err) {
      return response.status(401).json({
        message: err.message || 'An error occured while processing your request',
      })
    }
  }
}
