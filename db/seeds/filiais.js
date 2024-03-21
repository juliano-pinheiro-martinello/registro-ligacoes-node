/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('filiais').del()
  await knex('filiais').insert([
    // add more filiais from id 1 to id 115
    ...Array.from({ length: 115 }).map((_, i) => ({ idFilial: i + 1, nome: `F${`000${i + 1}`.slice(-4)}` }))
  ]);
}
