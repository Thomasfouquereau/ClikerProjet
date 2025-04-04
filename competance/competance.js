const competanceBtn = document.getElementById('competance');
const competanceModal = document.getElementById('competanceModal');
const closeCompetanceBtn = document.getElementById('closeCompetanceModal');

let competanceModalIsOpen = false; // Utilisation de let pour permettre la modification

function toggleCompetanceModal() {
    if (competanceModalIsOpen === true) {
        competanceModal.style.display = 'flex';
    } else {
        competanceModal.style.display = 'none';
    }
}

competanceBtn.addEventListener('click', () => {
    competanceModalIsOpen = true;
    toggleCompetanceModal();
});

closeCompetanceBtn.addEventListener('click', () => {
    competanceModalIsOpen = false;
    toggleCompetanceModal();
});

//lvl de la compétence
let forceLvl = 0;
let enduranceLvl = 0;
let bouclierLvl = 0;

// Coût de la compétence
let forceCost = 10;
let enduranceCost = 10; 
let bouclierCost = 10;

// Puissance de la compétence
let forceBoost = 1;
let enduranceBoost = 1;
let bouclierBoost = 1;

//malus de la compétence
let forceMalus = 0;
let enduranceMalus = 0;
let bouclierMalus = 0;

