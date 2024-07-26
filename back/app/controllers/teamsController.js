import { Pokemons, Teams } from "../models/index.js"
import { NotFoundError } from "../utils/errors.js"


const teamsController = {

    async getAll(req, res) {


        const teams = await Teams.findAll()

        res.json(teams)



    },

    async getOne(req, res) {
        const teamId = req.params.id


        const teamFound = await Teams.findByPk(teamId,{
            include:[
                {
                    association: 'pokemons'
                },
            ],
        })

        if (!teamFound) {
            throw new NotFoundError(
                'Team non trouvée ! vérifiez l\'id',
            );

        }

        res.json(teamFound)


    },

    async createTeam(req, res) {
        const data = req.body;



        const teamToCreate = await Teams.create(data)

        res.status(201).json(teamToCreate)



    },

    async updateTeam(req, res) {
        const teamId = req.params.id

        const data = req.body



        const teamToUpdate = await Teams.findByPk(teamId)
        if (!teamToUpdate) {
            throw new NotFoundError(
                'Team non trouvée ! vérifiez l\'id',
            );
        }
        await teamToUpdate.update(data)

        res.json(data)


    },

    async deleteTeam(req, res) {
        const teamId = req.params.id




        const teamToUpdate = await Teams.findByPk(teamId)
        if (!teamToUpdate) {
            throw new NotFoundError(
                'Team non trouvée ! vérifiez l\'id',
            );
        }
        await teamToUpdate.destroy()

        console.log(`La team ${teamId} a été dissoute`);
        const message = {
            message: `équipe ${teamId} dissoute`
        }
        res.status(204).json(message)




    },

    async addPokemonInATeam(req, res) {
        const teamId = req.params.teamId

        const pokemonId = req.params.pokemonId




        //trouver la team
        const teamToUpdate = await Teams.findByPk(teamId);

        const pokemonToAdd = await Pokemons.findByPk(pokemonId);

        if (!teamToUpdate) {
            throw new NotFoundError(
                'Team non trouvée ! vérifiez l\'id',
            );
        }
        if (!pokemonToAdd) {
            throw new NotFoundError(
                'Pokemon non trouvé ! vérifiez l\'id',
            );
        }

        await teamToUpdate.addPokemon(pokemonToAdd)

        // Récupérer l'équipe mise à jour avec tous ses Pokémon
        // const updatedTeam = await Teams.findByPk(teamId, {
        //     include: [{ model: Pokemons, as: 'pokemons' }]
        // });
        const updatedTeam = await teamsController.getTeamWithItsPokemons(teamId);

        res.status(200).json(updatedTeam)





    },

    async deletePokemonFromATeam(req, res) {

        const teamId = req.params.teamId

        const pokemonId = req.params.pokemonId



        //trouver la team
        const teamToUpdate = await Teams.findByPk(teamId);

        const pokemonToRemove = await Pokemons.findByPk(pokemonId);

        if (!teamToUpdate) {
            throw new NotFoundError(
                'Team non trouvée ! vérifiez l\'id',
            );
        }
        if (!pokemonToRemove) {
            throw new NotFoundError(
                'Pokemon non trouvé ! vérifiez l\'id',
            );
        }

        await teamToUpdate.removePokemon(pokemonToRemove)

        // Récupérer l'équipe mise à jour avec tous ses Pokémon
        // const updatedTeam = await Teams.findByPk(teamId, {
        //     include: [{ model: Pokemons, as: 'pokemons' }]
        // });

        const updatedTeam = await teamsController.getTeamWithItsPokemons(teamId);


        res.status(200).json(updatedTeam)



    },
    async getTeamWithItsPokemons(teamId) {
        
        const teamFound = await Teams.findByPk(teamId, {
            include: [
                {
                    association: 'pokemons'
                },
            ],

        });

        if (!teamFound) {
            throw new NotFoundError(
                'Team non trouvée ! vérifiez l\'id',
            );

        }

        // res.json(teamFound)

        return teamFound

    },



}

export default teamsController