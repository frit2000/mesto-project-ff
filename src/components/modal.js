export function openModal (popupDOM){
  popupDOM.classList.add('popup_is-opened');
  popupDOM.classList.add('popup_is-animated');

  document.addEventListener('keyup', closeEscape);
  function closeEscape(evt) {
    if (evt.key === 'Escape') {
      closeModal(popupDOM);
      document.removeEventListener('keyup', closeEscape);
    }
  }

  const closeButton = popupDOM.querySelector(".popup__close");
  closeButton.addEventListener('click', function(){
    closeModal(popupDOM);
  });

  popupDOM.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popupDOM);
    }
  })

}

export function closeModal(popupDOM){
  popupDOM.classList.remove('popup_is-opened');
}


