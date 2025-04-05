import updateScore from './updateScore.js';
import { updateDisplays } from './monnais/monnaie.js';
import { enduranceUse, getCurrentEndurance } from './competance/endurance.js';
import { competenceStats } from './competance/competance.js';

// Définir ou importer calculateForce
function calculateForce(baseValue = 1) {
    const forceBoost = competenceStats.forceBoost || 0;
    const forceMalus = competenceStats.forceMalus || 0;
    return baseValue * (1 + (forceBoost - forceMalus) / 100);
}

const clickerButton = document.getElementById('clicker');

clickerButton.addEventListener('click', () => {
    const enduranceCost = parseFloat(localStorage.getItem('enduranceCostPerClick')) || 1; // Récupère la valeur depuis localStorage
    console.log("enduranceCostPerClick : " + enduranceCost.toFixed(2));

    if (getCurrentEndurance() >= enduranceCost) {
        updateScore(calculateForce(competenceStats.cuivreTauxPerClick));
        updateDisplays();
        enduranceUse(enduranceCost); // Utilise la valeur récupérée
    } else {
        console.log("Pas assez d'endurance pour cliquer !");
    }
});

// Désactive le bouton si l'endurance est insuffisante
setInterval(() => {
    const force = calculateForce();
    if (getCurrentEndurance() < force) {
        clickerButton.disabled = true;
    } else {
        clickerButton.disabled = false;
    }
}, 100);