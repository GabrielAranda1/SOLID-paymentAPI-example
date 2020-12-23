import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('lastname').notNullable()
    table.string('cpf').notNullable()
    table.string('password').notNullable()
    table.double('balance').notNullable()
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users')
}
