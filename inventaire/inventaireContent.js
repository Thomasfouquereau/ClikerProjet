import { inventaire } from './inventaire.js';

const inventaireContent = document.getElementById('inventaireContent');
const inventaireContentTitle = document.createElement('h2'); // Crée le titre de la modale d'inventaire
inventaireContentTitle.textContent = 'Inventaire';
inventaireContent.appendChild(inventaireContentTitle); // Ajouté à inventaireContent

const inventaireItemContainer = document.createElement('div'); // Crée le conteneur des items
inventaireItemContainer.classList.add('inventaireItemContainer');
inventaireContent.appendChild(inventaireItemContainer); // Ajouté à inventaireContent

// Initialise les placeholders dans l'inventaire
function initializePlaceholders() {
    for (let i = 0; i < inventaire.maxItems; i++) {
        const placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');
        placeholder.setAttribute('id', `placeholder-${i}`);
        inventaireItemContainer.appendChild(placeholder);
    }
}

// Fonction pour ajouter un item dans l'inventaire
export function addItemToInventaire(title, description, stats, rarete) {
    const emptySlot = document.querySelector('.placeholder'); // Trouve le premier emplacement vide
    if (emptySlot) {
        // Remplace le placeholder par l'item
        emptySlot.classList.remove('placeholder');
        emptySlot.classList.add('inventaireItem');
        emptySlot.classList.add(`rarete-${rarete}`); // Ajoute une classe en fonction de la rareté
        emptySlot.setAttribute('id', title);
        emptySlot.innerHTML = ''; // Vide le contenu du placeholder

        const inventaireItemTitle = document.createElement('h3'); // Crée le titre de l'item
        inventaireItemTitle.textContent = title;
        emptySlot.appendChild(inventaireItemTitle);

        const inventaireItemDescription = document.createElement('p'); // Crée la description de l'item
        inventaireItemDescription.textContent = description;
        emptySlot.appendChild(inventaireItemDescription);

        const inventaireItemStats = document.createElement('p'); // Crée les stats de l'item
        inventaireItemStats.textContent = `Stats: ${stats}`;
        emptySlot.appendChild(inventaireItemStats);

        // Ajoute un événement pour ouvrir le menu contextuel
        emptySlot.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche la propagation pour éviter de fermer le menu immédiatement
            openContextMenu(emptySlot, title, description, stats);
        });

        // Ajoute l'item à la liste d'items
        inventaire.items.push({ title, description, stats, rarete });
    } else {
        // Affiche un message d'erreur si l'inventaire est plein
        console.error('Inventaire plein ! Impossible d’ajouter un nouvel item.');
        alert('Inventaire plein ! Vous ne pouvez pas ajouter plus d’items.');
    }
}

// Fonction pour ouvrir le menu contextuel
function openContextMenu(itemElement, title, description, stats) {
    // Ferme tout menu contextuel existant
    closeContextMenu();

    // Crée le menu contextuel
    const contextMenu = document.createElement('div');
    contextMenu.classList.add('contextMenu');
    contextMenu.style.position = 'absolute';

    // Ajuste la position du menu contextuel pour qu'il soit juste en dessous de l'item
    const rect = itemElement.getBoundingClientRect();
    contextMenu.style.top = `${rect.bottom + window.scrollY}px`; // Position en dessous de l'élément
    contextMenu.style.left = `${rect.left + window.scrollX}px`; // Aligné à gauche de l'élément

    // Ajoute les options au menu
    const equipOption = document.createElement('button');
    equipOption.textContent = 'Équiper';
    equipOption.addEventListener('click', () => {
        console.log(`Équipé : ${title}`);
        closeContextMenu();
    });

    const sellOption = document.createElement('button');
    sellOption.textContent = 'Vendre';
    sellOption.addEventListener('click', () => {
        console.log(`Vendu : ${title}`);
        removeItemFromInventaire(title);
        closeContextMenu();
    });

    const descriptionOption = document.createElement('button');
    descriptionOption.textContent = 'Description';
    descriptionOption.addEventListener('click', () => {
        alert(`Description : ${description}\nStats : ${stats}`);
        closeContextMenu();
    });

    contextMenu.appendChild(equipOption);
    contextMenu.appendChild(sellOption);
    contextMenu.appendChild(descriptionOption);

    // Ajoute le menu contextuel au DOM
    document.body.appendChild(contextMenu);

    // Ferme le menu si on clique ailleurs
    document.addEventListener('click', closeContextMenu, { once: true });
}

// Fonction pour fermer le menu contextuel
function closeContextMenu() {
    const existingMenu = document.querySelector('.contextMenu');
    if (existingMenu) {
        existingMenu.remove();
    }
}

// Fonction pour retirer un item de l'inventaire
export function removeItemFromInventaire(title) {
    // Trouve l'index de l'item à retirer
    const itemIndex = inventaire.items.findIndex(item => item.title === title);

    if (itemIndex !== -1) {
        // Retire l'item de la liste
        inventaire.items.splice(itemIndex, 1);

        // Supprime l'élément HTML correspondant
        const itemElement = document.getElementById(title);
        if (itemElement) {
            // Supprime toutes les classes de rareté
            itemElement.classList.remove('inventaireItem', 'rarete-commune', 'rarete-rare', 'rarete-epique', 'rarete-legendaire');
            itemElement.classList.add('placeholder'); // Ajoute la classe placeholder
            itemElement.setAttribute('id', `placeholder-${itemIndex}`);
            itemElement.innerHTML = ''; // Vide le contenu
        }

        console.log(`L'item "${title}" a été retiré de l'inventaire.`);
    } else {
        console.error(`L'item "${title}" n'existe pas dans l'inventaire.`);
        alert(`L'item "${title}" n'existe pas dans l'inventaire.`);
    }
}
// Initialise les placeholders au chargement
initializePlaceholders();

addItemToInventaire('Épée', 'Une épée tranchante', '+10 forceBoost', 'rare');
addItemToInventaire('Bouclier', 'Un bouclier robuste', '+15 bouclierMax', 'epique');
addItemToInventaire('Amulette', 'Une amulette magique', '+20 forceBoost', 'legendaire');