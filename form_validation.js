// DOM formulaire validation
const foreName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email"); 
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity"); 
const listRadio = document.querySelectorAll("input[type=radio]");
const checkAccept1 = document.getElementById("checkbox1");

//const messages d'erreur 
const errorMessages = {
    firstName: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
    lastName: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    email: "Veuillez entrer une adresse mail valide.",
    birthDateEmpty: "Veuillez entrer votre date de naissance.",
    birthDateFuture: "La date de naissance ne peut pas être dans le futur.",
    quantityNumber: "Vous devez saisir un nombre.",
    quantityInteger: "Vous ne pouvez pas saisir un nombre à virgule.",
    location: "Vous devez sélectionner un lieu de participation ci-dessus.",
    acceptTerms: "Veuillez accepter les conditions d'utilisation."
  };

// function de verification des champs//
function displayErrorMessage(inputDom, errorMessage, isValid) {
    let errorAlertClass = inputDom.parentElement.querySelector(".error_message");
    let errorBorder = inputDom.parentElement.querySelector(".text-control");
    if (!isValid) {
      errorAlertClass.textContent = errorMessage ;  
      if(errorBorder)  
      errorBorder.classList.add("error_border");
    } else {
      errorAlertClass.textContent = "";  
      if(errorBorder)
      errorBorder.classList.remove("error_border");   
    }
  }
  
//Empechement comportement par défaut "submit"  
form.addEventListener("submit", (event) => {
event.preventDefault();  

//initialisation Form (empeche de valider en cochant juste les conditions)
let isFormValid = true;

//vérification firstname 
let isValid = foreName.value.length >= 2;
displayErrorMessage(foreName, errorMessages.firstName, isValid);
if (!isValid) isFormValid = false;


//verification last 
isValid = lastName.value.length >= 2;
displayErrorMessage(lastName, errorMessages.lastName, isValid);
if (!isValid) isFormValid = false;


//verification mail
let emailRegExp = /^[a-z0-9._\-]+@[a-z0-9._\-]+\.[a-z]+$/;
isValid = emailRegExp.test(email.value);
displayErrorMessage(email, errorMessages.email, isValid);
if (!isValid) isFormValid = false;


//verification birthdate
isValid = birthDate.value && new Date(birthDate.value) < new Date();
displayErrorMessage(birthDate, isValid ? "" : (!birthDate.value ? errorMessages.birthDateEmpty : errorMessages.birthDateFuture), isValid);
if (!isValid) isFormValid = false;



//verification nombre de participations
isValid = parseInt(quantity.value) >= 1 && parseFloat(quantity.value) === parseInt(quantity.value);
displayErrorMessage(quantity, isValid ? "" : (!quantity.value ? errorMessages.quantityNumber : errorMessages.quantityInteger), isValid);
if (!isValid) isFormValid = false;


//Vérification du lieu de participation
const locationSelect = Array.from(listRadio).some(radio => radio.checked);
displayErrorMessage(listRadio[0], locationSelect ? "" : errorMessages.location, locationSelect);
if (!locationSelect) isFormValid = false;

//verification acceptation des conditions d'utilisation
isValid = checkbox1.checked;
displayErrorMessage(checkbox1, errorMessages.acceptTerms, isValid);
if (!isValid) isFormValid = false;

//envoi formulaire si tout est valide //
if (isFormValid) {
modalBody.style.height = '800px';   
form.style.display = 'none';    
modalConfirmation.style.display = 'block';   
}  
});