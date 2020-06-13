import { Request, Response} from 'express';
import knex from '../database/connection';

class PlacesController {
    async index(request: Request, response: Response) {
        const { city, uf, pets } = request.query;
        
        const parsedPets = String(pets)
        .split(',')
        .map(pet => Number(pet.trim()));

        const places = await knex('places')
        .join('place_pets', 'places.id', '=', 'place_pets.place_id')
        .whereIn('place_pets.pet_id', parsedPets)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('places.*');

        return response.json(places);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const place = await knex('places').where('id', id).first();

        if (!place) {
            return response.status(400).json({message: "Place not found"});
        }

        const pets = await knex('pets')
        .join('place_pets', 'pets.id', '=', 'place_pets.pet_id')
        .where('place_pets.place_id', id)
        .select('pets.title');

        return response.json({ place, pets});
    }

    async create(request: Request, response: Response) {

        const { //Desestruturação
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            pets
        } = request.body;

        const trx = await knex.transaction();

        const place = { //Object Short Syntax
            image: 'https://images.unsplash.com/photo-1584204180902-1aa5bc1aa4c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('places').insert(place);

        const place_id = insertedIds[0];

        const placePets = pets.map((pet_id: number) => {
            return {
                pet_id,
                place_id,
            };
        })

        await trx('place_pets').insert(placePets);

        await trx.commit();

        return response.json({
            id: place_id,
            ...place, //Spread
        });
    }
}

export default PlacesController;