import {checkResponse, renderLoading} from './utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
  headers: {
    authorization: 'b14aa255-c572-4615-8bd2-84d12621d1a3',
    'Content-Type': 'application/json'
  }
}

function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse)
}

export const getInitialCards = () => {
  return request(`/cards`, {
    headers: config.headers
  })
s}

export const getMyProfile = () => {
  return request(`/users/me`, {
    headers: config.headers
  })
}

export const patchMyProfile = (name, about, popupButton) => {
  return request(`/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }
)}

export const placeNewCard = (name, link, popupButton) => {
  return request(`/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
      likes: []
    })
  })
}

export const patchMyAvatar = (avatar, popupButton) => {
  return request(`/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  }
)}

export const deleteCardFromServer = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export const addLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
}

export const deleteLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}



