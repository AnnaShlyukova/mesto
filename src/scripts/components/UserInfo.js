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
  setUserInfo(nameInput, bioInput) {
    this._nameElement.textContent = nameInput.value;
    this._bioElement.textContent = bioInput.value;
  }
}
