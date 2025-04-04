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
    forceLvl: 0,
    enduranceLvl: 0,
    bouclierLvl: 0,
  
    forceCost: 10,
    enduranceCost: 10, 
    bouclierCost: 10,
  
    forceBoost: 1,
    enduranceBoost: 1,
    bouclierBoost: 1,
  
    forceMalus: 0,
    enduranceMalus: 0,
    bouclierMalus: 0,
};

