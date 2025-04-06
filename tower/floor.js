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

    console.log(`Changement d'étage : ${nextFloor + 1}`);
}