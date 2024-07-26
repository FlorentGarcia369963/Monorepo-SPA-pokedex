
export async function fetchTeamsList(){
const response = await fetch(`http://localhost:3000/api/v1/teams/`)
        
if(!response.ok){

const errorMessage = await response.text();

throw new Error(`${response.status}: ${errorMessage}`);

}

const data = await response.json();

return data

}

export async function createNewTeam(teamData){

//vérifier si une équipe existe



    const response = await fetch(`http://localhost:3000/api/v1/teams/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(teamData)  
    })

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${response.status}: ${errorMessage}`);

    }

    const data = await response.json();

    return data

}

export async function updateTeam(id, teamData){
    console.log(id);
    console.log(teamData);
    const response = await fetch(`http://localhost:3000/api/v1/teams/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(teamData)  
    })

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${response.status}: ${errorMessage}`);

    }

    const data = await response.json();

    return data


}

export async function deleteTeam(id){

    const response = await fetch(`http://localhost:3000/api/v1/teams/${id}`,{
        method: 'DELETE',
         
    })

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${response.status}: ${errorMessage}`);

    }

    



}

export async function getPokemonOfATeam(teamId){

    const response = await fetch(`http://localhost:3000/api/v1/teams/${teamId}`)

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${response.status}: ${errorMessage}`);

    }

    const data = await response.json();

    return data

}

export async function addPokemonInATeam(pokemonId, teamId){
    console.log('arrivé dans service addPokemonInTeam');


    const response = await fetch (`http://localhost:3000/api/v1/teams/${teamId}/pokemons/${pokemonId}`,{
        method: 'PUT',
         
    })

if(!response.ok){
    const errorMessage = await response.text();

    throw new Error(`${response.status}: ${errorMessage}`);

}

const data = await response.json();

return data



}

export async function removePokemonOfATeam(pokemonId, teamId){
    const response = await fetch (`http://localhost:3000/api/v1/teams/${teamId}/pokemons/${pokemonId}`,{
        method: 'DELETE',
         
    })

if(!response.ok){
    const errorMessage = await response.text();

    throw new Error(`${response.status}: ${errorMessage}`);

}




}


