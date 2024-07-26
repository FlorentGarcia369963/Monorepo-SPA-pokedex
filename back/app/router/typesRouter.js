import { Router } from "express";
import typesController from "../controllers/typesController.js";
import cw from '../utils/controllerWrapper.js'


const router = Router();


router.get('/', cw(typesController.getAll))
router.get('/:id', cw(typesController.getOne))
router.get('/:typesId/pokemons', cw(typesController.getPokemonsByType))

export default router