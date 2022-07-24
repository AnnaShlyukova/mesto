export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  //публичный метод открытия попапа
  open() {
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popup.classList.add("popup_opened");
  }

  //публичный метод закрытия попапа
  close() {
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._popup.classList.remove("popup_opened");
  }

  //приватный метод закрытия попапа нажатием на ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //публичный метод добавления слушателя клика по крестику
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__button-close")
      ) {
        this.close();
      }
    });
  }
}
