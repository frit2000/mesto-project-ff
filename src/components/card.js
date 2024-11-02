
// @todo: Функция создания карточки
export function createCard(card, deleteCard, toggleLike, clickPicture) {
  const cardTemplate = document.querySelector("#card-template").content;
  const placeItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const likeCount = placeItem.querySelector(".card__like-count");
  placeItem.querySelector(".card__title").textContent = card.name;
  likeCount.textContent = card.likes.length;
  const cardImage = placeItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  //поведение кнопки удаления
  const delButton = placeItem.querySelector(".card__delete-button");
  if (card.owner._id === '076192aa0676c752105a2586') {
    delButton.classList.remove("card__delete-button_hide");
    delButton.addEventListener("click", () => deleteCard(placeItem, card._id));
  }

  //поведение кнопки лайка
  const heart = placeItem.querySelector(".card__like-button");
  const isLikedByMe = card.likes.some(function(element) {
    return element._id === '076192aa0676c752105a2586';
   })

   if (isLikedByMe) {
     heart.classList.add('card__like-button_is-active');
   }
  heart.addEventListener("click", () => toggleLike(heart, card._id, likeCount));

  //поведение кнопки-картинки
  cardImage.addEventListener("click", () => clickPicture(card.name, card.link));

  return placeItem;
}

export function deleteCard(card, cardId) {
  card.remove();
  fetch (`https://nomoreparties.co/v1/wff-cohort-25/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
      'Content-Type': 'application/json'
    }
  })
}

export function toggleLike(heart, cardId, likeCount) {
  if (!heart.classList.contains('card__like-button_is-active')){
    heart.classList.add('card__like-button_is-active')
    fetch (`https://nomoreparties.co/v1/wff-cohort-25/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then ((result) => {
      likeCount.textContent = result.likes.length;
    })
  } else {
    heart.classList.remove('card__like-button_is-active')
    fetch (`https://nomoreparties.co/v1/wff-cohort-25/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then ((result) => {
      likeCount.textContent = result.likes.length;
    })
  }

}


