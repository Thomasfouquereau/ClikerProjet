// Fonction pour réinitialiser toutes les données du localStorage
function resetLocalStorage() {
    localStorage.clear(); // Supprime toutes les données du localStorage
    console.log("Toutes les données ont été réinitialisées.");
    location.reload(); // Recharge la page pour appliquer les changements
}

// Ajoute un événement au bouton "Reset"
const resetButton = document.getElementById('resetButton');
if (resetButton) {
    resetButton.addEventListener('click', resetLocalStorage);
}