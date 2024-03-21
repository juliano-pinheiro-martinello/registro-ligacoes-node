/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { idUser: 1, user: 'admin', name: '', password: Buffer.from('admin').toString('base64') },
    { idUser: 2, user: 'admin2', name: '', password: Buffer.from('admin').toString('base64') },
  ]);
}
