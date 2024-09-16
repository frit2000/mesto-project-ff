// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(cardName, cardLink, delCard) {
  const placeItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  placeItem.querySelector(".card__title").textContent = cardName;
  placeItem.querySelector(".card__image").src = cardLink;
  placeItem.querySelector(".card__image").alt = cardName;

  const delButton = placeItem.querySelector(".card__delete-button");
  delButton.addEventListener("click", delCard);

  return placeItem;
}

// @todo: Функция удаления карточки
function delCard(evt) {
  const itemToDel = evt.target.closest(".places__item");
  itemToDel.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  placeList.append(addCard(element.name, element.link, delCard));
});
