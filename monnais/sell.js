import { addCopper, updateDisplays } from './monnaie.js';

export function sell(amount) {
    // Ajoute le montant de la vente au copper
    addCopper(amount);
    // Met à jour l'affichage et la conversion des monnaies
    updateDisplays();
    console.log(`Vente réussie : ${amount} ajouté.`);
}