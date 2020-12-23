import request from 'supertest'
import app from '../../app'
import db from '../../database/connection'
import dbtests from '../../__tests__/utils/dbtests'

describe('Authentication', () => {
  beforeAll(async () => {
    await dbtests.dropUsers()

    await dbtests.createOneUser('5000', 'João', 'Ninguem', '12345678943', 5000, 'salaminho')
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should authenticate user', async () => {
    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    expect((await response).status).toBe(200)
  })

  it('should not authenticate user with invalid password or email', async () => {
    const user = { cpf: '12345678943', password: 'salamitos' }

    const response = request(app).post('/login').send(user)

    expect((await response).status).toBe(400)
  })

  it('should return jwt token when authenticated', async () => {
    const user = { cpf: '12345678943', password: 'salaminho' }

    const response = request(app).post('/login').send(user)

    expect((await response).body).toHaveProperty('token')
  })
})
