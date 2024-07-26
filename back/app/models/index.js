import Pokemons from './pokemons.js';
import Teams from './teams.js';
import Types from './types.js';

// relation de pokemon à type
Pokemons.belongsToMany(Types,{
    as:'types',
    through:'pokemon_type',
    foreignKey:'pokemon_id',
    otherKey:'type_id'
});

Types.belongsToMany(Pokemons,{
    as:'pokemons',
    through:'pokemon_type',
    foreignKey:'type_id',
    otherKey:'pokemon_id'

});

Teams.belongsToMany(Pokemons,{
    as:'pokemons',
    through:'team_pokemon',
    foreignKey:'team_id',
    otherKey:'pokemon_id'
});

Pokemons.belongsToMany(Teams,{
    as:'teams',
    through:'team_pokemon',
    foreignKey:'pokemon_id',
    otherKey:'team_id'
});

export {Pokemons, Types, Teams };