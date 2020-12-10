const cards = document.querySelectorAll('.card')

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
        window.location.href = `/detalhe/${i}`
    })
}

const cardsAdmin = document.querySelectorAll('.card-admin')

for (let i = 0; i < cardsAdmin.length; i++) {
    cardsAdmin[i].addEventListener("click", function() {
        window.location.href = `/admindetalhe/${i}`
    })
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");
  
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    if (newField.children[0].value == "") return false;
  
    newField.children[0].value = "";
    ingredients.appendChild(newField);
  }
  
 document
   .querySelector(".add-ingredient")
   .addEventListener("click", addIngredient);

function addPreparation() {
        const preparations = document.querySelector("#preparation");
        const fieldContainer = document.querySelectorAll(".preparations");
      
        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
      
        if (newField.children[0].value == "") return false;
      
        newField.children[0].value = "";
        preparations.appendChild(newField);
      }
      
     document
       .querySelector(".add-preparations")
       .addEventListener("click", addPreparation);