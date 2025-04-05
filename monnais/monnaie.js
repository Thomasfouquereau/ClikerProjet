import {convertCurrencyAll} from './convertCurrency.js'; // Import de la fonction convertCurrencyAll}

export let copper = 0; // Permet de modifier la valeur de copper
let silver = 0; // Score en argent
let gold = 0; // Score en or
let platinum = 0; // Score en platine

// Fonction pour mettre à jour l'affichage de la monnaie
const copperMonnaie = document.getElementById('copper');
const silverMonnaie = document.getElementById('silver');
const goldMonnaie = document.getElementById('gold');
const platinumMonnaie = document.getElementById('platinum');

const MonnaiePlatinumContainer = document.getElementById('MonnaiePlatinum');
const MonnaieGoldContainer = document.getElementById('MonnaieGold');
const MonnaieSilverContainer = document.getElementById('MonnaieSilver');

function updateMonnaieDisplay() {
    MonnaieSilverContainer.style.display = silver === 0 ? 'none' : 'flex';
    MonnaieGoldContainer.style.display = gold === 0 ? 'none' : 'flex';
    MonnaiePlatinumContainer.style.display = platinum === 0 ? 'none' : 'flex';
}

export function convertCurrency() {
    if (copper >= 10000) {
        silver += Math.floor(copper / 10000);
        copper = copper % 10000;
        localStorage.setItem('copper', copper);
        localStorage.setItem('silver', silver);
    }
    if (silver >= 10000) {
        gold += Math.floor(silver / 10000);
        silver = silver % 10000;
        localStorage.setItem('silver', silver);
        localStorage.setItem('gold', gold);
    }
    if (gold >= 10000) {
        platinum += Math.floor(gold / 10000);
        gold = gold % 10000;
        localStorage.setItem('gold', gold);
        localStorage.setItem('platinum', platinum);
    }
}

export function updateDisplays() {
    copper = parseFloat(localStorage.getItem('copper')) || 0; // Utiliser parseFloat ici
    silver = parseInt(localStorage.getItem('silver')) || 0;
    gold = parseInt(localStorage.getItem('gold')) || 0;
    platinum = parseInt(localStorage.getItem('platinum')) || 0;

    convertCurrency();
    copperMonnaie.textContent = copper.toFixed(2); // Afficher avec deux décimales
    silverMonnaie.textContent = silver;
    goldMonnaie.textContent = gold;
    platinumMonnaie.textContent = platinum;
    updateMonnaieDisplay();
}

// Fonction pour ajouter du copper (utilisée par updateScore)
export function addCopper(amount) {
    // Convertir copper en nombre pour éviter les erreurs
    copper = parseFloat(copper) || 0;
    amount = parseFloat(amount) || 0;

    // Ajouter et arrondir à deux décimales
    copper = Math.round((copper + amount) * 100) / 100;

    // Mettre à jour localStorage
    localStorage.setItem('copper', copper);

    // Convertir les devises si nécessaire
    convertCurrency();

    return copper;
}

// Initial display update
updateDisplays();