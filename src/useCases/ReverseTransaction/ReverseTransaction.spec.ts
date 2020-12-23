import request from 'supertest'
import app from '../../app'
import db from '../../database/connection'
import dbtests from '../../__tests__/utils/dbtests'

describe('Reverse a previous made transaction', () => {
  beforeEach(async () => {
    await dbtests.dropTransactions()
    await dbtests.dropUsers()
    await dbtests.createOneUser('1', 'João', 'Ninguem', '12345678943', 5000, 'salaminho')
    await dbtests.createOneUser('2', 'Maria', 'Lindinha', '12345678966', 52000, 'florzinha')
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should reverse a transaction', async () => {
    dbtests.creatOneTransaction('1', '1', '2', 1000)

    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .put(`/transaction/1`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(200)
  })

  it('should not allow an user reverse a transaction if he does not have enough balance in his account', async () => {
    dbtests.creatOneTransaction('1', '1', '2', 10000)

    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .put(`/transaction/1`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(400)
  })
})
