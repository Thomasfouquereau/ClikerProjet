import updateScore from './updateScore.js';
import { updateDisplays } from './monnais/monnaie.js'; // Importez la fonction updateDisplays
import { enduranceUse, getCurrentEndurance } from './competance/endurance.js'; // Importez une fonction pour récupérer l'endurance actuelle
import { competenceStats } from './competance/competance.js';

const clickerButton = document.getElementById('clicker');

function calculateForce() {
    return Math.max(1, competenceStats.cuivreTauxPerClick * (1 + (competenceStats.forceBoost - competenceStats.forceMalus) / 100));
}

clickerButton.addEventListener('click', () => {
    const force = calculateForce(); // Recalcule la force dynamiquement

    // Vérifie si l'endurance actuelle est suffisante
    if (getCurrentEndurance() >= force) {
        updateScore(force); // Met à jour le score
        updateDisplays(); // Met à jour la monnaie
        enduranceUse(force); // Utilise l'endurance en fonction de la force
    } else {
        console.log("Pas assez d'endurance pour cliquer !");
    }
});

// Désactive le bouton si l'endurance est insuffisante
setInterval(() => {
    const force = calculateForce(); // Recalcule la force dynamiquement
    if (getCurrentEndurance() < force) {
        clickerButton.disabled = true;
    } else {
        clickerButton.disabled = false;
    }
}, 100);