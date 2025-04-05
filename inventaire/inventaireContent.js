import { inventaire } from './inventaire.js';

const inventaireContent = document.getElementById('inventaireContent');
const inventaireContentTitle = document.createElement('h2'); // Crée le titre de la modale d'inventaire
inventaireContentTitle.textContent = 'Inventaire';
inventaireContent.appendChild(inventaireContentTitle); // Ajouté à inventaireContent

const inventaireItemContainer = document.createElement('div'); // Crée le conteneur des items
inventaireItemContainer.classList.add('inventaireItemContainer');
inventaireContent.appendChild(inventaireItemContainer); // Ajouté à inventaireContent

function createInventaireItem(title, description, stats) {
    const inventaireItem = document.createElement('button'); // Crée le bouton de l'inventaire
    inventaireItem.classList.add('inventaireItem');
    inventaireItem.setAttribute('id', title); // Définit l'ID du bouton
    inventaireItemContainer.appendChild(inventaireItem); // Ajouté à inventaireItemContainer

    const inventaireItemTitle = document.createElement('h3'); // Crée le titre de l'item
    inventaireItemTitle.textContent = title;
    inventaireItem.appendChild(inventaireItemTitle); // Ajouté à inventaireItem

    const inventaireItemDescription = document.createElement('p'); // Crée la description de l'item
    inventaireItemDescription.textContent = description;
    inventaireItemDescription.classList.add('hidden'); // Masque la description par défaut
    inventaireItem.appendChild(inventaireItemDescription); // Ajouté à inventaireItem

    const inventaireItemStats = document.createElement('p'); // Crée les stats de l'item
    inventaireItemStats.setAttribute('id', 'inventaireStats-' + title);
    inventaireItemStats.textContent = `Stats: ${stats}`;
    inventaireItem.appendChild(inventaireItemStats); // Ajouté à inventaireItem

    return inventaireItem;
}

// Fonction pour ajouter un item dans l'inventaire
export function addItemToInventaire(title, description, stats) {
    if (inventaire.items.length < inventaire.maxItems) {
        // Ajoute l'item à la liste d'items
        inventaire.items.push({ title, description, stats });

        // Crée et affiche l'item dans l'inventaire
        createInventaireItem(title, description, stats);
    } else {
        // Affiche un message d'erreur si l'inventaire est plein
        console.error('Inventaire plein ! Impossible d’ajouter un nouvel item.');
        alert('Inventaire plein ! Vous ne pouvez pas ajouter plus d’items.');
    }
}