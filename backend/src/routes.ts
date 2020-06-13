import express from 'express';
import PlacesController from './controllers/PlacesController';
import PetsController from './controllers/PetsController';

const routes = express.Router();
const placesController = new PlacesController();
const petsController = new PetsController();

routes.get('/pets', petsController.index);
routes.post('/places', placesController.create);
routes.get('/places', placesController.index);
routes.get('/places/:id', placesController.show);


export default routes;