import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.string('id').primary()

    table
      .string('sender_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .string('receiver_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.double('value').notNullable()
    table.string('status').notNullable().defaultTo('CONFIRMED')
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('transactions')
}
