//Импорт констант
import { imageElement, imageCaption, popupImage, openPopup } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Метод получения копии темплейта №1
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  // Метод удаления карточки №2
  _deleteButtonItem(event) {
    event.target.closest(".gallery__item").remove();
  }

  // Метод лайка карточки №3
  _likeButtonItem(event) {
    event.target.classList.toggle("gallery__like_active");
  }

  // Обработчики событий
  _setEventListener() {
    this._buttonLikeElement = this._element.querySelector(".gallery__like"); //№4,1
    this._buttonDeletElement = this._element.querySelector(
      //№4,2
      ".gallery__button-delete"
    );
    this._galleryImage = this._element.querySelector(".gallery__image"); //№4,3

    this._buttonLikeElement.addEventListener("click", (event) => {
      //№4,1
      this._likeButtonItem(event);
    });

    this._buttonDeletElement.addEventListener("click", (event) => {
      //№4,2
      this._deleteButtonItem(event);
    });

    this._galleryImage.addEventListener("click", () => {
      //№4,3
      imageElement.src = this._link;
      imageCaption.textContent = this._name;
      imageElement.alt = this._name;
      openPopup(popupImage);
    });
  }

  // Получаем готовую карточку с данными
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._galleryTitle = this._element.querySelector(".gallery__title");
    this._galleryImage.src = this._link;
    this._galleryTitle.textContent = this._name;
    this._galleryImage.alt = this._name;

    return this._element;
  }
}
