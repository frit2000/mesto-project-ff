// export const initialCards = [
//     {
//       name: "Архыз",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//     },
//     {
//       name: "Челябинская область",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//     },
//     {
//       name: "Иваново",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//     },
//     {
//       name: "Камчатка",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//     },
//     {
//       name: "Холмогорский район",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//     },
//     {
//       name: "Байкал",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//     }
// ];



// / можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
// export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
//   if (isLoading) {
//     button.textContent = loadingText
//   } else {
//     button.textContent = buttonText
//   }
// }

// // можно сделать универсальную функцию, которая принимает функцию запроса, объект события и текст во время загрузки
// function handleSubmit(request, evt, loadingText = "Сохранение...") {
//  // всегда нужно предотвращать перезагрузку формы при сабмите
//   evt.preventDefault();

//   // универсально получаем кнопку сабмита из `evt`
//   const submitButton = evt.submitter;
//   // записываем начальный текст кнопки до вызова запроса
//   const initialText = submitButton.textContent;
//   // изменяем текст кнопки до вызова запроса
//   renderLoading(true, submitButton, initialText, loadingText);
//   request()
//     .then(() => {
//       // любую форму нужно очищать после успешного ответа от сервера
//       // а также `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
//       evt.target.reset();
//     })
//     .catch((err) => {
//       // в каждом запросе нужно ловить ошибку
//       console.error(`Ошибка: ${err}`);
//     })
//     // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
//     .finally(() => {
//       renderLoading(false, submitButton, initialText);
//     });
// }

// Пример оптимизации обработчика сабмита формы профиля:

// function handleProfileFormSubmit(evt) {
//   // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
//   function makeRequest() {
//     // return позволяет потом дальше продолжать цепочку `then, catch, finally`
//     return editProfile(popupName.value, popupProfession.value).then((userData) => {
//       profileName.textContent = userData.name;
//       profileProfession.textContent = userData.about;
//     });
//   }
//   // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
//   handleSubmit(makeRequest, evt);
// }

