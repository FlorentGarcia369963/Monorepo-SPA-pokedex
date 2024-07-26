import { fetchPokemonList } from "./services/pokemons.js";
import pokemonModule from "./modules/pokemonModule.js";
import typesModule from "./modules/typeModule.js";
import teamModule from "./modules/teamModule.js";
import { deleteTeam, fetchTeamsList } from "./services/teams.js";

const app = {
    init() {
        app.addEventListeners();
        app.fetchData();


    },

    addEventListeners() {
        console.log('hello');
        //Evènement clic sur le bouton ajouter une team
        const openModalAddTeamBtnElm = document.querySelector('#add-team-button');
        openModalAddTeamBtnElm.addEventListener('click', app.handleOpenModalAddTeam)
        //Evènement fermer une modale
        const closeModalBtnElms = document.querySelectorAll('.close')
        closeModalBtnElms.forEach(closeModalBtnElm => {
            closeModalBtnElm.addEventListener('click', app.handleCloseModal)

        });

        //Evènement clic sur le bouton voir les types
        const openTypeListModalBtnElm = document.querySelector('#see-types-button')
        openTypeListModalBtnElm.addEventListener('click', app.handleOpenTypeListModal)

        //Evènement submit sur le formulaire ajouter team
        const formAddTeamBtn = document.querySelector('#add-team-modal form')
        formAddTeamBtn.addEventListener('submit', teamModule.handleSubmitAddTeam)

        //Evènement submit sur le formulaire update team
        const formUpdateTeamBtn = document.querySelector('#update-team-modal form')
        console.log(formUpdateTeamBtn);
        formUpdateTeamBtn.addEventListener('submit', teamModule.handleSubmitUpdateTeam)

        //Evènement clic sur le bouton supprimer une team
        const deleteTeamBtn = document.querySelectorAll('.delete-team')
        deleteTeamBtn.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', app.handleClickOnDeleteTeamBtn)

        // Evènement submit sur le formulaire d'ajout d'un pokémon à une team
        const formAddPokemonInATeam = document.querySelector('#add-pokemon-in-a-team-modal')
        formAddPokemonInATeam.addEventListener('submit', teamModule.handleSubmitAddPokemonInAList )
        })

         //Evènement clic sur le bouton comparer 2 pokémons
        const compareBtnElm = document.querySelector('.modal-compare-button')
compareBtnElm.addEventListener('click', app.handleClickOnCompareBtn)

    },

    handleOpenModalAddTeam() {
        const modalAddTeamElm = document.querySelector('#add-team-modal');
        modalAddTeamElm.classList.add('is-active');

        //caler la modale dans la fenêtre
        modalAddTeamElm.style.top = 0
        modalAddTeamElm.querySelector('.modal-card').style.top = `${window.scrollY + 200}px`
        app.hideScrollWhenModalOpened()


    },

    handleCloseModal(event) {

        const closeModalElm = event.currentTarget;
        const modalToClose = closeModalElm.closest('.modal')

        modalToClose.classList.remove('is-active')

        app.letScrollWhenModalIsClosed();


    },

    handleOpenTypeListModal() {

        const typeListModal = document.querySelector('#show-types-modal')
        typeListModal.classList.add('is-active')
        typeListModal.style.top = `${window.scrollY - 200}px`
        typesModule.addTypesInTypesContainer()

        // app.hideScrollWhenModalOpened()
    },

    async fetchData() {
        try {
            const pokemons = await fetchPokemonList();
            // console.log(pokemons);

            pokemons.forEach(pokemon => {
                pokemonModule.addPokemonsInPokemonsContainer(pokemon)

            })

            const teams = await fetchTeamsList()
            teams.forEach(team => {
                teamModule.addTeamsInTeamsContainer(team)
            })

            

        } catch (error) {
            console.log('problème dans la récupération des pokémons');
        }
    },

    hideScrollWhenModalOpened() {
        const bodyElm = document.body
        bodyElm.classList.add('overflowHidden')

    },

    letScrollWhenModalIsClosed() {
        const bodyElm = document.body


        bodyElm.classList.remove('overflowHidden')



    },

    async handleClickOnDeleteTeamBtn(event) {
        event.preventDefault()

        if (!confirm('Voulez vous supprimer cette équipe? Cette action est définitive')) {
            console.log('non');
            return
        }
        console.log('supprimer');
        try {

            const deleteBtnClicked = event.currentTarget
            const teamData = deleteBtnClicked.closest('[slot="dataset"]')
            console.log(teamData);


            await deleteTeam(teamData.dataset.id)
            //supprimer la liste du dom
            const teamToRemove = document.querySelector(`[class="team"][data-id="${teamData.dataset.id}"]`)
            console.log(teamToRemove.dataset.id);

            teamToRemove.remove()

            //fermer la modale
            const teamModalOpened = document.querySelector('#update-team-modal')
            teamModalOpened.classList.remove('is-active')

            app.letScrollWhenModalIsClosed()




        } catch (error) {
            console.error('erreur dans la suppression de la team')
        }


    },

    handleClickOnCompareBtn(event){
        console.log('clic');
        event.preventDefault()

        console.log(event.currentTarget);
    }


};

app.init();



export default app