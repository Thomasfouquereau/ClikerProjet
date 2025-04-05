import { addCopper, updateDisplays } from './monnais/monnaie.js';

// Fonction pour générer un nombre aléatoire entre min et max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour créer un carré à une position aléatoire
function createRandomSquare() {
    // Supprime le carré précédent s'il existe
    const existingSquare = document.getElementById('random-square');
    if (existingSquare) {
        existingSquare.remove();
    }

    // Crée un nouvel élément carré
    const square = document.createElement('div');
    square.id = 'random-square';
    square.style.position = 'absolute';
    square.style.width = '70px';
    square.style.height = '70px';
    square.style.backgroundColor = 'red';
    square.style.color = 'white'; // Couleur du texte
    square.style.display = 'flex';
    square.style.alignItems = 'center';
    square.style.justifyContent = 'center';
    square.style.fontSize = '14px';
    square.style.fontWeight = 'bold';
    square.style.cursor = 'pointer';

    // Position aléatoire
    const x = getRandomInt(0, window.innerWidth - 50);
    const y = getRandomInt(0, window.innerHeight - 50);
    square.style.left = `${x}px`;
    square.style.top = `${y}px`;

    // Ajoute un événement de clic
    square.addEventListener('click', () => {
        const reward = getRandomInt(1, 100);
        square.textContent = `+${reward} C`; // Affiche la récompense dans le carré
        addCopper(reward); // Ajoute le montant de copper
        updateDisplays();

        // Supprime le carré après 3 secondes
        setTimeout(() => {
            square.remove();
        }, 2000);
    });

    // Ajoute le carré au body
    document.body.appendChild(square);
}

// Appelle la fonction toutes les minutes
setInterval(createRandomSquare, 120000);

// Crée un carré immédiatement au démarrage
createRandomSquare();