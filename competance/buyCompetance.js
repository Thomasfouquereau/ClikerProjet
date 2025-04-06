import { competenceStats } from './competance.js'; // Importer les statistiques de compétence
import { buy } from '../monnais/buy.js'; // Importer la fonction buy
import { competanceStatsDisplay } from './competanceContent.js'; // Importer la fonction update des stats
import { updateEnduranceDisplay, enduranceBarDisplay } from './endurance.js';
import { convertCurrencyAll } from '../monnais/convertCurrency.js'; // Importer la fonction convertCurrencyAll

updateEnduranceDisplay();
enduranceBarDisplay();

export function buyCompetance(title) {
    let cost = 0;
    if (title === 'force') {
        cost = Number(competenceStats.forceCost);
    } else if (title === 'endurance') {
        cost = Number(competenceStats.enduranceCost);
    } else if (title === 'bouclier') {
        cost = Number(competenceStats.bouclierCost);
    }

    // Vérifie que l'achat peut être effectué
    if (!buy(cost)) {
        // Arrête si fonds insuffisants
        return;
    }

    // Met à jour les statistiques de compétence uniquement si l'achat a réussi
    if (title === 'force') {
        competenceStats.forceLvl++;
        competenceStats.forceCost *= 1.6; // Met à jour le coût avant l'affichage
        competenceStats.forceBoost *= 1.4;
        competenceStats.enduranceMalus *= 1.1;
        competenceStats.cuivreTauxPerClick *= 1.5; // Augmente le taux de cuivre par clic
        competenceStats.enduranceCostPerClick *= 1.2; // Augmente le coût d'endurance par clic
        competenceStats.domagePerClick *= 1.5; // Augmente le domage par clic
        localStorage.setItem('forceLvl', competenceStats.forceLvl);
        localStorage.setItem('forceCost', competenceStats.forceCost);
        localStorage.setItem('forceBoost', competenceStats.forceBoost);
        localStorage.setItem('enduranceMalus', competenceStats.enduranceMalus);
        localStorage.setItem('cuivreTauxPerClick', competenceStats.cuivreTauxPerClick);
        localStorage.setItem('enduranceCostPerClick', competenceStats.enduranceCostPerClick); // Met à jour le coût d'endurance
        localStorage.setItem('domagePerClick', competenceStats.domagePerClick); // Met à jour le domage par clic
    } else if (title === 'endurance') {
        competenceStats.enduranceLvl++;
        competenceStats.enduranceCost *= 1.6; // Met à jour le coût avant l'affichage
        competenceStats.enduranceBoost *= 1.75;
        competenceStats.bouclierMalus *= 1.1;
        competenceStats.enduranceMax++;
        competenceStats.domageBoost *= 1.2; // Augmente le domage boost
        localStorage.setItem('enduranceLvl', competenceStats.enduranceLvl);
        localStorage.setItem('enduranceCost', competenceStats.enduranceCost);
        localStorage.setItem('enduranceBoost', competenceStats.enduranceBoost);
        localStorage.setItem('bouclierMalus', competenceStats.bouclierMalus);
        localStorage.setItem('enduranceMax', competenceStats.enduranceMax);
        localStorage.setItem('domageBoost', competenceStats.domageBoost); // Met à jour le domage boost
    } else if (title === 'bouclier') {
        competenceStats.bouclierLvl++;
        competenceStats.bouclierCost *= 1.6; // Met à jour le coût avant l'affichage
        competenceStats.bouclierBoost *= 1.1;
        competenceStats.forceMalus *= 1.1;
        competenceStats.bouclierMax++;
        localStorage.setItem('bouclierLvl', competenceStats.bouclierLvl);
        localStorage.setItem('bouclierCost', competenceStats.bouclierCost);
        localStorage.setItem('bouclierBoost', competenceStats.bouclierBoost);
        localStorage.setItem('forceMalus', competenceStats.forceMalus);
        localStorage.setItem('bouclierMax', competenceStats.bouclierMax);
    }

    // Convertit le coût (exprimé en cuivre) en devises hiérarchisées
    const costValue = Number(competenceStats[title + 'Cost']);
    const { copper, silver, gold, platinum } = convertCurrencyAll(costValue, 0, 0, 0);
    let parts = [];
    if (platinum > 0) parts.push(`${platinum} P`);
    if (gold > 0) parts.push(`${gold} G`);
    if (silver > 0) parts.push(`${silver} S`);
    if (copper > 0) parts.push(`${copper} C`);

    // Récupère l'élément du DOM correspondant au coût
    const costElement = document.getElementById('competanceCost-' + title);
    if (costElement) {
        costElement.textContent = `Coût: ${parts.join(', ')}`;
    }

    // Mise à jour des statistiques de compétence affichées dans le DOM
    competanceStatsDisplay();
}