import { Request, Response } from 'express';
import knex from '../database/connection';

class PetsController {
    async index(request: Request, response: Response) {
        const pets = await knex('pets').select('*');

        const serializedItems = pets.map(pet => {
            return {
                id: pet.id,
                title: pet.title,
                image_url: `http://192.168.0.10:3333/uploads/${pet.image}`,
            };
        });

        return response.json(serializedItems);
    }
}

export default PetsController;