
export async function fetchPokemonList(){
    
        const response = await fetch(`http://localhost:3000/api/v1/pokemons/pokemons`)
        
if(!response.ok){

const errorMessage = await response.text();

throw new Error(`${response.status}: ${errorMessage}`);

}

const data = await response.json();

return data


}

export async function fetchPokemonTypesData(pokemonId){
        
const response = await fetch (`http://localhost:3000/api/v1/pokemons/${pokemonId}/types`)

if(!response.ok){
        const errorMessage = await response.text();

        throw new Error(`${response.status}: ${errorMessage}`);

}

const data = await response.json();

return data

}

