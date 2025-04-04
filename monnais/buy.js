import { updateDisplays } from './monnaie.js';

// Fonction utilitaire pour récupérer les valeurs de monnaie depuis le localStorage
function getMonnaie() {
    return {
        copper: parseInt(localStorage.getItem('copper')) || 0,
        silver: parseInt(localStorage.getItem('silver')) || 0,
        gold: parseInt(localStorage.getItem('gold')) || 0,
        platinum: parseInt(localStorage.getItem('platinum')) || 0,
    };
}

// Fonction pour reconvertir le total de copper en monnaies hiérarchisées
function convertTotalToCoins(total) {
    const newCopper = total % 10000;
    const newSilver = Math.floor(total / 10000) % 10000;
    const newGold = Math.floor(total / 100000000) % 10000;
    const newPlatinum = Math.floor(total / 100000000000);
    return { copper: newCopper, silver: newSilver, gold: newGold, platinum: newPlatinum };
}

export function buy(amount) {
    // Récupère les valeurs actuelles de monnaie
    const { copper, silver, gold, platinum } = getMonnaie();
    // Calcule le total de copper équivalent
    const totalCopper = copper + silver * 10000 + gold * 100000000 + platinum * 100000000000;
    
    // Vérifie si les fonds sont suffisants
    if (totalCopper >= amount) {
        const newTotal = totalCopper - amount;
        const result = convertTotalToCoins(newTotal);
        
        // Met à jour le localStorage avec les valeurs converties
        localStorage.setItem('copper', result.copper);
        localStorage.setItem('silver', result.silver);
        localStorage.setItem('gold', result.gold);
        localStorage.setItem('platinum', result.platinum);

        // Met à jour l'affichage des monnaies
        updateDisplays();

        console.log(`Achat réussi : ${amount} déduit.`);
        return true;
    } else {
        console.log("Fonds insuffisants pour effectuer l'achat.");
        return false;
    }
}