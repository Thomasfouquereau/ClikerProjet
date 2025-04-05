// import { enduranceUse } from "./endurance";

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

export const competenceStats = {
    forceLvl: localStorage.getItem('forceLvl') || 1,
    enduranceLvl: localStorage.getItem('enduranceLvl') || 1,
    bouclierLvl: localStorage.getItem('bouclierLvl') || 1,

    forceCost: localStorage.getItem('forceCost') || 10,
    enduranceCost: localStorage.getItem('enduranceCost') || 10,
    bouclierCost: localStorage.getItem('bouclierCost') || 10,

    forceBoost: parseFloat(localStorage.getItem('forceBoost')) || 1,
    enduranceBoost: parseFloat(localStorage.getItem('enduranceBoost')) || 1,
    bouclierBoost: localStorage.getItem('bouclierBoost') || 1,

    forceMalus: localStorage.getItem('forceMalus') || 1,
    enduranceMalus: localStorage.getItem('enduranceMalus') || 1,
    bouclierMalus: localStorage.getItem('bouclierMalus') || 1,

    enduranceMax: localStorage.getItem('enduranceMax') || 10,
    bouclierMax: localStorage.getItem('bouclierMax') || 5,

    enduranceCostPerClick: localStorage.getItem('enduranceCostPerClick') || 1,
    enduranceRegenerationTimer: localStorage.getItem('enduranceRegenerationTimer') || 4000, // Temps de régénération de l'endurance

    cuivreTauxPerClick: parseFloat(localStorage.getItem('cuivreTauxPerClick')) || 1,
};


