import updateScore from './updateScore.js';
import { updateDisplays } from './monnais/monnaie.js'; // Importez la fonction updateDisplays
import { enduranceUse, getCurrentEndurance } from './competance/endurance.js'; // Importez une fonction pour récupérer l'endurance actuelle
import { competenceStats } from './competance/competance.js';

const clickerButton = document.getElementById('clicker');
const force = Math.max(1, 1 * (1 + (competenceStats.forceBoost - competenceStats.forceMalus) / 100));

clickerButton.addEventListener('click', () => {
    // Vérifie si l'endurance actuelle est suffisante
    if (getCurrentEndurance() > force) {
        updateScore(force); // Met à jour le score
        updateDisplays(); // Met à jour la monnaie
        enduranceUse(competenceStats.enduranceMalus); // Utilise l'endurance
    } else {
        console.log("Pas assez d'endurance pour cliquer !");
    }
});

// Désactive le bouton si l'endurance est insuffisante
setInterval(() => {
    if (getCurrentEndurance() <= force) {
        clickerButton.disabled = true;
    } else {
        clickerButton.disabled = false;
    }
}, 100);