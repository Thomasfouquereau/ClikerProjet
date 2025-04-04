import { competenceStats } from './competance.js'; // Importer les statistiques de compétence
import { buy } from '../monnais/buy.js'; // Importer la fonction buy

export function buyCompetance(title) {
    let cost = 0;
    // Définit le coût de la compétence en fonction du titre
    if (title === 'force') {
        cost = competenceStats.forceCost;
    } else if (title === 'endurance') {
        cost = competenceStats.enduranceCost;
    } else if (title === 'bouclier') {
        cost = competenceStats.bouclierCost;
    }

    // Vérifie que l'achat peut être effectué
    if (!buy(cost)) {
        // Arrête si fonds insuffisants
        return;
    }

    // Met à jour les statistiques de compétence uniquement si l'achat a réussi
    if (title === 'force') {
        competenceStats.forceLvl += 1;// Augmente le niveau de force
        competenceStats.forceCost *= 2;// Augmente le coût de la compétence de force
        competenceStats.forceBoost *= 1.3;// Augmente le boost de force de 30%
        competenceStats.enduranceMalus *= 1.15;// Augmente le malus d'endurance de 15%
        console.log('forceLvl', competenceStats.forceLvl);
    } else if (title === 'endurance') {
        competenceStats.enduranceLvl += 1;// Augmente le niveau d endurance
        competenceStats.enduranceCost *= 2;// Augmente le coût de la compétence d endurance
        competenceStats.enduranceBoost *= 1.3; // Augmente le boost d'endurance de 30%
        competenceStats.bouclierMalus *= 1.15;// Augmente le malus de bouclier de 15%
    } else if (title === 'bouclier') {
        competenceStats.bouclierLvl += 1;// Augmente le niveau de bouclier
        competenceStats.bouclierCost *= 2;// Augmente le coût de la compétence de bouclier
        competenceStats.bouclierBoost *= 1.3;// Augmente le boost de bouclier de 30%
        competenceStats.forceMalus *= 1.15;// Augmente le malus de force de 15%
    }

    // Mise à jour de l'affichage du coût dans le DOM
    const costElement = document.getElementById('competanceCost-' + title);
    if (costElement) {
        costElement.textContent = 'Coût: ' + competenceStats[title + 'Cost'];
    }
}