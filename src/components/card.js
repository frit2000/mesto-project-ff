
// @todo: Функция создания карточки
export function createCard(card, deleteCard, addLike, clickPicture) {
  const cardTemplate = document.querySelector("#card-template").content;
  const placeItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  placeItem.querySelector(".card__title").textContent = card.name;
  const cardImage = placeItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const delButton = placeItem.querySelector(".card__delete-button");
  delButton.addEventListener("click", () => deleteCard(placeItem));

  const heart = placeItem.querySelector(".card__like-button");
  heart.addEventListener("click", () => addLike(heart))

  cardImage.addEventListener("click", () => clickPicture(card.name, card.link));

  return placeItem;
}

export function deleteCard(card) {
  card.remove();
}

export function addLike(heart) {
  heart.classList.toggle('card__like-button_is-active');
}

// export function clickPicture(picture) {
//   const modalPicture = document.querySelector(".popup_type_image");
//   const largePicture = modalPicture.querySelector(".popup__image");
//   const srcPicture = picture.getAttribute('src');
//   const altPicture = picture.getAttribute('alt');

//   openModal(modalPicture);
//   largePicture.setAttribute('src', srcPicture);
//   largePicture.setAttribute('alt', altPicture);
// }
