/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('idUser').primary();
    table.string('user', 255).notNullable();
    table.string('name', 255);
    table.string('password', 255).notNullable();
  })
    .createTable('filiais', function (table) {
      table.increments('idFilial').primary();
      table.string('nome', 255).notNullable();
    })
    .createTable('ligacoes', function (table) {
      table.increments('id').primary();
      table.integer('idFilial').references('idFilial').inTable('filiais');
      table.string('nomeContato');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.string('canal');
      table.string('observacoes')
      table.string('tipo');
      table.integer('idUser').references('idUser').inTable('users');
    })

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('ligacoes').dropTable('users').dropTable('filiais');
}
