

export async function fetchTypeList(){

    const response = await fetch (`http://localhost:3000/api/v1/types/`)

    if(!response.ok){
        const errorMessage = await response.text();

        throw new Error(`${response.status}: ${errorMessage}`);

    }

    const data = await response.json()

    return data

}

export async function fetchPokemonsByType(typeId){

const response = await fetch (`http://localhost:3000/api/v1/types/${typeId}/pokemons`)

if(!response.ok){
    const errorMessage = await response.text();

    throw new Error(`${response.status}: ${errorMessage}`);

}

const data = await response.json()

    return data

}

