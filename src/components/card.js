
import {deleteCardFromServer} from './api.js';

// @todo: Функция создания карточки
// export function createCard(card, deleteCard, toggleLike, clickPicture, id)

export function createCard(createParams) {
  const cardTemplate = document.querySelector("#card-template").content;
  const placeItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const likeCount = placeItem.querySelector(".card__like-count");
  placeItem.querySelector(".card__title").textContent = createParams.card.name;
  likeCount.textContent = createParams.card.likes.length;
  const cardImage = placeItem.querySelector(".card__image");
  cardImage.src = createParams.card.link;
  cardImage.alt = createParams.card.name;

  //поведение кнопки удаления
  const delButton = placeItem.querySelector(".card__delete-button");
  if (createParams.card.owner._id === createParams.id) {
    delButton.classList.remove("card__delete-button_hide");
    delButton.addEventListener("click", () => createParams.deleteCard(placeItem, createParams.card._id));
  }

  //поведение кнопки лайка
  const heart = placeItem.querySelector(".card__like-button");
  const isLikedByMe = createParams.card.likes.some(function(element) {
    return element._id === createParams.id;
   })

   if (isLikedByMe) {
     heart.classList.add('card__like-button_is-active');
   }
  heart.addEventListener("click", () => createParams.toggleLike(heart, createParams.card._id, likeCount));

  //поведение кнопки-картинки
  cardImage.addEventListener("click", () => createParams.clickPicture(createParams.card.name, createParams.card.link, createParams.card.name));
  return placeItem;
}

export function deleteCard(card, cardId) {
  deleteCardFromServer (cardId)
  .then (() => card.remove())
  .catch((err) => {
    console.log(err);
  })

}




