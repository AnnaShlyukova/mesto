export default class UserInfo {
  constructor(nameSelector, bioSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
  }

  //публичный метод для возврата объекта с данными пользователя
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
    };
  }

  //публичный метод для приема новых данных от пользователя
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._bioElement.textContent = data.bio;
  }
}
