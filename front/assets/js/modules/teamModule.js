import { addPokemonInATeam, createNewTeam, fetchTeamsList, getPokemonOfATeam, removePokemonOfATeam, updateTeam } from "../services/teams.js";

const teamModule = {

    async addTeamsInTeamsContainer(team) {
        const teamsContainer = document.querySelector('.team-container')

        const teamTemplateElm = document.querySelector('#team-template')

        const teamClone = teamTemplateElm.content.cloneNode(true);

        //mettre le nom
        const teamName = teamClone.querySelector('.team-name')
        teamName.textContent = team.name

        //mettre la description
        const teamDescription = teamClone.querySelector('.team-description')
        teamDescription.textContent = team.description

        //** mettre les teams dans la modale d'ajout de pokémon */
        const teamListInAddPokemonModal = document.querySelector('#add-pokemon-in-a-team-modal #team-name')
        const teamOptionInAddPokemonModal = document.createElement('option')
        // teamOptionInAddPokemonModal.classList.add('')
        teamOptionInAddPokemonModal.setAttribute('id', team.id)
        teamOptionInAddPokemonModal.value = team.id
        teamOptionInAddPokemonModal.textContent = team.name


        teamListInAddPokemonModal.append(teamOptionInAddPokemonModal)



        //**mettre les pokémons de l'équipe
        //on récupère le container de la liste
        const teamPokemons = teamClone.querySelector('.team-pokemons-list')
        // console.log(teamPokemons);
        //on récupère les pokémon de la team
        const pokemonsOfTheTeam = await getPokemonOfATeam(team.id)

        // console.log(pokemonsOfTheTeam);
        //si on trouve des pokémons dans cette team:
        if (pokemonsOfTheTeam) {
            //pour chaque pokémon de la team
            pokemonsOfTheTeam.pokemons.forEach(pokemon => {
                //on créé une balise li, on lui attribut sa classe
                const listElm = document.createElement('li')
                listElm.classList.add('team-pokemon')
                listElm.setAttribute('id', pokemon.id)
                //on fabrique une balise img, on lui attribue sa classe
                const imgElm = document.createElement('img')
                imgElm.classList.add('team-pokemon-image')
                //on lui met ses attributs src et alt
                imgElm.setAttribute('src', `./assets/img/${pokemon.id}.webp`)
                imgElm.setAttribute('alt', '')
                //on insère l'img dans la li
                listElm.append(imgElm)
                //on insère la li dans le container
                teamPokemons.append(listElm)

            })
            
            
        }
        
       





        //coller les datasets
        const teamDataset = teamClone.querySelector('[slot="dataset"]')
        // console.log(teamDataset);
        Object.assign(teamDataset.dataset, team)

        //coller un écouteur de clic sur le bouton modifier
        const updateBtnElm = teamClone.querySelector('#update-team-button')
        updateBtnElm.addEventListener('click', teamModule.handleClickOpenUpdateModal)


        teamsContainer.append(teamClone)




    },


    async handleSubmitAddTeam(event) {
        event.preventDefault()
        console.log(event.currentTarget.closest('form'));

        const formElm = event.currentTarget.closest('form')

        const formData = new FormData(formElm)
        const teamData = Object.fromEntries(formData)
        console.log(teamData);
        try {

            const teamAdded = await createNewTeam(teamData)
            console.log(teamAdded);

            teamModule.addTeamsInTeamsContainer(teamAdded)

            //reset du formulaire
            formElm.reset()

            //fermeture de la modale
            const addTeamModal = document.querySelector('#add-team-modal')
            addTeamModal.classList.remove('is-active')

            //reprise de l'overflow
            const bodyElm = document.body


        bodyElm.classList.remove('overflowHidden')






        } catch (error) {
            console.error('erreur');
        }




    },

    async handleClickOpenUpdateModal(event) {
        event.preventDefault()
        console.log(event.currentTarget);

        // afficher la modale
        const updateTeamModal = document.querySelector('#update-team-modal')
        updateTeamModal.classList.add('is-active')
        updateTeamModal.style.top = `${window.scrollY}px`

        //mettre les dataset dans la modale
        const teamDataset = event.currentTarget.closest('[slot="dataset"]').dataset
        console.log(teamDataset);

        //remplir les input avec les infos actuelles
        const nameInput = updateTeamModal.querySelector('input[name="name"]')
        console.log(nameInput);
        nameInput.value = teamDataset.name
        const descriptionInput = updateTeamModal.querySelector('input[name="description"]')
        descriptionInput.value = teamDataset.description

        const modalDataset = updateTeamModal.querySelector('[slot="dataset"]')
        Object.assign(modalDataset.dataset, teamDataset)

         // //**mettre les pokémons de la team dans la modale */
        const updateModalTeamPokemonList = updateTeamModal.querySelector('.team-pokemons-list')
        updateModalTeamPokemonList.textContent = ''
        const pokemonsOfTheTeam = await getPokemonOfATeam(teamDataset.id)
        console.log(pokemonsOfTheTeam.pokemons);

        if (pokemonsOfTheTeam) {
            //pour chaque pokémon de la team
            pokemonsOfTheTeam.pokemons.forEach(pokemon => {
                //on créé une balise li, on lui attribut sa classe
                const listElm = document.createElement('li')
                listElm.classList.add('team-pokemon-update-modal')
                listElm.setAttribute('id', pokemon.id)
                //on fabrique une balise img, on lui attribue sa classe
                const imgElm = document.createElement('img')
                imgElm.classList.add('team-pokemon-image')
                //on lui met ses attributs src et alt
                imgElm.setAttribute('src', `./assets/img/${pokemon.id}.webp`)
                imgElm.setAttribute('alt', '')
                //on insère l'img dans la li
                listElm.append(imgElm)
                const deletePokemonBtn = document.createElement('div')
                deletePokemonBtn.classList.add('button')
                deletePokemonBtn.textContent = 'Supprimer'
                listElm.append(deletePokemonBtn)


                //on insère la li dans le container
                updateModalTeamPokemonList.append(listElm)

                //on ajoute un écouteur d'évènement pour le clic sur le bouton supprimer
                deletePokemonBtn.addEventListener('click', teamModule.handleClickOnDeletePokemonBtn)


            })
            
            
        }

        // updateModalTeamPokemonList.append(listElm)





    },

    async handleSubmitUpdateTeam(event) {
        event.preventDefault()
        console.log(event.currentTarget)

        //récupérer le formulaire
        const formElm = event.currentTarget

        const formData = new FormData(formElm)
        const teamData = Object.fromEntries(formData)

        //récupérer l'id de la team à modifier
        const modalDataset = formElm.closest('[slot="dataset"]')
        const teamId = modalDataset.dataset.id

        console.log(teamId);
        console.log(teamData);

        const updatedTeam = await updateTeam(teamId, teamData)
        console.log(updatedTeam);

        //récupérer la team à mettre à jour
        const teamToUpdate = document.querySelector(`.team[data-id="${teamId}"]`)
        console.log(teamToUpdate);

        //mettre les infos à jour
        const teamName = teamToUpdate.querySelector('.team-name')
        console.log(teamName);
        teamName.textContent = updatedTeam.name
        const teamDescription = teamToUpdate.querySelector('.team-description')
        teamDescription.textContent = updatedTeam.description

        //reset le form
        formElm.reset()

        // fermer la modale
        const updateTeamModal = document.querySelector('#update-team-modal')
        updateTeamModal.classList.remove('is-active')
    },

    handleClickOnAddPokemon(event) {
        console.log(event.currentTarget);

        // ouvrir la modale
        const addPokemonModal = document.querySelector('#add-pokemon-in-a-team-modal')
        console.log(addPokemonModal);
        addPokemonModal.classList.add('is-active')

        addPokemonModal.style.top = `${window.scrollY}px`

        //Récupérer l'id du pokémon
        const pokemonBtnClicked = event.currentTarget
        const pokemonClicked = pokemonBtnClicked.closest('[slot="pokemon-id"]')
        console.log(pokemonClicked);
        const pokemonIdInput = addPokemonModal.querySelector('input[name="pokemon_id"]')
        pokemonIdInput.value = pokemonClicked.dataset.id
        console.log(pokemonIdInput);
    },

    async handleSubmitAddPokemonInAList(event) {
        event.preventDefault()
        console.log(event);

        //Récupérer le formulaire
        const formElm = event.currentTarget.querySelector('form')
        console.log(formElm);
        const formData = new FormData(formElm)

        //récupérer l'id du pokémon et de la team
        const teamAndPokemonId = Object.fromEntries(formData)
        console.log(teamAndPokemonId);
        //envoyer le pokémon vers la team
        console.log('avant la teamModule addPokemonInTeam');
        await addPokemonInATeam(teamAndPokemonId.pokemon_id, teamAndPokemonId.team_id)
        console.log('après la teamModule addPokemonInTeam');

        //mettre à jour la team
        const teamToUpdate = document.querySelector(`.team[data-id="${teamAndPokemonId.team_id}"]`)
        console.log(teamToUpdate);
        const listToAddIn = teamToUpdate.querySelector('.team-pokemons-list')




        //on créé une balise li, on lui attribut sa classe
        const listElm = document.createElement('li')
        listElm.classList.add('team-pokemon')
        listElm.setAttribute('id',teamAndPokemonId.pokemon_id)
        //on fabrique une balise img, on lui attribue sa classe
        const imgElm = document.createElement('img')
        imgElm.classList.add('team-pokemon-image')
        //on lui met ses attributs src et alt
        imgElm.setAttribute('src', `./assets/img/${teamAndPokemonId.pokemon_id}.webp`)
        imgElm.setAttribute('alt', '')
        //on insère l'img dans la li
        listElm.append(imgElm)
        //on insère la li dans le container
        listToAddIn.append(listElm)










        //reset le form
        formElm.reset()
        //fermer la modale
        document.querySelector('#add-pokemon-in-a-team-modal').classList.remove('is-active')

    },

    async handleClickOnDeletePokemonBtn(event){
console.log(event.currentTarget);
const deleteBtnClicked = event.currentTarget
const pokemonToRemoveFromBDD= deleteBtnClicked.closest('.team-pokemon-update-modal')
const pokemonId= pokemonToRemoveFromBDD.id
console.log(pokemonId);

const teamData = deleteBtnClicked.closest('.modal-card')
const teamId = teamData.dataset.id
console.log(teamId);


if(!confirm('Voulez vous retirer ce pokémon de la Team?')){
    return
}

await removePokemonOfATeam(pokemonId, teamId)

//Mettre à jour la liste de team sur la page
//selection de la team
const teamToUpdate = document.querySelector(`.team-container .team[data-id="${teamId}"]`)
console.log(teamToUpdate);

//selection de la balise li du pokémon
const pokemonToRemoveFromPage = teamToUpdate.querySelector(`.team-pokemon[id="${pokemonId}"]`)
console.log(pokemonToRemoveFromPage);

//sélection de la balise ul contenant la balise li
const pokemonContainer = pokemonToRemoveFromPage.closest('ul')

//suppression de la balise li 
pokemonContainer.removeChild(pokemonToRemoveFromPage)

//fermer la modale
const modalToClose = document.querySelector('#update-team-modal')
modalToClose.classList.remove('is-active')

    }

}


export default teamModule;

