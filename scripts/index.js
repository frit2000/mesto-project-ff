// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const placeItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  placeItem.querySelector(".card__title").textContent = card.name;
  const cardImage = placeItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const delButton = placeItem.querySelector(".card__delete-button");
  delButton.addEventListener("click", () => deleteCard(placeItem));

  return placeItem;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach((element) => {
  placeList.append(createCard(element, deleteCard));
});
