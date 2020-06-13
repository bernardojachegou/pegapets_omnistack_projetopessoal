import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('pets').insert([
        { title: 'Cães', image: 'dog.svg' },
        { title: 'Gatos', image: 'cat.svg' },
        { title: 'Outros', image: 'others.svg' },
    ]);
}