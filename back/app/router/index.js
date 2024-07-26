import { Router } from "express";
import pokemonsRouter from './pokemonsRouter.js'
import teamsRouter from './teamsRouter.js'
import typesRouter from './typesRouter.js'



const router = Router();

router.use('/api/v1/pokemons', pokemonsRouter);
router.use('/api/v1/types', typesRouter);
router.use('/api/v1/teams', teamsRouter)

export default router;