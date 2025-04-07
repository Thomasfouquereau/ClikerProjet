let currentFloor = 1; // Compteur d'étage

// Fonction pour changer d'étage
export function changeFloor() {
    const backgrounds = [
        'url("./tower/Battleground1.png")',
        'url("./tower/Battleground2.png")',
        'url("./tower/Battleground3.png")',
        'url("./tower/Battleground4.png")'
    ]; // Liste des fonds d'écran

    currentFloor = parseInt(localStorage.getItem('currentFloor')) || 0; // Utilise la variable globale
    const nextFloor = (currentFloor + 1) % backgrounds.length; // Passe au fond suivant

    document.body.style.backgroundImage = backgrounds[nextFloor]; // Change le fond d'écran
    localStorage.setItem('currentFloor', nextFloor); // Sauvegarde l'étage actuel
    updateFloorDisplay(); // Met à jour l'affichage de l'étage
    console.log(`Changement d'étage : ${nextFloor + 1}`);
}

const floorHud = document.getElementById('floorHud'); // Récupère l'élément HUD de l'étage

const floorText = document.createElement('p'); // Crée un élément de texte pour l'étage
floorText.id = 'floorText'; // Définit l'ID de l'élément
floorText.textContent = `Étage : ${currentFloor + 1}`; // Définit le texte de l'étage
floorHud.appendChild(floorText); // Ajoute l'élément au HUD de l'étage

export function updateFloorDisplay() {
    const floorText = document.getElementById('floorText'); // Récupère l'élément de texte de l'étage
    const currentFloorHud = parseInt(localStorage.getItem('currentFloor')) || 0;

    console.log(`Étage actuel : ${currentFloorHud+ 1}`); // Affiche l'étage actuel dans la console
    if (floorText) {
        floorText.textContent = `Étage : ${currentFloorHud + 1}`; // Met à jour le texte de l'étage
    }
}

updateFloorDisplay()