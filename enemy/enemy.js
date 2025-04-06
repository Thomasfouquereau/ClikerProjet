// cree des ennemis (ex: goblin, troll, dragon)
import { createHealthBar } from './enemyLife.js';

export let enemyTypes = [
    { name: 'Goblin', life: 10, damage: 2, speed: 1, chanceDeSpawn: 0.5, copperGain: 20 },
    { name: 'Orc', life: 20, damage: 4, speed: 1.5, chanceDeSpawn: 0.3, copperGain: 30 },
    { name: 'Troll', life: 30, damage: 6, speed: 1.2, chanceDeSpawn: 0.2, copperGain: 45 },
    { name: 'Dragon', life: 50, damage: 10, speed: 0.8, chanceDeSpawn: 0.1, copperGain: 100 },
    { name: 'Demon', life: 40, damage: 8, speed: 0.9, chanceDeSpawn: 0.15, copperGain: 75 },
    { name: 'Golem', life: 60, damage: 12, speed: 0.7, chanceDeSpawn: 0.05, copperGain: 150 },
];

// cree un ennemi aleatoire
export function createEnemy() {
    const totalChance = enemyTypes.reduce((sum, enemy) => sum + enemy.chanceDeSpawn, 0);
    const randomChance = Math.random() * totalChance;

    let cumulativeChance = 0;
    let selectedEnemy = null;

    for (const enemy of enemyTypes) {
        cumulativeChance += enemy.chanceDeSpawn;
        if (randomChance <= cumulativeChance) {
            selectedEnemy = enemy;
            break;
        }
    }

    if (!selectedEnemy) {
        console.error("Aucun ennemi sélectionné. Vérifiez les chances de spawn.");
        return null;
    }

    const clickerButton = document.getElementById('clicker');
    if (!clickerButton) {
        console.error("L'élément avec l'ID 'clicker' est introuvable.");
        return null;
    }

    const enemyElement = document.createElement('div');
    enemyElement.classList.add('enemy');

    const enemyImage = document.createElement('img');
    if (selectedEnemy.name === 'Goblin') {
        enemyImage.src = '../addon/goblin.png'; // Image spécifique pour le Goblin
    } else if (selectedEnemy.name === 'Orc') {
        enemyImage.src = '../addon/enemy.png'; // Image générique pour les autres ennemis
    } else if (selectedEnemy.name === 'Troll') {
        enemyImage.src = '../addon/troll.png'; // Image spécifique pour le Troll
    } else if (selectedEnemy.name === 'Dragon') {
        enemyImage.src = '../addon/enemy.png'; // Image spécifique pour le Dragon
    } else if (selectedEnemy.name === 'Demon') {
        enemyImage.src = '../addon/enemy.png'; // Image spécifique pour le Demon
    } else if (selectedEnemy.name === 'Golem') {
        enemyImage.src = '../addon/golem.png'; // Image spécifique pour le Golem
    }
    enemyImage.alt = selectedEnemy.name;
    enemyImage.classList.add('enemy-image');
    enemyElement.appendChild(enemyImage);

    const enemyText = document.createElement('p');
    enemyText.textContent = `${selectedEnemy.name}`;
    enemyElement.appendChild(enemyText);

    clickerButton.appendChild(enemyElement);

    const enemy = {
        type: selectedEnemy,
        element: enemyElement,
        health: selectedEnemy.life,
        damage: selectedEnemy.damage,
        speed: selectedEnemy.speed,
        copperGain: selectedEnemy.copperGain,
    };

    createHealthBar(enemy); // Crée la barre de vie pour l'ennemi

    return enemy; // Retourne l'ennemi créé
}