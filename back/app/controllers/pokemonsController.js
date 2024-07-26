import { Pokemons } from "../models/index.js"
import { NotFoundError } from "../utils/errors.js"




const pokemonsController = {

    async getAll(req, res) {
        const pokemons = await Pokemons.findAll({
            include:
                [
                    {
                        association: 'types'
                    },
                ],
        })

        res.json(pokemons)



    },

    async getOne(req, res) {
        const pokemonId = req.params.id

        const pokemonFound = await Pokemons.findByPk(pokemonId);
        if (!pokemonFound) {
            throw new NotFoundError(
                'Pokémon non trouvé ! vérifiez l\'id',
            );
        }
        res.json(pokemonFound)

    },

    async getPokemonAndTypes(req, res) {
        const pokemonId = req.params.id

        const pokemonFound = await Pokemons.findByPk(pokemonId, {
            include:
                [
                    {
                        association: 'types'
                    },
                ],
        });

        if (!pokemonFound) {
            throw new NotFoundError(
                'Pokémon non trouvé ! vérifiez l\'id',
            );
        }
        res.json(pokemonFound)

    },

    async getTypesOfOnePokemon(req, res) {
console.log('arrivée ici');
        const pokemonId = req.params.pokemonId
        console.log(pokemonId);
        const PokemonWithTypes = await Pokemons.findByPk(pokemonId, {

            include:
                [
                    {
                        association: 'types',
                        // where: {
                        //     pokemon_id: pokemonId
                        // },
                    },
                ],
        });

        if(!PokemonWithTypes){
            throw new NotFoundError(
                'Aucune association type-pokémon trouvée ! vérifiez les id',
            );
        }
        res.json(PokemonWithTypes.types)


    },




}

export default pokemonsController