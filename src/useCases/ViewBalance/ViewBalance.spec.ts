import request from 'supertest'
import app from '../../app'
import db from '../../database/connection'
import dbtests from '../../__tests__/utils/dbtests'

describe('View users balance', () => {
  beforeAll(async () => {
    await dbtests.dropUsers()

    await dbtests.createOneUser('1', 'João', 'Ninguem', '12345678943', 5000, 'salaminho')
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should return user balance', async () => {
    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const balanceResponse = request(app)
      .get(`/user/1`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect((await balanceResponse).body).toHaveProperty('balance')
  })

  it('should not authorize user not logged in (jwt token)', async () => {
    const balanceResponse = request(app).get(`/user/1`).send()

    expect((await balanceResponse).status).toBe(401)
  })

  it('should not allow user to see other users balance', async () => {
    await dbtests.createOneUser('2', 'Maria', 'Lindinha', '12345678966', 53000, 'florzinha')

    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    const { token } = (await response).body

    const balanceResponse = request(app)
      .get(`/user/2`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect((await balanceResponse).status).toBe(401)
  })
})
