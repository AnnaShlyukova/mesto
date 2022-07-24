import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  //приватный метотд сбора данных полей форм
  getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleFormSubmit.bind(this));
  }

  //перезапишем родительский метод закрытия попапа, для сбрасывалась форма
  close() {
    super.close();
    this._form.reset();
  }
}
