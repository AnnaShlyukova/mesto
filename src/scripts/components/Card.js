export class Card {
  constructor(data, id, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Метод получения копии темплейта
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  // Метод удаления карточки
  _deleteButtonItem() {
    this._element.remove();
    this._element = null;
  }

  // Метод лайка карточки
  _likeButtonItem() {
    this._buttonLikeElement.classList.toggle("gallery__like_active");
  }

  // Обработчики событий
  _setEventListener() {
    this._buttonLikeElement = this._element.querySelector(".gallery__like");
    this._buttonDeletElement = this._element.querySelector(
      ".gallery__button-delete"
    );
    this._galleryImage = this._element.querySelector(".gallery__image");

    this._buttonLikeElement.addEventListener("click", (event) => {
      this._likeButtonItem(event);
    });

    this._buttonDeletElement.addEventListener("click", (event) => {
      this._deleteButtonItem(event);
    });

    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
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
