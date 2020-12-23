import request from 'supertest'
import app from '../../app'
import db from '../../database/connection'
import dbtests from '../../__tests__/utils/dbtests'

describe('Create a new transaction', () => {
  beforeAll(async () => {
    await dbtests.dropUsers()

    await dbtests.createOneUser('1', 'João', 'Ninguem', '12345678943', 5000, 'salaminho')
    await dbtests.createOneUser('2', 'Maria', 'Lindinha', '12345678966', 52000, 'florzinha')
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should create a new transaction', async () => {
    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .post(`/transaction`)
      .send({ receiver: '12345678966', value: 1000 })
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(201)
  })

  it('should not allow to transfer 0', async () => {
    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .post(`/transaction`)
      .send({ receiver: '12345678966', value: 0 })
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(400)
  })

  it('should not allow to transfer values less than zero', async () => {
    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .post(`/transaction`)
      .send({ receiver: '12345678966', value: -200 })
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(400)
  })

  it('should not allow an user to transfer more than his current balance', async () => {
    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .post(`/transaction`)
      .send({ receiver: '12345678943', value: 99999999 })
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(400)
  })

  it('should not allow an user to transfer to himself', async () => {
    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .post(`/transaction`)
      .send({ receiver: '12345678943', value: 1000 })
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(400)
  })

  it('should not allow an user to create a transfer if he is not logged in', async () => {
    const transactionResponse = request(app)
      .post(`/transaction`)
      .send({ receiver: '12345678943', value: 1000 })

    expect((await transactionResponse).status).toBe(401)
  })
})
