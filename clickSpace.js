import updateScore from './updateScore.js';
import { updateDisplays } from './monnais/monnaie.js';
import { enduranceUse, getCurrentEndurance } from './competance/endurance.js';
import { competenceStats, calculateDamagePerClick } from './competance/competance.js';
import { createEnemy } from './enemy/enemy.js';
import { updateHealthBar } from './enemy/enemyLife.js';
import { addCopper } from './monnais/monnaie.js'; // Importer la fonction addCopper

// Définir ou importer calculateForce
function calculateForce(baseValue = 1) {
    const forceBoost = competenceStats.forceBoost || 0;
    const forceMalus = competenceStats.forceMalus || 0;
    return baseValue * (1 + (forceBoost - forceMalus) / 100);
}

const clickerButton = document.getElementById('clicker');

// Variable pour stocker l'ennemi actuel
let currentEnemy = null;

// Fonction pour gérer les dégâts infligés à l'ennemi
function attackEnemy() {
    if (!currentEnemy) return;

    const enduranceCost = parseFloat(localStorage.getItem('enduranceCostPerClick')) || 1;

    if (getCurrentEndurance() >= enduranceCost) {
        const damage = calculateDamagePerClick();
        currentEnemy.health -= damage; // Réduit la vie de l'ennemi
        console.log(`Infligé ${damage.toFixed(2)} dégâts à ${currentEnemy.type.name}. Vie restante : ${currentEnemy.health.toFixed(2)}`);

        // Met à jour la barre de vie de l'ennemi
        updateHealthBar(currentEnemy);

        // Vérifie si l'ennemi est vaincu
        if (currentEnemy.health <= 0) {
            console.log(`${currentEnemy.type.name} a été vaincu !`);
            currentEnemy.element.remove(); // Supprime l'élément HTML de l'ennemi

            // Ajoute la récompense en cuivre
            const copperReward = currentEnemy.type.copperGain;
            console.log(`Récompense : ${copperReward} cuivre`);
            addCopper(copperReward);
            updateDisplays();

            spawnNewEnemy(); // Fait apparaître un nouvel ennemi
        }

        enduranceUse(enduranceCost); // Utilise l'endurance
        updateDisplays();
    } else {
        console.log("Pas assez d'endurance pour attaquer !");
    }
}

// Fonction pour faire apparaître un nouvel ennemi
function spawnNewEnemy() {
    currentEnemy = createEnemy(); // Crée un nouvel ennemi
    console.log(`Un nouvel ennemi est apparu : ${currentEnemy.type.name} avec ${currentEnemy.health} HP.`);
}

// Fonction pour afficher les dégâts sur le curseur
function showDamageOnCursor(damage, event) {
    const damageElement = document.createElement('div');
    damageElement.textContent = `-${damage.toFixed(2)}`;
    damageElement.style.position = 'absolute';
    damageElement.style.color = 'red';
    damageElement.style.fontSize = '16px';
    damageElement.style.fontWeight = 'bold';
    damageElement.style.pointerEvents = 'none'; // Empêche les interactions avec l'élément
    damageElement.style.left = `${event.clientX}px`;
    damageElement.style.top = `${event.clientY}px`;
    damageElement.style.zIndex = '1000';

    document.body.appendChild(damageElement);

    // Supprime l'élément après 1 seconde
    setTimeout(() => {
        damageElement.remove();
    }, 1000);
}

// Ajoute un événement de clic pour attaquer l'ennemi
clickerButton.addEventListener('click', (event) => {
    attackEnemy();

    const enduranceCost = parseFloat(localStorage.getItem('enduranceCostPerClick')) || 1; // Récupère la valeur depuis localStorage
    if (getCurrentEndurance() >= enduranceCost) {
        const damage = calculateDamagePerClick();
        showDamageOnCursor(damage, event); // Affiche les dégâts sur le curseur
        updateScore(calculateForce(competenceStats.cuivreTauxPerClick));
        updateDisplays();
    } else {
        console.log("Pas assez d'endurance pour cliquer !");
    }
});

// Désactive le bouton si l'endurance est insuffisante
setInterval(() => {
    const enduranceCost = parseFloat(localStorage.getItem('enduranceCostPerClick')) || 1;
    if (getCurrentEndurance() < enduranceCost) {
        clickerButton.disabled = true;
    } else {
        clickerButton.disabled = false;
    }
}, 100);

// Fait apparaître le premier ennemi au chargement
spawnNewEnemy();