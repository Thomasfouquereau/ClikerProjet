// cree des ennemis (ex: goblin, troll, dragon)
import { createHealthBar } from './enemyLife.js';

export let enemyTypes = [
    { name: 'Goblin', life: 10, damage: 2, speed: 1,chanceDeSpawn: 0.5, copperGain: 20 },
    { name: 'Orc', life: 20, damage: 4, speed: 1.5, chanceDeSpawn: 0.3, copperGain: 30 },
    { name: 'Troll', life: 30, damage: 6, speed: 1.2, chanceDeSpawn: 0.2, copperGain: 45 },
    { name: 'Dragon', life: 50, damage: 10, speed: 0.8, chanceDeSpawn: 0.1, copperGain: 100 }, 
    { name: 'Demon', life: 40, damage: 8, speed: 0.9, chanceDeSpawn: 0.15, copperGain: 75 }, 
    { name: 'Golem', life: 60, damage: 12, speed: 0.7, chanceDeSpawn: 0.05, copperGain: 150 }, 
];

// cree un ennemi aleatoire
export function createEnemy() {
    // Filtre les ennemis en fonction de leur chance de spawn
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

    const enemyElement = document.createElement('div'); // Crée l'élément de l'ennemi
    enemyElement.classList.add('enemy');

    // Ajoute une image pour l'ennemi
    const enemyImage = document.createElement('img');
    enemyImage.src = '../addon/enemy.png'; // Chemin vers l'image
    enemyImage.alt = selectedEnemy.name; // Texte alternatif pour l'image
    enemyImage.classList.add('enemy-image'); // Classe CSS pour styliser l'image
    enemyElement.appendChild(enemyImage);

    // Ajoute le texte de l'ennemi
    const enemyText = document.createElement('p');
    enemyText.textContent = `${selectedEnemy.name}`;
    enemyElement.appendChild(enemyText);

    // Ajoute l'élément de l'ennemi au bouton
    clickerButton.appendChild(enemyElement);

    const enemy = {
        type: selectedEnemy,
        element: enemyElement,
        health: selectedEnemy.life,
        damage: selectedEnemy.damage,
        speed: selectedEnemy.speed,
        copperGain: selectedEnemy.copperGain, // Ajoute la récompense en cuivre
    };

    createHealthBar(enemy); // Appel de la fonction pour créer la barre de vie

    return enemy; // Retourne l'ennemi créé
}