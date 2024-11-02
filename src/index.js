import './pages/index.css';
import {openModal, closeModal}  from './components/modal.js';
// import {initialCards} from './components/cards.js';
import {createCard, deleteCard, toggleLike} from './components/card.js';
import {enableValidation} from './components/validation.js';
import {getInitialCards} from './components/api.js';

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardImage = document.querySelector(".card__image");
const avatar = document.querySelector(".profile__image");


const modalEdit = document.querySelector(".popup_type_edit");
const modalAdd = document.querySelector(".popup_type_new-card");
const modalAvatar = document.querySelector(".popup_type_avatar");

const modalPicture = document.querySelector(".popup_type_image");
const largePicture = modalPicture.querySelector(".popup__image");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");


const formElementEdit = document.querySelector("form[name='edit-profile']");
const nameInput = formElementEdit.querySelector("input[name='name']");
const jobInput = formElementEdit.querySelector("input[name='description']");

const formElementAdd = document.querySelector("form[name='new-place']");
const cardName = formElementAdd.querySelector("input[name='place-name']");
const cardLink = formElementAdd.querySelector("input[name='link']");

const formElementEditAvatar = document.querySelector("form[name='avatar']");
const avatarLink = formElementEditAvatar.querySelector("input[name='avatar-link']");

const popups = document.querySelectorAll('.popup');

// получаем карточки с сервера


getInitialCards()
  .then((result) => {
    result.forEach((element) => {
      placeList.append(createCard(element, deleteCard, toggleLike, clickPicture));
    });
  });

// fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', {
//   headers: {
//     authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     result.forEach((element) => {
//       placeList.append(createCard(element, deleteCard, toggleLike, clickPicture));
//     });
//   });

// получаю свой профиль с сервера
fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me', {
  headers: {
    authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
    'Content-Type': 'application/json'
   }
})
  .then( res => res.json())
  .then ((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileImage.setAttribute('style', `background-image: url(${result.avatar})`)
  })

const hideInitialError = (popupWindow) => {
  const popupInputs = Array.from(popupWindow.querySelectorAll('.popup__input'));
  popupInputs.forEach((inputElement) => {
    const errorElement = popupWindow.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  })
}

editButton.addEventListener('click', function(){
  openModal(modalEdit);
  fillPopupEdit();
  hideInitialError(modalEdit);
});

addButton.addEventListener('click', function(){
  openModal(modalAdd);
  hideInitialError(modalAdd);
});

avatar.addEventListener('click', function(){
  openModal(modalAvatar);
  hideInitialError(modalAvatar);
});



popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    //Благодаря всплытию при клике на крестик мы поймаем событие на элементе попапа.
    //Проверяем что кликнули на оверлей или на крестик.
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
      //В currentTarget у нас всегда будет элемент на котором мы поймали событие, т.е. попап.
      closeModal(popup);
      formElementAdd.reset();
      formElementEdit.reset();
    }
  });
});

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

formElementEditAvatar.addEventListener('submit', handleFormSubmitEditAvatar);

function clickPicture(name, link) {
  openModal(modalPicture);
  largePicture.src = link;
  largePicture.alt = name;
}

function fillPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  closeModal(modalEdit);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  fetch ('https://nomoreparties.co/v1/wff-cohort-25/cards', {
    method: 'POST',
    headers: {
      authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName.value,
      link: cardLink.value,
      likes: []
    })
  })
    .then( res => res.json())
    .then ((result) => {
      placeList.prepend(createCard(result, deleteCard, toggleLike, clickPicture));
    })
  closeModal(modalAdd);
  formElementAdd.reset();
}


function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  profileImage.setAttribute('style', `background-image: url(${avatarLink.value})`)
  fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink.value
    })
  })
  closeModal(modalAvatar);
  formElementEditAvatar.reset();
}

formElementEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


