import { Types } from "../models/index.js"
import { NotFoundError } from "../utils/errors.js"

const typesController = {

   async getAll(req, res){
        const types = await Types.findAll()

        res.json(types)
    
    
    },
    
    async getOne(req, res){
        const typeId = req.params.id
        
        const typeFound = await Types.findByPk(typeId)

        if(!typeFound){
            throw new NotFoundError(
                'Type non trouvé ! vérifiez l\'id',
              );

        }

        res.json(typeFound)

    },

    async getPokemonsByType(req, res){
        const typeId = req.params.typesId
        // console.log(typeId);

        const typeFound = await Types.findByPk(typeId, {
            include:
            [
                {
                    association: 'pokemons'
                },
            ],
        });

        if(!typeFound){
            throw new NotFoundError(
                'Type non trouvé ! vérifiez l\'id',
              );

        }


        res.json(typeFound.pokemons)
               

    },

    
        
    }

    export default typesController