export function openModal (popupDOM){
  popupDOM.classList.add('popup_is-animated');
  setTimeout(() => {
    popupDOM.classList.add('popup_is-opened');
  }, 1)
  document.addEventListener('keyup', closeEscape);
}

function closeEscape (evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    console.log('элемент', openedModal);
    closeModal(openedModal);
  }
}

export function closeModal(popupDOM){
  popupDOM.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeEscape);
}






// export function openModal (popupDOM){
//   popupDOM.classList.add('popup_is-animated');
//   setTimeout(() => {
//     popupDOM.classList.add('popup_is-opened');
//   }, 1)

//   document.addEventListener('keyup', closeEscape);

// function closeEscape (evt) {
//     if (evt.key === 'Escape') {
//       closeModal(popupDOM);
//       document.removeEventListener('keyup', closeEscape);
//     }
//   }
// }

// export function closeModal(popupDOM){
//   popupDOM.classList.remove('popup_is-opened');
// }




