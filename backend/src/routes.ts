import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

import PlacesController from './controllers/PlacesController';
import PetsController from './controllers/PetsController';

const routes = express.Router();
const upload = multer(multerConfig);


const placesController = new PlacesController();
const petsController = new PetsController();

routes.get('/pets', petsController.index);
routes.get('/places', placesController.index);
routes.get('/places/:id', placesController.show);

routes.post(
    '/places',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            pets: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    placesController.create
);

export default routes;