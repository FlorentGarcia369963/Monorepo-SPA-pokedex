import { fetchPokemonTypesData } from "../services/pokemons.js";
import { fetchTeamsList } from "../services/teams.js";
import teamModule from "./teamModule.js";

const pokemonModule = {
    addPokemonsInPokemonsContainer(pokemonData) {
        const pokemonTemplateElm = document.querySelector('#pokemon-template')
        // console.log(pokemonData.types);
        const clone = pokemonTemplateElm.content.cloneNode(true);

        const idPokemonElm = clone.querySelector('[slot="pokemon-id"]')
        Object.assign(idPokemonElm.dataset, pokemonData)

        // const typePokemonElm = clone.querySelector('[slot="pokemon-type"]')
        // // const typesData = JSON.stringify(pokemonData.types)
        // Object.assign(typePokemonElm.dataset, JSON.stringify(pokemonData.types))


        const namePokemonElm = clone.querySelector('[slot="pokemon-name"]')
        namePokemonElm.textContent = pokemonData.name

        const typePokemonContainerElm = clone.querySelector('.pokemon-type-container')
        // console.log(pokemonData.types);
        pokemonData.types.forEach(type => {
            // console.log(type);
            const typePokemonElm = document.createElement('span')
            typePokemonElm.classList.add('pokemon-type')
            typePokemonElm.textContent = type.name
            typePokemonContainerElm.append(typePokemonElm)


        });


        const imgPokemonElm = clone.querySelector('[slot="pokemon-img"]')
        imgPokemonElm.setAttribute('src', `./assets/img/${pokemonData.id}.webp`)

        //Evènement cliquer sur "voir les carac"
        const seeCaracteristicsBtnElm = clone.querySelector('#pokemon-button-see-caracteristic')
        seeCaracteristicsBtnElm.addEventListener('click', pokemonModule.handleClickOnSeeCaracButton)

       
        //Evènement cliquer sur "ajouter à sa team"
        const addPokemonInATeam = clone.querySelector('#add-pokemon-in-a-team')
        addPokemonInATeam.addEventListener('click', teamModule.handleClickOnAddPokemon)

        const pokemonContainer = document.querySelector('#pokemon-list')
        // console.log(pokemonContainer);
        pokemonContainer.append(clone)

    },

    async handleClickOnSeeCaracButton(event) {
        //ouvrir la modale
        const modalSeeCaracs = document.querySelector('#caracteristic-modal')
        modalSeeCaracs.classList.add('is-active')


        modalSeeCaracs.style.top = `${window.scrollY - 250}px`

        //attraper le background de la modale
        const background = modalSeeCaracs.querySelector('.modal-background')
        console.log(window.scrollY);

        //placer le background dans la fenêtre
        // background.style.top = `${window.scrollY}px`
        // console.log(background.style.top);



        //empecher le scroll
        const bodyElm = document.body
        bodyElm.classList.add('overflowHidden')

        //choper les dataset
        const seeCaracBtnClicked = event.currentTarget;
        const pokemonElm = seeCaracBtnClicked.closest('[slot="pokemon-id"]')

        console.log(pokemonElm);

        //mettre le nom du pokémon
        const pokemonName = modalSeeCaracs.querySelector('.pokemon-list-pokemon-name')
        pokemonName.textContent = pokemonElm.dataset.name

        console.log(pokemonElm.dataset);

        //les types
        const typeElm = pokemonElm.querySelector('[slot="pokemon-type"]')
        //Je crois qu'on va envoyer une requête fetch
        console.log(pokemonElm.dataset.id);
        const pokemonTypeData = await fetchPokemonTypesData(pokemonElm.dataset.id)
        console.log(pokemonTypeData);

        const modalTypeContainer = modalSeeCaracs.querySelector('.carac-modal-type-container')

        modalTypeContainer.textContent = ''

        pokemonTypeData.forEach(type => {
            const pokemonTypeName = document.createElement('span')
            pokemonTypeName.classList.add('pokemon-type')
            pokemonTypeName.textContent = type.name


            console.log(pokemonTypeName);
            modalTypeContainer.append(pokemonTypeName)
        })






        //attribuer l'image à la modale
        const imgPokemonElm = modalSeeCaracs.querySelector('.pokemon-list-pokemon-image')
        imgPokemonElm.setAttribute('src', `./assets/img/${pokemonElm.dataset.id}.webp`)


        //récupérer le conteneur de la liste des caractéristiques
        const listContainer = modalSeeCaracs.querySelector('.list-carac-container')
        // la vider
        listContainer.textContent = ''

        //changer l'objet dataset en tableau
        const keyValuesOfDataset = Object.entries(pokemonElm.dataset)

        //garder uniquement les caractéristiques
        const caracteristics = keyValuesOfDataset.splice(2, 6)

        console.log(caracteristics);

        //créer une balise <li> pour chaque carac avec son duo key-value
        caracteristics.forEach(([key, value]) => {
            const liElm = document.createElement('li')
            liElm.classList.add('carac-modal-carac')
            liElm.textContent = `${key} : ${value}`
            listContainer.append(liElm)
        })


    },








}

export default pokemonModule;