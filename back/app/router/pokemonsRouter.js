import { Router } from "express";
import pokemonsController from "../controllers/pokemonsController.js";
import cw from '../utils/controllerWrapper.js'

const router = Router();

router.get('/pokemons', cw(pokemonsController.getAll));
router.get('/pokemons/:id', cw(pokemonsController.getOne));
router.get('/:pokemonId/types', cw(pokemonsController.getTypesOfOnePokemon));

export default router