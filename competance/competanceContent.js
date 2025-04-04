import { convertCurrencyAll } from '../monnais/convertCurrency.js';// Importer la fonction convertCurrencyAll
import { competenceStats } from './competance.js';// Importer les statistiques de compétence
import { buyCompetance } from './buyCompetance.js';// Importer la fonction buyCompetance


const competanceContentModal = document.getElementById('competanceContent');

const competanceContent = document.createElement('div');//cree le conteneur de la modale de competance
competanceContent.classList.add('competanceContent');
competanceContentModal.appendChild(competanceContent);// Ajouté à competanceContentModal

const competanceContentTitle = document.createElement('h2');//cree le titre de la modale de competance
competanceContentTitle.textContent = 'Compétences';
competanceContent.appendChild(competanceContentTitle);// Ajouté à competanceContent

const competanceItemContainer = document.createElement('div');//cree le conteneur de la competence
competanceItemContainer.classList.add('competanceItemContainer');
competanceContent.appendChild(competanceItemContainer); // Ajouté à competanceContent

const competanceArray = [
    {
        title: 'force',
        description: 'ajoute 1 point de force',
    },
    {
        title: 'endurance',
        description: 'ajoute 1 point d\'endurance',
    },
    {
        title: 'bouclier',
        description: 'ajoute 1 point de bouclier',
    },
];

function createCompetanceItem(title, description) {
    const competanceItem = document.createElement('button'); // Crée le bouton de la compétence
    competanceItem.classList.add('competanceItem');
    competanceItem.setAttribute('id', title); // Définit l'ID du bouton
    competanceItemContainer.appendChild(competanceItem); // Ajouté à competanceItemContainer

    const competanceItemTitle = document.createElement('h3'); // Crée le titre de la compétence
    competanceItemTitle.textContent = title;
    competanceItem.appendChild(competanceItemTitle); // Ajouté à competanceItem

    const competanceItemDescription = document.createElement('p'); // Crée la description de la compétence
    competanceItemDescription.textContent = description;
    competanceItemDescription.classList.add('hidden'); // Masque la description par défaut
    competanceItem.appendChild(competanceItemDescription); // Ajouté à competanceItem

    const competanceItemCost = document.createElement('p'); // Crée le coût de la compétence
    // Ajoute un id pour mettre à jour ce champ par la suite
    competanceItemCost.setAttribute('id', 'competanceCost-' + title);
    competanceItemCost.textContent = 'Coût: ' + competenceStats[title + 'Cost'];
    competanceItem.appendChild(competanceItemCost); // Ajouté à competanceItem

    // Ajoute les événements pour afficher/masquer la description
    competanceItem.addEventListener('click', () => {
        buyCompetance(title);
    });
    competanceItem.addEventListener('mouseover', () => {
        competanceItemDescription.classList.remove('hidden');
    });
    competanceItem.addEventListener('mouseout', () => {
        competanceItemDescription.classList.add('hidden');
    });
}

// Boucle pour afficher chaque compétence
competanceArray.forEach(competance => {
    createCompetanceItem(competance.title, competance.description);
});



//cree des competence passive (ex: chance de critique, chance d anuller les degats, chance de regen d endurance)