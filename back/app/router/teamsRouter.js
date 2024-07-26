import { Router } from "express";
import teamsController from "../controllers/teamsController.js";
import cw from '../utils/controllerWrapper.js'


const router = Router();


router.get('/', cw(teamsController.getAll));
router.get('/:id', cw(teamsController.getOne));
router.post('/', cw(teamsController.createTeam));
router.patch('/:id', cw(teamsController.updateTeam))
router.delete('/:id', cw(teamsController.deleteTeam))

router.put('/:teamId/pokemons/:pokemonId', cw(teamsController.addPokemonInATeam))
router.delete ('/:teamId/pokemons/:pokemonId', cw(teamsController.deletePokemonFromATeam))

export default router