import './pages/index.css';
import {initialCards, createCard, deleteCard, addLike, clickPicture} from './components/cards.js';
import {openModal, closeModal} from './components/modal.js';


// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardImage = document.querySelector(".card__image");

const modalEdit = document.querySelector(".popup_type_edit");
const modalAdd = document.querySelector(".popup_type_new-card");


const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElementEdit = document.querySelector("form[name='edit-profile']");
const nameInput = formElementEdit.querySelector("input[name='name']");
const jobInput = formElementEdit.querySelector("input[name='description']");

const formElementAdd = document.querySelector("form[name='new-place']");
const cardName = formElementAdd.querySelector("input[name='place-name']");
const cardLink = formElementAdd.querySelector("input[name='link']");


initialCards.forEach((element) => {
  placeList.append(createCard(element, deleteCard, addLike, clickPicture));
});

editButton.addEventListener('click', function(){
  openModal(modalEdit);
  fillPopupEdit();
});

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

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

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

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

addButton.addEventListener('click', function(){
  openModal(modalAdd);
});








