
import { convertCurrencyAll } from '../monnais/convertCurrency.js';// Importer la fonction convertCurrencyAll
import { competenceStats } from './competance.js';// Importer les statistiques de compétence
import { buyCompetance } from './buyCompetance.js';// Importer la fonction buyCompetance

const competanceContentModal = document.getElementById('competanceContent');

const competanceContent = document.createElement('div');//cree le conteneur de la modale de competance
competanceContent.classList.add('competanceContent');
competanceContentModal.appendChild(competanceContent);// Ajouté à competanceContentModal

const competanceContentTitle = document.createElement('h2');//cree le titre de la modale de competance
competanceContentTitle.textContent = 'Compétences';
competanceContent.appendChild(competanceContentTitle);// Ajouté à competanceContent

const competanceItemContainer = document.createElement('div');//cree le conteneur de la competence
competanceItemContainer.classList.add('competanceItemContainer');
competanceContent.appendChild(competanceItemContainer); // Ajouté à competanceContent

const competanceArray = [
    {
        title: 'force',
        description: 'ajoute 1 point de force et un malus de 10% sur l\'endurance a chaque achat et ajoute 20% de coût d\'endurance',
    },
    {
        title: 'endurance',
        description: 'ajoute 1 point d\'endurance et un malus de 10% sur le bouclier a chaque achat',
    },
    {
        title: 'bouclier',
        description: 'ajoute 1 point de bouclier et un malus de 10% sur la force a chaque achat',
    },
];

function createCompetanceItem(title, description) {
    const competanceItem = document.createElement('button'); // Crée le bouton de la compétence
    competanceItem.classList.add('competanceItem');
    competanceItem.setAttribute('id', title); // Définit l'ID du bouton
    competanceItemContainer.appendChild(competanceItem); // Ajouté à competanceItemContainer

    const competanceItemTitle = document.createElement('h3'); // Crée le titre de la compétence
    competanceItemTitle.textContent = title;
    competanceItem.appendChild(competanceItemTitle); // Ajouté à competanceItem

    const competanceItemDescription = document.createElement('p'); // Crée la description de la compétence
    competanceItemDescription.textContent = description;
    competanceItemDescription.classList.add('hidden'); // Masque la description par défaut
    competanceItem.appendChild(competanceItemDescription); // Ajouté à competanceItem

    const competanceItemCost = document.createElement('p'); // Crée le coût de la compétence
    competanceItemCost.setAttribute('id', 'competanceCost-' + title);
    const costValue = Number(competenceStats[title + 'Cost']);
    const { copper, silver, gold, platinum } = convertCurrencyAll(costValue, 0, 0, 0);
    let parts = [];
    if (platinum > 0) parts.push(`${platinum} P`);
    if (gold > 0) parts.push(`${gold} G`);
    if (silver > 0) parts.push(`${silver} S`);
    if (copper > 0) parts.push(`${parseFloat(copper.toFixed(2))} C`); // Assurez-vous que copper est bien formaté
    competanceItemCost.textContent = `Coût: ${parts.join(', ')}`;
    competanceItem.appendChild(competanceItemCost); // Ajouté à competanceItem

    // Ajoute les événements pour afficher/masquer la description
    competanceItem.addEventListener('click', () => {
        buyCompetance(title);
    });
    competanceItem.addEventListener('mouseover', () => {
        competanceItemDescription.classList.remove('hidden');
    });
    competanceItem.addEventListener('mouseout', () => {
        competanceItemDescription.classList.add('hidden');
    });
}

// Boucle pour afficher chaque compétence
competanceArray.forEach(competance => {
    createCompetanceItem(competance.title, competance.description);
});

