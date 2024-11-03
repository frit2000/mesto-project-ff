import './pages/index.css';
import {openModal, closeModal, hideInitialError}  from './components/modal.js';
// import {initialCards} from './components/cards.js';
import {createCard, deleteCard} from './components/card.js';
import {enableValidation} from './components/validation.js';
import {getInitialCards, getMyProfile, patchMyProfile, placeNewCard, patchMyAvatar, renderLoading, addLike, deleteLike} from './components/api.js';

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardImage = document.querySelector(".card__image");
const editAvatar = document.querySelector(".profile__image");


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
const popupButton = document.querySelector('.popup__button');

const clickPicture = (name, link) => {
  openModal(modalPicture);
  largePicture.src = link;
  largePicture.alt = name;
}

//получаю карточки и профиль с сервера
Promise.all([getInitialCards(), getMyProfile()])
  .then((results) => {
    // обработка карточек
    results[0].forEach((element) => {
      placeList.append(createCard(element, deleteCard, toggleLike, clickPicture));
    });
    // обработка профиля
    profileName.textContent = results[1].name;
    profileDescription.textContent = results[1].about;
    profileImage.setAttribute('style', `background-image: url(${results[1].avatar})`)
  })

//запускаем функцию проверки валидности полей ввода
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

//редактирование профиля
editButton.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(modalEdit);
  // hideInitialError(modalEdit);
});
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

//редактирование аватара
editAvatar.addEventListener('click', function(){
  openModal(modalAvatar);
  hideInitialError(modalAvatar);
});
formElementEditAvatar.addEventListener('submit', handleFormSubmitEditAvatar);

//добавление карточки
addButton.addEventListener('click', function(){
  openModal(modalAdd);
  hideInitialError(modalAdd);
});
formElementAdd.addEventListener('submit', handleFormSubmitAdd);


//закрытие модальных окон при нажатии мимо окна или на крестик
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

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  renderLoading(true, popupButton);
  patchMyProfile(nameInput.value, jobInput.value, popupButton)
  closeModal(modalEdit);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  renderLoading(true, popupButton);
  placeNewCard(cardName.value, cardLink.value, popupButton)
    .then ((result) => {
      placeList.prepend(createCard(result, deleteCard, toggleLike, clickPicture));
    })
  closeModal(modalAdd);
  formElementAdd.reset();
}

function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  profileImage.setAttribute('style', `background-image: url(${avatarLink.value})`)
  renderLoading(true, popupButton);
  patchMyAvatar(avatarLink.value, popupButton);
  closeModal(modalAvatar);
  formElementEditAvatar.reset();
}

function toggleLike(heart, cardId, likeCount) {
  if (!heart.classList.contains('card__like-button_is-active')){
    heart.classList.add('card__like-button_is-active');
    addLike(cardId)
      .then ((result) => {
        likeCount.textContent = result.likes.length;
      })
  } else {
    heart.classList.remove('card__like-button_is-active')
    deleteLike(cardId)
      .then ((result) => {
        likeCount.textContent = result.likes.length;
      })
  }
}


