//cree un systeme de vie pour les ennemis et a chaque fois qu'un ennemi est cree

//cree une barre de vie pour chaque ennemi
export function createHealthBar(enemy) {
    const healthBarContainer = document.createElement('div');
    healthBarContainer.classList.add('health-bar-container');

    const healthBar = document.createElement('div');
    healthBar.classList.add('health-bar');
    healthBar.style.width = '100%'; // La largeur initiale est de 100%
    healthBarContainer.appendChild(healthBar);

    // Ajoute un élément de texte pour afficher les HP
    const healthText = document.createElement('span');
    healthText.classList.add('health-text');
    healthText.textContent = `${enemy.health} / ${enemy.type.life}`; // Texte initial
    healthBar.appendChild(healthText);

    enemy.element.appendChild(healthBarContainer);
    enemy.healthBar = healthBar; // Stocke une référence à la barre de vie dans l'objet ennemi
    enemy.healthText = healthText; // Stocke une référence au texte des HP
}

// Met à jour la barre de vie d'un ennemi
export function updateHealthBar(enemy) {
    if (enemy.healthBar) {
        const healthPercentage = Math.max((enemy.health / enemy.type.life) * 100, 0);
        enemy.healthBar.style.width = `${healthPercentage}%`;

        // Met à jour le texte des HP
        if (enemy.healthText) {
            enemy.healthText.textContent = `${Math.max(enemy.health, 0)} / ${enemy.type.life}`;
        }
    } else {
        console.error("La barre de vie de l'ennemi est introuvable.");
    }
}