import { fetchTypeList } from "../services/types.js"
import { fetchPokemonsByType } from "../services/types.js"
import pokemonModule from "./pokemonModule.js"
import { fetchPokemonTypesData } from "../services/pokemons.js"

const typesModule = {
async addTypesInTypesContainer(){

    const typesList = await fetchTypeList()

    

const typeModalContainer = document.querySelector('.modal-type-container')
typeModalContainer.textContent = ''

typesList.forEach(type => {
    console.log(type.id);
    const typeToAdd = document.createElement('span')
    typeToAdd.classList.add('modal-type')
    typeToAdd.textContent = type.name
    typeToAdd.setAttribute('id', type.id)

    typeToAdd.addEventListener('click', typesModule.handleClickOnType)


    typeModalContainer.append(typeToAdd)

});

},

async handleClickOnType(event){

    const typeBtnClicked = event.currentTarget
    console.log(typeBtnClicked.id);
    const typeId = typeBtnClicked.id

    const pokemonsByType = await fetchPokemonsByType(typeId)
  
    console.log(pokemonsByType);


    //vider le container de pokémon
const pokemonContainer = document.querySelector('#pokemon-list')
pokemonContainer.textContent = ''
//remettre le bouton voir tout qui est mal positionné ^^'
const seeAllButton = document.createElement('span')
seeAllButton.textContent = 'Voir les types de pokémon'
seeAllButton.classList.add('button')
seeAllButton.setAttribute('id', 'see-types-button')

for(const pokemon of pokemonsByType){
    const pokemontypes = await fetchPokemonTypesData(pokemon.id)
    pokemon.types = pokemontypes
    console.log(pokemon);
    //envoyer les pokémons du type sélectionné
    
    await pokemonModule.addPokemonsInPokemonsContainer(pokemon)
}

console.log(pokemonsByType);

pokemonContainer.prepend(seeAllButton)
seeAllButton.addEventListener('click', ()=>{
    //répétition pour éviter une circulaire
    const typeListModal = document.querySelector('#show-types-modal')
    typeListModal.classList.add('is-active')
typeListModal.style.top = `${window.scrollY-200}px`
typesModule.addTypesInTypesContainer()
})

    




    //fermer la modale
    const typesModal = document.querySelector('#show-types-modal')
    typesModal.classList.remove('is-active')





}




}

export default typesModule