// Mini Project : Play The Game

/**
 * @author MEMEL Gnagne Henri Martin
 * @description DI-Bootcamp Week2 Day1 ExercicesXP:Play A Guessing Game
 */

let userInputNumber;  //Le nombre saisi par l'utilisateur
let compteurTour = 0; //Le compteur de nombre d'essai du jeu
let computerNumber; //Le nombre généré aleatoirement
let panelErreur = document.getElementById("panelErreur"); //Le panneau d'affichage des erreurs
let inputUserData = document.getElementById("inputData"); //Le champs de saisie du nombre

//Le modal principal du jeu
let modalFormulaire = new bootstrap.Modal(document.getElementById('modalForm'), { keyboard: false });
//Le modal affiché lors de la fin du jeu
let modalEndGame = new bootstrap.Modal(document.getElementById('modalEndGame'), { keyboard: false });
//Le message affiché à la fin du jeu
let endGameMessage = document.getElementById("endGameMessage");

function playTheGame() {
    userInputNumber = inputUserData.value;

    if (checkNumberValidity(userInputNumber, true)) {
        if (compteurTour == 0) { //On génère seulement en cas d'un nouveau jeu
            computerNumber = Math.round(Math.random() * 10);
            console.log("computerNumber: " + computerNumber);
        }

        compareNumbers(Math.round(parseFloat(userInputNumber)), computerNumber);

    }
}

/**
 * Vérifie la validité d'un nombre saisi à l'ecran
 * en fonction de certaines contraintes
 * @param userInputNumber 
 * 
 * @returns true si tout est correcte et false sinon
 */
function checkNumberValidity(userInputNumber, alertRetour) {
    //console.log(userInputNumber);
    if (userInputNumber != null) {
        if (isNaN(userInputNumber) || userInputNumber.trim() == '') {
            if (alertRetour) createAlert("alert-danger", "Désolé, ce n'est pas un nombre.");
        } else if (parseFloat(userInputNumber) < 0 || parseFloat(userInputNumber) > 10) {
            if (alertRetour) createAlert("alert-danger", "Désolé, le nombre est incorrecte.");
        } else {
            createAlert("", "");
            return true;
        }
    }
    return false;
}

/**
 * Verifie si le nombre entré est égale à celui généré par l'ordinateur
 * @param userNumber 
 * @param computerNumber 
 */
function compareNumbers(userNumber, computerNumber) {
    compteurTour++;
    if (userNumber === computerNumber) {
        createAlert("alert-success", 'Bravo vous avez gagné!', true)
        endGame()
    } else if (compteurTour > 2) {
        createAlert("alert-danger", 'Nombre d\'essai dépassé! <br>Le nombre était ' + computerNumber, true)
        endGame();
    } else if (userNumber > computerNumber) {
        createAlert("alert-danger", "Votre nombre est plus grand que celui généré par l'ordinateur, <br>Il vous reste " + (3 - compteurTour) + " éssais, veuillez recommencer svp!", false)
    } else {
        createAlert("alert-danger", "Votre nombre est plus petit que celui généré par l'ordinateur, <br>" + (3 - compteurTour) + " éssais, veuillez recommencer svp!", false)
    }
}

/**
 * Effectue les opérations de nettoyage et d'affichage de composants nécessaire 
 * lorsque le jeu est terminé
 */
function endGame() {
    compteurTour = 0; //On reinitialise le compteur pour le jeu suivant
    modalFormulaire.hide();
    panelErreur.innerHTML = "";
    inputUserData.value = "";
    modalEndGame.show();
}

/**
 * Crée une alerte de type bootstap et l'ajoute à un conteneur
 * en fonction de isEndGame
 * @param alertType 
 * @param message 
 * @param isEndGame 
 */
function createAlert(alertType, message, isEndGame) {
    panelErreur.innerHTML = "";
    endGameMessage.innerHTML = "";
    if (alertType.trim() != '' && message.trim() != '') {
        let alert = document.createElement("div");
        alert.classList.add("alert", alertType);
        alert.setAttribute("role", "alert")
        alert.innerHTML = message;
        isEndGame ? endGameMessage.appendChild(alert) : panelErreur.appendChild(alert);
    }
}