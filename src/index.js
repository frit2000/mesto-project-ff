import './pages/index.css';
import {openModal, closeModal}  from './components/modal.js';
import {renderLoading}  from './components/utils.js';
import {createCard, deleteCard} from './components/card.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getInitialCards, getMyProfile, patchMyProfile, placeNewCard, patchMyAvatar, addLike, deleteLike} from './components/api.js';

let userId;

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
const modalPictureDescription = document.querySelector(".popup__caption");


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

const popupButtonAdd = modalAdd.querySelector('.popup__button');
const popupButtonEdit = modalEdit.querySelector('.popup__button');
const popupButtonAvatar = modalAvatar.querySelector('.popup__button');

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const clickPicture = (name, link, description) => {
  openModal(modalPicture);
  largePicture.src = link;
  largePicture.alt = name;
  modalPictureDescription.textContent = description;

}

//получаю карточки и профиль с сервера
Promise.all([getInitialCards(), getMyProfile()])
  .then((results) => {
    // обработка профиля
    profileName.textContent = results[1].name;
    profileDescription.textContent = results[1].about;
    profileImage.setAttribute('style', `background-image: url(${results[1].avatar})`)
    userId = results[1]._id;
    // обработка карточек
    results[0].forEach((element) => {
      const createParams = {
        card: element,
        deleteCard: deleteCard,
        toggleLike: toggleLike,
        clickPicture: clickPicture,
        id: userId
      }
      placeList.append(createCard(createParams));
    });

  })
  .catch((err) => {
    console.log(err);
  });

//запускаем функцию проверки валидности полей ввода
enableValidation(validationParams);

//редактирование профиля
editButton.addEventListener('click', function(){
  clearValidation(modalEdit, validationParams);
  openModal(modalEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

//редактирование аватара
editAvatar.addEventListener('click', function(){
  clearValidation(modalAvatar, validationParams);
  openModal(modalAvatar);
});
formElementEditAvatar.addEventListener('submit', handleFormSubmitEditAvatar);

//добавление карточки
addButton.addEventListener('click', function(){
  clearValidation(modalAdd, validationParams);
  openModal(modalAdd);
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
    }
  });
});

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
  renderLoading(true, popupButtonEdit);
  patchMyProfile(nameInput.value, jobInput.value, popupButtonEdit)
    .then ((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(modalEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, popupButtonEdit));
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  renderLoading(true, popupButtonAdd);
  placeNewCard(cardName.value, cardLink.value, popupButtonAdd)
    .then ((result) => {
      const createParams = {
        card: result,
        deleteCard: deleteCard,
        toggleLike: toggleLike,
        clickPicture: clickPicture,
        id: userId
      }
      placeList.prepend(createCard(createParams));
      closeModal(modalAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, popupButtonAdd))
}

function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, popupButtonAvatar);
  patchMyAvatar(avatarLink.value, popupButtonAvatar)
    .then ((res) => {
      profileImage.setAttribute('style', `background-image: url(${res.avatar})`);
      closeModal(modalAvatar);
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupButtonAvatar);
    })
}

function toggleLike(heart, cardId, likeCount) {
  if (!heart.classList.contains('card__like-button_is-active')){
    addLike(cardId)
      .then ((result) => {
        likeCount.textContent = result.likes.length;
        heart.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLike(cardId)
      .then ((result) => {
        likeCount.textContent = result.likes.length;
        heart.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err);
      });
  }

}


