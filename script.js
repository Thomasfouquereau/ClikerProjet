let score = 0;

let autoClickerEnabled = false;
let autoClickerLvl = 0;
let autoClickerCost = 10;
let autoClickerInterval = 5000;
let autoClickerScore = 1;

let clickPowerCost = 10;
let clickPower = 1;
let clickPowerLvl = 0;

let DoubleClickPower = false; // Variable pour le double clic

const scoreDisplay = document.getElementById('score');
const clickerButton = document.getElementById('clicker');
const upgrades = document.getElementById('upgrades');
const autoClickerButton = document.getElementById('autoClicker');
const clickPowerButton = document.getElementById('clickPower');
const doubleClickButton = document.getElementById('doubleClick'); // Bouton pour le double clic

// Fonction pour mettre à jour l'affichage du score
function updateScore() {
    scoreDisplay.textContent = score;
}

// Fonction pour mettre à jour l'état des boutons
function updateDisable() {
    // Vérifier pour l'auto clicker
    autoClickerButton.disabled = score < autoClickerCost;
    
    // Vérifier pour la puissance de clic
    clickPowerButton.disabled = score < clickPowerCost;
    
    // Vérifier pour le double clic (seulement si pas déjà acheté)
    if (!DoubleClickPower) {
        doubleClickButton.disabled = score < 10000;
    }
}

// Appeler updateDisable initialement
updateDisable();

// Mettre à jour l'état des boutons régulièrement
setInterval(updateDisable, 100);

// Gestion du clic sur le bouton principal
clickerButton.addEventListener('click', () => {
    if (DoubleClickPower === true) { // Vérifie si le double clic est activé
        score += clickPower * 2; // Double le score si activé
    }
    score += clickPower; // Ajoute le pouvoir de clic au score
    updateScore();
    if (score >= 10 && !autoClickerEnabled) {
        autoClickerButton.disabled = false;
        clickPowerButton.disabled = false;
    } 
    if (score >= 10000) {
        doubleClickButton.disabled = false;
    }
});

// Gestion de l'achat de l'auto-clicker
autoClickerButton.innerHTML = `Auto Clicker (${autoClickerCost})`;

function buyAutoClicker() {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickerLvl++;
        autoClickerCost *= 2;
        autoClickerInterval *= 0.95; // Réduit l'intervalle de temps de 5%
        
        // Assurez-vous que l'intervalle ne descend pas en dessous de 500 ms
        if (autoClickerInterval < 500) {
            autoClickerInterval = 500;
        }

        autoClickerScore *= 2;
        updateScore();

        autoClickerButton.innerHTML = `Auto Clicker (${autoClickerCost})`;

        if (!autoClickerEnabled) {
            autoClickerEnabled = true;
        }
        startAutoClicker(); // Redémarre l'auto-clicker avec le nouvel intervalle
    }
}

// Fonction pour démarrer l'auto-clicker
let autoClickerIntervalId = null; // Stocke l'ID de l'intervalle

function startAutoClicker() {
    if (autoClickerIntervalId !== null) {
        clearInterval(autoClickerIntervalId); // Arrête l'ancien intervalle
    }
    autoClickerIntervalId = setInterval(() => {
        score += autoClickerScore;
        updateScore();
    }, autoClickerInterval);
}

// Gestion du clic sur le bouton auto-clicker
autoClickerButton.addEventListener('click', () => {
    buyAutoClicker();
});


// affiche les stats de l'auto-clicker au hover sur le bouton
autoClickerButton.addEventListener('mouseover', () => {
    autoClickerButton.innerHTML = `Auto Clicker (${autoClickerCost})<br>Level: ${autoClickerLvl}<br>Interval: ${autoClickerInterval / 1000}s<br>Score ajouter: ${autoClickerScore}`;
});
autoClickerButton.addEventListener('mouseout', () => {
    autoClickerButton.innerHTML = `Auto Clicker (${autoClickerCost})`;
});

//Ajoute un bouton pour que le clique soit plus fort

clickPowerButton.innerHTML = 'Click Power (10)';

clickPowerButton.addEventListener('click', () => {
    if (score >= clickPowerCost) {
        score -= clickPowerCost;
        clickPowerLvl++;
        clickPowerCost *= 2; // Double le coût pour le prochain achat
        clickPower *= 1.5; // Augmente le pouvoir de clic de 50%
        updateScore();
        clickPowerButton.innerHTML = `Click Power (${clickPowerCost})`;
    }
});

// Affiche les stats de la puissance de clic au hover sur le bouton
clickPowerButton.addEventListener('mouseover', () => {
    clickPowerButton.innerHTML = `Click Power (${clickPowerCost})<br>Level: ${clickPowerLvl}<br>Click Power: ${DoubleClickPower === true ? clickPower * 2 : clickPower }`;
});
clickPowerButton.addEventListener('mouseout', () => {
    clickPowerButton.innerHTML = `Click Power (${clickPowerCost})`;
});

// Ajoute un bouton pour le double clic
doubleClickButton.innerHTML = 'Double Click (10000)';

doubleClickButton.addEventListener('click', () => {
    if (score >= 10000) {
        score -= 10000;
        DoubleClickPower = true; // Active le double clic
        updateScore();
        doubleClickButton.innerHTML = 'Double Click (Achat effectué)';
        doubleClickButton.disabled = true; // Désactive le bouton après l'achat
    }
});


// monnaie (piece de bronze, argent, or, platine) 1 click 1 bronze, 10000 bronze = 1 argent, 10000 argent = 1 or, 10000 or = 1 platine
// stat luck, force, bouclier,  vitesse de regeneration du bouclier, force du bouclier, AFK, craft (system de stuff), systeme de competance
// system de fatigue, systeme de cooldown, systeme de level up, systeme de prestige, systeme de skill tree, systeme de quete,