import { competenceStats } from './competance.js'; // Importer les statistiques de compétence
import { buy } from '../monnais/buy.js'; // Importer la fonction buy
import { competanceStatsDisplay } from './competanceContent.js'; // Importer la fonction update des stats

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
        competenceStats.forceLvl ++; // Augmente le niveau de force
        competenceStats.forceCost *= 2; // Augmente le coût de la compétence de force
        competenceStats.forceBoost *= 1.3; // Augmente le boost de force de 30%
        competenceStats.enduranceMalus *= 1.1; // Augmente le malus d'endurance de 10%
        // Enregistre les stats de force dans le localStorage
        localStorage.setItem('forceLvl', competenceStats.forceLvl);
        localStorage.setItem('forceCost', competenceStats.forceCost);
        localStorage.setItem('forceBoost', competenceStats.forceBoost);
        localStorage.setItem('enduranceMalus', competenceStats.enduranceMalus);
    } else if (title === 'endurance') {
        competenceStats.enduranceLvl ++; // Augmente le niveau d'endurance
        competenceStats.enduranceCost *= 2; // Augmente le coût de la compétence d'endurance
        competenceStats.enduranceBoost *= 1.3; // Augmente le boost d'endurance de 30%
        competenceStats.bouclierMalus *= 1.1; // Augmente le malus de bouclier de 10%
        // Enregistre les stats d'endurance dans le localStorage
        localStorage.setItem('enduranceLvl', competenceStats.enduranceLvl);
        localStorage.setItem('enduranceCost', competenceStats.enduranceCost);
        localStorage.setItem('enduranceBoost', competenceStats.enduranceBoost);
        localStorage.setItem('bouclierMalus', competenceStats.bouclierMalus);
    } else if (title === 'bouclier') {
        competenceStats.bouclierLvl ++; // Augmente le niveau de bouclier
        competenceStats.bouclierCost *= 2; // Augmente le coût de la compétence de bouclier
        competenceStats.bouclierBoost *= 1.3; // Augmente le boost de bouclier de 30%
        competenceStats.forceMalus *= 1.1; // Augmente le malus de force de 10%
        // Enregistre les stats de bouclier dans le localStorage
        localStorage.setItem('bouclierLvl', competenceStats.bouclierLvl);
        localStorage.setItem('bouclierCost', competenceStats.bouclierCost);
        localStorage.setItem('bouclierBoost', competenceStats.bouclierBoost);
        localStorage.setItem('forceMalus', competenceStats.forceMalus);
    }

    // Mise à jour de l'affichage du coût dans le DOM
    const costElement = document.getElementById('competanceCost-' + title);
    if (costElement) {
        costElement.textContent = 'Coût: ' + competenceStats[title + 'Cost'];
    }
    
    // Mise à jour des statistiques de compétence affichées dans le DOM
    competanceStatsDisplay();
}