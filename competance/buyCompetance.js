import { competenceStats } from './competance.js'; // Importer les statistiques de compétence
import { buy } from '../monnais/buy.js'; // Importer la fonction buy

export function buyCompetance(title) {
    let cost = 0;
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
        competenceStats.forceLvl += 1;
        competenceStats.forceCost *= 2;
        competenceStats.forceBoost *= 2;
        competenceStats.enduranceMalus *= 2;
        console.log('forceLvl', competenceStats.forceLvl);
    } else if (title === 'endurance') {
        competenceStats.enduranceLvl += 1;
        competenceStats.enduranceCost *= 2;
        competenceStats.enduranceBoost *= 2;
        competenceStats.bouclierMalus *= 2;
    } else if (title === 'bouclier') {
        competenceStats.bouclierLvl += 1;
        competenceStats.bouclierCost *= 2;
        competenceStats.bouclierBoost *= 2;
        competenceStats.forceMalus *= 2;
    }
}