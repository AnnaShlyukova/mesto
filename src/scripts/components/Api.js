export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //загрузка карточек
  getCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //загрузка информации о профиле
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //изменение информации профиля
  setUserInfo({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  //добавляем карточку
  addCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  //удаляем карточку
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: `${id}`,
      }),
    }).then(this._checkResponse);
  }

  //ставим лайк
  setlike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        _id: `${id}`,
      }),
    }).then(this._checkResponse);
  }

  //удаляем лайк
  removeLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: `${id}`,
      }),
    }).then(this._checkResponse);
  }

  //обновление аватара
  addUserAvatar({ avatar }) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}
