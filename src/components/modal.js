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


