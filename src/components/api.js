const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
  headers: {
    authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', {
//   headers: {
//     authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     result.forEach((element) => {
//       placeList.append(createCard(element, deleteCard, toggleLike, clickPicture));
//     });
//   });
