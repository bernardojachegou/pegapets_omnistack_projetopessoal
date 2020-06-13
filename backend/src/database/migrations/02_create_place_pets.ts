import Knex from 'knex';

export async function up(knex: Knex) {
    //Criar a tabela
    return knex.schema.createTable('place_pets', table => {
        table.increments('id').primary();

        table.integer('place_id')
            .notNullable()
            .references('id')
            .inTable('places');

        table.integer('pet_id')
            .notNullable()
            .references('id')
            .inTable('pets');
    });
};

export async function down(knex: Knex) {
    return knex.schema.dropTable('place_pets');
};