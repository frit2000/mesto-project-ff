import './pages/index.css';
import {openModal, closeModal}  from './components/modal.js';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, addLike} from './components/card.js';
// import { isObject } from 'core-js/core/object';
import {enableValidation} from './components/validation.js';

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardImage = document.querySelector(".card__image");

const modalEdit = document.querySelector(".popup_type_edit");
const modalAdd = document.querySelector(".popup_type_new-card");

const modalPicture = document.querySelector(".popup_type_image");
const largePicture = modalPicture.querySelector(".popup__image");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElementEdit = document.querySelector("form[name='edit-profile']");
const nameInput = formElementEdit.querySelector("input[name='name']");
const jobInput = formElementEdit.querySelector("input[name='description']");

const formElementAdd = document.querySelector("form[name='new-place']");
const cardName = formElementAdd.querySelector("input[name='place-name']");
const cardLink = formElementAdd.querySelector("input[name='link']");

const popups = document.querySelectorAll('.popup');

initialCards.forEach((element) => {
  placeList.append(createCard(element, deleteCard, addLike, clickPicture));
});


const hideInitialError = (popupWindow) => {
  console.log('пытаемся спрятать ошибки');
  const popupInputs = Array.from(popupWindow.querySelectorAll('.popup__input'));
  console.log('массив инпутов', popupInputs);
  popupInputs.forEach((inputElement) => {
    const errorElement = popupWindow.querySelector(`.${inputElement.id}-error`);
    console.log('поле',inputElement, 'ошибка', errorElement );
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

// modalEdit.addEventListener

addButton.addEventListener('click', function(){
  openModal(modalAdd);
  hideInitialError(modalAdd);
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
  closeModal(modalEdit);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const element =
    {
      name: cardName.value,
      link: cardLink.value,
    }
  placeList.prepend(createCard(element, deleteCard, addLike, clickPicture));
  closeModal(modalAdd);
  formElementAdd.reset();
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

