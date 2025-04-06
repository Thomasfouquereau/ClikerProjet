const inventaireButton = document.getElementById('inventaireButton');
const inventaireModal = document.getElementById('inventaireModal');
const closeInventaireButton = document.getElementById('closeInventaireModal');

let inventaireModalIsOpen = false; // Utilisation de let pour permettre la modification

function toggleInventaireModal() {
    if (inventaireModalIsOpen === true) {
        inventaireModal.style.display = 'flex';
    } else {
        inventaireModal.style.display = 'none';
    }
}

inventaireButton.addEventListener('click', () => {
    inventaireModalIsOpen = true;
    toggleInventaireModal();
});

closeInventaireButton.addEventListener('click', () => {
    inventaireModalIsOpen = false;
    toggleInventaireModal();
});

export let inventaire = {
    items: [], // Liste des objets dans l'inventaire
    maxItems: 10, // Capacité maximale de l'inventaire
};

