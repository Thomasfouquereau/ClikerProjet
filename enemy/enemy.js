// cree des ennemis (ex: goblin, troll, dragon)
import { createHealthBar } from './enemyLife.js';

export let enemyTypes = [
    { name: 'Goblin', life: 10, damage: 2, speed: 1 },
    { name: 'Orc', life: 20, damage: 4, speed: 1.5 },
    { name: 'Troll', life: 30, damage: 6, speed: 1.2 },
    { name: 'Dragon', life: 50, damage: 10, speed: 0.8 },
    { name: 'Demon', life: 40, damage: 8, speed: 0.9 },
    { name: 'Golem', life: 60, damage: 12, speed: 0.7 },
];

// cree un ennemi aleatoire

export function createEnemy() {
    const randomIndex = Math.floor(Math.random() * enemyTypes.length);
    const enemyType = enemyTypes[randomIndex];

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
    enemyImage.alt = enemyType.name; // Texte alternatif pour l'image
    enemyImage.classList.add('enemy-image'); // Classe CSS pour styliser l'image
    enemyElement.appendChild(enemyImage);

    // Ajoute le texte de l'ennemi
    const enemyText = document.createElement('p');
    enemyText.textContent = `${enemyType.name}`;
    enemyElement.appendChild(enemyText);

    // Ajoute l'élément de l'ennemi au bouton
    clickerButton.appendChild(enemyElement);

    const enemy = {
        type: enemyType,
        element: enemyElement,
        health: enemyType.life,
        damage: enemyType.damage,
        speed: enemyType.speed,
    };

    createHealthBar(enemy); // Appel de la fonction pour créer la barre de vie

    return enemy; // Retourne l'ennemi créé
}