import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, addLike} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';


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

editButton.addEventListener('click', function(){
  openModal(modalEdit);
  fillPopupEdit();
});

modalEdit.addEventListener

addButton.addEventListener('click', function(){
  openModal(modalAdd);
});


popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    //Благодаря всплытию при клике на крестик мы поймаем событие на элементе попапа.
    //Проверяем что кликнули на оверлей или на крестик.
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
      //В currentTarget у нас всегда будет элемент на котором мы поймали событие, т.е. попап.
      closeModal(popup);
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





