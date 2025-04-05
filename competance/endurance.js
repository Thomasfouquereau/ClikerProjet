import { competenceStats } from './competance.js'; // Importation des statistiques de compétence

let endurance = Number(competenceStats.enduranceMax); // Initialise l'endurance à la valeur max
let timer = 0; // Timer pour la régénération

export function enduranceUse(enduranceCost) {
    if (endurance >= enduranceCost) {
        endurance -= enduranceCost;
    } else {
        console.log("Pas assez d'endurance !");
    }
    updateEnduranceDisplay();
    enduranceBarDisplay();
}

updateEnduranceDisplay();
enduranceBarDisplay();

export function enduranceBarDisplay() {
    const enduranceBar = document.getElementById('enduranceBar');
    // On utilise la valeur dynamique directement depuis competenceStats
    enduranceBar.style.width = (endurance / Number(competenceStats.enduranceMax)) * 100 + '%';
}

export function updateEnduranceDisplay() {
    const enduranceDisplay = document.getElementById('enduranceDisplay');
    // Affiche endurance actuel et le maximum mis à jour
    enduranceDisplay.textContent = 'Endurance: ' + Number(endurance).toFixed(2)
        + ' / ' + competenceStats.enduranceMax;
}

// Ajoutez un élément pour afficher le timer
const enduranceTimerDisplay = document.getElementById('enduranceTimer');

const enduranceRegeneration = Math.max(5000 * (1 - competenceStats.enduranceBoost / 100), 200); // Temps de régénération avec un minimum de 0,2s

setInterval(() => {
    if (endurance < Number(competenceStats.enduranceMax)) {
        timer -= 100; // Réduit le timer de 100 ms
        if (timer <= 0) {
            endurance += 1;
            timer = enduranceRegeneration; // Réinitialise le timer
        }
        enduranceBarDisplay();
        updateEnduranceDisplay();
    } else {
        timer = enduranceRegeneration; // Réinitialise le timer si l'endurance est pleine
    }

    // Met à jour l'affichage du timer à la milliseconde près
    if (enduranceTimerDisplay) {
        enduranceTimerDisplay.textContent = `Prochaine régénération dans : ${(timer / 1000).toFixed(1)}s`;
    }
}, 100); // Met à jour toutes les 100 ms

export function getCurrentEndurance() {
    return endurance; // Retourne la valeur actuelle de l'endurance
}
