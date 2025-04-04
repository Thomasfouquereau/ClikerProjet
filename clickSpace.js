import updateScore from './updateScore.js';
import { updateDisplays } from './monnais/monnaie.js'; // Importez la fonction updateDisplays

const clickerButton = document.getElementById('clicker');

clickerButton.addEventListener('click', () => {
    updateScore(); // Met à jour le score
    updateDisplays(); // Met à jour la monnaie
});