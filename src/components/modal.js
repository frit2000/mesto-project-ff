export function openModal (popupDOM){
  popupDOM.classList.add('popup_is-opened');
  popupDOM.classList.add('popup_is-animated');

  document.addEventListener('keyup', closeEscape);
}

function closeEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(popupDOM);
  }
}

export function closeModal(popupDOM){
  popupDOM.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeEscape);
}

export function hideInitialError (popupWindow) {
  const popupInputs = Array.from(popupWindow.querySelectorAll('.popup__input'));
  popupInputs.forEach((inputElement) => {
    const errorElement = popupWindow.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  })
}


