import request from 'supertest'
import app from '../../app'
import db from '../../database/connection'
import dbtests from '../../__tests__/utils/dbtests'
import DateNowString from '../../utils/DateNowString'

describe('List all user`s transactions in a given period', () => {
  beforeAll(async () => {
    await dbtests.dropUsers()
    await dbtests.createOneUser('1', 'João', 'Ninguem', '12345678943', 5000, 'salaminho')
    await dbtests.createOneUser('2', 'Maria', 'Lindinha', '12345678966', 52000, 'florzinha')
  })

  beforeEach(async () => {
    await dbtests.dropTransactions()
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should list all users transactions in a given period of time', async () => {
    dbtests.creatOneTransaction('1', '1', '2', 1000)
    dbtests.creatOneTransaction('2', '1', '2', 1000)
    dbtests.creatOneTransaction('3', '1', '2', 1000)
    dbtests.creatOneTransaction('4', '1', '2', 1000)

    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .get(`/transactions/1`)
      .query({ from: '2020-12-20', to: await DateNowString() })
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(200)
  })

  it('should not allow users to search for invalid dates (future)', async () => {
    dbtests.creatOneTransaction('1', '1', '2', 1000)
    dbtests.creatOneTransaction('2', '1', '2', 1000)
    dbtests.creatOneTransaction('3', '1', '2', 1000)
    dbtests.creatOneTransaction('4', '1', '2', 1000)

    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const transactionResponse = request(app)
      .get(`/transactions/1`)
      .query({ from: '2320-12-20', to: '2120-10-10' })
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect((await transactionResponse).status).toBe(400)
  })

  it('should not allow users to search if they are not logged in', async () => {
    dbtests.creatOneTransaction('1', '1', '2', 1000)
    dbtests.creatOneTransaction('2', '1', '2', 1000)
    dbtests.creatOneTransaction('3', '1', '2', 1000)
    dbtests.creatOneTransaction('4', '1', '2', 1000)

    const transactionResponse = request(app)
      .get(`/transactions/1`)
      .query({ from: '2320-12-20', to: '2120-10-10' })
      .send()

    expect((await transactionResponse).status).toBe(401)
  })
})
