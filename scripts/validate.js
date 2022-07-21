const parameters = {
   formElement: '.popup__form',
   formInput: '.popup__input',
   buttonElement: '.popup__save-button',
   buttonElementDisabled: 'popup__save-button_disabled',
}
const {formElement, formInput, buttonElement, buttonElementDisabled} = parameters


const hideInputError = (errorElement) =>{
   errorElement.textContent = ''}

function validateInput(input) {
   const errorElement = input.parentNode.querySelector(`.${input.id}-error`)
   errorElement.textContent = input.validationMessage
   if (input.validity.valid) {
      hideInputError(errorElement)
   }
}

function setEventListeners(form) {
   const inputList = Array.from(form.querySelectorAll(formInput))
   inputList.forEach(function(input){
      input.addEventListener('input',function(){
         validateInput(input)
         isButtonValid(form)
      })
   })
}

function enableValidation() {
   const formList = Array.from(document.querySelectorAll(formElement))

   formList.forEach((form) => {
      form.addEventListener('submit', function (evt) {
         evt.preventDefault()
      })
      setEventListeners(form)
   })
}



function isButtonValid(form) {
   const currentSaveButton = form.querySelector(buttonElement)
   if (form.checkValidity()) {
      currentSaveButton.classList.remove(buttonElementDisabled)
   } else {
      currentSaveButton.classList.add(buttonElementDisabled)
   }
}

//сбрасывает валидацию инпутов при открытии
function resetValidation(el){
   const popupEditInputs = el.querySelectorAll('.popup__input')
   popupEditInputs.forEach((item)=> {
      validateInput(item)
   })
}

function resetButtonValidity(el){
   const form = el.querySelector('.popup__form')
   isButtonValid(form)

}

enableValidation(parameters);