export function competanceStatsDisplay() {
    // Si un conteneur de stats existe déjà, on le vide ; sinon, on le crée et l'ajoute à competanceContent
    let statsContainer = document.querySelector('.statsContainer');
    if (!statsContainer) {
        statsContainer = document.createElement('div');
        statsContainer.classList.add('statsContainer');
        competanceContent.appendChild(statsContainer);
    } else {
        statsContainer.innerHTML = ''; // Nettoie les anciennes stats
    }

    // Définit les statistiques à afficher
    const stats = [
        { id: 'force', label: 'Force', level: competenceStats.forceLvl, boost: competenceStats.forceBoost, malus: competenceStats.enduranceMalus, malusLabel: 'Endurance Malus' },
        { id: 'endurance', label: 'Endurance', level: competenceStats.enduranceLvl, boost: competenceStats.enduranceBoost, malus: competenceStats.bouclierMalus, malusLabel: 'Bouclier Malus' },
        { id: 'bouclier', label: 'Bouclier', level: competenceStats.bouclierLvl, boost: competenceStats.bouclierBoost, malus: competenceStats.forceMalus, malusLabel: 'Force Malus' }
    ];

    // Pour chaque statistique, crée un bloc avec niveau, boost et malus
    stats.forEach(stat => {
        const statDiv = document.createElement('div');
        statDiv.classList.add(stat.id + 'Stats');
        statsContainer.appendChild(statDiv);

        const levelP = document.createElement('p');
        levelP.setAttribute('id', stat.id + 'Lvl');
        levelP.textContent = stat.label + ': ' + stat.level;
        statDiv.appendChild(levelP);

        const boostP = document.createElement('p');
        boostP.textContent = stat.label + ' Boost: ' + Number(stat.boost).toFixed(2) + '%';
        statDiv.appendChild(boostP);

        const malusP = document.createElement('p');
        malusP.textContent = stat.malusLabel + ': ' + Number(stat.malus).toFixed(2) + '%';
        statDiv.appendChild(malusP);

        if (stat.id !== 'force') {
            const maxP = document.createElement('p');
            maxP.textContent = stat.label + ' Max: ' + competenceStats[stat.id + 'Max'];
            statDiv.appendChild(maxP);
        }
    });

    // Ajoute des statistiques supplémentaires
    const additionalStatsDiv = document.createElement('div');
    additionalStatsDiv.classList.add('additionalStats');
    statsContainer.appendChild(additionalStatsDiv);

    // Temps de recharge de l'endurance
    const enduranceRechargeTime = document.createElement('p');
    const enduranceRegenerationTimer = parseFloat(localStorage.getItem('enduranceRegenerationTimer')) || 4000;
    const enduranceBoost = competenceStats.enduranceBoost || 0;
    const enduranceRegeneration = Math.max(200, enduranceRegenerationTimer * (1 - enduranceBoost / 100));
    enduranceRechargeTime.textContent = `Temps de recharge de l'endurance : ${(enduranceRegeneration / 1000).toFixed(2)}s`;
    additionalStatsDiv.appendChild(enduranceRechargeTime);

    // Temps de recharge total de l'endurance
    const totalEnduranceRechargeTime = document.createElement('p');
    const totalRechargeTime = competenceStats.enduranceMax * enduranceRegeneration;
    totalEnduranceRechargeTime.textContent = `Temps de recharge total de l'endurance : ${(totalRechargeTime / 1000).toFixed(2)}s`;
    additionalStatsDiv.appendChild(totalEnduranceRechargeTime);

    // Coût d'endurance par clic
    const enduranceCostPerClick = document.createElement('p');
    const enduranceCost = parseFloat(localStorage.getItem('enduranceCostPerClick')) || 1;
    enduranceCostPerClick.textContent = `Coût d'endurance par clic : ${enduranceCost.toFixed(2)}`;
    additionalStatsDiv.appendChild(enduranceCostPerClick);

    // Nombre de clics disponibles
    const clicksAvailable = document.createElement('p');
    const enduranceMax = competenceStats.enduranceMax || 0;
    const enduranceCurrent = Number(localStorage.getItem('currentEndurance')) || enduranceMax;
    let maxClicks = 0;
    let remainingEndurance = enduranceCurrent;

    while (remainingEndurance >= enduranceCost) {
        maxClicks++;
        remainingEndurance -= enduranceCost;
    }

    clicksAvailable.textContent = `Nombre de clics disponibles : ${maxClicks}`;
    additionalStatsDiv.appendChild(clicksAvailable);

    // Taux de cuivre par clic
    const copperPerClick = document.createElement('p');
    const forceBoost = competenceStats.forceBoost || 0;
    const forceMalus = competenceStats.forceMalus || 0;
    const cuivreTauxPerClick = competenceStats.cuivreTauxPerClick || 1;
    const tauxCuivreParClic = cuivreTauxPerClick * (1 + (forceBoost - forceMalus) / 100);
    copperPerClick.textContent = `Taux de cuivre par clic : ${tauxCuivreParClic.toFixed(2)} C`;
    additionalStatsDiv.appendChild(copperPerClick);

    // Dégâts par clic
    const damagePerClick = document.createElement('p');
    const baseDamage = competenceStats.domagePerClick || 1;
    const damageBoost = competenceStats.domageBoost || 0;
    const damageMalus = competenceStats.domageMalus || 0;
    const totalDamagePerClick = baseDamage * (1 + (damageBoost - damageMalus) / 100);
    damagePerClick.textContent = `Dégâts par clic : ${totalDamagePerClick.toFixed(2)}`;
    additionalStatsDiv.appendChild(damagePerClick);

    // DPS (Dégâts par seconde)
    const dps = document.createElement('p');
    const clicksPerSecond = enduranceMax / enduranceCost / (enduranceRegeneration / 1000);
    const totalDPS = totalDamagePerClick * clicksPerSecond;
    dps.textContent = `DPS : ${totalDPS.toFixed(2)}`;
    additionalStatsDiv.appendChild(dps);
}

competanceStatsDisplay()
//cree des competence passive (ex: chance de critique, chance d anuller les degats, chance de regen d endurance)